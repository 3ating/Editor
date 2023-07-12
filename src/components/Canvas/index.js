import React, { useContext, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { PageContext, ElementContext } from '../../App';

import Block from './Block';

const CanvasWrapper = styled.div`
    position: relative;
    background: white;
    overflow: hidden;
`;

const Canvas = () => {
    const { currentPageIndex, setPages } = useContext(PageContext);
    const { elements, selectedElement, setSelectedElement, setElements } = useContext(ElementContext);

    const canvasRef = useRef(null);

    const dragOffset = useRef({ x: 0, y: 0 });

    const handleDragStart = useCallback(
        (e, element) => {
            const rect = e.target.getBoundingClientRect();
            dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            e.dataTransfer.setData('application/reactflow', JSON.stringify(element));
            setSelectedElement(element);
            e.dataTransfer.effectAllowed = 'move';
            e.target.style.transition = '';
        },
        [setSelectedElement]
    );

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, []);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            const newElement = JSON.parse(e.dataTransfer.getData('application/reactflow'));
            const rect = canvasRef.current.getBoundingClientRect();
            let x = e.clientX - rect.left - dragOffset.current.x;
            let y = e.clientY - rect.top - dragOffset.current.y;

            x = Math.min(Math.max(x, 0), rect.width - newElement.width);
            y = Math.min(Math.max(y, 0), rect.height - newElement.height);

            const updatedElement = { ...newElement, x, y };
            const updatedElements = elements.map((el) => (el.id === newElement.id ? updatedElement : el));

            setElements(updatedElements);
            setSelectedElement(updatedElement);
            setPages((prevPages) =>
                prevPages.map((page, index) =>
                    index === currentPageIndex ? { ...page, elements: updatedElements } : page
                )
            );
        },
        [elements, setElements, setSelectedElement, setPages, currentPageIndex]
    );

    const handleDrag = useCallback((e, element) => {
        if (e.clientX === 0 || e.clientY === 0) {
            return;
        }

        const target = e.target;
        const rect = canvasRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left - dragOffset.current.x;
        let y = e.clientY - rect.top - dragOffset.current.y;

        x = Math.min(Math.max(x, 0), rect.width - target.offsetWidth);
        y = Math.min(Math.max(y, 0), rect.height - target.offsetHeight);

        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }, []);

    return (
        <CanvasWrapper ref={canvasRef} onDragOver={handleDragOver} onDrop={handleDrop}>
            {elements.map((element) => (
                <Block
                    key={element.id}
                    element={element}
                    active={selectedElement && selectedElement.id === element.id}
                    onDragStart={(e) => handleDragStart(e, element)}
                    onClick={() => setSelectedElement(element)}
                    onDrag={(e) => handleDrag(e, element)}
                />
            ))}
        </CanvasWrapper>
    );
};

export default Canvas;
