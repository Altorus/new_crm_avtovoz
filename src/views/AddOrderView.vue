<template>
  <main class="main-content">
    <q-page-container class="container">
      <div class="info-order-container">
        <div class="info-order-item">
          <div class="info-order-title">Направления</div>
          <div class="info-order-inputs">
            <q-select :rules="[ val => !!val || 'Обязательное поле' ]" use-input clearable filled
                      :options="cityOrderArray" v-model="createOrder_data.direction_from" label="Город отправки"/>
            <q-select :rules="[ val => !!val || 'Обязательное поле' ]" clearable filled :options="cityOrderArray"
                      v-model="createOrder_data.direction_to" label="Город прибытия"/>
          </div>
        </div>
        <div class="info-order-item">
          <div class="info-order-title">Инфо о заказе</div>
          <div class="info-order-inputs">
            <q-input filled v-model="createOrder_data.auto" label="Модель авто"/>
            <q-select :rules="[ val => !!val || 'Обязательное поле' ]" clearable v-model="createOrder_data.operator"
                      :options="options" filled label="Оператор"/>
            <q-select :rules="[ val => !!val || 'Обязательное поле' ]" use-input clearable filled :options="statusesArr"
                      v-model="createOrder_data.status" label="Статус"/>
          </div>
        </div>
        <div class="info-order-item">
          <div class="info-order-title">Инфо о Клиенте</div>
          <div class="info-order-inputs">
            <q-input v-model="createOrder_data.client_name" :rules="[ val => !!val || 'Обязательное поле' ]" filled
                     label="Имя"/>
            <q-input v-model="createOrder_data.client_phone"
                     :rules="[ val => val.length >= 18 || 'Пожалуйста введите корректный номер телефона' ]"
                     mask="+7 (###) ###-##-##" filled label="Номер телефона"/>
          </div>

        </div>
      </div>
    </q-page-container>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "AddOrderView",
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
      sites: [],
      createOrder_data: {
        client_phone: '',
        client_name: '',
        status: '',
        direction_from: '',
        direction_to: '',
        auto: '',
        site_name: 'Из црм',
        operator: '',
      },
      options: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const vm = this
      axios.get('/api/operator/').then(response => {
        vm.options = response.data.results.map(v => ({label: v.first_name, value: v.pk}))
      })
      axios.get('/api/cities/')
          .then(response => {
            const newArray = response.data.results.map(({name, ...n}) => (n.name = name, n))
            newArray.forEach(n => (n.label = n.name, n.value = n.pk, delete n.name, delete n.pk))
            vm.cityOrderArray = newArray
          })
    }
  },
  watch: {
    createOrder_data: {
      handler(newData) {
        this.$store.commit('UPDATE_ORDER_DATA', newData)
      },
      deep: true
    },
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
  margin-top: 30px

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
        gap: 0


      .info-order-inputs.status-order
        margin-top: 20px

      .comment-input
        grid-column: 1/1

    .info-order-item:nth-of-type(2)
      .info-order-inputs
        .q-field:first-child
          margin-bottom: 20px

    .info-order-item:last-of-type
      margin-bottom: 10px


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

@media screen and (max-width: 450px)
</style>

