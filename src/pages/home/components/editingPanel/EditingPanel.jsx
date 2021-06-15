/*
 * @Description: 右侧的属性控制栏
 * @Author: zzglovecoding
 * @Date: 2021-06-10 21:51:32
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-14 19:59:41
 */
import React, { useContext } from 'react';
import { Input, message } from 'antd';
import { editingComponentContext } from '../../context/editingComponentContext.js';
import { globalSettingsContext } from '../../context/globalSettingsContext.js';
import { pageSizeContext } from '../../context/pageSizeContext.js';
import { checkisConflict } from '@/utils/operateTree.js';
import { isEmpty } from '@/utils/common.js';
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

    let editingComponentDotCurrent = editingComponent.current ? editingComponent.current : {};

    let disabled = isEmpty(editingComponentDotCurrent);

    return (
        <div className={styles.container}>
            <h1>Component being edited now</h1>
            <div className={styles.inputRow}>
                <Input disabled={disabled}
                    value={editingComponentDotCurrent.width} onChange={e => {
                        let widthBefore = editingComponentDotCurrent.width;
                        editingComponentDotCurrent.width = parseFloat(e.target.value);
                        let noConflict = checkisConflict(editingComponent, componentTree);
                        if (noConflict) {
                            setComponentTree({ ...componentTree });
                        } else {
                            message.error('输入调整宽度碰撞到了其他的盒子，请调整大小');
                            editingComponentDotCurrent.width = widthBefore;
                        }
                    }}
                    onKeyDown={e => {
                        if (e.key === 'ArrowUp') {
                            let widthBefore = editingComponentDotCurrent.width;
                            editingComponentDotCurrent.width = editingComponentDotCurrent.width + 1;
                            let noConflict = checkisConflict(editingComponent, componentTree);
                            if (noConflict) {
                                setComponentTree({ ...componentTree });
                            } else {
                                message.error('方向键向上增加宽度碰撞到了其他的盒子，请调整大小');
                                editingComponentDotCurrent.width = widthBefore;
                            }
                        }
                        if (e.key === 'ArrowDown') {
                            let widthBefore = editingComponentDotCurrent.width;
                            editingComponentDotCurrent.width = editingComponentDotCurrent.width - 1;
                            let noConflict = checkisConflict(editingComponent, componentTree);
                            if (noConflict) {
                                setComponentTree({ ...componentTree });
                            } else {
                                message.error('方向键向下减小宽度碰撞到了其他的盒子，请调整大小');
                                editingComponentDotCurrent.width = widthBefore;
                            }
                        }
                    }}
                />
            </div>
            <div className={styles.inputRow}>
                <Input  disabled={disabled}
                    value={editingComponentDotCurrent.height} onChange={e => {
                        let heightBefore = editingComponentDotCurrent.height;
                        editingComponentDotCurrent.height = parseFloat(e.target.value);
                        let noConflict = checkisConflict(editingComponent, componentTree);
                        if (noConflict) {
                            setComponentTree({ ...componentTree });
                        } else {
                            message.error('输入调整高度碰撞到了其他的盒子，请调整大小');
                            editingComponentDotCurrent.height = heightBefore;
                        }
                    }
                    }
                    onKeyDown={e => {
                        if (e.key === 'ArrowUp') {
                            let heightBefore = editingComponentDotCurrent.height;
                            editingComponentDotCurrent.height = heightBefore + 1;
                            let noConflict = checkisConflict(editingComponent, componentTree);
                            if (noConflict) {
                                setComponentTree({ ...componentTree });
                            } else {
                                message.error('方向键向上增加高度碰撞到了其他的盒子，请调整大小');
                                editingComponentDotCurrent.height = heightBefore;
                            }
                        }
                        if (e.key === 'ArrowDown') {
                            let heightBefore = editingComponentDotCurrent.height;
                            editingComponentDotCurrent.height = heightBefore - 1;
                            let noConflict = checkisConflict(editingComponent, componentTree);
                            if (noConflict) {
                                setComponentTree({ ...componentTree });
                            } else {
                                message.error('方向键向下减少高度碰撞到了其他的盒子，请调整大小');
                                editingComponentDotCurrent.height = heightBefore;
                            }
                        }
                    }}
                />
            </div>
            <div className={styles.inputRow}>
                <Input disabled={disabled}
                    value={editingComponentDotCurrent.componentName} onChange={e => {
                        editingComponentDotCurrent.componentName = e.target.value;
                        setComponentTree({ ...componentTree });
                    }}
                    
                />
            </div>
            <div className={styles.inputRow}>
                <Input  disabled={disabled}
                    value={editingComponentDotCurrent.left} onChange={e => {
                        editingComponentDotCurrent.left = parseFloat(e.target.value);
                        setComponentTree({ ...componentTree });
                    }
                    }
                    onKeyDown={e => {
                        if (e.key === 'ArrowUp') {
                            editingComponentDotCurrent.left = (editingComponentDotCurrent.left + 1 > (sizeData.width - editingComponentDotCurrent.width)) ? sizeData.width - editingComponentDotCurrent.width : editingComponentDotCurrent.left + 1;
                            setComponentTree({ ...componentTree });
                        }
                        if (e.key === 'ArrowDown') {
                            editingComponentDotCurrent.left = editingComponentDotCurrent.left - 1 < 0 ? 0 : editingComponentDotCurrent.left - 1;
                            setComponentTree({ ...componentTree });
                        }
                    }}
                />
            </div>
            <div className={styles.inputRow}>
                <Input  disabled={disabled}
                    value={editingComponentDotCurrent.top} onChange={e => {
                        editingComponentDotCurrent.top = parseFloat(e.target.value);
                        setComponentTree({ ...componentTree });
                    }
                    }
                    onKeyDown={e => {
                        if (e.key === 'ArrowUp') {
                            editingComponentDotCurrent.top = (editingComponentDotCurrent.top + 1 > (sizeData.height - editingComponentDotCurrent.height)) ? sizeData.height - editingComponentDotCurrent.height : editingComponentDotCurrent.top + 1;
                            setComponentTree({ ...componentTree });
                        }
                        if (e.key === 'ArrowDown') {
                            editingComponentDotCurrent.top = editingComponentDotCurrent.top - 1 < 0 ? 0 : editingComponentDotCurrent.top - 1;
                            setComponentTree({ ...componentTree });
                        }
                    }}
                />
            </div>
        </div>);
}