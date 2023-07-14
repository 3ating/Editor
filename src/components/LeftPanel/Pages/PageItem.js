import React, { useCallback } from 'react';
import styled from 'styled-components';

const PageItems = styled.div`
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#0274ff' : 'gray')};
`;

const PageItem = ({
    page,
    index,
    isEditing,
    editName,
    handleNameChange,
    handlePagesKeyDown,
    handleBlur,
    setCurrentPageIndex,
    handlePagesDoubleClick,
    isActive,
}) => {
    const handleClick = useCallback(() => setCurrentPageIndex(Number(index)), [setCurrentPageIndex, index]);
    const handleDoubleClick = useCallback(
        () => handlePagesDoubleClick(page, index, 'page'),
        [handlePagesDoubleClick, page, index]
    );

    return (
        <PageItems onClick={handleClick} isActive={isActive} onDoubleClick={handleDoubleClick}>
            {isEditing === page.id ? (
                <input
                    value={editName}
                    onChange={handleNameChange}
                    onKeyDown={(e) => handlePagesKeyDown(e, page.id)}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                page.name || `Page ${index + 1}`
            )}
        </PageItems>
    );
};

function propsAreEqual(prevProps, nextProps) {
    if (
        prevProps.page.id === nextProps.page.id &&
        prevProps.isEditing === nextProps.isEditing &&
        prevProps.editName === nextProps.editName &&
        prevProps.isActive === nextProps.isActive
    ) {
        return true;
    } else {
        return false;
    }
}

export default React.memo(PageItem, propsAreEqual);
