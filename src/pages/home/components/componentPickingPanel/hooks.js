import { ITEM_DEFAULT_WIDTH, ITEM_DEFAULT_HEIGHT } from '@/constants/common.js';

export default function() {
    const handleDragStart = (e, name, isSingle) => {
        let xOffset = e.clientX - e.target.offsetLeft;
        let yOffset = e.clientY - e.target.offsetTop;
        e.target.style.opacity = '0.4';
        e.dataTransfer.setData('componentName', name);
        e.dataTransfer.setData('isSingle', isSingle);
        e.dataTransfer.setData('xOffset', xOffset);
        e.dataTransfer.setData('yOffset', yOffset);
        e.dataTransfer.setData('isEditingNow', true);
        e.dataTransfer.setData('width', ITEM_DEFAULT_WIDTH);
        e.dataTransfer.setData('height', ITEM_DEFAULT_HEIGHT);
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1';
        e.dataTransfer.clearData();
    };

    return {
        handleDragStart,
        handleDragEnd
    };
}