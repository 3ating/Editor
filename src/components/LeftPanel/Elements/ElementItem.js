import React, { useCallback } from 'react';
import styled from 'styled-components';

const StyledElementItem = styled.div`
    cursor: pointer;
    color: ${(props) => (props.active ? '#0274ff' : 'gray')};
`;

function ElementItem({
    element,
    index,
    editingId,
    editName,
    handleNameChange,
    handleElementsKeyDown,
    handleBlur,
    handleElementsDoubleClick,
    active,
    setPages,
    currentPageIndex,
}) {
    const handleClick = useCallback(() => {
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
    }, [setPages, currentPageIndex, element]);

    const handleDoubleClick = useCallback(
        () => handleElementsDoubleClick('element', element, index),
        [handleElementsDoubleClick, element, index]
    );

    return (
        <StyledElementItem onClick={handleClick} active={active} onDoubleClick={handleDoubleClick}>
            {editingId === element.id ? (
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

const propsAreEqual = (prevProps, nextProps) => {
    return (
        prevProps.element.id === nextProps.element.id &&
        prevProps.editingId === nextProps.editingId &&
        prevProps.editName === nextProps.editName &&
        prevProps.active === nextProps.active
    );
};

export default React.memo(ElementItem, propsAreEqual);
