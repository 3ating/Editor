import React, { useCallback } from 'react';
import styled from 'styled-components';

const StyledElementItem = styled.div`
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#0274ff' : 'gray')};
`;

function ElementItem({
    element,
    index,
    isEditing,
    editName,
    handleNameChange,
    handleElementsKeyDown,
    handleBlur,
    setSelectedElement,
    handleElementsDoubleClick,
    isActive,
}) {
    const handleClick = useCallback(() => setSelectedElement(element), [setSelectedElement, element]);
    const handleDoubleClick = useCallback(
        () => handleElementsDoubleClick(element, index, 'element'),
        [handleElementsDoubleClick, element, index]
    );

    return (
        <StyledElementItem onClick={handleClick} isActive={isActive} onDoubleClick={handleDoubleClick}>
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
        </StyledElementItem>
    );
}

function propsAreEqual(prevProps, nextProps) {
    return (
        prevProps.element.id === nextProps.element.id &&
        prevProps.isEditing === nextProps.isEditing &&
        prevProps.editName === nextProps.editName &&
        prevProps.isActive === nextProps.isActive
    );
}

export default React.memo(ElementItem, propsAreEqual);
