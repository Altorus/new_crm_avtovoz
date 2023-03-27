<template>
  <main class="main-content">
    <q-page-container class="container">
      <OrdersSection order-section-class="mobile"/>
      <div class="info-order-container">
        <div class="info-order-item">
          <div class="info-order-inputs status-order">
            <q-select use-input @filter="filterFn" clearable filled v-model="data.status" :options="statuses"
                      label="Статус"/>
          </div>
        </div>
        <div class="info-order-item">
          <div class="info-order-title">Направления</div>
          <div class="info-order-inputs">
            <q-select use-input clearable filled v-model="data.direction_from" :options="cityOrderArray"
                      label="Город отправки"/>
            <q-select clearable filled v-model="data.direction_to" :options="cityOrderArray" label="Город прибытия"/>
          </div>
        </div>
        <div class="info-order-item">
          <div class="info-order-title">Инфо о заказе</div>
          <div class="info-order-inputs">
            <q-input filled v-model="data.auto" label="Модель авто"/>
            <q-input filled v-model="data.number" label="Номер договора"/>
            <q-select clearable filled v-model="data.driver" :options="options_driver" label="Водитель автовоза"/>
            <q-select clearable filled v-model="data.site" :options="sites" option-label="name"
                      label="Сайт"/>
            <q-input
                class="comment-input"
                v-model="data.client.comment"
                filled
                label="Комментарий"
                type="textarea"
            />
          </div>
        </div>
        <div class="info-order-item">
          <div class="info-order-title">Инфо о Клиенте</div>
          <div class="info-order-inputs">
            <q-input filled v-model="data.client.name" label="Имя"/>
            <q-input filled mask="##.##.####" v-model="data.ship_dt" label="Желаемая дата загрузки"/>
            <q-btn class="call-client desktop" :href="`tel:${data.client.phone}`" text-color="white"
                   :label="data.client.phone"/>
          </div>

        </div>

        <div class="info-order-item">
          <div class="info-order-title">Цены</div>
          <div class="info-order-inputs">
            <q-input filled v-model.number="data.order_price" label="Цена для клиента"/>
            <q-input filled v-model.number="data.driver_price" label="Цена перевозки"/>
            <q-input filled v-model="data.delta" readonly label="Дельта"/>
          </div>
        </div>
        <div class="info-order-item">
          <div class="info-order-title">Оплата</div>
          <div class="info-order-inputs">
            <q-input filled v-model.number="data.pre_paid" label="Первая часть"/>
            <q-input filled v-model.number="data.past_paid" label="Вторая часть"/>
            <q-input filled v-model="data.debt" readonly label="Долг клиента"/>
            <!--            <q-btn class="call-client desktop" @click="saveData" text-color="white" label="Сохранить"/>-->
          </div>
          <q-btn class="call-client mobile" text-color="white" label="+7 916 923 35 32"/>

        </div>
      </div>
    </q-page-container>
  </main>
</template>

<script>
import OrdersSection from "@/components/ui/ordersSection/OrdersSection";
import axios from "axios";

