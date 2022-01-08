<template>
  <div class="w-full bg-white rounded-xl shadow-lg justify-center"
       :class="{'h-20' : selectedType !== undefined, 'h-32' : selectedType === undefined}" v-if="chart.chartOptions.labels.length">
    <apexchart
        :width="selectedType === undefined ? 290 : 240"
        :options="chart.chartOptions"
        :series="chart.series"
    ></apexchart>

<!--    <bar-chart :data="chartData" />-->
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts"; // doesn't work properly
import Axios from "../../../config/axios";
// import { GChart } from 'vue-google-charts' // no support for Vue 3 yet, check later

// import '@toast-ui/chart/dist/toastui-chart.min.css';
// import { barChart } from '@toast-ui/vue-chart';

export default {
  name: "DashboardTotalAssetCard",
  components: {
    // 'bar-chart': barChart,
    apexchart: VueApexCharts,
  },
  props: {
    type: String,
    default: null
  },
  data() {
    return {
      chartDataLoaded: false,
      chart: {
        series: [],
        chartOptions: {
          legend: {
            //     show: true,
            //     showForSingleSeries: true,
            //     showForNullSeries: true,
            //     showForZeroSeries: true,
            //     position: 'right', // bottom, top, left, right
            horizontalAlign: 'center',
            fontSize: '10px',
            fontWeight: '800',
            formatter: function(seriesName, opts) {
              return [seriesName, " - ", "$"+opts.w.globals.series[opts.seriesIndex].toLocaleString()]
            },
            labels: {
              // colors: this.type === undefined ? "#fff" : "#000",
            }
          },
          dataLabels: {
            enabled: false,
          },
          chart: {
            type: 'pie',
          },
          labels: [],
          responsive: [{
            // breakpoint: 480,
            // options: {
              // chart: {
              //   width: 100
              // },
              legend: {
              //   position: 'bottom'
                fontWeight: '800',
                labels: {
                  colors: this.type === undefined ? "#000" : "#fff",
                }
              }
            // }
          }]
        },
        // options: { // DUMMY CHART DATA
        //   dataLabels: {
        //     enabled: false,
        //   },
        //   legend: {
        // //     show: true,
        // //     showForSingleSeries: true,
        // //     showForNullSeries: true,
        // //     showForZeroSeries: true,
        //     position: 'right', // bottom, top, left, right
        //     horizontalAlign: 'center',
        // //     floating: false,
        //     fontSize: '8px',
        // //     // fontFamily: 'Helvetica, Arial',
        // //     // fontWeight: 400,
        //     formatter: function(seriesName, opts) {
        //       return [seriesName, " - ", "$"+opts.w.globals.series[opts.seriesIndex]]
        //     },
        // //     // inverseOrder: false,
        // //     width: '200',
        // //     height: '200',
        // //     // tooltipHoverFormatter: undefined,
        // //     // customLegendItems: [],
        // //     // offsetX: 0,
        // //     // offsetY: 0,
        // //     labels: {
        // //       colors: "#fff",
        // //     //   useSeriesColors: false
        // //     },
        // //     // markers: {
        // //     //   width: 12,
        // //     //   height: 12,
        // //     //   strokeWidth: 0,
        // //     //   strokeColor: '#fff',
        // //     //   fillColors: undefined,
        // //     //   radius: 12,
        // //     //   customHTML: undefined,
        // //     //   onClick: undefined,
        // //     //   offsetX: 0,
        // //     //   offsetY: 0
        // //     // },
        //     itemMargin: {
        //       horizontal: 0,
        //       vertical: 0
        //     },
        // //     // onItemClick: {
        // //     //   toggleDataSeries: true
        // //     // },
        // //     // onItemHover: {
        // //     //   highlightDataSeries: true
        // //     // },
        //   }
        // },
        // series: []
      },
      chartData: null,
      selectedType: this.type,
    }
  },

  watch: {
    type: function(val) {
      this.selectedType = val;

      this.renderData();
    }
  },

  mounted() {
    this.renderData();
  },

  methods: {
    async renderData() {
      await this.getEarningsSummary();
      this.populateChartData();
    },

    populateChartData() {
      this.chart.chartOptions.labels = [];
      this.chart.chartOptions.labels = Object.values(this.chartData.map(dat => dat['name']));
      this.chart.series = Object.values(this.chartData.map(dat => parseFloat(dat['current_value'])));

      console.log('dat', this.chart.chartOptions.labels);
      console.log('dat', this.chart.series);
    },

    async getEarningsSummary() {
      const assetType = this.selectedType !== undefined ? "/" + this.selectedType : "";
      await Axios.get("/assets/report/earnings-summary" + assetType)
          .then(resp => {
            this.chartData = resp.data.data;
          })
          .catch(err => console.log(err))
      // .finally(() => this.hideLoader())x
    }
  }
}
</script>

<style scoped>

</style>