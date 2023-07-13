import React from 'react';
import styled from 'styled-components';
import useEditable from '../../../hooks/useEditable';
import PageItem from './PageItem';

const PagesWrapper = styled.div`
    border-bottom: 1px solid;
    padding-bottom: 16px;
`;

const Pages = ({ currentPageIndex, setCurrentPageIndex, pages, setPages }) => {
    const { isEditing, editName, handlePagesDoubleClick, handleNameChange, handlePagesKeyDown, handleBlur } =
        useEditable(pages, setPages);

    return (
        <PagesWrapper>
            <h4>Pages</h4>
            {pages.map((page, index) => (
                <PageItem
                    key={page.id}
                    page={page}
                    index={index}
                    isEditing={isEditing}
                    editName={editName}
                    handleNameChange={handleNameChange}
                    handlePagesKeyDown={handlePagesKeyDown}
                    handleBlur={handleBlur}
                    setCurrentPageIndex={setCurrentPageIndex}
                    handlePagesDoubleClick={handlePagesDoubleClick}
                    isActive={currentPageIndex === index}
                />
            ))}
        </PagesWrapper>
    );
};

function propsAreEqual(prevProps, nextProps) {
    return (
        prevProps.pages === nextProps.pages &&
        prevProps.currentPageIndex === nextProps.currentPageIndex &&
        prevProps.isEditing === nextProps.isEditing &&
        prevProps.editName === nextProps.editName
    );
}

export default React.memo(Pages, propsAreEqual);
