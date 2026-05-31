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
          <v-btn color="blue" rounded="lg" prepend-icon="mdi mdi-plus" @click="openAddCardDialog">添加银行卡</v-btn>
        </div>
      </div>
      <div class="section_info_desktop">
        <InfoPanel title="银行卡数量" :content="cards.length" />
        <InfoPanel title="余额" :content="balanceText" />
        <InfoPanel title="启用中" :content="enabledCardCount" />
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
              <InfoPanel title="银行卡数量" :content="cards.length" />
            </div>
          </v-carousel-item>
          <v-carousel-item>
            <div class="carousel_item">
              <InfoPanel title="余额" :content="balanceText" />
            </div>
          </v-carousel-item>
          <v-carousel-item>
            <div class="carousel_item">
              <InfoPanel title="启用中" :content="enabledCardCount" />
            </div>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div class="cardIndexIndicator">
        <i :class="cardIndex==0 ? 'fa-solid fa-circle' : 'fa-regular fa-circle'" style="font-size: 8px;"></i>
        <i :class="cardIndex==1 ? 'fa-solid fa-circle' : 'fa-regular fa-circle'" style="font-size: 8px;"></i>
        <i :class="cardIndex==2 ? 'fa-solid fa-circle' : 'fa-regular fa-circle'" style="font-size: 8px;"></i>
      </div>
      <div class="filter_panel_desktop">
        <v-text-field 
          variant="outlined" 
          density="compact" 
          hide-details 
          prepend-inner-icon="mdi mdi-magnify" 
          placeholder="搜索" 
          v-model="searchKeyword"
          @update:model-value="getCards"
        />
        <v-select
          label="银行"
          hide-details
          density="compact"
          :items="banks"
          variant="outlined"
          v-model="selectedBank"
          @update:modelValue="getCards"
        ></v-select>
        <v-select
          label="类型"
          hide-details
          density="compact"
          :items="cardTypes"
          variant="outlined"
          v-model="selectedCardType"
          @update:modelValue="getCards"
        ></v-select>
      </div>
      <div class="filter_panel_desktop_2">
        <v-checkbox label="隐藏停用卡片" hide-details v-model="hideDisabled" @update:model-value="getCards" />
      </div>
      <div class="filter_panel_mobile">
        <div class="filters" v-if="filters.length!=0">
          <v-chip v-for="(item, index) in filters" :key="index" color="green">
            {{ item }}
          </v-chip>
        </div>
        <div class="filters" v-else>
          <v-chip>/</v-chip>
        </div>
        <v-btn rounded="lg" color="blue" @click="dialog=true">筛选</v-btn>
      </div>

      <div class="card_list">
        <CardItem v-for="(item, index) in cards" :key="index" :card="item" />
      </div>
    </div>
  </div>

  <v-dialog v-model="dialog" width="auto">
    <v-card title="筛选银行卡" max-width="400" min-width="300">
      <template v-slot:actions>
        <v-btn class="ms-auto" text="完成" @click="dialog = false"></v-btn>
      </template>
      <v-card-text>
        <v-text-field 
          variant="outlined" 
          density="compact" 
          hide-details 
          prepend-inner-icon="mdi mdi-magnify" 
          placeholder="搜索" 
          v-model="searchKeyword"
          @update:model-value="getCards"
        />
        <v-select
          label="银行"
          hide-details
          density="compact"
          :items="banks"
          variant="outlined"
          v-model="selectedBank"
          @update:modelValue="getCards"
          class="mt-8"
        ></v-select>
        <v-select
          label="类型"
          hide-details
          density="compact"
          :items="cardTypes"
          variant="outlined"
          v-model="selectedCardType"
          @update:modelValue="getCards"
          class="mt-8"
        ></v-select>
      </v-card-text>
    </v-card>
  </v-dialog>
  <AddCardDialog ref="addCardDialogRef" @reload="getCards()" />
  <v-snackbar v-model="snackbar">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">关闭</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import TitleBar from '../components/TitleBar.vue';
import InfoPanel from '../components/InfoPanel.vue';
import AddCardDialog from '../components/AddCardDialog.vue';
import { computed, onMounted, ref } from 'vue';
import Store from '../utils/store';
import { storeToRefs } from 'pinia';
import { formatBalance, getCards } from '../utils/home';
import CardItem from '../components/CardItem.vue';

const addCardDialogRef = ref();

const snackbar=ref(false);
const text=ref('');

const openAddCardDialog = () => {
  addCardDialogRef.value.open();
};

const store=Store();
const { searchKeyword, banks, selectedBank, cardTypes, selectedCardType, hideDisabled, cards } = storeToRefs(store);

const cardIndex = ref(0);
const dialog = ref(false);

const filters=computed(()=>{
  let filter = [];
  if(searchKeyword.value.length>0) filter.push('关键字');
  if(selectedBank.value!='全部') filter.push('银行');
  if(selectedCardType.value!='全部') filter.push('类型');
  return filter;
});

const enabledCardCount=computed(() => {
  return cards.value.filter(card => card.status == 1).length;
})

const balanceText = computed(() => {
  const enabled = cards.value.filter(card => card.status === 1)

  const balance = enabled.reduce((sum, card) => {
    return sum + card.balance
  }, 0)

  return `¥ ${formatBalance(balance)}`
})

onMounted(async ()=>{
  const response=await getCards();
  if(!response.ok){
    snackbar.value=true;
    text.value=response.data;
  }
})

</script>

<style scoped>
@import "../styles/pages/home.css";
</style>