export default {
  name: "OrderView",
  props: ['saveEvent'],
  data() {
    return {
      statusesArr: [{
        value: 11,
        label: 'Отказ'
      }, {
        value: 1,
        label: 'Новая заявка'
      }, {
        value: 2,
        label: 'Расчёт цены'
      }, {
        value: 3,
        label: 'Подписание договора'
      }, {
        value: 4,
        label: 'Первые 50%'
      }, {
        value: 5,
        label: 'Завершена'
      }, {
        value: 6,
        label: 'Перезвонить'
      }, {
        value: 7,
        label: 'Не возим'
      }, {
        value: 8,
        label: 'Звонок с сайта'
      }, {
        value: 9,
        label: 'Неверный номер'
      }, {
        value: 10,
        label: 'В работе'
      }],
      statuses: [],
      data: {
        "id": null,
        "auto": "",
        "status_name": "",
        "from_to": "",
        "site": "",
        "number": null,
        "order_price": null,
        "driver_price": null,
        "datetime": "",
        "status": {"label": "", "value": null},
        "direction_from": {"label": "", "value": null},
        "direction_to": {"label": "", "value": null},
        "source": null,
        "delta": 0,
        "client": {"id": null, "name": "", "phone": "", "info": null, "comment": null},
        "site_name": "",
        "operator": '',
        "driver": null,
        "comment": null,
        "rate": 0,
        "pre_paid": null,
        "past_paid": null,
        "ship_dt": ""
      },
      options_driver: [],
      cityOrderArray: [],
      sites: []
    }
  },
  components: {OrdersSection},
  mounted() {
    this.getData()
  },
  created() {
    this.emitter.on('my-event', (evt) => {
      console.log(evt.eventContent)
    })
  },
  methods: {
    getData() {
      const vm = this
      const orderId = vm.$route.params.id
      if (orderId) {
        axios.get('/api/orders/' + orderId + '/').then(response => {
          console.log(`order:`, response)
          vm.data = response.data
        })
      }
      axios.get('/api/cities/')
          .then(response => {
            const newArray = response.data.results.map(({name, ...n}) => (n.name = name, n))
            newArray.forEach(n => (n.label = n.name, n.value = n.pk, delete n.name, delete n.pk))
            vm.cityOrderArray = newArray
          })
      axios.get('/api/sites/')
          .then(response => {
            const newArray = response.data.results.map(({name, ...n}) => (n.name = name, n))
            newArray.forEach(n => (n.value = n.pk, delete n.pk))
            vm.sites = newArray
          })
      axios.get('/api/drivers/')
          .then(response => {
            const data = response.data.results
            for (const item in data) {
              vm.options_driver.push({
                label: data[item].name,
                value: data[item].pk
              })
            }
          })
    },
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.statuses = this.statusesArr
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.statuses = this.statusesArr.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
  },
  watch: {
    $route() {
      this.getData()
    },
    data: {
      handler(newData) {
        newData.operator = this.$store.state.operator
        this.$store.commit('UPDATE_ORDER_DATA', newData)
      },
      deep: true
    },
    'data.order_price'() {
      if (this.data.driver_price && this.data.order_price) {
        this.data.delta = this.data.order_price - this.data.driver_price
        this.data.debt = this.data.order_price - (this.data.pre_paid + this.data.past_paid)
      } else {
        this.data.delta = 0
        this.data.debt = 0
      }
    },
    'data.driver_price'() {
      if (this.data.driver_price && this.data.order_price) {
        this.data.delta = this.data.order_price - this.data.driver_price
        this.data.debt = this.data.order_price - (this.data.pre_paid + this.data.past_paid)
      } else {
        this.data.delta = 0
        this.data.debt = 0
      }
    },
    'data.pre_paid'() {
      if (this.data.order_price) {
        this.data.debt = this.data.order_price - (this.data.pre_paid + this.data.past_paid)
      }
    },
    'data.past_paid'() {
      if (this.data.order_price) {
        this.data.debt = this.data.order_price - (this.data.pre_paid + this.data.past_paid)
      }
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/mainStyle.sass"
.main-content
  margin: 0 10px 0 20px

.info-order-container
  display: flex
  flex-direction: column
  gap: 40px

  .info-order-item
    display: flex
    flex-direction: column

    .info-order-title
      font-size: 20px
      font-weight: 500
      margin-bottom: 10px


    .info-order-inputs
      display: grid
      grid-template-columns: repeat(4, 1fr)
      gap: 20px

    .info-order-inputs.status-order
      margin-top: 30px

    .comment-input
      grid-column: 5/1

    .call-client.mobile
      position: fixed
      bottom: 104px
      width: calc(100% - 90px)
      display: none

@media screen and (max-width: 920px)
  .info-order-container
    display: flex
    flex-direction: column
    gap: 30px

    .info-order-item
      display: flex
      flex-direction: column


      .info-order-title
        font-size: 20px
        font-weight: 500
        margin-bottom: 10px


      .info-order-inputs
        display: grid
        grid-template-columns: repeat(1, 1fr)
        gap: 20px


      .info-order-inputs.status-order
        margin-top: 20px

      .comment-input
        grid-column: 1/1

    .info-order-item:last-of-type
      margin-bottom: 80px


@media screen and (max-width: 768px)
  .info-order-container
    .info-order-item

      .call-client.desktop
        display: none

      .call-client.mobile
        display: block
        margin-top: 20px

      .q-btn.call-client.mobile
        padding: 14px 0
</style>
