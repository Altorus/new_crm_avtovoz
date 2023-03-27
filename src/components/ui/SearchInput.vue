<template>
  <div class="search-container" :class="$props.classInput">
<!--    Поиск по номеру заказа-->
    <q-input @update:model-value="setSearchNumber" v-model="orderNumber" filled label="Поиск">
      <template v-slot:prepend>
        <q-icon name="search"/>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  inject: ['search_text'],
  name: "SearchInput",
  props: ['classInput'],
  data() {
    return {
      orderNumber: null
    }
  },
  methods:{
    setSearchNumber(value){
      this.$store.commit('SET_ORDER_NUMBER', Number(value))
    }
  }
}
</script>

<style scoped lang="sass">
.search-container
  .q-icon
    color: rgba(0, 0, 0, 0.4)

.search-container.mobile
  display: none

.search-container.desktop
  display: block

@media screen and (max-width: 1000px)
  .search-container
    max-width: none
  .search-container.mobile
    display: block
  .search-container.desktop
    display: none


</style>
