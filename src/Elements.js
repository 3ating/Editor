import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './App';
import useEditable from './hooks/useEditable';

const ElementsWrapper = styled.div``;

const ElementItem = styled.div`
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#0274ff' : 'gray')};
`;

const Elements = () => {
    const { currentPageIndex, elements, setElements, selectedElement, setSelectedElement, pages, setPages } =
        useContext(AppContext);

    const { isEditing, editName, handleDoubleClick, handleNameChange, handleElementsKeyDown, handleBlur } = useEditable(
        elements,
        setElements,
        pages,
        setPages,
        currentPageIndex
    );

    return (
        <ElementsWrapper>
            <h4>Elements</h4>
            {elements.map((element, index) => (
                <ElementItem
                    key={element.id}
                    onClick={() => setSelectedElement(element)}
                    isActive={selectedElement && selectedElement.id === element.id}
                    onDoubleClick={() => handleDoubleClick(element, index)}
                >
                    {isEditing === element.id ? (
                        <input
                            value={editName}
                            onChange={handleNameChange}
                            onKeyDown={(e) => handleElementsKeyDown(e, element.id)}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    ) : (
                        element.name || `Element ${index + 1}`
                    )}
                </ElementItem>
            ))}
        </ElementsWrapper>
    );
};

export default Elements;
