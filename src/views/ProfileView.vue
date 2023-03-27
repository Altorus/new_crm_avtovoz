<template>
  <main class="main-content">
    <q-page-container class="container">
      <div class="profile-container">
        <q-input :readonly="!editMode" v-model="user.first_name" filled label="Имя" autofocus/>
        <q-input :readonly="!editMode" v-model="user.last_name" filled label="Фамилия" autofocus/>
        <q-input mask="+7 (###) ###-##-##" :readonly="!editMode" v-model="user.phone" filled label="Телефон" autofocus/>
        <q-input fill-mask="_" :readonly="!editMode" v-model="user.telegram" filled label="Телеграм" autofocus>
          <template v-slot:prepend>
            <q-icon name="telegram"></q-icon>
          </template>
        </q-input>
        <q-btn
            class="profile-btn"
            label="Изменить"
            unelevated
            color="dark"
            v-if="!editMode"
            @click="editMode?editMode=false:editMode=true"
        />
        <q-btn
            class="profile-btn"
            label="Сохранить"
            unelevated
            color="primary"
            v-if="editMode"
            @click="updateUserData"
        />
        <q-btn
            class="profile-btn"
            label="Не работаю"
            unelevated
            :color="user.working?'positive':'negative'"
            @click="toggleWorkStatus"
        />
      </div>
      <div class="mobile-btn-container">
        <q-btn
            class="profile-btn"
            label="Изменить"
            unelevated
            color="dark"
            v-if="!editMode"
            @click="editMode?editMode=false:editMode=true"
        />
        <q-btn
            class="profile-btn"
            label="Сохранить"
            unelevated
            color="primary"
            v-if="editMode"
            @click="updateUserData"
        />
        <q-btn
            class="profile-btn"
            label="Не работаю"
            unelevated
            :color="user.working?'positive':'negative'"
            @click="toggleWorkStatus"
        />
      </div>
    </q-page-container>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileView",
  data() {
    return {
      editMode: false,
      user: {
        pk: '',
        first_name: '',
        last_name: '',
        phone: '',
        telegram: '',
        working: true
      },
    }
  },
  mounted() {
    this.getDataOperator()
  },
  methods: {
    getDataOperator() {
      axios.get('/api/operator/authorize/').then(response => {
        this.user = response.data
      })
    },
    updateUserData() {
      axios.patch(`/api/operator/${this.user.pk}/`, this.user).then(() => {
        this.getDataOperator()
        this.editMode = false
      })
    },
    toggleWorkStatus() {
      const vm = this
      vm.user.working = !vm.user.working
      axios.post(`/api/operator/${vm.user.pk}/change_work_status/`, {'working': vm.user.working}).then(response => {
        vm.user = response.data
      })
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/mainStyle.sass"

.profile-container
  margin-top: 30px
  gap: 30px
  max-width: 50%
  display: grid
  grid-template-columns: repeat(2, 1fr)

  .profile-btn
    margin-top: 10px

.q-btn
  padding: 16px
  font-weight: 500 !important
  font-family: 'Manrope', sans-serif !important

.mobile-btn-container
  display: none

@media screen and (max-width: 920px)
  .profile-container
    max-width: none

@media screen and (max-width: 445px)
  .profile-container
    grid-template-columns: repeat(1, 1fr)
    gap: 10px

    .profile-btn
      margin: 0
      display: none

  .mobile-btn-container
    width: 100%
    gap: 10px
    display: flex
    flex-direction: column
    position: absolute
    bottom: 94px
    left: 0
</style>
