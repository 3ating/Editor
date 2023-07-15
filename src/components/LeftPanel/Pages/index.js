import React from 'react';
import styled from 'styled-components';
import useEditable from '../../../hooks/useEditable';
import PageItem from './PageItem';

const PagesWrapper = styled.div`
    border-bottom: 1px solid;
    padding-bottom: 16px;
`;

const Pages = ({ currentPageIndex, setCurrentPageIndex, pages, setPages }) => {
    const { editingId, editName, handleDoubleClick, handleNameChange, handlePagesKeyDown, handleBlur } = useEditable(
        pages,
        setPages
    );

    return (
        <PagesWrapper>
            <h4>Pages</h4>
            {pages.map((page, index) => (
                <PageItem
                    key={page.id}
                    page={page}
                    index={index}
                    editingId={editingId}
                    editName={editName}
                    handleNameChange={handleNameChange}
                    handlePagesKeyDown={handlePagesKeyDown}
                    handleBlur={handleBlur}
                    setCurrentPageIndex={setCurrentPageIndex}
                    handlePagesDoubleClick={handleDoubleClick}
                    active={currentPageIndex === index}
                    currentPageIndex={currentPageIndex}
                    setPages={setPages}
                />
            ))}
        </PagesWrapper>
    );
};

const propsAreEqual = (prevProps, nextProps) => {
    return (
        prevProps.pages === nextProps.pages &&
        prevProps.currentPageIndex === nextProps.currentPageIndex &&
        prevProps.editingId === nextProps.editingId &&
        prevProps.editName === nextProps.editName &&
        prevProps.editingId === null
    );
};

export default React.memo(Pages, propsAreEqual);
