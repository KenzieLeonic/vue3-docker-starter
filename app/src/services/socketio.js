import { io } from 'socket.io-client'

class SocketioService{
    socket;
    constructor() {}
    setupSocketConnection(){
        this.socket = io('http://localhost:4000')
    }
    getSocket(){
        return this.socket
    }
    getSocketId(){
        return this.socket.id
    }
    sendToServer(event,data){
        this.socket.emit(event,data)
    }
}

export default new SocketioService()
