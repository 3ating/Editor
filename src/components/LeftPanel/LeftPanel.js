import React, { useContext } from 'react';
import styled from 'styled-components';
import Pages from '.';
import Elements from './Elements';
import { PageContext, ElementContext } from '../../App';

const LeftPanelWrapper = styled.div`
    padding: 8px;
`;

const LeftPanel = () => {
    const pageContext = useContext(PageContext);
    const elementContext = useContext(ElementContext);
    return (
        <LeftPanelWrapper>
            <Pages {...pageContext} />
            <Elements {...elementContext} {...pageContext} />
        </LeftPanelWrapper>
    );
};

export default LeftPanel;
