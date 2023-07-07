import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './App';

const ElementsWrapper = styled.div``;

const ElementItem = styled.div`
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#0274ff' : 'gray')};
`;

const Elements = () => {
    const { elements, selectedElement, setSelectedElement } = useContext(AppContext);

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
