/*
包含n个action creator函数的模块
同步action: 对象 {type: 'xxx', data: 数据值}
异步action: 函数  dispatch => {}
 */
import {
    RESET_USER,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
} from './action-types'
import storageUtils from "../utils/storageUtils";
import axios from 'axios'


/*
接收用户的同步action
 */
export const receiveUser = (user) => ({type: RECEIVE_USER, user})

/*
显示错误信息同步action
 */
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})

export const logout = () => {
    // 删除local中的user
    storageUtils.removeUser()
    // 返回action对象
    return {type: RESET_USER}
}
/*
登陆的异步action
 */


//异步 所以action是一个函数    action  store reducers
//
export const login = (username, password) => {

    return async dispatch => {
        //获得login之后就开始就发送给后台
        //如果发送成功，对面就会返回一个token和一个用户信息，然后存储用户信息和token，然后
        //返回的部分 有code 有user数据 有token
        axios.post('/login', {username, password}).then((res) => {
            if (res.data.code === 200) {
                console.log(res)
                const user = res.data.data
                const token = res.headers.authorization
                storageUtils.saveUser(user)
                storageUtils.saveToken(token)
                //目前store里面的状态就是登陆的user
                dispatch(receiveUser(user))
            } else {
                const msg = res.data.msg
                dispatch(showErrorMsg(msg))
            }
        })
    }
}