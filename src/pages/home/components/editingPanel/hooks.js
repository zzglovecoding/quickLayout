import React from 'react';
import { Button, Input } from 'antd';
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
        } else if (type === 'left') {
            if (fraction === 'center') {
                
            }
        }
    };

    let args = [['1/4', 0.25], ['1/3', 0.33], ['1/2', 0.5], ['1/1', 1]];
    let positionArgs = ['center'];

    const widthPopoverContent = (<div className="PopoverContent">
        <Input placeholder="input the fraction"></Input>
        {
            args.map(arr => {
                return (
                    <Button className="PopoverContentItem" onClick={() => handleQuickSetArgs(arr[1], 'width')} key={arr[1]}>set {arr[0]} width of parent</Button>
                );
            })
        }
    </div>);

    const heightPopoverContent = (<div className="PopoverContent">
        <Input placeholder="input the fraction"></Input>
        {
            args.map(arr => {
                return (
                    <Button className="PopoverContentItem" onClick={() => handleQuickSetArgs(arr[1], 'height')} key={arr[1]}>set {arr[0]} height of parent</Button>
                );
            })
        }
    </div>);

    const leftPopoverContent = (<div className="PopoverContent">
        {
            positionArgs.map(item => {
                return (
                    <Button className="PopoverContentItem" onClick={() => handleQuickSetArgs(item, 'left')} key={item}>center</Button>
                );
            })
        }
    </div>);

    return {
        widthPopoverContent,
        heightPopoverContent,
        leftPopoverContent
    };
}