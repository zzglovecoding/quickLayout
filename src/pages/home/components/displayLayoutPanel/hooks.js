
export default function(sizeData) {
    const handleDropInDisplayArea = e => {
        e.stopPropagation();
        let componentName = e.dataTransfer.getData('componentName');
        let clientX = e.clientX;
        let clientY = e.clientY;
        console.log(sizeData);
    };

    const gridProperties = {
        background: '-webkit-linear-gradient(top,transparent 19px,#e1e4e8 20px),-webkit-linear-gradient(left, transparent 19px, #e1e4e8 20px)',
        backgroundSize: '20px 20px'
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    return {
        handleDropInDisplayArea,
        handleDragOver,
        gridProperties
    };
}