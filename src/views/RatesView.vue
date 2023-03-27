<template>
  <main class="main-content">
    <q-page-container class="container">
      <div class="info-order rate-table">
        <div class="btn-container">
          <q-btn
              class="add-btn"
              label="Добавить рейтинг города"
              unelevated
              color="primary"
              @click="addRateModal = true"
          />
        </div>
        <q-dialog persistent v-model="addRateModal">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-h6">Добавить рейтинг города</div>
            </q-card-section>

            <q-card-section class="q-pt-none add-modal">
              <q-select
                  use-input c
                  learable
                  filled
                  :options="cityArray"
                  option-label="name"
                  option-value="pk"
                  label="Город"
                  :loading="cityLoading"
                  @virtual-scroll="onScrollCity"
                  emit-value
                  map-options
              />
              <q-checkbox v-model="newRate.direction" label="Из этого города?" autofocus/>
              <q-input filled v-model="newRate.rate" label="Рейтинг" autofocus/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Отмена" v-close-popup/>
              <q-btn flat @click="addRate" label="Добавить" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog persistent v-model="editRateModal">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-h6">Обновить рейтинг</div>
            </q-card-section>

            <q-card-section class="q-pt-none add-modal">
              <q-select
                  use-input c
                  learable
                  filled
                  v-model="editRate.citys"
                  :options="cityArray"
                  option-label="name"
                  option-value="pk"
                  label="Город"
                  :loading="cityLoading"
                  @virtual-scroll="onScrollCity"
                  emit-value
              />
              <q-checkbox v-model="editRate.direction" label="из этого города"/>
              <q-input filled v-model="editRate.rate" label="Рейтинг" autofocus/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Отмена" v-close-popup/>
              <q-btn flat @click="updateRate" label="Обновить" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-table
            :columns="columns"
            :rows="results"
            row-key="name"
            :hide-bottom="true"
            virtual-scroll
            @virtual-scroll="onScroll"
            style="height: 60vh; min-height: 275px"
            class="no-link"
        >
          <template v-slot:body="props">
            <q-tr :props="props" @click="editRateModal = true; editRate = props.row">
              <q-td key="id" :props="props">{{ props.row.pk }}</q-td>
              <q-td key="id" :props="props">{{ props.row.citys }}</q-td>
              <q-td key="id" :props="props">{{ props.row.directions }}</q-td>
              <q-td key="id" :props="props">{{ props.row.rate }}</q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </q-page-container>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "RatesViews",
  data() {
    return {
      editRateModal: false,
      addRateModal: false,
      editRate: {},
      newRate: {
        city: 9,
        direction: false,
        rate: ''
      },
      columns: [
        {name: 'id', required: true, label: 'id', align: 'left', field: row => row.name, sortable: true},
        {name: 'city', align: 'left', label: 'Город', field: row => row.name, sortable: true},
        {name: 'in_city', align: 'left', label: 'Из этого города'},
        {name: 'rate', align: 'left', label: 'Рейтинг', field: row => row.name, sortable: true},
      ],
      results: [],
      cityArray: [],
      cityLoading: true,
      data_settings_city: {}
    }
  },
  created() {
    this.getRateData()
    this.getCityData()
  },
  methods: {
    getRateData(url = '/api/rate/', update = false) {
      axios.get(url).then(r => {
        if (update) {
          this.results = this.results.concat(r)
        } else {
          this.results = r.data
        }
      })
    },
    getCityData(url = '/api/cities/', update = false) {
      axios.get(url)
          .then(response => {
            const tmp_result = response.data.results
            this.data_settings_city = response.data

            if (update) {
              this.cityArray = this.cityArray.concat(tmp_result)
            } else {
              this.cityArray = tmp_result
            }

            this.cityLoading = false
          })
    },
    updateRate() {
      axios.patch(`/api/rate/${this.editRate.id}/`, this.editRate).then(response => {
        console.log(response.data)
      })
    },
    addRate() {
      const vm = this
      axios.post('/api/rate/', vm.newRate).then(response => {
        console.log(response)
      })
    },
    onScrollCity(to) {
      const vm = this
      const lastIndex = vm.cityArray.length - 1
      if (to.index === lastIndex) {
        this.$nextTick(() => {
          setTimeout(function () {
            vm.getCityData(vm.data_settings_city.next, true)
          }, 500)
        })
      }
    },
  }
}
</script>

<style scoped lang="sass">
.btn-container
  margin: 20px 0

.add-btn
  padding: 12px 18px
  border-radius: 4px
</style>
