import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorBoundary from 'Components/errorBoundary/ErrorBoundary';
import MainLayout from 'Layouts/mainLayout/MainLayout';

export default function App() {
    return (
        <ErrorBoundary>
            <Switch>
                {/* 主布局 */}
                <Route path="/" component={MainLayout} />
            </Switch>
        </ErrorBoundary>
    );
}