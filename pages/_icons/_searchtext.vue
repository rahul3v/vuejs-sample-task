<template>
  <div>
    <NavBar :search="searchtext" :stype="stype" :stext="stext" />
    <main>
      <SubHeader :totalicons="totalIcons" :search="searchtext" :stext="stext" />
      <!--p>Path: {{ $route.path }}</p-->
      <MainContainer
        :settotal="setTotalIcons"
        :stype="stype"
        :search="searchtext"
      />
      <Footer />
    </main>
  </div>
</template>


<script>
export default {
  scrollToTop: true,
  asyncData({ params, redirect }) {
    const searchtext = params.searchtext
    const stype = params.icons
    const searchOptions = {
      icons: 'Icons',
      illustrations: 'Illustrations',
      '3ds': '3D Graphics',
      lotties: 'Lottie Animations',
    }
    if (Object.keys(searchOptions).includes(stype)) {
      return { searchtext, stype, stext: searchOptions[stype] }
    } else {
      redirect('/')
    }
  },
  data() {
    return {
      totalIcons: 0,
      title: 'IconScout'
    }
  },
  head(){
    return {
      titleTemplate: `${this.searchtext} (${this.stype}) - ${this.title}`
    }
  },
  methods: {
    setTotalIcons(value) {
      this.totalIcons = value
    },
  },
}
</script>

<style>
h1 {
  font-weight: 700;
}
.subHeader {
  color: #596080 !important;
  background: #fafafc;
  padding-top: 2.5rem !important;
}
main {
  background: white;
}

.iconContainer > :first-child,
.filterMenu > :first-child {
  background: #fafafc;
}

.subHeader,
.footerContainer {
  padding: 1rem 2rem;
}

.fiterOption {
  padding-left: 2rem;
}
.iconBoxContainer {
  padding-right: 2rem;
}
img,
svg {
  display: inline-block;
}
:root {
  --color: #6563ff;
}
body {
  user-select: none;
}
</style>