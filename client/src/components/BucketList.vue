<template lang="html">
  <div id="favourite_countries">
    <h2>Bucket List</h2>
    <ul>
      <li v-for="country in bucketList">{{country.name}} <img class="small-flag" :src="country.flag"/> <button v-on:click="updateList(country)">Visit!</button></li>
    </ul>
  </div>
</template>

<script>
import {eventBus} from '@/main.js'
import BucketService from '@/services/BucketService.js'

export default {
  name: 'bucket-list',
  props: ['bucketList'],

// mounted:{
//   eventBus.$on('visit-updated', (newVisit) => {
//   this.bucketList.push(newVisit)
//   });
// },

  methods: {
    updateList(country){
    const updateCountry = {
      name: country.name,
      flag: country.flag,
      visit: true
    }
    console.log(updateCountry);
    BucketService.updateCountry(country._id, updateCountry)
    .then((country) => eventBus.$emit('visit-updated', country))
  }
  }
}
</script>

<style lang="css" scoped>
</style>
