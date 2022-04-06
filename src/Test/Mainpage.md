#### UI组件
title 简单介绍
点击后跳转到另一个页面，也就是另一个路由
从后台获取数据

常规思路： 点一个按钮 然后按钮触发一个action(可能给这个action传值) 然后action会返回以后的状态
 1.redux可以用来发送请求的吗？'redux 用来管理状态'
 2.如何在没有点击事件的情况下向后台发送数据请求
 一上来 就呈现出数据 数据从props这里获取 props存储在redux里面 redux都有一个初始值 但是不改变的话 就不会有 
 然后比如如果你点击一下 
reducer是用来处理状态并返回新状态的


在不加触发事件的情况下，获得数据？
加一个刷新按钮，点击刷新后，就会获取最新的帖子信息？






1.点击刷新按钮,触发方法A,方法A向后台请求数据，获得数据表现在页面上。
2.点赞按钮，点击点赞按钮，触发action, action向后台发送












共享的状态改变需要用到redux
组件个人的状态改变不需要用到redux
like是组件个人的状态



点击like以后 把数据(thumbUp)传送给后台,后台返回like数量，然后setstate
点击刷新按钮 发送请求 获取数据 然后渲染到页面上

#### 
返回的应该是json
{
"code": 3213

"内容":[
{"titel":"sadsad",
"content":"sadasd"
},
{"titel":"sadsad",
"content":"sadasd"
},
{"titel":"sadsad",
"content":"sadasd"
}
]


}




#####
点击标题 每个标题配置对应的component
然后 切换不同的component