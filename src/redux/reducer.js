
import { combineReducers } from 'redux'
import moment from 'moment';
import {
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
    SEND_COMMENT
} from './type'
import { message } from "antd";
import storageUtils from "../utils/storageUtils";


const initUser = storageUtils.getUser()
function user(state = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            message.error(errorMsg)
            return { ...state, errorMsg }
        case RESET_USER:
            return {}
        default:
            return state
    }
}



const initComment = [
    {
        //actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),

    },
    {
        //actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
    },];
function comment(state = initComment, action) {
    switch (action.type) {
        case SEND_COMMENT:
            return [...state, {
                //actions: [<span key="comment-list-reply-to-0">Reply to</span>],
                author: 'Han Solo',
                avatar: 'https://joeschmoe.io/api/v1/random',
                content: (
                    <p>
                        test comment
                    </p>
                ),
            },]
        default:
            return state
    }
}


export default combineReducers({
    user, comment
})