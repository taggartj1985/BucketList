<template>
  <div id="app">
    <h2>Travel Bucket List</h2>

    <country-select :countries="countries"/>

    <country-detail v-if="selectedCountry" :selectedCountry="selectedCountry">
    </country-detail>

    <button v-if="selectedCountry && !bucketList.some(country => country.name === selectedCountry.name)"
    v-on:click="addToBucketList">Add Country</button>

    <bucket-list :bucketList="bucketList"></bucket-list>
</div>

</template>

<script>
import CountryDetail from '@/components/CountryDetail.vue';
import BucketList from '@/components/BucketList.vue';
import CountrySelect from '@/components/CountrySelect';
import BucketService from '@/services/BucketService';
import {eventBus} from '@/main.js';
export default {
  name: 'App',
  data() {
    return {
      countries: [],
      selectedCountry: null,
      bucketList: []
    }
  },
  components: {
    'country-detail': CountryDetail,
    'bucket-list': BucketList,
    'country-select': CountrySelect
  },
    mounted(){
      this.getCountries();
      this.getBucketList();

      eventBus.$on('country-selected', (country) => {
        this.selectedCountry = country;
      })

      eventBus.$on('visit-added', (newVisit) => {
      this.bucketList.push(newVisit)
      });

      eventBus.$on('country-updated', (country) => {
      let index = this.bucketList.findIndex(bucketItem => bucketItem._id === country._id)
      this.bucketList.splice(index, 1, country)
    })

    },
    methods: {
      getCountries(){
        fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(countries => this.countries = countries)
      },
      getBucketList(){
        BucketService.getBucketList()
        .then(bucketList => this.bucketList = bucketList)
      },

      addToBucketList(event){
			const newVisit = {
				name: this.selectedCountry.name,
        flag: this.selectedCountry.flag,
        visited: false
			}
			console.log(newVisit);
			BucketService.postVisit(newVisit)
			// .then(visit => eventBus.$emit('visit-added', visit))
      // this means i don't need the event emit on
      .then(visit => this.bucketList.push(visit))
		},


    }
}
</script>

<style>
.small-flag {
  height: 20px
}



</style>
