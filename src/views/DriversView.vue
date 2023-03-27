<template>
  <main class="main-content">
    <q-page-container class="container">
      <q-dialog v-model="addDriverModal">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Добавить водителя</div>
          </q-card-section>
          <q-card-section class="q-pt-none add-modal">
            <q-input filled v-model="driver.name" :rules="[ val => !!val || 'Обязательное поле' ]" label="Имя"
                     autofocus/>
            <q-input filled v-model="driver.phone" mask="+7 (###) ###-##-##"
                     :rules="[ val => val.length >= 18 || 'Пожалуйста введите корректный номер телефона' ]"
                     label="Телефон" autofocus/>
            <q-input filled v-model="driver.info" label="Доп.инфо" autofocus/>
            <q-input filled v-model="driver.comment" label="Комментарий" autofocus/>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Отмена" v-close-popup/>
            <q-btn flat @click="addDriver" label="Добавить" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="info-order drivers-table">
        <div class="btn-container">
          <q-btn
              class="add-btn"
              label="Добавить водителя"
              unelevated
              color="primary"
              @click="addDriverModal = true"
          />
          <q-btn
              class="add-btn"
              label="Удалить выбранные"
              unelevated
              color="negative"
              @click="deleteDriver(selected)"
          />
        </div>
        <q-table
            :columns="columns"
            :rows="results"
            row-key="name"
            :hide-bottom="true"
            :pagination="initialPagination"
            selection="multiple"
            virtual-scroll
            style="height: 60vh; min-height: 275px"
            class="no-link"
            v-model:selected="selected"
            @virtual-scroll="onScroll"
        >
          <template v-slot:body="props">
            <q-tr>
              <q-td :props="props" key="checkbox">
                <q-checkbox v-model="props.selected"/>
              </q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
              <q-td key="info" :props="props">{{ props.row.info }}</q-td>
              <q-td key="comment" :props="props">{{ props.row.comment }}</q-td>
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
  name: "DriversView",
  data() {
    return {
      driver: {
        name: '',
        phone: '',
        info: '',
        comment: ''
      },
      addDriverModal: false,
      results: [],
      columns: [
        {name: 'checkbox', align: 'left'},
        {name: 'name', align: 'left', label: 'Имя', field: row => row.name, sortable: true},
        {name: 'phone', align: 'left', label: 'Телефон',},
        {name: 'info', align: 'left', label: 'Инфо',},
        {name: 'comment', align: 'left', label: 'Комментарий',},
      ],
      initialPagination: {
        rowsPerPage: 0
      },
      selected: [],
      val: false,
      data_settings: {}
    }
  },
  mounted() {
    const vm = this
    vm.getDrivers()
  },
  methods: {
    getDrivers(url = 'api/drivers', update = false) {
      const vm = this
      axios.get(url)
          .then(results => {
            const tmp_result = results.data.results
            vm.data_settings = results.data
            if (update) {
              this.results = this.results.concat(tmp_result)
            } else {
              vm.results = tmp_result
            }
          })
    },
    addDriver() {
      const vm = this
      axios.post('/api/drivers/', vm.driver).then(() => {
        vm.driver = {
          name: '',
          phone: '',
          info: '',
          comment: ''
        }
        vm.driver_form = false
        vm.getDrivers()
      })
    },
    deleteDriver(data) {
      const vm = this
      for (const item in data) {
        axios.delete('/api/drivers/' + data[item].id + '/').then(() => {
          if (Number(item) === data.length - 1) {
            vm.getDrivers()
            vm.selected = []
          }
        })
      }
    },
    onScroll(to) {
      const vm = this
      const lastIndex = vm.results.length - 1
      if (to.index === lastIndex) {
        this.$nextTick(() => {
          setTimeout(function () {
            if (vm.data_settings.next != null) {
              vm.getDrivers(vm.data_settings.next, true)
            }
          }, 500)
        })
      }
    },
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/mainStyle.sass"
.info-order
  margin-top: 30px

.add-btn
  padding: 12px 18px
  border-radius: 4px

</style>
