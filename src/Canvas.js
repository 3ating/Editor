import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { AppContext } from './App';

const CanvasWrapper = styled.div`
    position: relative;
    background: white;
    overflow: hidden;
`;

const Block = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    left: ${(props) => props.x}px;
    top: ${(props) => props.y}px;
    opacity: ${(props) => props.o};
    background: ${(props) => props.color};
    outline: ${(props) => (props.active ? 2 : 0)}px solid #b7b7b7cc;
    cursor: pointer;
`;

const Canvas = () => {
    const { elements, selectedElement, setSelectedElement, setElements, pages, setPages, currentPageIndex } =
        useContext(AppContext);
    const canvasRef = useRef(null);

    const dragOffset = useRef({ x: 0, y: 0 });

    const handleDragStart = (e, element) => {
        const rect = e.target.getBoundingClientRect();
        dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        e.dataTransfer.setData('application/reactflow', JSON.stringify(element));
        setSelectedElement(element);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const newElement = JSON.parse(e.dataTransfer.getData('application/reactflow'));
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - dragOffset.current.x;
        const y = e.clientY - rect.top - dragOffset.current.y;

        const updatedElements = elements.map((el) => (el.id === newElement.id ? { ...newElement, x, y } : el));

        setElements(updatedElements);
        setPages((prevPages) =>
            prevPages.map((page, index) => (index === currentPageIndex ? { ...page, elements: updatedElements } : page))
        );
    };

    const handleDrag = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - dragOffset.current.x;
        const y = e.clientY - rect.top - dragOffset.current.y;
        setElements((prevElements) => prevElements.map((el) => (el.id === selectedElement.id ? { ...el, x, y } : el)));
    };

    return (
        <CanvasWrapper ref={canvasRef} onDragOver={handleDragOver} onDrop={handleDrop}>
            {elements.map((element) => (
                <Block
                    key={element.id}
                    x={element.x}
                    y={element.y}
                    o={element.o}
                    color={element.color}
                    active={selectedElement && selectedElement.id === element.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, element)}
                    // onDrag={handleDrag}
                    onClick={() => setSelectedElement(element)}
                />
            ))}
        </CanvasWrapper>
    );
};

export default Canvas;
