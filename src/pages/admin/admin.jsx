//路由页面
import { Layout } from 'antd';
import Header1 from "../../components/header";
import { Redirect } from "react-router-dom";
import './footer.css'
import { Route, Switch } from "react-router-dom";
import create from "../create/create";
import home from "../home/home";
import person from "../person/person";
import article from "../article/article";
import React, { Component } from 'react'
import search from "../search/search";
import { connect } from "react-redux";

const { Header, Content, Footer } = Layout;

class Admin extends Component {

    render() {
        const user = this.props.user
        if (!user || !user.id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Header1 />
                </Header>


                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    {/*  */}
                    <Switch>
                        <Redirect from='/' exact to='/home' />
                        <Route path='/home' component={home} />
                        <Route path='/create' component={create} />
                        <Route path='/person' component={person} />
                        <Route path='/search' component={search} />
                        <Route path='/article/:postId' component={article} />
                    </Switch>

                </Content>





                <Footer style={{ textAlign: 'center' }}>
                    <div class="pag_foot">
                        <div class="footTitle">
                            <b>XJTLU Learning and Sharing Web</b>
                        </div>
                        <div class="left">
                            <div class="aboutAs">
                                <p>关于我们</p>
                            </div>
                            <div class="statement">
                                <p>本平台是由CPT202小组成员自主开发的西浦校内在线学习交流平台</p>
                            </div>
                        </div>


                        <div class="members">
                            <p>开发成员</p>
                        </div>
                        <div class="col1">
                            <ul>
                                <li>Yihuan Xu</li>
                                <li>Zeqiang Ning</li>
                                <li>Wei Liao</li>
                            </ul>
                        </div>
                        <div class="col2">
                            <ul>
                                <li>Zheng Yang</li>
                                <li>Zhongqing Zeng</li>
                                <li>Enmin Shen</li>
                            </ul>
                        </div>
                        <div class="col3">
                            <ul>
                                <li>Yijie Bao</li>
                                <li>Haoyue Zhang</li>
                                <li>Zicheng Tang</li>
                            </ul>
                        </div>
                    </div>


                </Footer>

            </Layout>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    {}
)(Admin)