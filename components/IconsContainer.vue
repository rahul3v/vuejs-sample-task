<template>
  <div class="iconContainer">
    <div class="fiterOption d-md-block d-none" style="position: sticky;top: 70px;background-color: #fafafc;z-index: 1;">
      <span style="display:none">{{fquery}}  {{runFetch()}}</span>
      <div class="fiterbtn" style="font-size: 14px;">
        <span class="ficon">
          <NuxtLink
            v-for="links in ['Icon','Illustration','3D Graphic','Lottie Animation']"
            :key="links"
            :to="'/'+links.split(' ')[0].toLowerCase() + `s/${searchData()}`"
            class="link blue"
          >
            {{links+'s'}}
          </NuxtLink>
        </span>
        <span class="ficon" style="justify-content: flex-end;">
          <span style="padding: 2px" class="d-none d-lg-inline-block">
            View as
            <b-form-select v-model="selected" :options="options"></b-form-select>
          </span>
          <span style="padding: 2px">
            <span class="d-none d-lg-inline-block">Sort by</span>
            <b-form-select v-model="sortselected" :options="sortoptions"></b-form-select>
          </span>
          <!--span ref="refreshbtn" style="padding: 1.5px;cursor:pointer" class="ibtn" title="Refresh" @click="$fetch">
            <svg viewBox="0 0 16 16" width="18" height="18" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <g><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"></path>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"></path>
              </g>
            </svg>
          </span-->
        </span>
      </div>
    </div>
    <div class="iconBoxContainer">
      <div v-if="icons.length>0" class="iconBox">
        <IconLayout v-for="(icon,i) in icons"
          :key="i"
          :src="icon.urls && (icon.urls.png_128 || icon.urls.thumb)"
          :text="icon.name"
          :stype="stype"
        />
      </div>
      <div v-if="$fetchState.pending">Fetching Icons...</div>
      <div v-else-if="$fetchState.error"><b>Error : </b>{{$fetchState.error.message}} :(
        <span style="padding: 1.5px;cursor:pointer" class="ibtn" title="Refresh" @click="$fetch">try again</span>
      </div>
      <div v-else-if="icons.length===0">No data found, try diffrent search</div>
      <div ref='lasticon'></div>
      <button v-if="!$fetchState.error && !last_page && !$fetchState.pending"
        type="button"
        class="btn btn-default btn-block"
        style="border: 1px solid #c8c8c8; margin: 20px 0"
        @click="$fetch"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props:['fquery','settotal','stype'],
  data() {
    return {
      icons: [],
      selected: 'individuals',
      options: [
        { value: 'individuals', text: 'Individuals' },
        { value: 'packs', text: 'Packs'},
      ],
      sortselected: 'relevant',
      sortoptions: [
        { value: 'relevant', text: 'Relevant' },
        { value: 'popular', text: 'Popular'},
        { value: 'latest', text: 'Latest'},
      ],
      page:1,
      per_page:20,
      last_page:false,
      intersect:null,
      last_filter : null
    }
  },
  async fetch() {
    const filter=`product_type=${this.selected}&sort=${this.sortselected}&${this.fquery}`

    const url = `https://api.iconscout.com/v3/search?${filter}&per_page=${this.per_page}&page=${this.page}`
    const options = {
      "method": "GET",
      "headers":{
        "accept": "application/json",
        "Cache-Control": "no-cache",
        "Client-ID": "198175844506907"
      }
    }
    // console.log(url)
    const data = await fetch(url,options).then((res) =>
      res.json()
    )
    if(data.response){
      if(this.last_filter === filter){
        this.icons = [...this.icons,...data.response.items.data]
        this.page = this.page+1
      } else {
        this.icons = data.response.items.data || []
        this.page = 2
      }
    }
  
    // console.log('this.last_url === url',this.last_filter,filter,this.last_filter===filter, this.icons,data.response.items.data)
    this.last_filter = filter
    if(data.response.items.last_page && data.response.items.last_page===data.response.items.current_page){
      this.last_page = true
    }
    this.settotal(data.response.items.total|| '0')
    
    if(this.intersect === true && !this.last_page){
      this.$fetch()
    }
  },
  mounted(){
    this.scrollInfinite()
  },
  methods:{
    runFetch(){
      const sortby = `type=${this.selected}&sortby=${this.sortselected}`
      localStorage.setItem('sortby',sortby)
      this.$fetch()  
    },
    searchData(){
      return localStorage.getItem('searchInput')
    },
    scrollInfinite(){
      const observer = new IntersectionObserver(entries=>{
        if(entries[0].isIntersecting && !this.last_page){
          this.$fetch()
          this.intersect = true
        } else if(this.intersect !==null){
          this.intersect = false
        }
      })
      observer.observe(this.$refs.lasticon)
    }
  }
}
</script>

<style>
.link.blue {
  color:var(--color);
}
.iconContainer {
  flex-grow: 1;
}
.iconBoxContainer {
  border-left: 1px solid #ebedf5;
  min-height: 130vmin;
  background: white;
  padding: 20px;
}
.iconBox {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
.ficon{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.btn-secondary {
  color: black !important;
}
.custom-select{
  width: 100px;
  font-size: 12px;
  font-weight: 700;
  border: medium none;
  padding-top: 0px;
  padding-bottom: 0px;
  height: auto;
  padding-bottom: 0px;
  padding-left:2px;
  padding-top: 0;
  box-shadow: none !important;
  vertical-align: baseline;
  background-color:transparent;
}
</style>
