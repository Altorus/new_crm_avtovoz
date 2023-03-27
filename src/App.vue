<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <HeaderComponent @navigate="saveData" v-if="statusAuthorize"/>
      <router-view/>
      <MobileMenu v-if="statusAuthorize"/>
    </q-layout>
  </div>
</template>

<script>
import HeaderComponent from "@/components/ui/HeaderComponent";
import MobileMenu from "@/components/ui/MobileMenu";
import axios from "axios";
import {mapState} from 'vuex';

export default {
  name: 'LayoutDefault',
  components: {
    HeaderComponent,
    MobileMenu,
  },
  data() {
    return {
      statusAuthorize: false,
      baseURL: 'http://192.168.0.39:8005/',
      saveEvent: false,
    }
  },
  mounted() {
    this.setAxiosConf()
    if (this.$store.getters.TOKEN) {
      this.statusAuthorize = true
    } else {
      this.statusAuthorize = false
    }
  },
  watch: {
    token: function () {
      if (this.$store.getters.TOKEN == undefined) {
        this.statusAuthorize = false
      } else {
        this.statusAuthorize = true

      }
    }
  },
  computed: {
    ...mapState([
      'token',
    ]),
    authorizeStatus() {
      return this.$store.getters.TOKEN
    }
  },
  methods: {
    checkAuth() {
      const token = this.$store.state.token
      if (!token) {
        this.statusAuthorize = false
        this.$router.push({name: 'authorize'})
      } else {
        this.statusAuthorize = true
      }
    },
    setAxiosConf() {
      const vm = this
      axios.defaults.baseURL = `${this.baseURL}`
      if (vm.token) {
        axios.defaults.headers.common.Authorization = 'JWT ' + vm.token
      }
      axios.interceptors.response.use((response) => {
        return {code: response.status, data: response.data}
      }, (error) => {
        if (error.response.status === 401) {
          vm.$store.commit('AUTHORIZE_USER', {token: '', operator: ''})
          this.$router.push({name: 'authorize'})
        }
        return {code: error.response.status, data: error.response.data}
      })
    },
    saveData() {
      const _data = this.$store.getters.ORDER_DATA
      const vm = this
      const orderId = vm.$route.params.id
      const tmpData = {}
      const orderPattern = {
        id: 'int',
        auto: 'str',
        number: 'str',
        order_price: 'int',
        driver_price: 'int',
        pre_paid: 'int',
        past_paid: 'int',
        ship_dt: 'str',
        datetime: 'datetime',
        status: 'fk',
        direction_from: 'fk',
        direction_to: 'fk',
        source: 'fk',
        client: 'obj',
        site: 'fk',
        driver: 'fk',
        comment: 'str'
      }

      for (const key in orderPattern) {
        if (key === 'client' && _data[key].phone) {
          _data[key].phone = _data[key].phone.replace(/ /g, '').trim()
        }
        if (orderPattern[key] === 'fk') {
          if (_data[key]) {
            tmpData[key] = _data[key].value
          } else {
            tmpData[key] = ''
          }
        } else if (orderPattern[key] === 'int') {
          if (!_data[key]) {
            tmpData[key] = null
          } else {
            tmpData[key] = _data[key]
          }
        } else {
          tmpData[key] = _data[key]
        }
      }
      axios.patch(`/api/orders-edit/${orderId}/`, tmpData).then(() => {
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          message: 'Данные успешно обновлены',
          position: 'top',
          timeout: 3000
        })
      })
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/mainStyle.sass"


</style>
