<template>
  <main class="main-content">
    <q-page-container class="container">
      <div class="info-order order-table">
        <q-table
            :columns="columns"
            :rows="results"
            row-key="name"
            :hide-bottom="true"
            :pagination="initialPagination"
            virtual-scroll
            @virtual-scroll="onScroll"
            style="height: 60vh; min-height: 275px"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td @click="selectOrder(props.row.id)" key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td key="from_to" :props="props">{{ props.row.from_to }}</q-td>
              <q-td key="rate" :props="props">{{ props.row.rate }}</q-td>
              <q-td key="auto" :props="props">{{ props.row.auto }}</q-td>
              <q-td key="operator" :props="props">{{ props.row.operator }}</q-td>
              <q-td key="phone" :props="props">{{ props.row.client.phone }}</q-td>
              <q-td key="site" :props="props">{{ props.row.site }}</q-td>
              <q-td key="datetime" :props="props">{{ formatDate(props.row.datetime) }}</q-td>
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
  name: 'HomeView',
  components: {},
  data() {
    return {
      statusesCounts: [],
      data_settings: {},
      selectStatus: {
        label: 'Новые',
        id: 1,
        alias: 'new'
      },
      statusFilters: [{
        label: 'Новые',
        id: 1,
        alias: 'new'
      },
        {
          label: 'С звонка',
          id: 8,
          alias: 'from_call'
        },
        {
          label: 'В работе',
          id: 10,
          alias: 'work'
        },
        {
          label: 'Расчёт цены',
          id: 2,
          alias: 'price_calculate'
        },
        {
          label: 'Подписание договора',
          id: 3,
          alias: 'contract'
        },
        {
          label: 'Первые 50%',
          id: 4,
          alias: 'first_fifty'
        },
        {
          label: 'Завершена',
          id: 5,
          alias: 'ended'
        },
        {
          label: 'Перезвонить',
          id: 6,
          alias: 'recall'
        },
        {
          label: 'Не везем',
          id: 7,
          alias: 'archive'
        },
        {
          label: 'Не верный номер',
          id: 9,
          alias: 'notnumber'
        },
        {
          label: 'Отказ',
          id: 11,
          alias: 'decline'
        }],
      results: [],
      columns: [
        {name: 'id', required: true, label: 'id', align: 'left', field: row => row.name, sortable: true},
        {name: 'from_to', align: 'left', label: 'Направление',},
        {name: 'rate', align: 'left', label: 'Рейтинг', field: row => row.name, sortable: true},
        {name: 'auto', align: 'left', label: 'Автомобиль',},
        {name: 'operator', align: 'left', label: 'Оператор',},
        {name: 'phone', align: 'left', label: 'Телефон',},
        {name: 'site', align: 'left', label: 'Сайт',},
        {name: 'datetime', align: 'left', label: 'Дата',}
      ],
      initialPagination: {
        rowsPerPage: 0
      },
      rate_count: [],
      loading: false,
    }
  },
  beforeMount() {
    this.getOrders()
  },
  computed: {
    searchNumber() {
      return this.$store.getters.ORDER_NUMBER
    }
  },
  watch: {
    searchNumber: function () {
      const searchNumber = this.$store.getters.ORDER_NUMBER
      if (searchNumber != 0) {
        this.getOrders(`/api/orders/?search=${searchNumber}`)
      } else {
        this.getOrders()
      }
    },
  },
  methods: {
    filterRate(rate) {
      alert(`Выбран фильтр по рейтингу ${rate}`)
      // this.getOrders(`/api/orders/?rate=${rate}`)
    },
    selectOrder(order) {
      axios.post(`/api/orders/${order}/set_in_work/`).then(response => {
        if (response.data.status == false) {
          this.showNotify(response.data.message, 'positive')
        } else {
          this.$store.dispatch('addOpenTab', order)

        }
      })
    },
    async getOrders(url = '/api/orders/', update = false) {
      axios.get('/api/orders/get_free_orders/').then(r => {
        console.log(r)
      })
      await axios.get('/api/rate/').then(response => {
        this.rate = response.data
      })
      axios.get(url).then(response => {
        console.log(response.data)
        const tmp_result = response.data.results
        this.statusesCounts = response.data.counts
        this.data_settings = response.data
        if (update) {
          this.results = this.results.concat(tmp_result)
        } else {
          this.results = tmp_result
        }
      })

    },
    filter_orders() {
      this.getOrders(`/api/orders/?status=${this.selectStatus.id}`)
    },
    formatDate(date) {
      let now = new Date(date),
          month = String(now.getMonth() + 1).padStart(2, '0'),
          day = String(now.getDate()).padStart(2, '0'),
          year = now.getFullYear(),
          format_date = `${day}.${month}.${year}`
      return format_date
    },
    onScroll(to) {
      const vm = this
      const lastPage = Math.ceil(vm.data_settings.count / vm.data_settings.per_page)
      const nextPage = Math.ceil(vm.results.length / vm.data_settings.per_page)
      const lastIndex = vm.results.length - 1
      console.log(vm.data_settings)
      if (nextPage < lastPage && to.index === lastIndex) {
        this.$nextTick(() => {
          setTimeout(function () {
            vm.getOrders(vm.data_settings.next, true)
          }, 500)
        })
      }
    },
    showNotify(message, color) {
      this.$q.notify({
        color: color,
        textColor: 'white',
        message: message,
        position: 'top',
        timeout: 3000,
        icon: 'info'
      })
    },
  }
  ,
}
</script>
<style lang="sass" scoped>
@import "@/styles/mainStyle.sass"
$indent: 20px

.main-content
  margin: 0 10px 0 20px

  .count
    display: flex
    align-items: center
    justify-content: center
    color: #FFFFFF
    font-weight: 600
    font-size: 16px


.info-order
  margin-top: 30px

  .page-title
    margin-bottom: $indent

@media screen and (max-width: 1180px)
  .filter-section
    grid-template-columns: repeat(1, 1fr)
    gap: 10px
    margin-top: 10px

@media screen and (max-width: 1000px)
  .filter-section
    grid-template-columns: repeat(1, 1fr)

@media screen and (max-width: 768px)
  .info-order
    margin-top: 10px

    .page-title
      margin-bottom: 5px

  .count
    display: flex
    align-items: center

  .filter-section
    .filters-item
      .btn-container
        .filter-btn
          justify-content: center

          .q-icon
            display: block

          span,
          .count
            display: none
</style>
