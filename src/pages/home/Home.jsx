import styles from './home.less';
import React, { useState, useEffect } from 'react';
import bg from './images/bg.jpg';
import { getUser } from './services/demo';
import Component1 from './components/component1/Component1';

export default function Home() {

    const [data, setData] = useState(null);
    useEffect(() => {
        getUser(1).then(({ data }) => {
            setData(data);
        });
    }, []);

    return (
        <div className={styles.home}>
            <h1>Home</h1>
            <img className={styles.logo} src={bg} />
            <Component1 data={data} />
        </div>
    );
}