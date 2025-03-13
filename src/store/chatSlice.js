import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chats: [],
  activeChat: null,
  messages: [],
  loading: false,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setChats, setActiveChat, setMessages, addMessage, setLoading } = chatSlice.actions
export default chatSlice.reducer