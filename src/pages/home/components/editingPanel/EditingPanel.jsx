/*
 * @Description: 右侧的属性控制栏
 * @Author: zzglovecoding
 * @Date: 2021-06-10 21:51:32
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-21 01:16:41
 */
import React, { useState, useContext, useEffect } from 'react';
import { Input, message, Button } from 'antd';
import { editingComponentContext } from '../../context/editingComponentContext.js';
import { globalSettingsContext } from '../../context/globalSettingsContext.js';
import { pageSizeContext } from '../../context/pageSizeContext.js';
import { checkisConflict, deleteANodeOnTree, classNamePossessed } from '@/utils/operateTree.js';
import { isEmpty } from '@/utils/common.js';
import styles from './style.less';

export default function() {
    const sizeData = useContext(pageSizeContext);

    const {
        editingComponent,
        setEditingComponent
    } = useContext(editingComponentContext);

    // 直接修改了全局的树
    const {
        componentTree,
        setComponentTree
    } = useContext(globalSettingsContext);

    let editingComponentDotCurrent = editingComponent.current ? editingComponent.current : {};

    let disabled = isEmpty(editingComponentDotCurrent);

    const handleDelete = () => {
        deleteANodeOnTree(componentTree, editingComponent.current.uuid);
        setEditingComponent({});
        setComponentTree({ ...componentTree });
    };

    // 正编辑的东西如果改变，就需要重新挂上监听，不然editingComponent是没有的
    useEffect(() => {
        const func = (e) => {
            if (disabled) {return;}
            if (e.key === 'Delete') {
                handleDelete();
            }
        };
        window.addEventListener('keydown', func );
        return () => {
            window.removeEventListener('keydown', func);
        };
    }, [editingComponent]);

    return (
        <div className={styles.container}>
            <h1>Component being edited now</h1>
            {/* 宽度input */}
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
            {/* 高度input */}
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
            {/* componentName的input */}
            <div className={styles.inputRow}>
                <Input disabled={disabled}
                    value={editingComponentDotCurrent.componentName} onChange={e => {
                        editingComponentDotCurrent.componentName = e.target.value;
                        setComponentTree({ ...componentTree });
                    }}
                    
                />
            </div>
            {/* left的input */}
            <div className={styles.inputRow}>
                <Input  disabled={disabled || editingComponentDotCurrent.horizonPositionBase !== 'left'}
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
                <Button className={styles.rightButton} onClick={() => {
                    editingComponentDotCurrent.horizonPositionBase = 'left';
                    setComponentTree({ ...componentTree });
                }}>use left</Button>
            </div>
            {/* top的input */}
            <div className={styles.inputRow}>
                <Input  disabled={disabled || editingComponentDotCurrent.verticalPositionBase !== 'top'}
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
                <Button className={styles.rightButton} onClick={() => {
                    editingComponentDotCurrent.verticalPositionBase = 'top';
                    setComponentTree({ ...componentTree });
                }}>use top</Button>
            </div>
            {/* right的input */}
            <div className={styles.inputRow}>
                <Input  disabled={(disabled || editingComponentDotCurrent.horizonPositionBase === 'left')}
                    value={editingComponentDotCurrent.right} onChange={e => {
                        editingComponentDotCurrent.right = parseFloat(e.target.value);
                        setComponentTree({ ...componentTree });
                    }
                    }
                    // onKeyDown={e => {
                    //     if (e.key === 'ArrowUp') {
                    //         editingComponentDotCurrent.top = (editingComponentDotCurrent.top + 1 > (sizeData.height - editingComponentDotCurrent.height)) ? sizeData.height - editingComponentDotCurrent.height : editingComponentDotCurrent.top + 1;
                    //         setComponentTree({ ...componentTree });
                    //     }
                    //     if (e.key === 'ArrowDown') {
                    //         editingComponentDotCurrent.top = editingComponentDotCurrent.top - 1 < 0 ? 0 : editingComponentDotCurrent.top - 1;
                    //         setComponentTree({ ...componentTree });
                    //     }
                    // }}
                />
                <Button className={styles.rightButton} onClick={() => {
                    editingComponentDotCurrent.horizonPositionBase = 'right';
                    setComponentTree({ ...componentTree });
                }}>use right</Button>
            </div>
            {/* bottom的input */}
            <div className={styles.inputRow}>
                <Input  disabled={disabled || editingComponentDotCurrent.verticalPositionBase === 'top'}
                    value={editingComponentDotCurrent.bottom} onChange={e => {
                        editingComponentDotCurrent.bottom = parseFloat(e.target.value);
                        setComponentTree({ ...componentTree });
                    }
                    }
                    // onKeyDown={e => {
                    //     if (e.key === 'ArrowUp') {
                    //         editingComponentDotCurrent.top = (editingComponentDotCurrent.top + 1 > (sizeData.height - editingComponentDotCurrent.height)) ? sizeData.height - editingComponentDotCurrent.height : editingComponentDotCurrent.top + 1;
                    //         setComponentTree({ ...componentTree });
                    //     }
                    //     if (e.key === 'ArrowDown') {
                    //         editingComponentDotCurrent.top = editingComponentDotCurrent.top - 1 < 0 ? 0 : editingComponentDotCurrent.top - 1;
                    //         setComponentTree({ ...componentTree });
                    //     }
                    // }}
                />
                <Button className={styles.rightButton} onClick={() => {
                    editingComponentDotCurrent.verticalPositionBase = 'bottom';
                    setComponentTree({ ...componentTree });
                }}>use bottom</Button>
            </div>
            {/* className的input */}
            <div className={styles.inputRow}>
                <Input  disabled={disabled}
                    value={editingComponentDotCurrent.className} onChange={e => {
                        let flag = classNamePossessed(e.target.value, componentTree);
                        if (flag) {
                            editingComponentDotCurrent.className = e.target.value;
                            setComponentTree({ ...componentTree });
                        } else {
                            message.error('重复的className，请重新输入className！');
                        }
                    }
                    }
                />
            </div>
            {/* delete的button */}
            <div className={styles.inputRow}>
                <Button disabled={disabled} className={styles.buttonArea} onClick={handleDelete}>delete this component</Button>
            </div>
        </div>);
}