/*
 * @Description: 右侧正编辑组件的信息
 * @Author: zzglovecoding
 * @Date: 2021-06-10 22:52:49
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-16 21:36:25
 */

import React, { useState } from 'react';

const editingComponentContext = React.createContext({
    settings: {}
});

function editingComponentHooks() {
    const [editingComponent, setEditingComponent] = useState({});

    return {
        editingComponent,
        setEditingComponent
    };
}

export { editingComponentContext, editingComponentHooks };