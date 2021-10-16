<template>
  <div class="w-full bg-white rounded-xl shadow-lg justify-center h-32" v-if="chartData && chartData.length">
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

export default {
  name: "DashboardTotalAssetCard",
  components: {apexchart: VueApexCharts},
  props: {
    chartData: Array
  },
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

  mounted() {
    this.populateChartData();
  },

  methods: {
    populateChartData() {
      this.chart.options.labels = Object.values(this.chartData.map(dat => dat['name']));
      this.chart.series = Object.values(this.chartData.map(dat => parseFloat(dat['current_value'])));
    }
  }
}
</script>

<style scoped>

</style>