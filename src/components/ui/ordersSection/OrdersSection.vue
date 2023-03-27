<template>
  <div class="orders-section" :class="orderSectionClass">
    <OrderItem v-for="i in $store.state.orderTabs" :key="i.id" :number="i" :active-class="true"/>
  </div>
</template>

<script>
import OrderItem from "@/components/ui/ordersSection/OrderItem";

export default {
  name: "OrdersSection",
  components: {
    OrderItem
  },
  props: ['orderSectionClass']
}
</script>

<style scoped lang="sass">
.orders-section
  display: flex
  align-items: center
  gap: 20px
  margin-left: 30px
  overflow-x: auto
  width: 35%
  min-width: 250px
  max-width: 350px

.orders-section.mobile
  display: none

@media screen and (max-width: 1180px)
  .orders-section.mobile
    display: flex
    width: 100vw
    max-width: none
    margin: 0
    gap: 10px
    position: relative
    left: 0
    padding: 15px 0 15px 50px
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), #FFFFFF
    border-bottom: 1px solid rgba(0, 0, 0, 0.05)
    transform: translateX(-50px)

  .orders-section.desktop
    display: none

</style>
