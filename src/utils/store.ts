import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('store', ()=>{
  const dark = ref(false)

  return {
    dark
  };
})