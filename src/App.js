import React, { useState, createContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import LeftPanel from './components/LeftPanel';
import Canvas from './components/Canvas';
import RightPanel from './components/RightPanel';

const AppWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 200px auto 200px;
    background: #232323;
    height: 100vh;
    color: white;
`;

export const PageContext = createContext();
export const ElementContext = createContext();

const App = () => {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [pages, setPages] = useState([
        {
            id: uuidv4(),
            name: 'Page 1',
            elements: [
                { id: uuidv4(), x: 10, y: 10, o: 1, color: '#008000', width: 50, height: 50, active: false },
                { id: uuidv4(), x: 60, y: 60, o: 0.5, color: '#008000', width: 50, height: 50, active: false },
                { id: uuidv4(), x: 110, y: 110, o: 1, color: '#008000', width: 50, height: 50, active: false },
            ],
        },
        {
            id: uuidv4(),
            name: 'Page 2',
            elements: [],
        },
    ]);

    const elements = pages[currentPageIndex].elements;
    const selectedElement = elements.find((el) => el.active) || null;

    const pageValue = useMemo(
        () => ({ currentPageIndex, setCurrentPageIndex, pages, setPages }),
        [currentPageIndex, pages]
    );

    const elementValue = useMemo(() => ({ elements, selectedElement }), [elements, selectedElement?.id]);

    return (
        <PageContext.Provider value={pageValue}>
            <ElementContext.Provider value={elementValue}>
                <AppWrapper>
                    <LeftPanel />
                    <Canvas />
                    <RightPanel />
                </AppWrapper>
            </ElementContext.Provider>
        </PageContext.Provider>
    );
};

export default App;
