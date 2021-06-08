import styles from './mainLayout.less';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Pages/home/Home';
import NotFound from 'Pages/notFound/NotFound';

export default function MainLayout() {
    return (
        <div className={styles.mainLayout}>
            <div className={styles.container}>
                <Switch>
                    <Route exact path="/indexPage" component={Home} />
                    <Redirect exact from="/" to="/indexPage" />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </div>
    );
}