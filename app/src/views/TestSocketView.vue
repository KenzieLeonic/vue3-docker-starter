<template>
  <div class="m-8">
    <h1>Socket.io</h1>
  </div>
  <div class="m-8">
    <input type="text" v-model="message">
    <button @click="sendMessage()">Send</button>
  </div>
  <div>
    <ul>
      <li v-for="m in messages" :key="m">
        {{ m }}
      </li>
    </ul>
  </div>
</template>

<script>
import SocketioService from "../services/socketio.js"

export default {

  data() {
    return {
      message: '',
      messages: [],
    }
  },
  methods: {
    sendMessage() {
      const socket_id = SocketioService.getSocketId()
      console.log("socket_id",socket_id)
      SocketioService.sendToServer('hello.message',{
        message: this.message,
        sender_id: socket_id
      })
      this.message = ''
    },
    onReplyMessage(data){
      this.messages.push(data)
    }
  },
  created() {
    SocketioService.setupSocketConnection()
    SocketioService.getSocket().on('hello.reply',this.onReplyMessage)
  }
}
</script>

<style scoped>

</style>