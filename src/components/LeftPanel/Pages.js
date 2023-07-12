import React from 'react';
import styled from 'styled-components';
import useEditable from '../../hooks/useEditable';

const PagesWrapper = styled.div`
    border-bottom: 1px solid;
    padding-bottom: 16px;
`;

const PageItem = styled.div`
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#0274ff' : 'gray')};
`;

const Pages = React.memo(({ currentPageIndex, setCurrentPageIndex, pages, setPages }) => {
    const { isEditing, editName, handlePagesDoubleClick, handleNameChange, handlePagesKeyDown, handleBlur } =
        useEditable(pages, setPages);

    return (
        <PagesWrapper>
            <h4>Pages</h4>
            {pages.map((page, index) => (
                <PageItem
                    key={page.id}
                    onClick={() => setCurrentPageIndex(Number(index))}
                    isActive={currentPageIndex === index}
                    onDoubleClick={() => handlePagesDoubleClick(page, index)}
                >
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
                </PageItem>
            ))}
        </PagesWrapper>
    );
});

export default Pages;
