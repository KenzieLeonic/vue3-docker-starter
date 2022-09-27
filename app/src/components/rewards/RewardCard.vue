<template>
   <div class="grid grid-cols-2 p-4 mb-4 border-2 border-blue-800 rounded-lg">
        <h3 class="text-xl">
          {{ reward.name }}
        </h3>
        <p class="text-5xl">
          {{ reward.point }}
        </p>

     <div class="italic">
       <slot></slot>
     </div>

     <div class="text-2xl font-bold">
       <slot name="total_amount"></slot>
     </div>
     <router-link v-if="url != ''" :to="url">Detail</router-link>
<!--        <span class="text-blue-700 my-style"-->
<!--              :class="url == '' ? '' : 'cursor-pointer'"-->
<!--              @click="onClickButton()">Detail 2</span>-->

              
        <button @click="onClickButton()"
                class="px-2 py-1 border rounded-xl">
          Redeem
        </button>

     <div @click="onClickCounter()" class="grid grid-cols-2">
       <button class="px-2 py-1 border rounded-xl bg-green-200">
         {{counter_store.counter}} |
         {{counter_store.doubleCount}}
       </button>
     </div>

        <button @click="onClickLike()"
                class="px-2 py-1 border rounded-xl bg-yellow-200">
          {{likeCount}} likes
        </button>
      </div>
</template>

<script>
import {useCounterStore} from '@/stores/counter.js';
    export default {
      setup(){
        //ถ้าเหมือนกันให้เป็น return {counter_store:counter_store}
        const counter_store = useCounterStore()

        return {counter_store:counter_store}
      },
      data() {
        return{
          likeCount:0
        }
      },
        props:{
          reward:Object,
        url:{
          type:String,
          default:''
        }
      },
      methods:{
        onClickButton(){
          if(this.url != ''){
            this.$router.push(this.url)
          }
        },
        onClickLike(){
          this.likeCount++
        },
        onClickCounter()  {
          this.counter_store.increment()
        },
        
      }
    }
    
</script>

<style scoped>
.my-style{
  display: block;
  padding: 5px;
  background-color: #F2C5E0;
}
</style>



