<template>
  <div class="subHeader">
    <h1 style='color:black'>{{totalicons}} {{capatalize(search)}}, {{capatalize(stext)}}</h1>
    <p>
      This home icon is in Glyph icon style. This icon is available on Iconscout
      web as well as accessible from Iconscout plugin for Sketch app, Adobe
      Illustrator, Adobe Photoshop, Adobe XD, Google Docs,{{vewMore?` Google slide,
      Microsoft Word and PowerPoint. Download this royalty free icon and use it
      in personal or commercial purpose.`:'.....'}}
      <span class='showbtn' @click="vewMore=!vewMore">show {{vewMore?'less':'more'}}</span>
    </p>
    <p>
      <b>Related Searches : </b>
      <NuxtLink 
        v-for="links in ['House','Building','Man','Estate','Property','Male','Happy','Interior','Work','Food']"
        :key="links"
        :to="'/icons/' + links.toLowerCase()"
        class="link inline"
      >
        {{ links }} Icons
      </NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/require-prop-types
    props:['totalicons','search','stext'],
    data(){
      return {
        vewMore:false

      }
    },
    methods:{
      capatalize(val){
          return val && val[0].toUpperCase() + val.substr(1)
      }
    }
}
</script>

<style>
.link {
  padding: 0 5px;
  text-decoration: none !important;
  color: inherit;
}
.link.inline {
  padding: 0;
}
.link.inline:not(:first-of-type)::before {
  content: ', ';
}
.link:hover {
  color: black;
}
.showbtn{
  font-size:12px;
  cursor: pointer;
  color:var(--color);
}
.showbtn:hover{
  color:black;
}
</style>