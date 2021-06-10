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