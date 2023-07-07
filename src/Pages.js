import React, { useContext } from 'react';
import { AppContext } from './App';
import styled from 'styled-components';

const PagesWrapper = styled.div`
    border-bottom: 1px solid;
    padding-bottom: 16px;
`;
const PageItem = styled.div`
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#0274ff' : 'gray')};
`;

const Pages = () => {
    const { currentPage, setCurrentPage } = useContext(AppContext);

    const pages = ['Page 1', 'Page 2'];
    return (
        <PagesWrapper>
            <h4>Pages</h4>
            {pages.map((page) => (
                <PageItem key={page} onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                    {page}
                </PageItem>
            ))}
        </PagesWrapper>
    );
};

export default Pages;
