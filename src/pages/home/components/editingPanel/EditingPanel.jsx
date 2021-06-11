import React, { useContext } from 'react';
import { Input } from 'antd';
import { editingComponentContext } from '../../context/editingComponentContext.js';
import { globalSettingsContext } from '../../context/globalSettingsContext.js';
import { getTargetBaseOnuuid } from '@/utils/common.js';
import styles from './style.less';

export default function() {
    const {
        editingComponent  
    } = useContext(editingComponentContext);
    const {
        componentTree,
        setComponentTree
    } = useContext(globalSettingsContext);

    return (
        <div className={styles.container}>
            <h1>Component being edited now</h1>
            <div className={styles.inputRow}>
                <Input value={editingComponent.width} onChange={e => {
                    getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.width = e.target.value;
                    setComponentTree({ ...componentTree });
                }
                }/>
            </div>
            <div className={styles.inputRow}>
                <Input value={editingComponent.height} onChange={e => {
                    getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.height = e.target.value;
                    setComponentTree({ ...componentTree });
                }
                }/>
            </div>
            <div className={styles.inputRow}>
                <Input value={editingComponent.componentName} onChange={e => {
                    getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.componentName = e.target.value;
                    setComponentTree({ ...componentTree });
                }
                }/>
            </div>
            <div className={styles.inputRow}>
                <Input value={editingComponent.left} onChange={e => {
                    getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.left = e.target.value;
                    setComponentTree({ ...componentTree });
                }
                }/>
            </div>
            <div className={styles.inputRow}>
                <Input value={editingComponent.top} onChange={e => {
                    getTargetBaseOnuuid(componentTree, editingComponent.uuid).current.top = e.target.value;
                    setComponentTree({ ...componentTree });
                }
                }/>
            </div>
        </div>);
}