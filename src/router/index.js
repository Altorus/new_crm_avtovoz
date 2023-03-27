import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from "@/views/OrderView";
import AuthotizationView from "@/views/AuthotizationView";
import MyOrderView from "@/views/MyOrderView";
import DriversView from "@/views/DriversView";
import AddOrderView from "@/views/AddOrderView";
import CostView from "@/views/CostView";
import DocksView from "@/views/DocksView";
import ParkingsView from "@/views/ParkingsView";
import ProfileView from "@/views/ProfileView";
import RatesView from "@/views/RatesView";
import TestLogisticView from "@/views/TestLogisticView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/order/:id',
    name: 'order',
    component: OrderView
  },
  {
    path: '/authorize',
    name: 'authorize',
    component: AuthotizationView
  },
  {
    path: '/my-order',
    name: 'myOrder',
    component: MyOrderView
  },
  {
    path: '/drivers',
    name: 'drivers',
    component: DriversView,
  },
  {
    path: '/add-order',
    name: 'addOrder',
    component: AddOrderView,
  },
  {
    path: '/cost',
    name: 'cost',
    component: CostView,
  },
  {
    path: '/docks',
    name: 'docks',
    component: DocksView,
  },
  {
    path: '/parkings',
    name: 'parkings',
    component: ParkingsView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/rates',
    name: 'rates',
    component: RatesView,
  },
  {
    path: '/test-logistic',
    name: 'testLogistic',
    component: TestLogisticView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
