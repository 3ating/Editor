import React, { useState, createContext, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
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
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [pages, setPages] = useState([
        {
            name: 'Page 1',
            elements: [
                { id: uuidv4(), x: 10, y: 10, o: 1, color: '#008000', active: true },
                { id: uuidv4(), x: 60, y: 60, o: 0.5, color: '#008000', active: false },
                { id: uuidv4(), x: 110, y: 110, o: 1, color: '#008000', active: false },
            ],
        },
        {
            name: 'Page 2',
            elements: [{ id: uuidv4(), x: 70, y: 70, o: 0.9, color: '#566e95', active: true }],
        },
    ]);
    const [elements, setElements] = useState(pages[currentPageIndex].elements);
    const [selectedElement, setSelectedElement] = useState(elements.find((el) => el.active) || null);

    useEffect(() => {
        setElements(pages[currentPageIndex].elements);
        setSelectedElement(null);
    }, [currentPageIndex, pages]);

    return (
        <AppContext.Provider
            value={{
                currentPageIndex,
                setCurrentPageIndex,
                elements,
                setElements,
                selectedElement,
                setSelectedElement,
                pages,
                setPages,
            }}
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
