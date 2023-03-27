<template>
  <main class="main-content">
    <q-page-container class="container">
      <div class="page-title">Тестовая страница маршрутизации</div>
      <div id="map" style="width: 100%; height: 400px"></div>
    </q-page-container>
  </main>
</template>

<script>
export default {
  name: "TestLogisticView",
  data() {
    return {
      mapSettings: {
        apiKey: 'f69140e6-4f5f-4563-a7b4-d26cfe204ef4',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'
      },
      coords: [
        54.82896654088406,
        39.831893822753904,
      ],
    }
  },
  methods:{
    test(){
      console.log(1)
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/mainStyle.sass"

</style>
