<template>
  <q-header elevated class="no-shadow bg-white">
    <q-toolbar>
      <q-btn flat @click="drawer = !drawer" class="burger-btn" round dense icon="menu"/>
      <router-link to="/"><img class="logo" src="@/img/logo.svg" alt=""></router-link>
      <OrdersSection order-section-class="desktop"/>
      <div class="right-container">
        <SearchInput classInput="desktop"/>
        <q-btn square class="save-btn" v-if="saveBtnDisplay" icon="done" @click="callSaveData"
               :label="save?'Сохранить':''"/>
        <q-btn square class="save-btn" v-if="addBtnDisplay" icon="done" @click="callAddData"
               :label="save?'Добавить':''"/>
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer
      v-model="drawer"
      show-if-above

      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"

      :width="250"
      :breakpoint="768"
      bordered
      class="bg-white"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_31_78" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                  <rect width="24" height="24"/>
                </mask>
                <g mask="url(#mask0_31_78)">
                  <path
                      d="M6.075 18.425C6.075 18.7011 6.29886 18.925 6.575 18.925H8.35C8.62614 18.925 8.85 18.7011 8.85 18.425V13.35C8.85 13.0739 9.07386 12.85 9.35 12.85H14.65C14.9261 12.85 15.15 13.0739 15.15 13.35V18.425C15.15 18.7011 15.3739 18.925 15.65 18.925H17.425C17.7011 18.925 17.925 18.7011 17.925 18.425V10.2756C17.925 10.1179 17.8506 9.96941 17.7242 9.87503L12.2992 5.82344C12.1217 5.69092 11.8783 5.69092 11.7008 5.82344L6.27581 9.87503C6.14943 9.96941 6.075 10.1179 6.075 10.2756V18.425ZM4.3 21.2C4.02386 21.2 3.8 20.9761 3.8 20.7V9.15C3.8 8.99262 3.8741 8.84443 4 8.75L11.7 2.975C11.8778 2.84167 12.1222 2.84167 12.3 2.975L20 8.75C20.1259 8.84443 20.2 8.99262 20.2 9.15V20.7C20.2 20.9761 19.9761 21.2 19.7 21.2H13.45C13.1739 21.2 12.95 20.9761 12.95 20.7V15.55C12.95 15.2739 12.7261 15.05 12.45 15.05H11.55C11.2739 15.05 11.05 15.2739 11.05 15.55V20.7C11.05 20.9761 10.8261 21.2 10.55 21.2H4.3Z"
                      fill="#1C1B1F"/>
                </g>
              </svg>

            </div>
          </q-item-section>

          <q-item-section>
            Главная
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/my-order">
          <q-item-section avatar>
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_153_91" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                  <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_153_91)">
                  <path
                      d="M8 18H16V16H8V18ZM8 14H16V12H8V14ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z"/>
                </g>
              </svg>


            </div>
          </q-item-section>

          <q-item-section>
            Мои заявки
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/drivers">
          <q-item-section avatar>
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_31_83" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                  <rect width="24" height="24"/>
                </mask>
                <g mask="url(#mask0_31_83)">
                  <path
                      d="M6.025 19.2V20.025C6.025 20.3583 5.90833 20.6373 5.675 20.862C5.44167 21.0873 5.15833 21.2 4.825 21.2H4C3.66667 21.2 3.38333 21.0833 3.15 20.85C2.91667 20.6167 2.8 20.3333 2.8 20V11.95L4.9 5.925C5.01667 5.59167 5.221 5.32067 5.513 5.112C5.80433 4.904 6.13333 4.8 6.5 4.8H17.5C17.8667 4.8 18.196 4.904 18.488 5.112C18.7793 5.32067 18.9833 5.59167 19.1 5.925L21.2 11.95V20C21.2 20.3333 21.0833 20.6167 20.85 20.85C20.6167 21.0833 20.3333 21.2 20 21.2H19.175C18.8417 21.2 18.5583 21.0873 18.325 20.862C18.0917 20.6373 17.975 20.3583 17.975 20.025V19.2H6.025ZM5.875 10H18.125L17.1 7.075H6.9L5.875 10ZM7.525 15.975C7.94167 15.975 8.296 15.829 8.588 15.537C8.87933 15.2457 9.025 14.8917 9.025 14.475C9.025 14.0583 8.87933 13.704 8.588 13.412C8.296 13.1207 7.94167 12.975 7.525 12.975C7.10833 12.975 6.75433 13.1207 6.463 13.412C6.171 13.704 6.025 14.0583 6.025 14.475C6.025 14.8917 6.171 15.2457 6.463 15.537C6.75433 15.829 7.10833 15.975 7.525 15.975ZM16.475 15.975C16.8917 15.975 17.246 15.829 17.538 15.537C17.8293 15.2457 17.975 14.8917 17.975 14.475C17.975 14.0583 17.8293 13.704 17.538 13.412C17.246 13.1207 16.8917 12.975 16.475 12.975C16.0583 12.975 15.7043 13.1207 15.413 13.412C15.121 13.704 14.975 14.0583 14.975 14.475C14.975 14.8917 15.121 15.2457 15.413 15.537C15.7043 15.829 16.0583 15.975 16.475 15.975ZM5.075 16.925H18.925V12H5.075V16.925Z"
                      fill="#1C1B1F"/>
                </g>
              </svg>

            </div>
          </q-item-section>

          <q-item-section>
            Водители
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/docks">
          <q-item-section avatar>
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_31_88" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                  <rect width="24" height="24"/>
                </mask>
                <g mask="url(#mask0_31_88)">
                  <path
                      d="M5.075 21.225C4.44167 21.225 3.90433 21 3.463 20.55C3.021 20.1 2.8 19.5667 2.8 18.95V5.1C2.8 4.46666 3.021 3.929 3.463 3.487C3.90433 3.04566 4.44167 2.825 5.075 2.825H9.075C9.325 2.20833 9.71267 1.72066 10.238 1.362C10.7627 1.004 11.35 0.824997 12 0.824997C12.65 0.824997 13.2377 1.004 13.763 1.362C14.2877 1.72066 14.675 2.20833 14.925 2.825H18.925C19.5583 2.825 20.096 3.04566 20.538 3.487C20.9793 3.929 21.2 4.46666 21.2 5.1V18.95C21.2 19.5667 20.9793 20.1 20.538 20.55C20.096 21 19.5583 21.225 18.925 21.225H5.075ZM5.075 18.95H18.925V5.1H5.075V18.95ZM7.075 16.95H13.975V14.95H7.075V16.95ZM7.075 13.025H16.925V11.025H7.075V13.025ZM7.075 9.1H16.925V7.1H7.075V9.1ZM12 4.325C12.2333 4.325 12.425 4.25 12.575 4.1C12.725 3.95 12.8 3.75833 12.8 3.525C12.8 3.29166 12.725 3.1 12.575 2.95C12.425 2.8 12.2333 2.725 12 2.725C11.7667 2.725 11.575 2.8 11.425 2.95C11.275 3.1 11.2 3.29166 11.2 3.525C11.2 3.75833 11.275 3.95 11.425 4.1C11.575 4.25 11.7667 4.325 12 4.325Z"
                      fill="#1C1B1F"/>
                </g>
              </svg>


            </div>
          </q-item-section>

          <q-item-section>
            Документы
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/add-order">
          <q-item-section avatar>
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_31_93" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                  <rect width="24" height="24"/>
                </mask>
                <g mask="url(#mask0_31_93)">
                  <path
                      d="M5.075 21.225C4.44167 21.225 3.90433 21 3.463 20.55C3.021 20.1 2.8 19.5667 2.8 18.95V5.10001C2.8 4.46668 3.021 3.92901 3.463 3.48701C3.90433 3.04568 4.44167 2.82501 5.075 2.82501H18.925C19.5583 2.82501 20.096 3.04568 20.538 3.48701C20.9793 3.92901 21.2 4.46668 21.2 5.10001V12C20.85 11.8 20.4833 11.6333 20.1 11.5C19.7167 11.3667 19.325 11.2667 18.925 11.2V5.10001H5.075V18.95H10.975C11.0083 19.3667 11.0833 19.7623 11.2 20.137C11.3167 20.5123 11.4667 20.875 11.65 21.225H5.075ZM5.075 18.95V5.10001V11.2V11.15V18.95ZM7.075 16.95H11.05C11.1 16.6 11.1833 16.2583 11.3 15.925C11.4167 15.5917 11.55 15.2667 11.7 14.95H7.075V16.95ZM7.075 13.025H13.15C13.6667 12.5417 14.246 12.1457 14.888 11.837C15.5293 11.529 16.2083 11.3167 16.925 11.2V11.025H7.075V13.025ZM7.075 9.10001H16.925V7.10001H7.075V9.10001ZM17.925 23.125C16.5417 23.125 15.3627 22.6377 14.388 21.663C13.4127 20.6877 12.925 19.5083 12.925 18.125C12.925 16.7417 13.4127 15.5627 14.388 14.588C15.3627 13.6127 16.5417 13.125 17.925 13.125C19.3083 13.125 20.4873 13.6127 21.462 14.588C22.4373 15.5627 22.925 16.7417 22.925 18.125C22.925 19.5083 22.4373 20.6877 21.462 21.663C20.4873 22.6377 19.3083 23.125 17.925 23.125ZM17.35 21.225H18.525V18.725H21.025V17.55H18.525V15.05H17.35V17.55H14.85V18.725H17.35V21.225Z"
                      fill="#1C1B1F"/>
                </g>
              </svg>
            </div>

          </q-item-section>

          <q-item-section>
            Добавить заявку
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/parkings">
          <q-item-section avatar>
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_31_98" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                  <rect width="24" height="24"/>
                </mask>
                <g mask="url(#mask0_31_98)">
                  <path
                      d="M8 12.55C8 13.65 8.31667 14.7167 8.95 15.75C9.58333 16.7833 10.4417 17.4833 11.525 17.85C11.6083 17.8833 11.6873 17.9043 11.762 17.913C11.8373 17.921 11.9167 17.925 12 17.925C12.0833 17.925 12.1627 17.921 12.238 17.913C12.3127 17.9043 12.3917 17.8833 12.475 17.85C13.5583 17.4833 14.4167 16.7833 15.05 15.75C15.6833 14.7167 16 13.65 16 12.55V10.925C16 10.6417 15.925 10.379 15.775 10.137C15.625 9.89567 15.425 9.70833 15.175 9.575L12.675 8.325C12.4583 8.225 12.2333 8.175 12 8.175C11.7667 8.175 11.5417 8.225 11.325 8.325L8.825 9.575C8.575 9.70833 8.375 9.89567 8.225 10.137C8.075 10.379 8 10.6417 8 10.925V12.55ZM6 21C5.45 21 4.97933 20.8043 4.588 20.413C4.196 20.021 4 19.55 4 19V10C4 9.68333 4.071 9.38333 4.213 9.1C4.35433 8.81667 4.55 8.58333 4.8 8.4L10.8 3.9C11.15 3.63333 11.55 3.5 12 3.5C12.45 3.5 12.85 3.63333 13.2 3.9L19.2 8.4C19.45 8.58333 19.646 8.81667 19.788 9.1C19.9293 9.38333 20 9.68333 20 10V19C20 19.55 19.8043 20.021 19.413 20.413C19.021 20.8043 18.55 21 18 21H6ZM6 19H18V10L12 5.5L6 10V19Z"
                      fill="#1C1B1F"/>
                </g>
              </svg>


            </div>
          </q-item-section>

          <q-item-section>
            Стоянки
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/rates">
          <q-item-section avatar>
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_31_103" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                  <rect width="24" height="24"/>
                </mask>
                <g mask="url(#mask0_31_103)">
                  <path
                      d="M9.24437 16.5133C9.14422 16.9452 9.61407 17.2842 9.99231 17.0528L11.7374 15.9856C11.8984 15.8871 12.1012 15.8877 12.2617 15.9872L14.0051 17.0679C14.3829 17.302 14.8555 16.9638 14.7558 16.5307L14.2927 14.5191C14.2511 14.3382 14.3131 14.1492 14.4537 14.0281L16.0236 12.6762C16.3592 12.3872 16.1811 11.8367 15.7397 11.7991L13.6993 11.6255C13.5151 11.6098 13.3546 11.4938 13.2819 11.3238L12.458 9.39638C12.2853 8.99237 11.7129 8.99157 11.539 9.3951L10.7185 11.3C10.6455 11.4693 10.4853 11.5848 10.3017 11.6004L8.25154 11.7749C7.81146 11.8123 7.63252 12.3602 7.96568 12.6502L9.54829 14.0277C9.6878 14.1491 9.74889 14.3376 9.70711 14.5178L9.24437 16.5133ZM6.53731 21.8114C6.15924 22.0405 5.69159 21.7023 5.7909 21.2715L7.15751 15.3428C7.19904 15.1626 7.13774 14.9742 6.99813 14.853L2.41635 10.8741C2.0829 10.5845 2.26116 10.0364 2.70116 9.9984L8.75031 9.47589C8.9347 9.45996 9.09522 9.34347 9.16753 9.1731L11.5397 3.58433C11.7122 3.17814 12.2878 3.17814 12.4603 3.58433L14.8325 9.1731C14.9048 9.34347 15.0653 9.45996 15.2497 9.47589L21.2988 9.9984C21.7388 10.0364 21.9171 10.5845 21.5837 10.8741L17.0019 14.853C16.8623 14.9742 16.801 15.1626 16.8425 15.3428L18.2091 21.2715C18.3084 21.7023 17.8408 22.0405 17.4627 21.8114L12.2592 18.6571C12.0999 18.5605 11.9001 18.5605 11.7408 18.6571L6.53731 21.8114Z"
                      fill="#1C1B1F"/>
                </g>
              </svg>


            </div>
          </q-item-section>

          <q-item-section>
            Рейтинг направлений
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/cost">
          <q-item-section avatar>
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_31_108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                  <rect width="24" height="24"/>
                </mask>
                <g mask="url(#mask0_31_108)">
                  <path
                      d="M4.95 21.375L3.75 20.175L12 1.625L20.25 20.175L19.05 21.375L12 18.35L4.95 21.375ZM7.25 17.9L12 15.85L16.75 17.9L12 7.2L7.25 17.9Z"
                      fill="#1C1B1F"/>
                </g>
              </svg>

            </div>
          </q-item-section>

          <q-item-section>
            Стоимость доставки
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/profile">
          <q-item-section avatar>
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_119_113" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                      height="24">
                  <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_119_113)">
                  <path
                      d="M12 11.9C10.8333 11.9 9.84167 11.4873 9.025 10.662C8.20833 9.83733 7.8 8.85 7.8 7.7C7.8 6.53333 8.20833 5.54167 9.025 4.725C9.84167 3.90833 10.8333 3.5 12 3.5C13.1667 3.5 14.1583 3.90833 14.975 4.725C15.7917 5.54167 16.2 6.53333 16.2 7.7C16.2 8.85 15.7917 9.83733 14.975 10.662C14.1583 11.4873 13.1667 11.9 12 11.9ZM3.8 20.3V17.3C3.8 16.6833 3.95433 16.125 4.263 15.625C4.571 15.125 4.98333 14.7417 5.5 14.475C6.55 13.9417 7.61667 13.5457 8.7 13.287C9.78333 13.029 10.8833 12.9 12 12.9C13.1167 12.9 14.2167 13.029 15.3 13.287C16.3833 13.5457 17.45 13.9333 18.5 14.45C19.0167 14.7167 19.4293 15.1043 19.738 15.613C20.046 16.121 20.2 16.6833 20.2 17.3V20.3H3.8ZM6.075 18.025H17.925V17.325C17.925 17.1417 17.8793 16.975 17.788 16.825C17.696 16.675 17.575 16.5667 17.425 16.5C16.5583 16.05 15.6707 15.7167 14.762 15.5C13.854 15.2833 12.9333 15.175 12 15.175C11.0667 15.175 10.146 15.2833 9.238 15.5C8.32933 15.7167 7.44167 16.05 6.575 16.5C6.425 16.5667 6.30433 16.675 6.213 16.825C6.121 16.975 6.075 17.1417 6.075 17.325V18.025ZM12 9.625C12.5333 9.625 12.9877 9.43733 13.363 9.062C13.7377 8.68733 13.925 8.23333 13.925 7.7C13.925 7.16667 13.7377 6.71233 13.363 6.337C12.9877 5.96233 12.5333 5.775 12 5.775C11.4667 5.775 11.0127 5.96233 10.638 6.337C10.2627 6.71233 10.075 7.16667 10.075 7.7C10.075 8.23333 10.2627 8.68733 10.638 9.062C11.0127 9.43733 11.4667 9.625 12 9.625Z"
                  />
                </g>
              </svg>


            </div>
          </q-item-section>

          <q-item-section>
            Аккаунт
          </q-item-section>
        </q-item>
        <q-item clickable @click="logOut" v-ripple>
          <q-item-section avatar>
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.4">
                  <path
                      d="M12 13.05C11.75 13.05 11.5458 12.9667 11.3875 12.8C11.2291 12.6333 11.15 12.4333 11.15 12.2V3.6C11.15 3.36667 11.2333 3.16667 11.4 3C11.5666 2.83333 11.7666 2.75 12 2.75C12.25 2.75 12.4541 2.83333 12.6125 3C12.7708 3.16667 12.85 3.36667 12.85 3.6V12.2C12.85 12.4333 12.7666 12.6333 12.6 12.8C12.4333 12.9667 12.2333 13.05 12 13.05ZM12 21.2C10.7333 21.2 9.54581 20.9583 8.43748 20.475C7.32914 19.9917 6.36248 19.3375 5.53748 18.5125C4.71248 17.6875 4.05831 16.7208 3.57498 15.6125C3.09164 14.5042 2.84998 13.3167 2.84998 12.05C2.84998 10.8667 3.07914 9.7375 3.53748 8.6625C3.99581 7.5875 4.63331 6.625 5.44998 5.775C5.61664 5.60833 5.82498 5.51667 6.07498 5.5C6.32498 5.48333 6.54164 5.55833 6.72498 5.725C6.89164 5.89167 6.96664 6.09583 6.94998 6.3375C6.93331 6.57917 6.84164 6.78333 6.67498 6.95C6.00831 7.63333 5.48748 8.4125 5.11248 9.2875C4.73748 10.1625 4.54998 11.0833 4.54998 12.05C4.54998 14.1167 5.27498 15.875 6.72498 17.325C8.17498 18.775 9.93331 19.5 12 19.5C14.0666 19.5 15.825 18.775 17.275 17.325C18.725 15.875 19.45 14.1167 19.45 12.05C19.45 11.0833 19.2666 10.1625 18.9 9.2875C18.5333 8.4125 18.0166 7.625 17.35 6.925C17.1833 6.75833 17.0958 6.55417 17.0875 6.3125C17.0791 6.07083 17.1583 5.875 17.325 5.725C17.5083 5.54167 17.7291 5.46667 17.9875 5.5C18.2458 5.53333 18.4666 5.64167 18.65 5.825C19.45 6.675 20.0666 7.63333 20.5 8.7C20.9333 9.76667 21.15 10.8833 21.15 12.05C21.15 13.3167 20.9083 14.5042 20.425 15.6125C19.9416 16.7208 19.2875 17.6875 18.4625 18.5125C17.6375 19.3375 16.6708 19.9917 15.5625 20.475C14.4541 20.9583 13.2666 21.2 12 21.2Z"
                      fill="black"/>
                </g>
              </svg>
            </div>
          </q-item-section>

          <q-item-section>
            Выход
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import SearchInput from "@/components/ui/SearchInput";
import OrdersSection from "@/components/ui/ordersSection/OrdersSection";
import axios from "axios";

