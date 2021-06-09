import { useEffect } from 'react';
import { paintDisplayLayout } from '@/utils/common.js';

export default function(sizeData, settings) {
    const {
        componentTree,
        setComponentTree
    } = settings;

    const handleDropInDisplayArea = e => {
        e.stopPropagation();
        let componentName = e.dataTransfer.getData('componentName');
        let left = e.clientX - 320;
        let top = e.clientY - 70;
        let current = {
            componentName,
            left,
            top
        };
        // 检测释放位置和已有元素之间的包含关系，并记录到全局的componentTree对象中
        checkIsConflictAddToTree(current);
        // 在画布中根据componentTree把展示图画出来
        
    };

    const gridProperties = {
        background: '-webkit-linear-gradient(top,transparent 19px,#e1e4e8 20px),-webkit-linear-gradient(left, transparent 19px, #e1e4e8 20px)',
        backgroundSize: '20px 20px'
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    useEffect(() => {
        paintDisplayLayout(componentTree);
    }, [componentTree]);

    return {
        handleDropInDisplayArea,
        handleDragOver,
        gridProperties
    };
}