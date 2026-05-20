<template>
  <TitleBar :is-login="true" style="position: sticky;" />
  <div class="main">
    <div class="page">
      <div class="section_title">
        <div class="flex flex-col">
          <div class="manage_title">银行卡管理</div>
          <div class="all_title">全部银行卡</div>
        </div>
        <div class="section_title_actions">
          <v-btn color="blue" rounded="lg" prepend-icon="mdi mdi-plus">
            添加银行卡
          </v-btn>
        </div>
      </div>
      <div class="section_info_desktop">
        <InfoPanel title="银行卡数量" content="3" />
        <InfoPanel title="余额" content="¥123456.00" />
        <InfoPanel title="启用中" content="3" />
      </div>
      <div class="carousel">
        <v-carousel 
          height="120"
          hide-delimiter-background 
          :show-arrows="false" 
          hide-delimiters
          v-model="cardIndex"
        >
          <v-carousel-item>
            <div class="carousel_item">
              <InfoPanel title="银行卡数量" content="3" />
            </div>
          </v-carousel-item>
          <v-carousel-item>
            <div class="carousel_item">
              <InfoPanel title="余额" content="¥123456.00" />
            </div>
          </v-carousel-item>
          <v-carousel-item>
            <div class="carousel_item">
              <InfoPanel title="启用中" content="3" />
            </div>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div class="cardIndexIndicator">
        <i :class="cardIndex==0 ? 'fa-solid fa-circle' : 'fa-regular fa-circle'" style="font-size: 8px;"></i>
        <i :class="cardIndex==1 ? 'fa-solid fa-circle' : 'fa-regular fa-circle'" style="font-size: 8px;"></i>
        <i :class="cardIndex==2 ? 'fa-solid fa-circle' : 'fa-regular fa-circle'" style="font-size: 8px;"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TitleBar from '../components/TitleBar.vue';
import InfoPanel from '../components/InfoPanel.vue';
import { ref } from 'vue';

const cardIndex = ref(0);

</script>

<style scoped>
@import "../styles/pages/home.css";
</style>