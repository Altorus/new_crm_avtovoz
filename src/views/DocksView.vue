<template>
  <main class="main-content">
    <q-page-container class="container">
      <q-dialog v-model="addDriverModal">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Добавить водителя</div>
          </q-card-section>

          <q-card-section class="q-pt-none add-modal">
            <q-input filled :rules="[ val => !!val || 'Обязательное поле' ]" v-model="document.number_doc" label="Номер договора" autofocus/>
            <q-input filled v-model="document.comment" label="Комментарий" autofocus/>
            <q-file filled v-model="document.file" label="Загрузить документ"/>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Отмена" v-close-popup/>
            <q-btn flat @click="addFile" label="Добавить" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="info-order docks-table">
        <div class="btn-container">
          <q-btn
              class="add-btn"
              label="Добавить документ"
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
            :rows="results.results"
            row-key="name"
            :hide-bottom="true"
            :pagination="initialPagination"
            selection="multiple"
            virtual-scroll
            style="height: 60vh; min-height: 275px"
            class="no-link"
            v-model:selected="selected"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td>
                <q-checkbox v-model="props.selected"/>
              </q-td>
              <q-td key="id" :props="props">{{ props.row.pk }}</q-td>
              <q-td key="number" :props="props">{{ props.row.number_doc }}</q-td>
              <q-td key="comment" :props="props">{{ props.row.comment }}</q-td>
              <q-td key="doc">
                <q-btn flat label="Скачать" @click="dowloandFile(props.row.pk)" :value="props.row.file"/>
              </q-td>
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
  name: "DocksView",
  data() {
    return {
      document: {
        number_doc: '',
        comment: '',
        file: '',
        operator: this.$store.state.operator
      },
      addDriverModal: false,
      results: {},
      columns: [
        {name: 'id', align: 'left', label: 'ID', field: row => row.name, sortable: true},
        {name: 'number', align: 'left', label: 'Номер договора',},
        {name: 'comment', align: 'left', label: 'Комментарий',},
        {name: 'doc', align: 'left', label: 'Документ', field: 'file',},
      ],
      initialPagination: {
        rowsPerPage: 0
      },
      selected: [],
      val: false
    }
  },
  mounted() {
    const vm = this
    vm.getDoc()
  },
  methods: {
    getDoc() {
      const vm = this
      axios.get('/api/document/')
          .then(results => {
            vm.results = results.data
          })
    },
    addFile() {
      const vm = this
      const formData = new FormData()
      formData.append('file', vm.document.file)
      formData.append('number_doc', vm.document.number_doc)
      formData.append('comment', vm.document.comment)
      formData.append('operator', vm.document.operator)
      axios.post('/api/document/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).then(function () {
        vm.getDoc()
      })
          .catch(function () {
            vm.submitting = false
          })
    },
    deleteDriver(data) {
      const vm = this
      for (const item in data) {
        axios.delete('/api/document/' + data[item].id + '/').then(() => {
          if (Number(item) === data.length - 1) {
            vm.getDoc()
            vm.selected = []
          }
        })
      }
    },
    async dowloandFile(docId) {
      let url = ''
      await axios.get(`/api/document/${docId}`).then(r => {
        url = r.data.file
      })
      axios.get(url, {responseType: 'blob'})
          .then(r => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(new Blob([r.data]));
            link.download = url.substring(url.lastIndexOf('/') + 1);
            document.body.appendChild(link);
            link.click();
          })
    }
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

