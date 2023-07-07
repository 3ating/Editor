import React, { useState, createContext } from 'react';
import styled from 'styled-components';
import LeftPanel from './LeftPanel';
import Canvas from './Canvas';
import RightPanel from './RightPanel';

const AppWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 200px auto 200px;
    background: #232323;
    height: 100vh;
    color: white;
`;

export const AppContext = createContext();

const App = () => {
    const [currentPage, setCurrentPage] = useState('Page 1');

    return (
        <AppContext.Provider value={{ currentPage, setCurrentPage }}>
            <AppWrapper>
                <LeftPanel />
                <Canvas />
                <RightPanel />
            </AppWrapper>
        </AppContext.Provider>
    );
};

export default App;
