import React, { useContext } from 'react';
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
    outline: ${(props) => (props.active ? 1 : 0)}px solid #0274ff;
    cursor: pointer;
`;

const Canvas = () => {
    const { elements, selectedElement, setSelectedElement } = useContext(AppContext);

    return (
        <CanvasWrapper>
            {elements.map((element) => (
                <Block
                    key={element.id}
                    x={element.x}
                    y={element.y}
                    o={element.o}
                    color={element.color}
                    active={selectedElement && selectedElement.id === element.id}
                    onClick={() => setSelectedElement(element)}
                />
            ))}
        </CanvasWrapper>
    );
};

export default Canvas;
