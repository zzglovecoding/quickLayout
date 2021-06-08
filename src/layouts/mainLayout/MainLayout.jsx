import styles from './mainLayout.less';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import lazyload from 'Components/lazyload/Lazyload';
import Header from 'Components/header/Header';
import Footer from 'Components/footer/Footer';

const Home = lazyload(() => import(/* webpackPrefetch: true */ 'Pages/home/Home'));
const NotFound = lazyload(() => import(/* webpackPrefetch: true */ 'Pages/notFound/NotFound'));
/**
 * @desc 页面主框架组件
 */
export default class MainLayout extends Component {
 
    render() {
        return (
            <div className={styles.mainLayout}>
                <Header />
                <div className={styles.container}>
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        {/* 路由加在这里 */}
                        <Redirect exact from="/" to="/home" />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}