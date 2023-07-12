import React from 'react';
import styled from 'styled-components';
import useEditable from '../../hooks/useEditable';

const ElementsWrapper = styled.div``;

const ElementItem = styled.div`
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#0274ff' : 'gray')};
`;

const Elements = React.memo(
    ({ elements, setElements, selectedElement, setSelectedElement, currentPageIndex, setPages, pages }) => {
        const { isEditing, editName, handleElementsDoubleClick, handleNameChange, handleElementsKeyDown, handleBlur } =
            useEditable(elements, setElements, pages, setPages, currentPageIndex);

        return (
            <ElementsWrapper>
                <h4>Elements</h4>
                {elements.map((element, index) => (
                    <ElementItem
                        key={element.id}
                        onClick={() => setSelectedElement(element)}
                        isActive={selectedElement && selectedElement.id === element.id}
                        onDoubleClick={() => handleElementsDoubleClick(element, index)}
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
    }
);

export default Elements;
