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
    const { elements, selectedElement } = useContext(ElementContext);

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
                selectedElement={selectedElement}
                currentPageIndex={currentPageIndex}
                setPages={setPages}
                pages={pages}
            />
        </LeftPanelWrapper>
    );
};

export default LeftPanel;
