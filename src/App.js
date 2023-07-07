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
    const [elements, setElements] = useState([
        { id: 1, name: 'Element 1', x: 10, y: 10, o: 1, color: '#00FF00' },
        { id: 2, name: 'Element 2', x: 60, y: 60, o: 0.5, color: '#FF0000' },
        { id: 3, name: 'Element 3', x: 110, y: 110, o: 1, color: '#0000FF' },
    ]);
    const [currentPage, setCurrentPage] = useState('Page 1');
    const [selectedElement, setSelectedElement] = useState(null);

    return (
        <AppContext.Provider
            value={{ currentPage, setCurrentPage, selectedElement, setSelectedElement, elements, setElements }}
        >
            <AppWrapper>
                <LeftPanel />
                <Canvas />
                <RightPanel />
            </AppWrapper>
        </AppContext.Provider>
    );
};

export default App;
