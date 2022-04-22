//列表组件
import { List, Avatar, Space,Layout,Button,message,Divider,Card,Popover} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import './index.css'
import {getContent, reqSearchItems} from '../../api/index'
import { Link } from 'react-router-dom';
import { Calendar } from 'antd';
import img1 from '../../img/img4.png'
import img2 from '../../img/img2.png'
import img3 from '../../img/img3.png'
import img4 from '../../img/img1.png'
import ava1 from '../../img/avatar1.svg'
import ava2 from '../../img/avatar2.svg'
import ava3 from '../../img/avatar3.svg'
import ava4 from '../../img/avatar4.svg'
import ava5 from '../../img/avatar5.svg'
import {reverse} from '../../api/reverse' 

//封装图标样式
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const content =()=>{ (
  <div>
    <p>name</p>
    <p>major</p>
  </div>
)};
export default class List1 extends Component {
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
  majors:[
    'ICS',
    'CST',
    'IMIS',
  ],
  colors:[
    '#0a1241',
    '#D3D3D3',
    '#FF8C00',	
    '#6D9773',
  ],
  avatars:[
    ava1,
    ava2,
    ava3,
    ava4,
    ava5
  ]
}



//获取List
  getContent = async ()=>{
      const amount =100;
      let result = await getContent(amount)
      this.setState({pages:reverse(result.data),isSearch:false,keyWord:""})
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
       <Button 
       style={{background:'#FE5430',
              borderColor:'#FE5430',
              width:'100px',
              marginTop:'10px',
              marginBottom:'-15px',
              marginLeft:'825px'
    }
              }
              
        type="primary" onClick={this.getContent}>
           Refresh
       </Button>


    <div>
      <List 
      className="oneList"
      itemLayout="vertical"
      size="large"
      style={{
        marginTop:'25px',
        
      }}

      pagination={{
          onChange: page => {
          console.log(page);
        },
        pageSize: 8,
      }}

      dataSource = {this.state.pages}
      
      
      
      renderItem={(item,index) => (
      <Layout>
      <div className='ListOut'>
        <List.Item
          key={item.title}
          className='titlefont'
          style={{
            background:'none',
            marginTop:'13px',
            borderLeftColor: this.state.colors[index%4]
            
          }}

          actions={
            [
            <div className='actions'
                  style={{
                  color:index%4!=1? this.state.colors[index%4]: '#888888',
                  backgroundColor:this.state.colors[index%4]+'45',
                  
                  }}>{this.state.majors[index%3]}</div>,
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          
          extra={
            <img
              width={250}
              style={{
                height:'130px',
                marginTop:'-20px'
              }}
              alt="logo"
              src={this.state.images[index%4]}
            />
          }
        >

          <List.Item.Meta
            
            avatar={ <Popover content={content()} title="Personal Information"><Avatar
                      style={{width:'50px',
                              height:'50px'}} 
                      src= {this.state.avatars[index%5]}/></Popover>}

            title={<Link 
                    style={{fontSize:'20px',
                            overflow: 'hidden',
                            textOverflow:'ellipsis',
                            display:'-webkit-box',
                            WebkitLineClamp:'1',
                            webkitBoxOrient:'vertical',}}
                    to={'/article/'+ item.id} >{item.title}
                    </Link>}
             description={<span
                            style={{fontSize:'10px',
                                    overflow: 'hidden',
                                    textOverflow:'ellipsis',
                                    display:'-webkit-box',
                                    WebkitLineClamp:'1',
                                    webkitBoxOrient:'vertical',}}>
                              {item.description}
                        </span>}


          />    
          
          </List.Item>
          <Divider  />
      </div>
      
      <div/>
      

      </Layout>
      )}/>

      <div className="site-calendar-demo-card">
        <Card className='calender'>
          <Calendar fullscreen={false}
                     />
    </Card>
          
      

          <Card className="Campus-website" style={{ width: 350,fontSize:'17px',borderRadius:'20px',marginTop:'25px'}}>
          <p className='link1'>< a href="https://www.learningmall.cn/">LearningMall</ a></p >
          <p className='link2'>< a href="https://ebridge.xjtlu.edu.cn/urd/sits.urd/run/siw_lgn">XJTLU e-bridge</ a></p >
          <p className='link3'>< a href="https://lib.xjtlu.edu.cn/">Home| Library for XJTLU</ a></p >
          </Card>
     
      </div>

      
    
    
    </div>

      
    
  </Layout>
  
      
    )
  }
}
