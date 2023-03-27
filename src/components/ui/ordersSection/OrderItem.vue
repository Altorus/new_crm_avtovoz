<template>
  <router-link :to="`/order/${number}`" class="order-item" :class="activeClass ? 'active':''">
    <span>#{{ number }}</span>
    <div class="close-icon">
      <q-icon @click="delItem" name="close"/>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "OrderItem",
  props: ['number', 'activeClass'],
  methods:{
    delItem(){
      this.$store.commit('delOpenTab', this.$props.number)
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/mainStyle.sass"
.order-item
  display: flex
  align-items: center
  gap: 20px
  color: #000
  background: rgba(0, 0, 0, 0.1)
  border-radius: 1000px
  padding: 5px 10px
  font-size: 16px
  font-weight: 500
  text-decoration: none

  .close-icon
    cursor: pointer

.order-item.active
  background: $main-color
  color: white

</style>
