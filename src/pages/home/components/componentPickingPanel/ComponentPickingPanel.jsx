import React from 'react';
import data from '@/data/pageComponents.json';

export default function() {
    return (
        <div>
            {
                data.map(item => {
                    return <span>{item.type}</span>;
                })
            }
        </div>
    );
}