import React, { Component } from 'react'
import { ReqPost } from '../../api/index';
import axios from 'axios';
import './article.less';
import { Comment, Avatar, Form, Button, List, Input, Tooltip} from 'antd';
import moment from 'moment';

//评论展示区
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
     };

     handleSubmit = () => {
      if (!this.state.value) {
        return;
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
  
    handleChange = e => {
      this.setState({
        value: e.target.value,
      });
    };
  
 
  

  //通过ID获取后 将内容存储在state中



  //有一个bug 就是请求数据多次?????
  //response 直接返回的是数据 没有任何数据头 比如code 之类的? 是不是在拦截头那里拦截了? 这里的response有些不一样....
  componentWillMount() {
    const postId = this.props.match.params.postId;
    this.setState({ postId });
    ReqPost(postId).then(response=>{
        console.log("--------------------");
        console.log(response.title);
        const postInfo = response;
        this.setState({ postInfo });
        }).catch(error=>{
          console.log("出错了!!!")
        })
      } 
  

  
  render() {
   // const postId = this.state.postId;
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
      {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
          content={
            <Editor
              onChange={this.handleChange}
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
