<template lang="html">
  <div id="favourite_countries">
    <h2>Bucket List</h2>
    <ul>
      <li :class="country.visited ? 'visited' : 'not-visited'" v-for="country in bucketList">{{country.name}} <img class="small-flag" :src="country.flag"/>
        <button v-if="!country.visited" v-on:click="updateList(country)">Visit!</button></li>
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
//   eventBus.$on('visit-updated', (updateCountry) => {
//   this.bucketList.push(updateCountry)
//   });
// },

  methods: {
    updateList(country){
    const updatedItem = {
      // name: country.name,
      // flag: country.flag,
      visited: true
    }
    console.log(updatedItem);
    BucketService.updateList(country._id, updatedItem)
    .then(updatedCountry => eventBus.$emit('country-updated', updatedCountry))
  }
  }
}
</script>

<style lang="css" scoped>

.visited {
  color: green;
}

.not-visited {
  color: red;
}
</style>
