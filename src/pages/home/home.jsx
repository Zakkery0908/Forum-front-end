import React, {Component} from "react";
import {Carousel,Layout} from 'antd'
import List from "../../components/List";
import "./index.css"
import img1 from "./img/img1.png"
import img2 from "./img/img2.png"
import img3 from "./img/img3.png"
import img4 from "./img/img4.png"

const contentStyle = {
    height: '330px',
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
                <h3 style={contentStyle}> <img src={img1}
                                              width={1500} 
                                              alt="img1" /></h3>
              </div>
              <div>
                  <h3 style={contentStyle}><img src={img2}
                                              width={1500} alt="img2" /></h3>
              </div>
              <div>
                  <h3 style={contentStyle}><img src={img3}
                                              width={1500} alt="img3" /></h3>
              </div>
              <div>
                  <h3 style={contentStyle}><img src={img4}
                                              width={1500} alt="img4" /></h3>
              </div>
           
        </Carousel>
        
        
          <List />
        
        

       </Layout>
    )
  }
}
