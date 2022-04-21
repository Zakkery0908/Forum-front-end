import React, { Component } from 'react'
import { List, Avatar, Space,Layout,Button,message} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import {ReqPost} from '../../../api/index'
import { Link } from 'react-router-dom';


const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
);

export default class personCollect extends Component {
  
  state = {
     postList:[],

  }


  componentDidMount(){
        //获取路由传入的state参数
        const {collectList} = this.props.location.state
        console.log("!!!!likeid:")
        console.log(collectList)


        //遍历点赞列表，通过id获取文章内容，并更新state
        collectList.map( async (postId) => {
         
              let result = await ReqPost(postId)
              const postInfo1 = result.data[0];
            
              
              this.setState({
                  postList: [...this.state.postList, postInfo1]
              })
              console.log(this.state)
              // if (result.code === 200) {
              //   message.success('refresh successfully')
              // } else {
              //   message.error('sorry,there\'s something wrong')
              // }
        })
        
  }
  
  
  render() {

    const postList = this.state.postList
    console.log("测试postList")
    console.log(postList[0].title)
    console.log("!!!!!!!!!!我的状态：：：：")
    console.log(this.state)
    
    
    return(
    
          
      <Layout className='AllList'>
          <div>
          <h1 style={{marginLeft:'35px', 
                      size: '30px',
                    }}>
            { "收藏列表"}
          </h1>

         <List 
            className="oneList"
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 4,
            }}

            style={{marginLeft:'20px',width:'825px',
                    }}

            dataSource = {postList}
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
                    style={{marginRight:'10px'}}
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

              {/* 文本多行省略号 */}
                <p className="Text" 
                    style={{
                       overflow: 'hidden',
                       textOverflow:'ellipsis',
                       display:'-webkit-box',
                       WebkitLineClamp:'1',
                       webkitBoxOrient:'vertical',
                          }}>
             
                </p>

              </List.Item>
            )}/>
      </div>
      
    
      </Layout>
  

    )
       
    
        
    
  }
}
