import React, { useContext } from 'react';
import { Input } from 'antd';
import { editingComponentContext } from '../../context/editingComponentContext.js';
import { globalSettingsContext } from '../../context/globalSettingsContext.js';
import { pageSizeContext } from '../../context/pageSizeContext.js';
import { getTargetBaseOnuuid, isEmpty } from '@/utils/common.js';
import styles from './style.less';

export default function() {
    const sizeData = useContext(pageSizeContext);

    const {
        editingComponent  
    } = useContext(editingComponentContext);

    // 直接修改了全局的树
    const {
        componentTree,
        setComponentTree
    } = useContext(globalSettingsContext);

    let disabled = isEmpty(editingComponent);

    return (
        <div className={styles.container}>
            <h1>Component being edited now</h1>
            <div className={styles.inputRow}>
                <Input disabled={disabled}
                    value={editingComponent.width} onChange={e => {
                        getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.width = parseFloat(e.target.value);
                        setComponentTree({ ...componentTree });
                    }}
                    onKeyDown={e => {
                        if (e.key === 'ArrowUp') {
                            getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.width = editingComponent.width + 1;
                            setComponentTree({ ...componentTree });
                        }
                        if (e.key === 'ArrowDown') {
                            getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.width = editingComponent.width - 1;
                            setComponentTree({ ...componentTree });
                        }
                    }}
                />
            </div>
            <div className={styles.inputRow}>
                <Input  disabled={disabled}
                    value={editingComponent.height} onChange={e => {
                        getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.height = parseFloat(e.target.value);
                        setComponentTree({ ...componentTree });
                    }
                    }
                    onKeyDown={e => {
                        if (e.key === 'ArrowUp') {
                            getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.height = editingComponent.height + 1;
                            setComponentTree({ ...componentTree });
                        }
                        if (e.key === 'ArrowDown') {
                            getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.height = editingComponent.height - 1;
                            setComponentTree({ ...componentTree });
                        }
                    }}
                />
            </div>
            <div className={styles.inputRow}>
                <Input disabled={disabled}
                    value={editingComponent.componentName} onChange={e => {
                        getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.componentName = e.target.value;
                        setComponentTree({ ...componentTree });
                    }}
                    
                />
            </div>
            <div className={styles.inputRow}>
                <Input  disabled={disabled}
                    value={editingComponent.left} onChange={e => {
                        getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.left = parseFloat(e.target.value);
                        setComponentTree({ ...componentTree });
                    }
                    }
                    onKeyDown={e => {
                        if (e.key === 'ArrowUp') {
                            getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.left = (editingComponent.left + 1 > (sizeData.width - editingComponent.width)) ? sizeData.width - editingComponent.width : editingComponent.left + 1;
                            setComponentTree({ ...componentTree });
                        }
                        if (e.key === 'ArrowDown') {
                            getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.left = editingComponent.left - 1 < 0 ? 0 : editingComponent.left - 1;
                            setComponentTree({ ...componentTree });
                        }
                    }}
                />
            </div>
            <div className={styles.inputRow}>
                <Input  disabled={disabled}
                    value={editingComponent.top} onChange={e => {
                        getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.top = parseFloat(e.target.value);
                        setComponentTree({ ...componentTree });
                    }
                    }
                    onKeyDown={e => {
                        if (e.key === 'ArrowUp') {
                            getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.top = (editingComponent.top + 1 > (sizeData.height - editingComponent.height)) ? sizeData.height - editingComponent.height : editingComponent.top + 1;
                            setComponentTree({ ...componentTree });
                        }
                        if (e.key === 'ArrowDown') {
                            getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.top = editingComponent.top - 1 < 0 ? 0 : editingComponent.top - 1;
                            setComponentTree({ ...componentTree });
                        }
                    }}
                />
            </div>
        </div>);
}