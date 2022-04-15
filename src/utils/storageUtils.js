/*
进行local数据存储管理的工具模块
 */
//import { destroyFns } from 'antd/lib/modal/Modal'
import store from 'store'

const USER_KEY = 'user_key'
const USER_NAME = 'user_name'
const TOKEN = 'token'
const USER_ID ='user_id'

// user里面存储的是login接口返回的data
const user = {
    /*
    保存user
     */
    saveUser(user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY, user)
    },

    /*
    读取user
     */
    getUser() {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },

    /*
    删除user
     */
    removeUser() {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    },
    saveUserId(userId){
        store.set(USER_ID,userId)
    },
    getUserId(){
        return store.get(USER_ID) 
    },
    /*
    保存用户名
     */
    saveUserName(userName) {
        store.set(USER_NAME, userName)
    },

    /*
    不保存用户名
     */
    removeUserName() {
        store.remove(USER_NAME)
    },

    /*
    读取userName
     */
    getUserName() {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_NAME)
    },

    saveToken(token) {
        store.set(TOKEN, token)
    },

    removeToken() {
        store.remove(TOKEN)
    },

    getToken() {
        return store.get(TOKEN)
    }
}
export default user;