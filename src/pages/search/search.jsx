import React, {Component} from "react";
import {Carousel,Layout} from 'antd'
import List from "../../components/searchList";
const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
export default class search extends Component {

  render() {
    return (
        <Layout>
          <List/>      
       </Layout>
    )
  }
}
