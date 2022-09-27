<template>
  <div class="m-8" v-if="reward != null">
    <h1 class="text-3xl">
      {{ reward.name }}
    </h1>

    <p>
      {{ reward.detail }}
    </p>

    <p>
      Amount: {{ reward.total_amount}}
    </p>
    <p>
      Redeem with {{ reward.point }} points
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Reward',
      error: null,
      reward: null
    }
  },
  async created() {
    console.log(this.$route)
    const id = this.$route.params.id
    // string template/interpolation
    const url = `/rewards/${id}`

    try {
      const response = await this.$axios.get(url)
      if (response.status === 200) {
        this.reward = response.data.data
        console.table(this.reward)
      }
    } catch (error) {
      console.error(error)
      this.error = error.message

    }
  }
}
</script>

<style>

</style>