
export default function() {
    const handleDragStart = (e, name) => {
        e.target.style.opacity = '0.4';
        e.dataTransfer.setData('componentName', name);
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