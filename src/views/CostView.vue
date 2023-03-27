<template>
  <main class="main-content">
    <q-page-container class="container">
      <div class="info-order cost-table">
        <div class="btn-container">
          <q-btn
              class="add-btn"
              label="Добавить город"
              unelevated
              color="primary"
              @click="addCityModal = true"
          />
          <q-btn
              class="add-btn"
              label="Добавить стоимость перевозки"
              unelevated
              color="primary"
              @click="addPriceModal = true"
          />
        </div>
        <q-dialog persistent v-model="addCityModal">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-h6">Добавить город</div>
            </q-card-section>

            <q-card-section class="q-pt-none add-modal">
              <q-input filled v-model="newCity" label="Город" autofocus/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Отмена" v-close-popup/>
              <q-btn flat @click="addCity" label="Добавить" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog persistent v-model="addPriceModal">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-h6">Добавить стоимость перевозки</div>
            </q-card-section>

            <q-card-section class="q-pt-none add-modal">
              <q-select
                  use-input c
                  learable
                  filled
                  v-model="newCost.direction_from"
                  :options="cityArray"
                  option-label="name"
                  option-value="pk"
                  label="Город отправления"
                  :loading="cityLoading"
                  @virtual-scroll="onScrollCity"
                  emit-value
                  map-options
              />
              <q-select
                  use-input c
                  learable
                  filled
                  v-model="newCost.direction_to"
                  :options="cityArray"
                  option-label="name"
                  option-value="pk"
                  label="Город прибытия"
                  :loading="cityLoading"
                  @virtual-scroll="onScrollCity"
                  emit-value
                  map-options
              />
              <q-input filled v-model="newCost.sedan" label="Сенад" autofocus/>
              <q-input filled v-model="newCost.crossover" label="Кроссовер" autofocus/>
              <q-input filled v-model="newCost.jeep" label="Джип" autofocus/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Отмена" v-close-popup/>
              <q-btn flat @click="addPrice" label="Добавить" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog persistent v-model="editPriceModal">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Редактировать стоимость</div>
          </q-card-section>

          <q-card-section class="q-pt-none add-modal">
            <q-input filled v-model="editCost.sedan" label="Сенад" autofocus/>
            <q-input filled v-model="editCost.crossover" label="Кроссовер" autofocus/>
            <q-input filled v-model="editCost.jeep" label="Джип" autofocus/>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Отмена" v-close-popup/>
            <q-btn flat @click="updatePrice" label="Обновить" v-close-popup/>
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
            <q-tr :props="props" @click="editPriceModal= true;editCost = props.row">
              <q-td key="id" :props="props">{{ props.row.pk }}</q-td>
              <q-td key="direction" :props="props">{{ props.row.from_to }}</q-td>
              <q-td key="sedan" :props="props">{{ props.row.sedan }}₽</q-td>
              <q-td key="crossover" :props="props">{{ props.row.crossover }}₽</q-td>
              <q-td key="jeep" :props="props">{{ props.row.jeep }}₽</q-td>
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
  name: "CostView",
  data() {
    return {
      addCityModal: false,
      addPriceModal: false,
      editPriceModal: false,
      editCost: {},
      newCost: {
        crossover: '',
        direction_from: '',
        direction_to: '',
        jeep: '',
        sedan: ''
      },
      newCity: '',
      columns: [
        {name: 'id', required: true, label: 'id', align: 'left', field: row => row.name, sortable: true},
        {name: 'direction', align: 'left', label: 'Направление', field: row => row.name, sortable: true},
        {name: 'sedan', align: 'left', label: 'Седан', field: row => row.name, sortable: true},
        {name: 'crossover', align: 'left', label: 'Кроссовер', field: row => row.name, sortable: true},
        {name: 'jeep', align: 'left', label: 'Джип', field: row => row.name, sortable: true},
      ],
      results: [],
      cityArray: [],
      cityLoading: true,
      data_settings_city: {},
      data_settings_cost: {},
    }
  },
  created() {
    this.getPriceData()
    this.getCityData()
  },
  methods: {
    getPriceData(url = '/api/city-price/', update = false) {
      axios.get(url).then(response => {
        const tmp_result = response.data.results
        this.data_settings_cost = response.data

        if (update) {
          this.results = this.results.concat(tmp_result)
        } else {
          this.results = tmp_result
        }
      })
    },
    getCityData(url = '/api/cities/', update = false) {
      axios.get(url)
          .then(response => {
            const tmp_result = response.data.results
            this.data_settings_city = response.data
            console.log(tmp_result)
            if (update) {
              this.cityArray = this.cityArray.concat(tmp_result)
            } else {
              this.cityArray = tmp_result
            }

            this.cityLoading = false
          })
    },
    updatePrice() {
      axios.patch(`/api/city-price/${this.editCost.pk}/`, this.editCost).then(() => {
        this.getPriceData()
      })
    },
    addPrice(){
      axios.post(`/api/city-price/`, this.newCost).then(() => {
       this.getPriceData()
      })
    },
    addCity() {
      const vm = this
      axios.post('/api/cities/', {name: vm.newCity}).then(response => {
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
  display: flex
  gap: 20px

.add-btn
  padding: 12px 18px
  border-radius: 4px
</style>
