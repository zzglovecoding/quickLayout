/*
 * @Description: 右侧的属性控制栏
 * @Author: zzglovecoding
 * @Date: 2021-06-10 21:51:32
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-22 00:28:58
 */
import React, { useContext, useEffect } from 'react';
import { Input, message, Button, Popover } from 'antd';
import { editingComponentContext } from '../../context/editingComponentContext.js';
import { globalSettingsContext } from '../../context/globalSettingsContext.js';
import { pageSizeContext } from '../../context/pageSizeContext.js';
import { checkisConflict, deleteANodeOnTree, classNamePossessed } from '@/utils/operateTree.js';
import { isEmpty, fixed } from '@/utils/common.js';
import { intAndDecimal } from '@/utils/regex.js';
import hooks from './hooks.js';
import styles from './style.less';

export default function() {
    const sizeData = useContext(pageSizeContext);

    const editing = useContext(editingComponentContext);

    const {
        editingComponent,
        setEditingComponent
    } = editing;

    // 直接修改了全局的树
    const {
        realCanvasWidth,
        realCanvasHeight,
        componentTree,
        setComponentTree
    } = useContext(globalSettingsContext);

    let wRatio = fixed((realCanvasWidth / 1199), 6);
    let hRatio = fixed((realCanvasHeight / 798), 6);

    let editingComponentDotCurrent = editingComponent.current ? editingComponent.current : {};

    let disabled = isEmpty(editingComponentDotCurrent);

    const handleDelete = () => {
        deleteANodeOnTree(componentTree, editingComponent.current.uuid);
        setEditingComponent({});
        setComponentTree({ ...componentTree });
    };

    const {
        heightPopoverContent,
        widthPopoverContent,
        leftPopoverContent,
        rightPopoverContent,
        topPopoverContent,
        bottomPopoverContent
    } = hooks(editing, componentTree);

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
                    type="number"
                    allowClear={true}
                    value={fixed(editingComponentDotCurrent.width ? editingComponentDotCurrent.width * wRatio : null, 2)} onChange={e => {
                        let widthBefore = editingComponentDotCurrent.width;
                        editingComponentDotCurrent.width = fixed(parseFloat(e.target.value === '' ? 0 : e.target.value) / wRatio, 2);
                        let noConflict = checkisConflict(editingComponent, componentTree);
                        if (noConflict || editingComponentDotCurrent.width === 0) {
                            setComponentTree({ ...componentTree });
                        } else {
                            message.error('输入调整宽度碰撞到了其他的盒子，请调整大小');
                            editingComponentDotCurrent.width = widthBefore;
                        }
                    }}
                />
                <Popover content={widthPopoverContent}
                >
                    <Button disabled={disabled} className={styles.adjustButton}>adjust</Button>
                </Popover>
            </div>
            {/* 高度input */}
            <div className={styles.inputRow}>
                <Input  disabled={disabled}
                    type="number"
                    allowClear={true}
                    value={fixed(editingComponentDotCurrent.height ? editingComponentDotCurrent.height * hRatio : null, 2)} onChange={e => {
                        let heightBefore = editingComponentDotCurrent.height;
                        editingComponentDotCurrent.height = fixed(parseFloat(e.target.value === '' ? 0 : e.target.value) / hRatio, 2);
                        let noConflict = checkisConflict(editingComponent, componentTree);
                        if (noConflict) {
                            setComponentTree({ ...componentTree });
                        } else {
                            message.error('输入调整高度碰撞到了其他的盒子，请调整大小');
                            editingComponentDotCurrent.height = heightBefore;
                        }
                    }
                    }
                />
                <Popover content={heightPopoverContent}
                >
                    <Button disabled={disabled} className={styles.adjustButton}>adjust</Button>
                </Popover>
            </div>
            {/* left的input */}
            <div className={styles.inputRow}>
                <Input  disabled={disabled || editingComponentDotCurrent.horizonPositionBase !== 'left'}
                    type="number"
                    allowClear={true}
                    value={fixed(disabled ? null : editingComponentDotCurrent.left ? editingComponentDotCurrent.left * wRatio : 0, 2)} onChange={e => {
                        let leftBefore = editingComponentDotCurrent.left;
                        editingComponentDotCurrent.left = fixed(parseFloat(e.target.value === '' ? 0 : e.target.value) / wRatio, 2);
                        let noConflict = checkisConflict(editingComponent, componentTree);
                        if (noConflict && editingComponentDotCurrent.left >= 0 && editingComponentDotCurrent.left <= (1199 - editingComponentDotCurrent.width)) {
                            editingComponentDotCurrent.right = 1199 - editingComponentDotCurrent.left - editingComponentDotCurrent.width;
                            setComponentTree({ ...componentTree });
                        } else {
                            message.error('输入调整左侧距离碰撞到了其他的盒子或超出了边界，请调整');
                            editingComponentDotCurrent.left = leftBefore;
                        }
                    }
                    }
                />
                <Button disabled={disabled || editingComponentDotCurrent.horizonPositionBase === 'left'} className={styles.rightButton} onClick={() => {
                    editingComponentDotCurrent.horizonPositionBase = 'left';
                    setComponentTree({ ...componentTree });
                }}>use left</Button>
                <Popover content={leftPopoverContent}
                >
                    <Button disabled={disabled || editingComponentDotCurrent.horizonPositionBase !== 'left'} className={styles.adjustButton}>adjust</Button>
                </Popover>
            </div>
            {/* top的input */}
            <div className={styles.inputRow}>
                <Input  disabled={disabled || editingComponentDotCurrent.verticalPositionBase !== 'top'}
                    type="number"
                    allowClear={true}
                    value={fixed(disabled ? null : editingComponentDotCurrent.top ? editingComponentDotCurrent.top * hRatio : 0, 2)} onChange={e => {
                        let topBefore = editingComponentDotCurrent.top;
                        editingComponentDotCurrent.top = fixed(parseFloat(e.target.value === '' ? 0 : e.target.value) / hRatio, 2);
                        let noConflict = checkisConflict(editingComponent, componentTree);
                        if (noConflict && editingComponentDotCurrent.top >= 0 && editingComponentDotCurrent.top <= (798 - editingComponentDotCurrent.height)) {
                            editingComponentDotCurrent.bottom = 798 - editingComponentDotCurrent.height - editingComponentDotCurrent.top;
                            setComponentTree({ ...componentTree });
                        } else {
                            message.error('输入调整上侧距离碰撞到了其他的盒子或超出了边界，请调整');
                            editingComponentDotCurrent.top = topBefore;
                        }
                    }
                    }
                />
                <Button disabled={disabled || editingComponentDotCurrent.verticalPositionBase === 'top'} className={styles.rightButton} onClick={() => {
                    editingComponentDotCurrent.verticalPositionBase = 'top';
                    setComponentTree({ ...componentTree });
                }}>use top</Button>
                <Popover content={topPopoverContent}
                >
                    <Button disabled={disabled || editingComponentDotCurrent.verticalPositionBase !== 'top'} className={styles.adjustButton}>adjust</Button>
                </Popover>
            </div>
            {/* right的input */}
            <div className={styles.inputRow}>
                <Input  disabled={(disabled || editingComponentDotCurrent.horizonPositionBase === 'left')}
                    type="number"
                    allowClear={true}
                    value={fixed(disabled ? null : editingComponentDotCurrent.right ? editingComponentDotCurrent.right * wRatio : 0, 2)} onChange={e => {
                        let rightBefore = editingComponentDotCurrent.right;
                        editingComponentDotCurrent.right = fixed(parseFloat(e.target.value === '' ? 0 : e.target.value) / wRatio, 2);
                        let noConflict = checkisConflict(editingComponent, componentTree);
                        if (noConflict && editingComponentDotCurrent.right >= 0 && editingComponentDotCurrent.right <= (1199 - editingComponentDotCurrent.width)) {
                            editingComponentDotCurrent.left = 1199 - editingComponentDotCurrent.right - editingComponentDotCurrent.width;
                            setComponentTree({ ...componentTree });
                        } else {
                            message.error('输入调整右侧距离碰撞到了其他的盒子或超出了边界，请调整');
                            editingComponentDotCurrent.right = rightBefore;
                        }
                    }
                    }
                />
                <Button disabled={disabled || editingComponentDotCurrent.horizonPositionBase === 'right'} className={styles.rightButton} onClick={() => {
                    editingComponentDotCurrent.horizonPositionBase = 'right';
                    setComponentTree({ ...componentTree });
                }}>use right</Button>
                <Popover content={rightPopoverContent}
                >
                    <Button disabled={(disabled || editingComponentDotCurrent.horizonPositionBase === 'left')} className={styles.adjustButton}>adjust</Button>
                </Popover>
            </div>
            {/* bottom的input */}
            <div className={styles.inputRow}>
                <Input  disabled={disabled || editingComponentDotCurrent.verticalPositionBase === 'top'}
                    type="number"
                    allowClear={true}
                    value={fixed(disabled ? null : editingComponentDotCurrent.bottom ? editingComponentDotCurrent.bottom * hRatio : 0, 2)} onChange={e => {
                        let bottomBefore = editingComponentDotCurrent.bottom;
                        editingComponentDotCurrent.bottom = fixed(parseFloat(e.target.value === '' ? 0 : e.target.value) / hRatio, 2);
                        let noConflict = checkisConflict(editingComponent, componentTree);
                        if (noConflict && editingComponentDotCurrent.bottom >= 0 && editingComponentDotCurrent.bottom <= (798 - editingComponentDotCurrent.height)) {
                            editingComponentDotCurrent.top = 798 - editingComponentDotCurrent.bottom - editingComponentDotCurrent.height; 
                            setComponentTree({ ...componentTree });
                        } else {
                            message.error('输入调整右侧距离碰撞到了其他的盒子或超出了边界，请调整');
                            editingComponentDotCurrent.bottom = bottomBefore;
                        }
                    }
                    }
                />
                <Button disabled={disabled || editingComponentDotCurrent.verticalPositionBase === 'bottom'} className={styles.rightButton} onClick={() => {
                    editingComponentDotCurrent.verticalPositionBase = 'bottom';
                    setComponentTree({ ...componentTree });
                }}>use bottom</Button>
                <Popover content={bottomPopoverContent}
                >
                    <Button disabled={(disabled || editingComponentDotCurrent.verticalPositionBase === 'top')} className={styles.adjustButton}>adjust</Button>
                </Popover>
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
                <Button disabled={disabled} className={styles.buttonArea} onClick={handleDelete}>delete this component!</Button>
            </div>
        </div>);
}