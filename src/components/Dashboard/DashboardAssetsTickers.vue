<template>
  <div class="justify-center h-full">
    <vueper-slides class="no-shadow"
                   autoplay
                   fixed-height="50px"
                   :bullets="false"
                   :arrows="false"
                   :duration="7000"
                   transition-speed="1500"
                   :visible-slides="isMobile ? 2 :4"
                   :gap="1">
      <vueper-slide
          v-for="(asset, index) in assets" :key="index">
        <template #content>
            <div class="p-2 bg-white rounded-sm shadow-sm">
                <div class="grid grid-cols-5">
                  <div>
                    <!-- replace with icon from db -->
                    <svg v-if="asset.icon" class="float-left mr-2" width="30" height="31" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect y="0.5" width="50" height="50" rx="10" fill="#1565D8" fill-opacity="0.1"/>
                      <path d="M16.1251 32.375H34.2505C34.2505 33.4105 33.4111 34.25 32.3755 34.25H15.5001C14.1193 34.25 13 33.1306 13 31.75V21.125C13 20.0895 13.8395 19.25 14.8751 19.25V31.125C14.8751 31.8153 15.4347 32.375 16.1251 32.375ZM38 19.25V28C38 29.3807 36.8808 30.5 35.5 30.5H19.2501C17.8694 30.5 16.7501 29.3807 16.7501 28V19.25C16.7501 17.8692 17.8694 16.75 19.2501 16.75H35.5C36.8808 16.75 38 17.8692 38 19.25ZM36.125 19.25C36.125 18.9054 35.8446 18.625 35.5 18.625H19.2501C18.9055 18.625 18.6251 18.9054 18.6251 19.25V28C18.6251 28.3446 18.9055 28.625 19.2501 28.625H35.5C35.8446 28.625 36.125 28.3446 36.125 28V19.25ZM27.3748 19.875C25.6488 19.875 24.2497 21.5539 24.2497 23.625C24.2497 25.6961 25.6488 27.375 27.3748 27.375C29.1007 27.375 30.4998 25.6961 30.4998 23.625C30.4998 21.5539 29.1007 19.875 27.3748 19.875Z" fill="#1565D8"/>
                    </svg>
                    <span class="float-left mr-2" v-else>
                      <img src="/images/money-bag.png" style="width:32px" />
                    </span>
                  </div>

                  <div class="col-span-4">
                    <div class="flow-root">
                      <div class="float-left text-xs text-left">
                        <span class="font-bold mr-1">{{ asset.name }}</span>
                        <span>{{ asset.symbol }}</span>
                      </div>

                      <div class="float-right text-right font-bold text-sm">${{ parseFloat(asset.current_value).toFixed(1).toLocaleString() }}</div>
                    </div>

                    <div>
                      <p class="text-xs text-left float-left">{{ parseFloat(asset.qty).toLocaleString() }}</p>

                      <div>
                        <p class="text-xs mx-0 text-right">
                          ${{ percChangeValue(asset.current_value, asset.percent_change) }}
                          <svg v-if="asset.percent_change > 0" class="inline-block align-middle" width="8" height="6" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.00004 0.5L12 8.5H0L6.00004 0.5Z" fill="#48BB78"/>
                          </svg>
                          <svg v-else class="inline-block align-middle" width="8" height="6" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.99996 8.5L-6.99382e-07 0.500001L12 0.5L5.99996 8.5Z" fill="#FF2D2E"/>
                          </svg> <span :class="{'text-red-600': asset.percent_change < 0, 'text-green-600': asset.percent_change > 0}">{{ parseFloat(asset.percent_change).toFixed(1) }}%</span>
                        </p>
                      </div>
                  </div>
                  </div>
                </div>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

const PERCENT = 100;
const DEAULT_MOBILE_SCREE_WIDTH = 600;
export default {
  name: "DashboardAssetsTickers",
  components: { VueperSlides, VueperSlide},
  props: {
    assets: Array,
    defaultIcon: Array,
  },
  data() {
    return {
      isMobile: false,
    }
  },

  created() {
    this.isMobile = window.screen.availWidth < DEAULT_MOBILE_SCREE_WIDTH;
  },

  methods: {
    percChangeValue(value, change) {
      return parseFloat((value / PERCENT) * change).toFixed(1);
    },
  }
}
</script>

<style scoped>

</style>