import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from './App';

const PagesWrapper = styled.div`
    border-bottom: 1px solid;
    padding-bottom: 16px;
`;

const PageItem = styled.div`
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#0274ff' : 'gray')};
`;

const Pages = () => {
    const { currentPageIndex, setCurrentPageIndex, pages, setPages } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');

    const handleDoubleClick = () => {
        setIsEditing(true);
        setEditName(pages[currentPageIndex].name);
    };

    const handleNameChange = (e) => {
        setEditName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setPages((prevPages) =>
                prevPages.map((page, index) => (index === currentPageIndex ? { ...page, name: editName } : page))
            );
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <PagesWrapper>
            <h4>Pages</h4>
            {pages.map((page, index) => (
                <PageItem
                    key={page.name}
                    onClick={() => setCurrentPageIndex(Number(index))}
                    isActive={currentPageIndex === index}
                    onDoubleClick={handleDoubleClick}
                >
                    {isEditing && currentPageIndex === index ? (
                        <input
                            value={editName}
                            onChange={handleNameChange}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    ) : (
                        page.name
                    )}
                </PageItem>
            ))}
        </PagesWrapper>
    );
};

export default Pages;
