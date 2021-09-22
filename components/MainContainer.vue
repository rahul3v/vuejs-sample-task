<template>
  <div class="mainContainer">
    <FilterMenu :setfquery="setFilterQuery"/>
    <IconsContainer :fquery="filterQuery" :settotal="settotal" :stype="stype"/>
  </div>
</template>

<script>
export default{
  // eslint-disable-next-line vue/require-prop-types
  props:['settotal','stype','search'],
  data() { 
    return {
      filterQuery : `query=${this.search}&asset=${this.stype.slice(0,-1)}`
    }
  },
  methods:{
    setFilterQuery(value){
      this.filterQuery =`query=${this.search}&asset=${this.stype.slice(0,-1)}&${value}`
    }
  }
}
</script>

<style>
.mainContainer {
  display: flex;
}
a.nuxt-link-active {
  color: black !important;
}
</style>