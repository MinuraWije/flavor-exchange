import {createSlice, PayloadAction} from "@reduxjs/toolkit"


interface AuthState{
    user:string | null
}

const intitialState: AuthState = {
    user: localStorage.getItem('user') || null,
}

const authSlice = createSlice({
    name: "auth",
    intitialState,
    reducers:{
        login(state, action:PayloadAction<string>){
            state.user = action.payload
            localStorage.setItem('user', action.payload)
        },
        logout(state){
            state.user = null
            localStorage.removeItem('user')
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;