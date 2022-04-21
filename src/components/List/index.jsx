//列表组件
import { List, Avatar, Space,Layout,Button,message,Divider} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import './index.css'
import {getContent, reqSearchItems} from '../../api/index'
import testdata from '../../Test/testdata.json'
import { Link } from 'react-router-dom';







//封装图标样式
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
 

export default class List1 extends Component {
  handleClick = (value, key) => {
    this.props.history.push(key)
}

state = {
  pages:[],
  isSearch:false,
  keyWord:'',
}

//获取List
  getContent = async ()=>{
      const amount =100;
      let result = await getContent(amount)
      this.setState({pages:result.data,isSearch:false,keyWord:""})
      console.log(this.state)
      
      if (result.code === 200) {
        message.success('refresh successfully')
    } else {
        message.error('sorry,there\'s something wrong')
    }

   
  }

  componentDidMount(){
    this.getContent()
  }

  render() {
    
    return (
      
   <Layout className='AllList'>
      {/* 点击refresh就应该向后台请求数据  用户输入应该是 number */}
       <Button type="primary" onClick={this.getContent}>
      Refresh
    </Button>

      <div>
      <h1>
        { "展示列表"}
      </h1>

    <List 
    className="oneList"
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 5,
    }}

    dataSource = {this.state.pages}
    
    

    renderItem={item => (
     <Layout>
      <List.Item
        key={item.title}
        className='titlefont'
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
     <Divider  />
     </Layout>
    )}/>
   
     </div> 
      
    
  </Layout>
  
      
    )
  }
}
