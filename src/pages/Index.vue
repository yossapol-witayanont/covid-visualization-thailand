<template>
  <q-page class="items-center justify-evenly">
    <div class="q-pa-md row items-start justify-evenly q-gutter-md">
      <q-card class="col-12 col-md">
        <q-card-section class="text-right text-white bg-red-5">
          <div class="text-subtitle2">{{ $t('cases') }}</div>
          <div class="text-h6">{{ summary ? summary.Confirmed.toLocaleString() : null }}</div>
          <div class="text-subtitle2">+ {{ summary ? summary.NewConfirmed.toLocaleString() : null }}</div>
        </q-card-section>
      </q-card>
      <q-card class="col-12 col-md">
        <q-card-section class="text-right text-white bg-green-5">
          <div class="text-subtitle2">{{ $t('recovered') }}</div>
          <div class="text-h6">{{ summary ? summary.Recovered.toLocaleString() : null }}</div>
          <div class="text-subtitle2">+ {{ summary ? summary.NewRecovered.toLocaleString() : null }}</div>
        </q-card-section>
      </q-card>
      <q-card class="col-12 col-md">
        <q-card-section class="text-right text-white bg-orange-5">
          <div class="text-subtitle2">{{ $t('hospitalized') }}</div>
          <div class="text-h6">{{ summary ? summary.Hospitalized.toLocaleString() : null }}</div>
          <div class="text-subtitle2">+ {{ summary ? summary.NewHospitalized.toLocaleString() : null }}</div>
        </q-card-section>
      </q-card>
      <q-card class="col-12 col-md">
        <q-card-section class="text-right text-white bg-brown-5">
          <div class="text-subtitle2">{{ $t('death') }}</div>
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
import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'
import { Summary, Daily } from 'components/models'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'PageIndex',
  components: { VueApexCharts },
  setup () {
    const summary = ref<Summary>()
    const daily = ref<Daily>()

    const dailyOptions = {
      xaxis: {
        categories: [] as Array<string | undefined>,
        tickAmount: 0 as number,
        labels: {
          rotate: 0 as number
        }
      }
    }

    const dailySeries = [
      {
        name: 'จำนวนผู้ติดเชื้อ',
        data: [] as Array<string>,
        color: '' as string
      },
      {
        name: 'ผู้ป่วยในโรงพยาบาล',
        data: [] as Array<string>,
        color: '' as string
      }
    ]
    return { summary, daily, dailyOptions, dailySeries }
  },
  mounted () {
    this.getSummary()
    this.getDaily()
  },
  methods: {
    async getSummary () {
      await axios
        .get('https://covid19.th-stat.com/api/open/today')
        .then(response => {
          this.summary = response.data as Summary
        })
    },
    async getDaily () {
      await axios
        .get('https://covid19.th-stat.com/api/open/timeline')
        .then(response => {
          this.daily = response.data as Daily
          if (this.daily) {
            const newConfirmed = this.daily.Data.map(item => item.NewConfirmed)
            const newRecovered = this.daily.Data.map(item => item.NewRecovered)
            const newHospitalized = this.daily.Data.map(item => item.NewHospitalized)
            const newDeaths = this.daily.Data.map(item => item.NewDeaths)
            const date = this.daily.Data.map(item => item.Date)
            const colorScheme = {
              red: '#ef5350',
              green: '#66bb6a',
              orange: '#ffa726',
              brown: '#8d6e63'
            }
            this.dailySeries = [
              {
                name: 'ผู้ติดเชื้อ',
                data: newConfirmed,
                color: colorScheme.red
              },
              {
                name: 'รักษาหายแล้ว',
                data: newRecovered,
                color: colorScheme.green
              },
              {
                name: 'ผู้ป่วยในโรงพยาบาล',
                data: newHospitalized,
                color: colorScheme.orange
              },
              {
                name: 'ผู้เสียชีวิต',
                data: newDeaths,
                color: colorScheme.brown
              }
            ]
            this.dailyOptions = {
              xaxis: {
                categories: date,
                tickAmount: 6,
                labels: {
                  rotate: 0
                }
              }
            }
          }
        })
    }
  }
})
</script>
