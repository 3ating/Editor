import React from 'react';
import styled from 'styled-components';
import useEditable from '../../../hooks/useEditable';
import ElementItem from './ElementItem';

const ElementsWrapper = styled.div``;

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
                        element={element}
                        index={index}
                        isEditing={isEditing}
                        editName={editName}
                        handleNameChange={handleNameChange}
                        handleElementsKeyDown={handleElementsKeyDown}
                        handleBlur={handleBlur}
                        setSelectedElement={setSelectedElement}
                        handleElementsDoubleClick={handleElementsDoubleClick}
                        active={selectedElement && selectedElement.id === element.id}
                    />
                ))}
            </ElementsWrapper>
        );
    }
);

function propsAreEqual(prevProps, nextProps) {
    return (
        prevProps.elements === nextProps.elements &&
        prevProps.selectedElement?.id === nextProps.selectedElement?.id &&
        prevProps.isEditing === nextProps.isEditing &&
        prevProps.editName === nextProps.editName
    );
}

export default React.memo(Elements, propsAreEqual);