export default {
  name: "HeaderComponent",
  data() {
    return {
      drawer: false,
      miniState: true,
      widthScreen: null,
      save: true,
      saveBtnDisplay: false,
      addBtnDisplay: false,
    }
  },
  components: {
    SearchInput,
    OrdersSection
  },
  props: ['saveFunction'],
  beforeCreate() {
    window.addEventListener("resize", () => {
      this.widthScreen = window.innerWidth;
    });
  },
  mounted() {
    this.checkScreen()
  },
  watch: {
    widthScreen() {
      this.checkScreen()
    },
    $route() {
      this.saveBtnDisplay = false
      this.addBtnDisplay = false

      if (this.$route.name == 'order') {
        this.saveBtnDisplay = true
      }
    },
    orderData: {
      handler(val) {
        const vm = this
        vm.addBtnDisplay = !Object.values(val).some((item) => item === '')
      },
      deep: true,
    },
  },
  computed: {
    orderData() {
      return this.$store.getters.ORDER_DATA;
    },
  },
  methods: {
    checkScreen() {
      if (window.innerWidth <= 430) {
        this.save = false;
      } else {
        this.save = true
      }
    },
    callSaveData() {
      this.$emit('navigate');
    },
    callAddData() {
      const _data = this.$store.getters.ORDER_DATA
      let dataOrder = {}

      Object.assign(dataOrder, _data)

      for (let key in dataOrder) {
        if (typeof (dataOrder[key]) == 'object') {
          if (key == 'status' || key == 'operator') {
            dataOrder[key] = dataOrder[key].value
          } else {
            dataOrder[key] = dataOrder[key].label
          }
        }
      }

      axios.post('api/create-order/', dataOrder).then(r => {
        console.log(r.code)
        if (r.code == 201 || r.code == 200) {
          // for (let key in _data) {
          //   if (key != 'site_name') {
          //     _data[key] = ''
          //   }
          // }
          this.$q.notify({
            color: 'green',
            textColor: 'white',
            message: 'Заявка добавлена',
            position: 'top',
            timeout: 3000
          })
        } else {
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            message: 'Ошибка добавления',
            position: 'top',
            timeout: 3000
          })
        }
      }).catch(e => {
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          message: e.data,
          position: 'top',
          timeout: 3000
        })
      })
    },
    logOut() {
      this.$store.commit('AUTHORIZE_USER', '')
      this.$router.push({name: 'authorize'})
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/mainStyle.sass"
header
  padding: 20px 0
  border-bottom: 1px solid rgba(0, 0, 0, 0.05)

  .logo
    margin-left: 30px

  .right-container
    display: flex
    justify-content: flex-end
    flex: 1

    .save-btn
      display: flex
      align-items: center
      justify-content: center
      margin-left: 30px
      padding: 12px 18px
      line-height: 0
      background: $main-color
      border-radius: 4px
      color: white !important

    .q-btn.log-out-btn:before
      box-shadow: none

.q-drawer
  .q-item
    color: rgba(0, 0, 0, 0.4)

    .icon
      svg
        fill: rgba(0, 0, 0, 0.4)


  .q-item.q-router-link--active
    color: rgb(0, 0, 0)

    .icon
      svg
        fill: rgb(0, 0, 0)

</style>
