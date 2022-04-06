//列表组件
import { List, Avatar, Space,Layout,Button,message} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React, { Component } from 'react'
import './index.css'
import {getContent} from '../../api/index'
import testdata from '../../Test/testdata.json'
import { Link } from 'react-router-dom';


//获取了23个信息
const listData = [];
for (let i = 0; i < 23; i++) {
    //这里的信息应该从后台获取
    listData.push({
    href: 'https://ant.design',
    title: `分享贴子 ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      '雅思8.0成功到手！学习经验+资源分享贴',
    content:
     '帖子内容',
  });
}










//用来封装图标样式的  text也是我们要从后台获取的值
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
 

export default class List1 extends Component {
  //存储的是所有内容
  handleClick = (value, key) => {
    this.props.history.push(key)
}

  state = {pages:[ 
  {"href": "https://ant.design",
    "title": "分享贴子 ",
    "id": 1 ,
    "avatar": "https://joeschmoe.io/api/v1/random",
    "description":
      "这是第二条简单介绍",
    "content":"第一条内容"},
  {"href": "https://ant.design",
      "title": "分享贴子 ",
      "id": 2,
      "avatar": "https://joeschmoe.io/api/v1/random",
      "description":
        "这是第三条简单介绍",
      "content":"第一条内容"},
  {"href": "https://ant.design",
      "title": "分享贴子 ",
      "id": 3,
      "avatar": "https://joeschmoe.io/api/v1/random",
      "description":
        "这是第四条简单介绍",
      "content":"第一条内容"}]}

  getContent = async ()=>{
  const amount =100;
  let result = await getContent(amount)
  this.setState({pages:[{"href": "https://ant.design",
  "title": "分享贴子 ",
  "avatar": "https://joeschmoe.io/api/v1/random",
  "description":
    "这是第一条简单介绍",
  "content":"第一条内容"}]})
  if (result.code === 200) {
    message.success('refresh successfully')
} else {
    message.error('sorry,there\'s something wrong')
}
//数据应该是 result.data.allContent  他其实是一个list



  
  }

 
  render() {
    
    return (
    <Layout className='AllList'>
      {/* 点击refresh就应该向后台请求数据  用户输入应该是 number */}
       <Button type="primary" onClick={this.getContent}>
      Refresh
    </Button>
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

    //dataSource={this.state.pages}
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


        {item.content}
      </List.Item>
    )}/>
    
     
     
  </Layout>
  
      
    )
  }
}
