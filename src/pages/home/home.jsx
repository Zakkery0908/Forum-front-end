import React, {Component} from "react";
import {Carousel,Layout} from 'antd'
import List from "../../components/List";
const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
export default class home extends Component {

  render() {
    return (
        <Layout>
        <Carousel autoplay>
        <div>
        <h3 style={contentStyle}><a href="https://lib.xjtlu.edu.cn/"><img src="https://images4.alphacoders.com/105/1050814.jpg" alt="img1" /></a></h3>
        </div>
        <div>
            <h3 style={contentStyle}>2</h3>
        </div>
        <div>
            <h3 style={contentStyle}>3</h3>
        </div>
        <div>
            <h3 style={contentStyle}>4</h3>
        </div>
       </Carousel>
     
       <List/>
       </Layout>
    )
  }
}
