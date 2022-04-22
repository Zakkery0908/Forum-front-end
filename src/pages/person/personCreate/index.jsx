import React, { Component } from 'react'
import { List, Avatar, Space,Layout,Button,message,Divider} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import {ReqPost} from '../../../api/index'
import { Link } from 'react-router-dom';
import img1 from '../../../img/img4.png'
import img2 from '../../../img/img2.png'
import img3 from '../../../img/img3.png'
import img4 from '../../../img/img1.png'
import ava1 from '../../../img/avatar1.svg'
import ava2 from '../../../img/avatar2.svg'
import ava3 from '../../../img/avatar3.svg'
import ava4 from '../../../img/avatar4.svg'
import ava5 from '../../../img/avatar5.svg'


const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
);

export default class personCreate extends Component {
  
  state = {
     postList:[],
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


  componentDidMount(){
        //获取路由传入的state参数
        const {createList} = this.props.location.state
        console.log("!!!!likeid:")
        console.log(createList)
      

        //遍历点赞列表，通过id获取文章内容，并更新state
        createList.map( async (postId) => {
         
          ReqPost(postId).then(response => {
           
            const postInfo1 = response.data[0];
            this.setState({
              postList: [postInfo1,...this.state.postList]
          })
          }).catch(error => {
            console.log("出错了")
          })
              
              
        })
        
  }
  
  
  render() {

    const postList = this.state.postList

    console.log("!!!!!!!!!!我的状态：：：：")
    console.log(this.state)
    
    
    return(
    
          
      <Layout className='AllList'>
          <div>
          <h1 style={{marginLeft:'35px', 
                      size: '30px',
                      marginTop:'15px',
                      fontSize:'15px'
                    }}>
            { "My Creations"}
          </h1>
          <br/>

         <List 
            className="oneList"
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 6,
            }}

            style={{marginLeft:'20px',width:'825px',
                    }}

            dataSource = {postList}
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
                    width={200}
                    style={{marginRight:'10px',
                            height:'100px',
                            marginBottom:'10px',
                            marginTop:'10px'
                            
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
              
              </List.Item>
            )}/>
            
      </div>
      
    
      </Layout>
  

    )
       
    
        
    
  }
}
