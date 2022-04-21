//列表组件
import { List, Avatar, Space,Layout,Button,message} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import './index.css'
import { Link } from 'react-router-dom';

//用来封装图标样式的 
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
 

export default class searchList extends Component {
  
  handleClick = (value, key) => {
    this.props.history.push(key)
}

state = {
  pages:[],
  isSearch:false,
  keyWord:'',
}

//父子组件之间传递数据
componentDidMount(){
  this.token = PubSub.subscribe('KeyWords',(_,stateObj)=>{
      this.setState(stateObj)
      console.log(this.state)
      
  })
}

componentWillUnmount(){
  PubSub.unsubscribe(this.token)
}

  

  render() {
    
    return (
      
   <Layout className='AllList'>

      <div>
      <h1>
        { "查询结果(关键词 " + this.state.keyWord+")"}
      </h1>

    <List 
    className="oneList"
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}

    dataSource = {this.state.pages}
    
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }

    renderItem={item => (

      <List.Item
        key={item.title}
       
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >

        <List.Item.Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title={<Link to={'/article/'+ item.id} >{item.title}</Link>}
          description={item.description}
        />


      </List.Item>
    )}/>
      </div>
      
    
  </Layout>
  
      
    )
  }
}