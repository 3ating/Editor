import React, { useCallback } from 'react';
import styled from 'styled-components';

const PageItems = styled.div`
    cursor: pointer;
    color: ${(props) => (props.active ? '#0274ff' : 'gray')};
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
    active,
    setPages,
    currentPageIndex,
}) => {
    const handleClick = useCallback(() => {
        setPages((prevPages) =>
            prevPages.map((page, idx) => {
                if (idx === currentPageIndex) {
                    return {
                        ...page,
                        elements: page.elements.map((element) => ({ ...element, active: false })),
                    };
                }

                return page;
            })
        );

        setCurrentPageIndex(Number(index));
    }, [setCurrentPageIndex, index, currentPageIndex, setPages]);

    const handleDoubleClick = useCallback(
        () => handlePagesDoubleClick('page', page, index),
        [handlePagesDoubleClick, page, index]
    );

    return (
        <PageItems onClick={handleClick} active={active} onDoubleClick={handleDoubleClick}>
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
        prevProps.active === nextProps.active
    ) {
        return true;
    } else {
        return false;
    }
}

export default React.memo(PageItem, propsAreEqual);
