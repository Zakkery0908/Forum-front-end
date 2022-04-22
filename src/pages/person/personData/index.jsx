//用来写的是个人页面组件
import { Card, Avatar, Descriptions,Col,Statistic,Row} from 'antd';
import { Layout, Button, message } from 'antd';
import { MessageOutlined, LikeOutlined,EditOutlined, EllipsisOutlined, SettingOutlined ,BellOutlined,StarOutlined,WalletOutlined} from '@ant-design/icons';
import React, { Component } from 'react'


const gridStyle = {
    width: '50%',
    textAlign: 'center',
    height:'40vh'
  };


export default class personData extends Component {

  render() {
    return (

          <Card title="Data Display">

          <Card.Grid style={gridStyle}>   
          <Col span={25}>
          <Statistic title="Likes received" 
                     value={1128} 
                     prefix={<LikeOutlined />} />
          </Col>
          </Card.Grid>


          <Card.Grid style={gridStyle}>    
          <Col span={25}>
          <Statistic title="Number of favorites" 
               value={1314} 
               prefix={<StarOutlined />} />
          </Col>
          </Card.Grid>
        

          <Card.Grid style={gridStyle}>
          <Col span={25}>
          <Statistic title="Number of published posts" 
               value={15} 
               prefix={<WalletOutlined />} />
           </Col>
            </Card.Grid>


          <Card.Grid style={gridStyle}>
          <Col span={25}>
          <Statistic title="Notifications" 
               value={11} 
               prefix={<BellOutlined />} />
          </Col>
          </Card.Grid>


          </Card>

            
    )
  }
}
