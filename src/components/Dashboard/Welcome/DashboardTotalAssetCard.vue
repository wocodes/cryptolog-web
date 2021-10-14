<template>
  <div class="w-full bg-white rounded-xl shadow-lg justify-center" v-if="chartDataLoaded">
    <apexchart
        width="250"
        type="pie"
        :options="chart.options"
        :series="chart.series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import Axios from "../../../../config/axios";

export default {
  name: "DashboardTotalAssetCard",
  components: {apexchart: VueApexCharts},
  data() {
    return {
      chartDataLoaded: false,
      chart: {
        options: { // DUMMY CHART DATA
          dataLabels: {
            enabled: false,
          },
          legend: {
        //     show: true,
        //     showForSingleSeries: true,
        //     showForNullSeries: true,
        //     showForZeroSeries: true,
            position: 'right', // bottom, top, left, right
            horizontalAlign: 'center',
        //     floating: false,
            fontSize: '8px',
        //     // fontFamily: 'Helvetica, Arial',
        //     // fontWeight: 400,
            formatter: function(seriesName, opts) {
              return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]]
            },
        //     // inverseOrder: false,
        //     width: '200',
        //     height: '200',
        //     // tooltipHoverFormatter: undefined,
        //     // customLegendItems: [],
        //     // offsetX: 0,
        //     // offsetY: 0,
        //     // labels: {
        //     //   colors: undefined,
        //     //   useSeriesColors: false
        //     // },
        //     // markers: {
        //     //   width: 12,
        //     //   height: 12,
        //     //   strokeWidth: 0,
        //     //   strokeColor: '#fff',
        //     //   fillColors: undefined,
        //     //   radius: 12,
        //     //   customHTML: undefined,
        //     //   onClick: undefined,
        //     //   offsetX: 0,
        //     //   offsetY: 0
        //     // },
            itemMargin: {
              horizontal: 0,
              vertical: 0
            },
        //     // onItemClick: {
        //     //   toggleDataSeries: true
        //     // },
        //     // onItemHover: {
        //     //   highlightDataSeries: true
        //     // },
          }
        },
        series: []
      },
    }
  },

  created() {
    this.getEarningsSummary();
  },

  methods: {
    getEarningsSummary() {
      Axios.get("/assets/report/earnings-summary")
          .then(resp => {
            this.chart.options.labels = Object.keys(resp.data.data);
            this.chart.series = Object.values(resp.data.data).map(item => item.value);

            this.chartDataLoaded = true;

          })
          .catch(err => console.log(err))
          .finally(() => this.hideLoader())
      }
    }
  }
</script>

<style scoped>

</style>