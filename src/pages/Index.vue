<template>
  <q-page class="items-center justify-evenly">
    <div class="q-pa-md row items-start justify-evenly q-gutter-md">
      <q-card class="col-12 col-md">
        <q-card-section class="text-right text-white bg-negative">
          <div class="text-subtitle2">ผู้ติดเชื้อรวม</div>
          <div class="text-h6">{{ summary ? summary.Confirmed.toLocaleString() : null }}</div>
          <div class="text-subtitle2">+ {{ summary ? summary.NewConfirmed.toLocaleString() : null }}</div>
        </q-card-section>
      </q-card>
      <q-card class="col-12 col-md">
        <q-card-section class="text-right text-white bg-positive">
          <div class="text-subtitle2">รักษาหายแล้ว</div>
          <div class="text-h6">{{ summary ? summary.Recovered.toLocaleString() : null }}</div>
          <div class="text-subtitle2">+ {{ summary ? summary.NewRecovered.toLocaleString() : null }}</div>
        </q-card-section>
      </q-card>
      <q-card class="col-12 col-md">
        <q-card-section class="text-right text-white bg-warning">
          <div class="text-subtitle2">ผู้ป่วยในโรงพยาบาล</div>
          <div class="text-h6">{{ summary ? summary.Hospitalized.toLocaleString() : null }}</div>
          <div class="text-subtitle2">+ {{ summary ? summary.NewHospitalized.toLocaleString() : null }}</div>
        </q-card-section>
      </q-card>
      <q-card class="col-12 col-md">
        <q-card-section class="text-right text-white bg-dark">
          <div class="text-subtitle2">ผู้เสียชีวิต</div>
          <div class="text-h6">{{ summary ? summary.Deaths.toLocaleString() : null }}</div>
          <div class="text-subtitle2">+ {{ summary ? summary.NewDeaths.toLocaleString() : null }}</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-px-md">
      <apexchart ref="dailyChart" class="col-12" width="100%" type="line" :options="dailyOptions" :series="dailySeries"></apexchart>
    </div>
  </q-page>
</template>

<script lang="ts">
import axios from "axios"
import VueApexCharts from 'vue-apexcharts'
import { Summary, Daily } from "components/models"
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'PageIndex',
  components: { VueApexCharts },
  setup () {
    const summary = ref<Summary>();
    const daily = ref<Daily>();

    const dailyOptions = {
      xaxis: {
        categories: [] as any
      }
    }

    const dailySeries = [
      {
        name: 'จำนวนผู้ติดเชื้อ',
        data: [] as any
      },
      {
        name: 'ผู้ป่วยในโรงพยาบาล',
        data: [] as any
      }
    ]
    return { summary, daily, dailyOptions, dailySeries }
  },
   mounted () {
    this.getSummary();
    this.getDaily();
  },
  methods: {
    async getSummary() {
      await axios
        .get('https://covid19.th-stat.com/api/open/today')
        .then(response => this.summary = response.data);
    },
    async getDaily() {
      await axios
        .get('https://covid19.th-stat.com/api/open/timeline')
        .then(response => { 
          this.daily = response.data
          if (this.daily) {
            let newConfirmed = this.daily.Data.map(item => item.NewConfirmed);
            let newRecovered = this.daily.Data.map(item => item.NewRecovered)
            let newHospitalized = this.daily.Data.map(item => item.NewHospitalized);
            let newDeaths = this.daily.Data.map(item => item.NewDeaths);
            let date = this.daily.Data.map(item => item.Date);
            console.log('date', date);
            this.$refs.dailyChart.updateSeries([
              {
                name: 'ผู้ติดเชื้อ',
                data: newConfirmed,
                color: '#C10015'
              },
              {
                name: 'รักษาหายแล้ว',
                data: newRecovered,
                color: '#21BA45'
              },
              {
                name: 'ผู้ป่วยในโรงพยาบาล',
                data: newHospitalized,
                color: '#F2C037'
              },
              {
                name: 'ผู้เสียชีวิต',
                data: newDeaths,
                color: '#1D1D1D'
              }
              
            ]);
            this.$refs.dailyChart.updateOptions({
              xaxis: {
                categories: date
              }
            });
          }
        });
    }
  }
})
</script>
