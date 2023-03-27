<template>
  <main class="authorize">
    <div class="authorize-title">Вход в систему</div>
    <div
        class="form-container"
    >
      <q-input
          label="Логин"
          aria-required="true"
          v-model="login.username"
          filled
          :rules="[val=> !!val || 'Обязательное поле']"
          @keyup.enter="authorization"
      />
      <q-input
          type="password"
          label="Пароль"
          aria-required="true"
          v-model="login.password"
          filled
          :rules="[val=> !!val || 'Обязательное поле']"
          @keyup.enter="authorization"
      />
      <q-btn type="button" @click="authorization" label="войти"/>
    </div>
  </main>
</template>

<script>
import axios from "axios";


export default {
  name: "AuthotizationView",
  data() {
    return {
      login: {
        username: '',
        password: '',
        isEditing: false
      }
    }
  },
  methods: {

    authorization() {
      const vm = this
      axios.post('/api/api-token-auth/', vm.login).then(response => {
        if (response.code == 200) {
          let token = response.data.token
          axios.defaults.headers.common.Authorization = 'JWT ' + token
          axios.get('/api/operator/authorize/').then(response => {
            if(response.code == 200){
              let operator_data = {token: token, operator: response.data.pk}
              vm.$store.commit('AUTHORIZE_USER', operator_data)
              this.$router.push({name: 'home'})
            }
          })
        } else {
          this.showNotify('Неверный логин или пароль', 'red')
        }

      })
    },
    showNotify(message, color) {
      this.$q.notify({
        color: color,
        textColor: 'white',
        message: message,
        position: 'top',
        timeout: 3000
      })
    },
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/mainStyle.sass"
.authorize
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

  .authorize-title
    font-size: 24px
    text-transform: uppercase
    margin-bottom: 2rem
    font-weight: 800

  .form-container
    display: grid
    grid-template-columns: repeat(1, 1fr)
    gap: 20px
    width: 25vw
    min-width: 250px

    .q-btn
      background: $main-color
      color: #fff
      font-size: 16px

    .q-btn:before
      box-shadow: none


</style>
