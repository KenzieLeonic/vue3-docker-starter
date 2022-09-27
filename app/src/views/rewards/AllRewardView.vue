<!-- template ต้องมี เพราะใช้แสดงผล ส่วนอื่นไม่ต้องมีก็ได้ -->
<!-- เปรียนเสมือน @section ใน Laravel -->

<!-- vue.js ไม่มี controller แต่มี Reactivity ควบคุมการเปลี่ยนแปลงของ data
ก็เลยมี framework ชื่อ React ขึ้นมา -->

<template>
  <section class="mx-8">
    <h1 class="text-3xl text-yellow-700">
      {{ title }}
    </h1>

    <div v-if="error != null">
      {{ error }}
    </div>

    <div>
      <label> Sort By</label>
      <select v-model="sortOption">
      <option value="default">----</option>
      <option value="name">name</option>
      <option value="point">point</option>
      </select>
    </div>

    <div class="grid grid-cols-2 my-4">
      <button class="px-2 py-1 mx-4 bg-orange-200 border rounded-xl" @click="onClickSortByPoint()">
        sort by point
      </button>
      <button class="px-2 py-1 mx-4 bg-pink-200 border rounded-xl" @click="onClickSortByName()">
        sort by name
      </button>
    </div>

    <RewardCard v-for="reward in rewards"
    :reward="reward"
    :key="reward.id"
    :url="`rewards/${reward.id}`">
      {{reward.detail}}
      <template v-slot:total_amount>
      จำกัดจำนวน {{reward.total_amount}} สิทธิ์
    </template>
    </RewardCard>
<!--    {{selected}}-->
  </section>
</template>

<script>
import RewardCard from '@/components/rewards/RewardCard.vue'
import { useRewardStore } from '@/stores/reward.js'
import SocketioService from "../../services/socketio.js"
// เก็บ data เมื่อเปลี่ยนแปลง
export default {
  setup(){
    const reward_store = useRewardStore()
    return {reward_store}
  },
  data() {
    return {
      title: "Reward List",
      selected: null,
      rewards: null,
      error: null,
      sortOption: 'default',
    }
  },
  watch: {
    sortOption(newOprion, oldOption) {
      switch (newOprion){
        case 'name':
              this.rewards = this.reward_store.sortByName
              break;
        case 'point':
          this.rewards = this.reward_store.sortByPoint
          break;
        default:
          this.rewards = this.reward_store.getRewards
          break;
      }
    }
  },
  components:{
    RewardCard
  },
  created() {
    SocketioService.setupSocketConnection()
    SocketioService.getSocket().on('rewards.index', this.refreshRewards)
    },
  methods: {
    async refreshRewards(data){
      if(data.refresh){
        await this.reward_store.fetch()
        this.rewards = this.reward_store.getRewards
        this.sortOption = 'default'
      }
    },
    onClickSortByPoint() {
      this.rewards = this.reward_store.sortByPoint
    },
    onClickSortByName() {
      this.rewards = this.reward_store.sortByName
    },
    selectRewards(reward) {
      // ไม่ใช้แค่เข้าลิ้ง ทำอะไรไปด้วย ใช้ push
      // ถ้าแค่เข้าหน้าเว็บ ใช้ routerlink
      this.$router.push({
        name: 'rewards.show',
        params: { id: reward.id }
      })
    }
  },
  async mounted() {
    console.log("mounted")
    this.error = null

    // const response = axios.get(url)
    //         .then((responseData) => {
    //             this.rewards = responseData.data.data
    //         })

    // non-blocking I/O - อันแรกทำไม่เสร็จ อันอื่นอาจจะทำไปก่อนเลยได้ ไม่มีการ block
    // asynchronous language

    // solutions
    // 1) callback
    // 2) promise

    try {
      await this.reward_store.fetch()
      this.rewards = this.reward_store.getRewards
    } catch (error) {
      this.error = error.message
    }
  }
}
</script>

<style>

</style>