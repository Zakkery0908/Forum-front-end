//列表组件
import { List, Avatar, Space,Layout,Button,message} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import './index.css'
import { Link } from 'react-router-dom';
import img1 from '../../img/img4.png'
import img2 from '../../img/img2.png'
import img3 from '../../img/img3.png'
import img4 from '../../img/img1.png'
import ava1 from '../../img/avatar1.svg'
import ava2 from '../../img/avatar2.svg'
import ava3 from '../../img/avatar3.svg'
import ava4 from '../../img/avatar4.svg'
import ava5 from '../../img/avatar5.svg'

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
  images:[
    img1,
    img2,
    img3,
    img4,
  ],
  avatars:[
    ava1,
    ava2,
    ava3,
    ava4,
    ava5
  ]
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
      <h1 style={{marginLeft:'35px', 
                      size: '30px',
                      marginTop:'10px',
                      fontSize:'20px'
                    }}>
        { "search result (keyword: " + this.state.keyWord+")"}
      </h1>

    <List 
    className="oneList"
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 10,
    }}

    dataSource = {this.state.pages}
    

    renderItem={(item,index) => (

      <List.Item
        key={item.title}
       
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
              <img
              width={250}
              style={{
                height:'120px',
                marginTop:'-20px'
              }}
              alt="logo"
              src={this.state.images[index%4]}
            />
          
        }
      >

        <List.Item.Meta
          avatar={<Avatar src={this.state.avatars[index%5]} />}
          title={<Link to={'/article/'+ item.id} 
          style={{
              overflow: 'hidden',
              textOverflow:'ellipsis',
              display:'-webkit-box',
              WebkitLineClamp:'1',
              webkitBoxOrient:'vertical',
                }}>{item.title}</Link>}
          description={<span  style={{
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    display:'-webkit-box',
                    WebkitLineClamp:'1',
                    webkitBoxOrient:'vertical',
        }}>{item.description}</span>}
        />

        <br/>
      </List.Item>
    )}/>
      </div>
      
    
  </Layout>
  
      
    )
  }
}