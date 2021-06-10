
export default function() {
    const handleDragStart = (e, name) => {
        let xOffset = e.clientX - e.target.offsetLeft;
        let yOffset = e.clientY - e.target.offsetTop;
        e.target.style.opacity = '0.4';
        e.dataTransfer.setData('componentName', name);
        e.dataTransfer.setData('xOffset', xOffset);
        e.dataTransfer.setData('yOffset', yOffset);
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