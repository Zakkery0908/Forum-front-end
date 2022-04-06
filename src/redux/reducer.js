/*
用来根据老的state和指定的action生成并返回新的state的函数
 */
import {combineReducers} from 'redux'

/*
用来管理头部标题的reducer函数
 */


//reducers 用来改变状态的  提供给他 prestate和data 然后返回结果状态给store
import {
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
} from './action-types'
import {message} from "antd";
import storageUtils from "../utils/storageUtils";
//import {act} from "@testing-library/react";

/*
用来管理当前登陆用户的reducer函数
 */


//zeqiang
//reducer接收到两个参数：prestate和action，然后根据不同的action对prestate做出不同的操作  
//注意：action：{type，data}   const{type，data} = action
const initUser = storageUtils.getUser()
function user(state = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user   //返回
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            // state.errorMsg = errorMsg  // 不要直接修改原本状态数据
            message.error(errorMsg)
            return {...state, errorMsg}
        case RESET_USER:
            return {}
        default:
            return state
    }
}

/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    user: {}
  }
 */
export default combineReducers({
     user
})