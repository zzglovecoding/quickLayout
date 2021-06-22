/*
 * @Description: 
 * @Author: zzglovecoding
 * @Date: 2021-06-21 19:45:28
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-21 22:10:36
 */
import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { getTargetBaseOnuuid } from '@/utils/operateTree.js';
import { fixed } from '@/utils/common.js';

export default function(editing, componentTree) {
    const {
        editingComponent,
        setEditingComponent
    } = editing;

    const handleQuickSetArgs = (fraction, type) => {
        if (type === 'width') {
            let parentWidth = getTargetBaseOnuuid(componentTree, editingComponent.current.parent).current.width;
            let newNum = parseFloat(fixed(parentWidth * fraction, 2));
            editingComponent.current[type] = newNum;
            setEditingComponent({ ...editingComponent });
            return;
        } else if (type === 'height') {
            let parentHeight = getTargetBaseOnuuid(componentTree, editingComponent.current.parent).current.height;
            let newNum = parseFloat(fixed(parentHeight * fraction, 2));
            editingComponent.current[type] = newNum;
            setEditingComponent({ ...editingComponent });
            return;
        }
    };

    const handleQuickPositionSetArgs = (position, type) => {
        if (type === 'left' || type === 'right') {
            let parentWidth = getTargetBaseOnuuid(componentTree, editingComponent.current.parent).current.width;
            let newNum = parseFloat(fixed(parentWidth * position, 2)) - editingComponent.current.width / 2;
            if (newNum >= 0 && newNum <= (1199 - editingComponent.current.width)) {
                let counterNum = 1199 - newNum - editingComponent.current.width;
                editingComponent.current[type] = newNum;
                editingComponent.current[type === 'left' ? 'right' : 'left'] = counterNum;
                setEditingComponent({ ...editingComponent });
            } else {
                message.error('超出了边界，重新设置!');
                return;
            }
            
        } else if (type === 'top' || type === 'bottom') {
            let parentHeight = getTargetBaseOnuuid(componentTree, editingComponent.current.parent).current.height;
            let newNum = parseFloat(fixed(parentHeight * position, 2)) - editingComponent.current.height / 2;
            if (newNum >= 0 && newNum <= (798 - editingComponent.current.height)) {
                let bottom = 798 - newNum - editingComponent.current.height;
                editingComponent.current[type] = newNum;
                editingComponent.current[type === 'top' ? 'bottom' : 'top'] = bottom;
                setEditingComponent({ ...editingComponent });
            } else {
                message.error('超出了边界，重新设置!');
                return;
            }
        }
    };

    let args = [['1/4', 0.25], ['1/3', 0.33], ['1/2', 0.5], ['1/1', 1]];
    let positionArgs = [['1/8', 0.125], ['3/8', 0.375], ['5/8', 0.625], ['7/8', 0.875], ['1/4', 0.25], ['3/4', 0.75], ['1/2', 0.5], ['1/6', 0.16], ['1/3', 0.33], ['2/3', 0.66], ['5/6', 0.83]];
    
    const [wfractionInput, setwFractionInput] = useState('');

    const widthPopoverContent = (<div className="PopoverContent">
        <Input 
            type="number" 
            placeholder="input the fraction"
            value={wfractionInput}
            onChange={e => {
                setwFractionInput(e.target.value);
            }}
            onPressEnter={() => {
                if (!wfractionInput) {return;}
                handleQuickSetArgs(wfractionInput, 'width');
                setwFractionInput('');
            }}
        ></Input>
        {
            args.map(arr => {
                return (
                    <Button className="PopoverContentItem" onClick={() => handleQuickSetArgs(arr[1], 'width')} key={arr[1]}>set {arr[0]} width of parent</Button>
                );
            })
        }
    </div>);

    const [hfractionInput, sethFractionInput] = useState('');

    const heightPopoverContent = (<div className="PopoverContent">
        <Input 
            type="number" 
            placeholder="input the fraction"
            value={hfractionInput}
            onChange={e => {
                sethFractionInput(e.target.value);
            }}
            onPressEnter={() => {
                if (!hfractionInput) {return;}
                handleQuickSetArgs(hfractionInput, 'height');
                sethFractionInput('');
            }}
        ></Input>
        {
            args.map(arr => {
                return (
                    <Button className="PopoverContentItem" onClick={() => handleQuickSetArgs(arr[1], 'height')} key={arr[1]}>set {arr[0]} height of parent</Button>
                );
            })
        }
    </div>);

    const leftPopoverContent = (<div className="PopoverContentItemNumOnly">
        <div style={{ color: 'rgba(0,106,180,.3)', textAlign: 'center', width: '100%' }}>position of parent's width</div>
        {
            positionArgs.map(arr => {
                return (
                    <Button className="PopoverContentItem" onClick={() => handleQuickPositionSetArgs(arr[1], 'left')} key={arr[1]}>{arr[0]}</Button>
                );
            })
        }
    </div>);

    const rightPopoverContent = (<div className="PopoverContentItemNumOnly">
        <div style={{ color: 'rgba(0,106,180,.3)', textAlign: 'center', width: '100%' }}>position of parent's width</div>
        {
            positionArgs.map(arr => {
                return (
                    <Button className="PopoverContentItem" onClick={() => handleQuickPositionSetArgs(arr[1], 'right')} key={arr[1]}>{arr[0]}</Button>
                );
            })
        }
    </div>);

    const topPopoverContent = (<div className="PopoverContentItemNumOnly">
        <div style={{ color: 'rgba(0,106,180,.3)', textAlign: 'center', width: '100%' }}>position of parent's height</div>
        {
            positionArgs.map(arr => {
                return (
                    <Button className="PopoverContentItem" onClick={() => handleQuickPositionSetArgs(arr[1], 'top')} key={arr[1]}>{arr[0]}</Button>
                );
            })
        }
    </div>);

    const bottomPopoverContent = (<div className="PopoverContentItemNumOnly">
        <div style={{ color: 'rgba(0,106,180,.3)', textAlign: 'center', width: '100%' }}>position of parent's height</div>
        {
            positionArgs.map(arr => {
                return (
                    <Button className="PopoverContentItem" onClick={() => handleQuickPositionSetArgs(arr[1], 'bottom')} key={arr[1]}>{arr[0]}</Button>
                );
            })
        }
    </div>);

    return {
        widthPopoverContent,
        heightPopoverContent,
        leftPopoverContent,
        rightPopoverContent,
        topPopoverContent,
        bottomPopoverContent
    };
}