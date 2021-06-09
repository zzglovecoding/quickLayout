
export default function() {
    const handleDragStart = (e, name) => {
        e.dataTransfer.setData('componentName', name);
    };

    const handleDragEnd = (e) => {
        e.dataTransfer.clearData();
    };

    return {
        handleDragStart,
        handleDragEnd
    };
}