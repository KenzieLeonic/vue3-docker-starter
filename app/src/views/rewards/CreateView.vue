<template>
  <div class="m-8">
    <h1 class="text-3xl">Create New Reward</h1>

    <div>
      <div>
        <label for="name">Reward Name</label>
        <input type="text" v-model="reward.name">
      </div>

      <div>
        <label for="detail">Detail</label>
        <textarea name="" id="" cols="30" rows="10" v-model="reward.detail"></textarea>
      </div>

      <div>
        <label for="total_amount">Total Amount</label>
        <input type="number" v-model="reward.total_amount">
      </div>

      <div>
        <label for="point">Point</label>
        <input type="number" v-model="reward.point">
      </div>

      <button @click="saveNewReward()" class="px-4 py-2 rounded-lg bg-lime-400">
        Create
      </button>
    </div>
    <div class="mt-8">
      (preview)
      <!-- ส่ง static value -->
      <reward-card :reward="reward"></reward-card>
      <div class="grid grid-cols-2 p-4 mb-4 border-2 border-blue-800 rounded-lg">
        <h3 class="text-xl">
          {{ reward.name }}
        </h3>
        <p class="text-5xl">
          {{ reward.point }}
        </p>
        <span>Detail</span>
        <button v-on:click="selectRewards(reward)"
                class="px-2 py-1 border rounded-xl">
          Redeem
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import RewardCard from '@/components/rewards/RewardCard.vue'
import {useRewardStore} from "@/stores/reward"
import SocketioService from '@/services/socketio.js'

export default {
  setup(){
    const reward_store = useRewardStore()
    return {reward_store}
  },
  data() {
    return {
      reward: {
        name: '',
        detail: '',
        total_amount: 1,
        point: 0
      },
      error: null
    }
  },
  components: {
    RewardCard
  },
  created() {
    SocketioService.setupSocketConnection()
  },
  methods: {
    async saveNewReward() {
      try {
        const reward_id = await this.reward_store.add(this.reward)
        if (reward_id) {
          SocketioService.sendToServer('rewards.create', {
            success: true
          })
          this.$router.push(`/rewards/${reward_id}`)
        }
      } catch (error) {
        this.error = error.message
        console.error(error)
      }
    }
  }
}
</script>

<style>

</style>