import React, { Component } from 'react'
import { ReqPost,thumbArticleOne,thumbArticleTwo } from '../../api/index';
import axios from 'axios';
import './article.less';
import { Comment, Avatar, Form, Button, List, Input, Tooltip,message,Icon} from 'antd';
import moment from 'moment';
import { HeartTwoTone} from '@ant-design/icons';
import {sendComment} from '../../api/index';
import storageUtils from "../../utils/storageUtils";

//评论展示区
//发表评论 回复评论 和发布评论
//展示区的数据 应该通过接口获得 如何调用接口? 传一个postId给后台 然后获取数据
const data = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  //回复评论
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];



//评论编辑区


//点击后发给后端+展示出来
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>

    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default class article extends Component {

  
  //存储的state
  
  state = {
        postId: '',
        postInfo: {},
        comments: [],
        submitting: false,
        value: '',
        //点赞功能: like是点赞的数量 isLiked是用来判断是否已经点赞
        like:null,
        isLiked:null,
        
        
        
     };

    
      
     handleSubmit = async(values) => {
      if (!this.state.value) {
        return;
      }
      //还有一个功能是 传输输入的值到后台 this.
      const{comment} = values;
      const{postId} = this.state.postId;
      let result = await sendComment(comment,postId);
      //返回过来
      //content这里可能要用redux
      if (result.others === 'sadsad') {
        message.success('comment successfully')
    } else {
        message.error('评论发送失败了')
    }


      this.setState({
        submitting: true,
      });



  
      setTimeout(() => {
        this.setState({
          submitting: false,
          value: '',
          comments: [
            ...this.state.comments,
            //输入的评论
            {
              author: 'Han Solo',
              avatar: 'https://joeschmoe.io/api/v1/random',
              content: <p>{this.state.value}</p>,
              datetime: moment().fromNow(),
            },
          ],
        });
      }, 1000);
    };
  
    //更新输入的值的
    handleChange = e => {
      this.setState({
        value: e.target.value,
      });
    };
  
 
  

  //通过ID获取后 将内容存储在state中



  //有一个bug   就是请求数据多次?????
  //response 直接返回的是数据 没有任何数据头 比如code 之类的? 是不是在拦截头那里拦截了? 这里的response有些不一样....
  componentWillMount() {

    const postId = this.props.match.params.postId;
    // 文章的id 
    this.setState({ postId });
    //接口请求
    //异步操作 
    ReqPost(postId).then(response=>{
        console.log("--------------------");
        console.log(response.title);

        const postInfo = response;
        this.setState({ postInfo });
        }).catch(error=>{
          console.log("出错了!!!")
        })


    //点赞功能: 这个接口是把postId传给后台 然后后台返回点赞的数量,然后把这个数量存储到state中
    thumbArticleTwo(postId).then(response=>{
      console.log("test 点赞量");
      console.log(response.like);
         const like = response.like;
         this.setState({like:like});}).catch(error=>{console.log("点赞更新失败")})

     
      } 
  

  
  render() {
   // const postId = this.state.postId;
   //从后台获取数据后存进state 然后调用
   //comment是
   //submitting
   //value
   const thumbArticle = async () => {
     const postId=this.state.postId;
     const userId = storageUtils.getUserName();
     const isLiked= this.state.isLiked;
     console.log("下面是userid")
     console.log(userId);
     //点赞功能: 这个接口作用是把postId和userId传给服务器,说明这篇文章点赞过了或者是取消点赞了,然后对应的设置点赞数量
     let result = await thumbArticleOne(postId,userId);
     console.log("下面是返回的数据");
     //result只包含msg(即json数据)
     console.log(result);
    if (result.msg === "我已经收到你的点赞") {
        message.success('点赞成功')
    } else {
        message.error('点赞失败')
    }
    //从后台获取like
    if(isLiked){
     if(isLiked==='like'){
      this.setState({isLiked:null,like:this.state.like-1})
     }else{
      this.setState({isLiked:'like',like:this.state.like+1})
     }


    }
    else{this.setState({isLiked:'like',like:this.state.like+1})}
   
    
};
    const { comments, submitting, value } = this.state;
    const postInfo = this.state.postInfo;
    const postId = this.state.postId;
    console.log("look")
    console.log(postId);
    console.log(postInfo);
    return (
      <div>
          <span>
          <div>
        <div className="panel" >


          <div className="topic-header">
            <span className="topic-title">
              <span className="topic-tab-type">{this.state.postInfo.major}</span>
                {this.state.postInfo.title}
            </span>
            <div className="topic-title-info">
            
              <span>发布于:  2022.4.6     </span>
             

              <span>作者:   {this.state.postInfo.username}</span> 
              {/* 点赞功能:这里是调用点赞功能的地方 */}
              <span onClick={thumbArticle} >
                    {
                    this.state.isLiked==='like' ? '💓' :'🖤'
                    }{this.state.like}
                </span>
            </div>
            <div className="topic-description">
              <span>{this.state.postInfo.description}</span>  
            </div>
          </div>



          <div
            //这里显示内容
            className="topic-content"
            dangerouslySetInnerHTML={{__html: this.state.postInfo.content}}
          />
        </div>
      </div>
           </span>
        

      {/* 评论展示区 */}
      <List
    className="comment-list"
    header={`${data.length} replies`}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <li>
        <Comment
          actions={item.actions}
          author={item.author}
          avatar={item.avatar}
          content={item.content}
          datetime={item.datetime}
        />
      </li>
    )}
  />



      {/* 评论编辑区 */}
      {/* 获取评论区内容 并触发接口 */}
      {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
         
          content={
            <Editor
            // 更新input的值到state中
              onChange={this.handleChange}
            //
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
     
   
  

      </div>
    )
  }
}
