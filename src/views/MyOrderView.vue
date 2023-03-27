<template>
  <main class="main-content">
    <q-page-container class="container">
      <div class="filter-section">
        <SearchInput :classInput="'mobile'"/>
        <div class="filters-item">
          <div class="page-title">Рейтинг</div>
          <div class="btn-container">
            <div class="filter-btn red" @click="filterRate(1)">
              <q-icon name="img:img/icons/arrow_down.svg" class="desktop"></q-icon>
              <q-icon name="img:img/icons/down.svg" class="mobile"></q-icon>
              <span>Низкий</span>
              <span class="count">0</span>
            </div>
            <div class="filter-btn yellow" @click="filterRate(2)">
              <q-icon name="img:img/icons/range_arrow.svg" class="desktop"></q-icon>
              <q-icon name="img:img/icons/range.svg" class="mobile"></q-icon>
              <span>Средний</span>
              <span class="count">0</span>
            </div>
            <div class="filter-btn green" @click="filterRate(3)">
              <q-icon name="img:img/icons/arrow_up.svg" class="desktop"></q-icon>
              <q-icon name="img:img/icons/up.svg" class="mobile"></q-icon>
              <span>Высокий</span>
              <span class="count">0</span>
            </div>
          </div>
        </div>
        <div class="filters-item">
          <div class="page-title">Статусы</div>
          <q-select
              filled
              v-model="selectStatus"
              :options="statusFilters"
              @update:model-value="filter_orders"
          >
            <template v-slot:default>
              <div class="count">{{ statusesCounts[selectStatus.alias] }}</div>
            </template>
          </q-select>
        </div>
      </div>
      <div class="info-order order-table">
        <div class="page-title">Заказы</div>
        <q-table
            :columns="columns"
            :rows="results"
            row-key="name"
            :hide-bottom="true"
            :pagination="initialPagination"
            virtual-scroll
            @virtual-scroll="onScroll"
            style="height: 480px"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td @click="selectOrder(props.row.id)" key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td @click="selectOrder(props.row.id)" key="from_to" :props="props">{{ props.row.from_to }}</q-td>
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
import SearchInput from "@/components/ui/SearchInput";
import axios from "axios";

export default {
  name: 'HomeView',
  components: {
    SearchInput
  },
  data() {
    return {
      statusesCounts: [],
      data_settings: {},
      selectStatus: {
        label: 'В работе',
        id: 10,
        alias: 'work'
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
        this.getOrders(`/api/orders/?operator=${this.$store.getters.OPERATOR_ID}&&search=${searchNumber}`)
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
      this.$store.dispatch('addOpenTab', order)
    },
    async getOrders(url = `/api/orders/?operator=${this.$store.getters.OPERATOR_ID}&&status=${this.selectStatus.id}`, update = false) {
      await axios.get('/api/orders/get_count_rate/').then(response => {
        this.rate_count = response.data
      })
      axios.get(url).then(response => {
        const result = response.data.results
        this.statusesCounts = response.data.counts
        this.data_settings = response.data
        if (update) {
          this.results = this.results.concat(result)
        } else {
          this.results = result
        }
      })

    },
    filter_orders() {
      this.getOrders(`/api/orders/?operator=${this.$store.getters.OPERATOR_ID}&status=${this.selectStatus.id}`)
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
      if (nextPage < lastPage && to.index === lastIndex) {
        this.$nextTick(() => {
          setTimeout(function () {
            vm.getOrders(vm.data_settings.next, true)
          }, 500)
        })
      }
    }
  }
  ,
}
</script>
<style lang="sass" scoped>
@import "@/styles/mainStyle.sass"
$indent: 20px

.main-content
  margin: 0 10px 0 20px

.filter-section
  display: grid
  grid-template-columns: 1fr 40%
  gap: 40px
  margin-top: 30px

  .filters-item
    display: flex
    flex-direction: column

    .page-title
      margin-bottom: $indent

    .btn-container
      display: flex

      .filter-btn
        display: flex
        align-items: center
        justify-content: space-between
        margin: 0 10px
        color: #fff
        padding: 15px 20px
        border-radius: 4px
        flex: 1
        font-size: 16px
        cursor: pointer

        .q-icon
          width: 24px
          height: 24px

        .q-icon.mobile
          display: none

      .filter-btn:first-child
        margin-left: 0

      .filter-btn:last-of-type
        margin-right: 0

      .filter-btn.red
        background: $main-red

      .filter-btn.yellow
        background: $main-yellow

      .filter-btn.green
        background: $main-green


  .count
    display: flex
    align-items: center
    justify-content: center
    color: #FFFFFF
    font-weight: 600
    font-size: 16px


.info-order
  margin-top: 40px

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
  .page-title
    font-size: 20px

  .filter-section
  .filters-item
    .btn-container
      .filter-btn
        padding: 0 !important

        .q-icon.desktop
          display: none !important

        .q-icon.mobile
          display: block !important

      .filter-btn
        background: transparent !important


  .info-order
    margin-top: 10px

    .page-title
      margin-bottom: 5px

  .count
    display: flex
    align-items: center

  .filter-section
    .filters-item
      flex-direction: row
      justify-content: space-between
      align-items: center

      .page-title
        margin-bottom: 0

      .count
        margin-left: 25px
        margin-right: -5px

      .btn-container
        align-items: center
        flex-direction: row
        justify-content: center
        margin: 0

        .filter-btn
          justify-content: center
          margin: 0

          .q-icon
            display: block

          span,
          .count
            display: none

@media screen and (max-width: 445px)
  .page-title
    font-size: 20px

@media screen and (max-width: 1000px)
  .info-order
    .q-table
      tr
        th:nth-of-type(3),
        th:nth-of-type(4),
        th:nth-of-type(5),
        th:nth-of-type(6),
        th:nth-of-type(7),
        th:nth-of-type(8),
        td:nth-of-type(3),
        td:nth-of-type(4),
        td:nth-of-type(5),
        td:nth-of-type(6),
        td:nth-of-type(7),
        td:nth-of-type(8)
          display: none
</style>
