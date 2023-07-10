import React, { createContext } from "react";
import { io } from "socket.io-client";
const SocketContext = createContext()

export const SocketProvider=({children})=>{

    const [socket,setSocket] = React.useState(null)

    React.useEffect(()=>{
        const newSocketConnection = io('http://localhost:3001')
        setSocket(newSocketConnection)
        return()=> newSocketConnection.disconnect()
    },[])
    return(
        <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
    )
}

export default SocketContext