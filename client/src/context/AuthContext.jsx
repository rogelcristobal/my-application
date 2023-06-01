import React from "react";


const AuthContext = React.createContext()

export const AuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser] = React.useState(null)
    const [userLoading,setUserLoading] = React.useState(true)
    return(
        <AuthContext.Provider value={{currentUser,setCurrentUser,userLoading,setUserLoading}}>{children}</AuthContext.Provider>
    )
}
export default AuthContext

