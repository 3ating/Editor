import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './App';
import ColorPicker from './ColorPicker';

const RightPanelWrapper = styled.div`
    padding: 8px;
`;
const Label = styled.label`
    display: grid;
    grid-template-columns: 16px auto minmax(0, 1fr);
    grid-gap: 8px;
`;

const RightPanel = () => {
    const { selectedElement } = useContext(AppContext);

    if (!selectedElement) {
        return <RightPanelWrapper>Select an element to see its properties</RightPanelWrapper>;
    }

    return (
        <RightPanelWrapper>
            <Label>
                X <input type='number' min={0} max={999} value={selectedElement.x} />
            </Label>
            <Label>
                Y <input type='number' min={0} max={999} value={selectedElement.y} />
            </Label>
            <Label>
                O <input type='number' min={0} max={100} value={selectedElement.o * 100} />
                <input type='range' min={0} max={100} value={selectedElement.o * 100} />
            </Label>
            <Label>
                B <ColorPicker color={selectedElement.color} /> {selectedElement.color}
            </Label>
        </RightPanelWrapper>
    );
};

export default RightPanel;
