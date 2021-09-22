<template>
  <b-navbar toggleable="lg" variant="info" sticky class="navbar">
    <div style="display:flex;flex-wrap:wrap;gap:5px;flex-grow: 1;align-items: center;">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">
        <NuxtLink to="/">
        <img
          src="/iscout.svg"
          class="d-inline-block align-top"
          alt="iconscout"
        /></NuxtLink>
      </b-navbar-brand>
      <b-nav-form
          ref="el"
          style="
            --bcolor: #e6e6e6;
            border: 1px solid var(--bcolor,#ced4da);
            border-radius: 0.25rem;
            background-color: #fafafc;
            position: relative;
            width: auto !important;
            flex-grow: 1;
          "
          @submit.prevent="handleSubmit"
          @focusin="clicked = true"
        >
          <b-input-group >
            <div>
              <span style="padding: 0 10px">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA1UlEQVQ4jdWTMQ6CQBBFX0FpsaXHoLCgJJEjcQBvsIUlB7DkCMRYGmPpASwtLSwooOATSURmt+Qnmwns37eTmVlYq1KgAu7AR7ECslhQApSCdDOrBQ7yBamcHPTADnCKXv87QU2lyqwF8j+eQvut/IuqdLs3fF6+owVsZNwbvkK+xgKOjXCGz8n3toDnyAxvFjC2hicLmPHtYL6Q3Tg6ZpdhmK+QOXwCmxBgIuh4cG69FC+hUPh9yw+GmqXAVt/RUOvCWtCawHpammZqDnkM9MpQmpWoBwOHUExZJ+wIAAAAAElFTkSuQmCC"/>
              </span>
            </div>
            <div style="flex-grow: 1">
              <b-form-input
                type="text"
                :value="searchvalue"
                @input="searchInput"
                @focusin="searchResult = true"
              ></b-form-input>
              {{inputVlaue}}
            </div>
            <template v-if="clicked" #append>
              <b-dropdown id="dropdown-1" ref='dbtn' right :text="dropSelected.text">
                <b-dropdown-item v-for="(option,i) in options" :key="i" @click="dropSelected=option,searchInput(searchvalue)">{{option.text}}</b-dropdown-item>
              </b-dropdown>
            </template>
          </b-input-group>
          <div :class="'search-results' + (searchResult ? ' active' : '')" @click="searchResult=!searchResult">
            <template v-if="searchResults !== null">
              <NuxtLink
                v-for="(links,i) in searchResults"
                :key="i"
                :to="`/${dropSelected.value}/${links.name.toLowerCase()}`"
                class="link searchlink"
              >
                {{links.name}}
              </NuxtLink>
              <div v-if="searchResults.length===0" style="padding:10px 20px">No result found</div>
          </template>
          </div>
        </b-nav-form>
    </div>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Explore</b-nav-item>
        <b-nav-item href="#">Tools</b-nav-item>
        <b-nav-item href="#">Resources</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#"> Pricing</b-nav-item>
        <b-nav-item href="#"> Log In</b-nav-item>
        <b-nav-item href="#" class='navbtn'> Sign Up</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['search','stype','stext'],
  data(){ 
    return {
      clicked: false,
      outside: false,
      searchvalue:this.search || 'home',
      searchResult: false,
      searchResults: null,
      dropSelected: { 
        value: this.stype || 'icons', 
        text: this.stext || 'Icons' },
      options: [
        { value: 'icons', text: 'Icons' },
        { value: 'illustrations', text: 'Illustration'},
        { value: '3ds', text: '3D Graphics'},
        { value: 'lotties', text: 'Lottie Animations'},
      ],
    }
  },
  computed:{
    // eslint-disable-next-line object-shorthand
    inputVlaue : function(){
      localStorage.setItem('searchInput',this.searchvalue)
      localStorage.setItem('searchType',this.dropSelected.value)
      return ''
    }
  },
  mounted(){
    window.addEventListener('click',this.clickOutside,false)
  },
  methods: {
    handleSubmit(){
      // console.log('Submitted',this.searchvalue)
    },
    async searchInput(value) {
      /*  https://api.iconscout.com/v3/search   */
      if(!value)return
      this.searchvalue = value
      const url = `https://api.iconscout.com/v3/search?query=${this.searchvalue}&&asset=${this.dropSelected.value.slice(0,-1)}&per_page=${8}&page=${1}`
      const options = {
        "method": "GET",
        "headers":{
          "accept": "application/json",
          "Cache-Control": "no-cache",
          "Client-ID": "198175844506907"
        }
      }
      const data = await fetch(url,options).then((res) =>
        res.json()
      ).catch(e=>{})

      if(data && data.response){
        this.searchResults = data.response.items.data
      } else {
        this.searchResults = null
      }
    },
    clickOutside(e){
      if(!this.clicked) return
      const el = this.$refs.el
      if (el && !(el === e.target || el.contains(e.target))) {
        this.clicked = false
        this.searchResult = false
      }
    }
  }
}
</script>

<style>
.navbar {
  background-color: white !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 8px 12px rgba(0, 0, 0, 0.04);
  padding: 1rem 1.5rem;
  gap: 10px
}

button {
  border-radius: 25px;
  background-color: white !important;
  border: 1px solid blue;
  color: black;
}
.input-group > div {
  display: flex;
  align-items: center;
}
.input-group > div > input,
.form-inline,
.input-group {
  width: 100% !important;
}
.search-results {
  position: absolute;
  top: 102%;
  width: 100%;
  background-color: white !important;
  box-shadow: 0px 4px 4px #00000021;
  border-radius: 0 0 5px 5px;
  max-height: 45vh;
  overflow: auto;
  display: none;
}
.search-results.active {
  display: block;
}

.dropdown {
  border: none;
}
.searchlink {
	display: block;
	padding: 5px 15px !important;
}
.searchlink:hover{
  background-color:#f1f1f2;
}

.form-control{
  border-width: 0 0 0 1px;
  border-radius:0;
  border-color:var(--bcolor) !important;
  background-color:transparent;
  box-shadow: none !important;
}

.dropdown-toggle{
	box-shadow: none !important;
	border: 1px solid transparent !important;
	border-left-color:var(--bcolor) !important;
}
.navbar-toggler{
  border:none !important;
  padding-left: 0 !important;
}
.navbtn > .nav-link {
  color:var(--color) !important
}
.navbtn > .nav-link:hover{
  color:black !important
}
.input-group{
  flex-wrap: nowrap !important  ;
}
</style>