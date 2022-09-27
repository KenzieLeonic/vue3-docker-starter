import {defineStore} from "pinia"
import {rewardAPI} from "@/services/api"

export const useRewardStore = defineStore("rewards", {
    state: () => {
        return {
            rewards: []
        }
    },
    getters: {
        getRewards:(state) => state.rewards,
            sortByPoint(state){
             const sortable = [...state.rewards]
                return sortable.sort((a,b)=>{
                    return a.point - b.point
                })
            },
        sortByName(state){
            const sortable = [...state.rewards]
            return sortable.sort((a, b)=>{
                return (a.name).localeCompare(b.name)
                })
            }
        },
    actions: {
        async fetch(){
            this.rewards = await rewardAPI.getAll()
        },
        async add(reward){
            const responce = await rewardAPI.saveNew(reward)
            if (responce.success){
                const reward_id = responce.reward_id
                this.rewards.push({...reward});
                return reward_id
            }
            return false
        },
        delete(reward){
            //ให้อยู่ return true
            this.rewards = this.rewards.filter((reward) => reward.id != id)
        }
    },
})
