
import ajax from './ajax'
const BASE = ''
export const reqAddUser = (username, password, email, major, gender, grade) => ajax(BASE + '/user/addUser', {
    username, password, email, major, gender, grade
}, 'POST')
export const getContent = (amount,user_id) => ajax(BASE + '/getContent', {   //增添userid
    amount,user_id
})
export const ReqCreate = (title, description, content, author_id) => ajax(BASE + '/create', {
    title, description, content, author_id
}, 'POST')
export const ReqPost = (post_id,user_id) => ajax(BASE + '/getArticle', {post_id,user_id}) //增添userid

export const sendComment = (comment, blogId, authorId) => ajax(BASE + '/sendComment', {
    comment, blogId, authorId
}, 'POST')
export const thumbArticleOne = (blog_id, user_id) => ajax(BASE + '/user/thumbArticleOne', { blog_id, user_id }, 'POST')
export const thumbArticleTwo = (blog_id) => ajax(BASE + '/user/thumbArticleTwo', { blog_id }, 'POST')
export const getComment = (blogId) => ajax(BASE + '/getComment', { blogId })
export const reqSearchItems = (keyword,user_id) => ajax(BASE + '/keyWords', {   //增添userid
    keyword,user_id
}, 'POST')
export const collectOne = (blog_id, user_id) => ajax(BASE + '/user/collectOne', { blog_id, user_id }, 'POST')
export const collectTwo = (blog_id) => ajax(BASE + '/user/collectTwo', { blog_id }, 'POST')
export const getPerson = (author_id) => ajax(BASE + '/user/getPerson', { author_id })

export const editBlog = (blog_id, title, description, content) => ajax(BASE + '/editBlog', { 
    blog_id, title, description, content })