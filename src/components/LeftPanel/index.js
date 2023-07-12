import React, { useContext } from 'react';
import styled from 'styled-components';
import Pages from './Pages';
import Elements from './Elements';
import { PageContext, ElementContext } from '../../App';

const LeftPanelWrapper = styled.div`
    padding: 8px;
`;

const LeftPanel = () => {
    const { currentPageIndex, setCurrentPageIndex, pages, setPages } = useContext(PageContext);
    const { elements, setElements, selectedElement, setSelectedElement } = useContext(ElementContext);

    return (
        <LeftPanelWrapper>
            <Pages
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                pages={pages}
                setPages={setPages}
            />
            <Elements
                elements={elements}
                setElements={setElements}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
                currentPageIndex={currentPageIndex}
                setPages={setPages}
                pages={pages}
            />
        </LeftPanelWrapper>
    );
};

export default LeftPanel;
