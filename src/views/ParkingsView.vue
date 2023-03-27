<template>
  <main class="main-content">
    <q-page-container class="container">
      <q-dialog v-model="addParkingModal">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Добавить парковку</div>
          </q-card-section>

          <q-card-section class="q-pt-none add-modal">

            <q-input filled :rules="[ val => !!val || 'Обязательное поле' ]" v-model="newParking.city" label="Город" autofocus/>
            <q-input filled v-model="newParking.address" label="Адрес" autofocus/>
            <q-input filled v-model="newParking.contact" label="Контакты" autofocus/>
            <q-input filled v-model="newParking.comment" label="Комментарий" autofocus/>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Отмена" v-close-popup/>
            <q-btn flat @click="createNewParking" label="Добавить" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="editParkingModal">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Редактировать парковку</div>
          </q-card-section>

          <q-card-section class="q-pt-none add-modal">
            <q-input filled v-model="editParking.city" label="Город" autofocus/>
            <q-input filled v-model="editParking.address" label="Адрес" autofocus/>
            <q-input filled v-model="editParking.contact" label="Контакты" autofocus/>
            <q-input filled v-model="editParking.comment" label="Комментарий" autofocus/>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Отмена" v-close-popup/>
            <q-btn flat @click="updateNewParking" label="Обновить" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="info-order parking-table">
        <div class="btn-container">
          <q-btn
              class="add-btn"
              label="Добавить парковку"
              unelevated
              color="primary"
              @click="addParkingModal = true"

          />
        </div>
        <q-table
            :columns="columns"
            :rows="results"
            :pagination="initialPagination"
            :hide-bottom="true"
            virtual-scroll
            class="no-link"
            @virtual-scroll="onScroll"
        >
          <template v-slot:body="props">
            <q-tr :props="props" @click="editParkingModal = true; editParking = props.row">
              <q-td key="id" :props="props">{{ props.row.pk }}</q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="city" :props="props">{{ props.row.city }}</q-td>
              <q-td key="address" :props="props">{{ props.row.address }}</q-td>
              <q-td key="contact" :props="props">{{ props.row.contact }}</q-td>
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
  name: "ParkingsView",
  data() {
    return {
      initialPagination: {
        rowsPerPage: 0
      },
      addParkingModal: false,
      editParkingModal: false,
      columns: [
        {name: 'id', align: 'left', label: 'id', field: row => row.name, sortable: true},
        {name: 'city', align: 'left', label: 'Город',},
        {name: 'address', align: 'left', label: 'Адрес',},
        {name: 'contact', align: 'left', label: 'Контакты',},
        {name: 'comment', align: 'left', label: 'Комментарий',},
      ],
      results: {},
      newParking: {
        city: '',
        address: '',
        contact: '',
        comment: ''
      },
      editParking: {
        city: '',
        address: '',
        contact: '',
        comment: ''
      },
      data_settings: {}
    }
  },
  mounted() {
    const vm = this
    vm.getParkings()
  },
  methods: {
    getParkings(url = 'api/parking/', update = false) {
      const vm = this
      axios.get(url)
          .then(results => {
            const tmp_result = results.data.results
            vm.data_settings = results.data
            if (update) {
              vm.results = this.results.concat(tmp_result)
            } else {
              vm.results = tmp_result
            }
          })
    },
    createNewParking() {
      const vm = this
      axios.post('/api/parking/', vm.newParking).then(() => {
        vm.getParkings()
      })
    },
    updateNewParking() {
      const vm = this
      axios.post('/api/parking/', vm.newParking).then(() => {
        const vm = this
        axios.patch(`/api/parking/${vm.editParking.id}/`, vm.editParking).then(() => {
          vm.getParkings()
        })
      })
    },
    onScroll(to) {
      const vm = this
      const lastIndex = vm.results.length - 1
      if (to.index === lastIndex) {
        this.$nextTick(() => {
          setTimeout(function () {
            if(vm.data_settings.next != null){
              vm.getParkings(vm.data_settings.next, true)
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
  margin-bottom: 20px
  padding: 12px 18px
    border-radius: 4px

</style>
