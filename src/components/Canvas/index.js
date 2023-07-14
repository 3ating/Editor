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
    const { currentPageIndex, pages, setPages } = useContext(PageContext);
    const { elements, selectedElement } = useContext(ElementContext);
    const canvasRef = useRef(null);
    const dragOffset = useRef({ x: 0, y: 0 });

    const handleDragStart = useCallback(
        (e, element) => {
            const rect = e.target.getBoundingClientRect();
            dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            e.dataTransfer.setData('application/reactflow', JSON.stringify(element));
            setPages((prevPages) =>
                prevPages.map((page, index) =>
                    index === currentPageIndex
                        ? {
                              ...page,
                              elements: page.elements.map((el) =>
                                  el.id === element.id ? { ...el, active: true } : { ...el, active: false }
                              ),
                          }
                        : page
                )
            );
            e.dataTransfer.effectAllowed = 'move';
            e.target.style.transition = '';
        },
        [setPages, currentPageIndex]
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

            setPages((prevPages) =>
                prevPages.map((page, index) =>
                    index === currentPageIndex
                        ? {
                              ...page,
                              elements: page.elements.map((el) =>
                                  el.id === newElement.id ? { ...el, x, y, active: true } : { ...el, active: false }
                              ),
                          }
                        : page
                )
            );
        },
        [setPages, currentPageIndex]
    );

    return (
        <CanvasWrapper ref={canvasRef} onDragOver={handleDragOver} onDrop={handleDrop}>
            {elements.map((element) => (
                <Block
                    key={element.id}
                    element={element}
                    active={selectedElement && selectedElement.id === element.id}
                    onDragStart={(e) => handleDragStart(e, element)}
                    onClick={() =>
                        setPages((prevPages) =>
                            prevPages.map((page, index) =>
                                index === currentPageIndex
                                    ? {
                                          ...page,
                                          elements: page.elements.map((el) =>
                                              el.id === element.id ? { ...el, active: true } : { ...el, active: false }
                                          ),
                                      }
                                    : page
                            )
                        )
                    }
                />
            ))}
        </CanvasWrapper>
    );
};

export default Canvas;
