<template>
  <div class="filterMenu d-md-block d-none">
    <div class="fiterOption">
      <div class="fiterbtn">
        <span class="">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAXklEQVRIiWNgGAU0BBUMDAy3obiB2oaXMDAw/EfDtcRoXI9FIz4cwMDAEIImtnpALSAWkB1EpACKI3lwphJCAD2SsUUiIUxSKqK6BTAwNFLJoHbAaFlEEIyMVDZMAADacY1Dv4GggAAAAABJRU5ErkJggg=="
            width="20"
          />
          <span>Filters</span>
        </span>
        <span>
          <span class='resetbtn ibtn' @click="reset">reset</span>
          <!--span class="ibtn" title='Close'>
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
              ></path>
            </svg>
          </span-->
        </span>
      </div>
    </div>

    <div class="filterOptions">
      <div
        v-for="(key, i) in Object.keys(filter)"
        :key="key"
        class="fiterOption"
      >
        <div v-b-toggle="'collapse-' + i" class="fiterbtn">
          {{ key }}
          <span>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="ui-svg-inline when-closed icon_oslyU"
            >
              <path
                d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
              ></path>
            </svg>
          </span>
        </div>
        <b-collapse :id="'collapse-' + i">
          <div class="filterOptionMenu">
             <template v-if="filter[key].type === 'radio'">
               <b-form-radio-group
                :id="'radio-group-'+key"
                v-model="filter[key].selected"
                :options="filter[key].options"
                :name="key"
                stacked
              ></b-form-radio-group>
             </template>
             <template v-else>
               <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group
                  :id="'checkbox-group-'+key"
                  v-model="filter[key].selected"
                  :options="filter[key].options"
                  :aria-describedby="ariaDescribedby"
                  :name="key"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
             </template>
            <!-- <div class="mt-3">
              Selected: <strong>{{ filter[key].selected }}</strong>
            </div> -->
          </div>
        </b-collapse>
      </div>
    </div>
    {{filterQuery}}
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props:['setfquery'],
  data() {
    return {
      filter: {
        Price: {
          type: 'radio',
          selected: '',
          default: '',
          options: [
            { text: 'Free', value: 'free' },
            { text: 'Premium', value: 'premium' },
            { text: 'All', value: '' },
          ],
        },
        Style: {
          type: 'checkbox',
          selected: [],
          default: [],
          options: [
            { text: 'Line', value: 'line' },
            { text: 'Colored Outline', value: 'coloredOutline' },
            { text: 'Glyph', value: 'glyph' },
            { text: 'Flat', value: 'flat' },
            { text: 'Gradient', value: 'gradient' },
            { text: 'Dualtone', value: 'dualtone' },
            { text: 'Isometric', value: 'isometric' },
            { text: 'Doodle', value: 'doodle' },
            { text: 'Rounded', value: 'rounded' },
            { text: 'Sticker', value: 'sticker' },
          ],
        },
        Formats: {
          type: 'checkbox',
          selected: [],
          default: [],
          options: [
            { text: 'SVG', value: 'svg' },
            { text: 'EPS', value: 'eps' },
            { text: 'AI', value: 'a1' }
          ],
        },
        // Color: {
        //   type: 'radio',
        //   selected:'black',
        //   default : 'black',
        //   options: [
        //     { text: 'red', value: 'red' },
        //     { text: 'black', value: 'black' },
        //     { text: 'blue', value: 'blue' },
        //     { text: 'yellow', value: 'yellow' },
        //     { text: 'green', value: 'green' },
        //     { text: 'aqua', value: 'aqua' },
        //     { text: 'teal', value: 'teal' },
        //   ],
        // },
        // Dimension: {
        //   type: 'radio',
        //   selected: '24x24',
        //   default: '24x24',
        //   options: [
        //     { text: '16x16', value: '16x16' },
        //     { text: '24x24', value: '24x24' },
        //     { text: '32x32', value: '32x32' },
        //     { text: '48x48', value: '48x48' },
        //     { text: '64x64', value: '64x64' },
        //     { text: '96x96', value: '96x96' },
        //     { text: '128x128', value: '128x128' },
        //     { text: '192x192', value: '192x192' },
        //     { text: '256x256', value: '256x256' },
        //     { text: '512x512', value: '512x512' },
        //   ],
        // },
        Period: {
          type: 'radio',
          selected: 'all',
          default: 'all',
          options: [
            { text: 'New', value: 'new' },
            { text: 'All', value: '' },
          ],
        },
      },
      selected: '',
    }
  },
  computed:{
    // eslint-disable-next-line object-shorthand
    filterQuery:function(){
      let filter = '';
      for (const key in this.filter){
        filter+=`${key.toLowerCase()}=${this.filter[key].selected}&`
      }
      filter=filter.slice(0,-1)
      this.setfquery(filter)
      // console.log('filter')

      localStorage.setItem('filter',filter)
      return ''
    }
  },
  methods:{
    reset(){
      for (const key in this.filter){
        this.filter[key].selected = this.filter[key].default
      }
    }
  }
}
</script>

<style>
.flex {
  display: flex;
  align-items: center;
}
.filterMenu {
  position: sticky;
  top: 70px;
  flex-direction: column;
  min-width:240px;
  height: calc(100vh - 70px);
  overflow: auto;
  scrollbar-width:thin;
}
.fiterbtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filterOptions {
  background: white;
}

.fiterOption {
  padding: 20px;
  border-bottom: 1px solid #ebedf5;
}
.filterOptionMenu {
  padding-top: 10px;
}
.resetbtn{
  font-size:12px;
  /* margin-right:15px; */
}

.ibtn {
  cursor: pointer;
  color:#9f9f9f;
}

.ibtn:hover{
  color:var(--color)
}

.ui-svg-inline{
  color:#9f9f9f;
}
.not-collapsed .ui-svg-inline{
  transform:rotate(-180deg);
}

</style>
