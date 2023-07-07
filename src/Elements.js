import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './App';

const ElementsWrapper = styled.div``;

const ElementItem = styled.div`
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#0274ff' : 'gray')};
`;

const Elements = () => {
    const { selectedElement, setSelectedElement } = useContext(AppContext);

    const elements = [
        { id: 1, name: 'Element 1', x: 10, y: 10, o: 1, color: '#00FF00' },
        { id: 2, name: 'Element 2', x: 60, y: 60, o: 0.5, color: '#FF0000' },
        { id: 3, name: 'Element 3', x: 110, y: 110, o: 1, color: '#0000FF' },
    ];

    return (
        <ElementsWrapper>
            <h4>Elements</h4>
            {elements.map((element) => (
                <ElementItem
                    key={element.id}
                    onClick={() => setSelectedElement(element)}
                    isActive={selectedElement && selectedElement.id === element.id}
                >
                    {element.name}
                </ElementItem>
            ))}
        </ElementsWrapper>
    );
};

export default Elements;
