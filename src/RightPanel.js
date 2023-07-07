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
    const { selectedElement, setSelectedElement, elements, setElements } = useContext(AppContext);

    const handleElementChange = (prop, value) => {
        if (selectedElement) {
            setSelectedElement({ ...selectedElement, [prop]: value });
            setElements(
                elements.map((el) => (el.id === selectedElement.id ? { ...selectedElement, [prop]: value } : el))
            );
        }
    };

    return (
        <RightPanelWrapper>
            {selectedElement && (
                <>
                    <Label>
                        X
                        <input
                            type='number'
                            min={0}
                            max={999}
                            value={selectedElement.x}
                            onChange={(e) => handleElementChange('x', parseInt(e.target.value))}
                        />
                    </Label>
                    <Label>
                        Y
                        <input
                            type='number'
                            min={0}
                            max={999}
                            value={selectedElement.y}
                            onChange={(e) => handleElementChange('y', parseInt(e.target.value))}
                        />
                    </Label>
                    <Label>
                        O
                        <input
                            type='number'
                            min={0}
                            max={1}
                            step={0.1}
                            value={selectedElement.o}
                            onChange={(e) => handleElementChange('o', parseFloat(e.target.value))}
                        />
                    </Label>
                    <Label>
                        B
                        <ColorPicker
                            color={selectedElement.color}
                            onChangeColor={(color) => handleElementChange('color', color)}
                        />
                        {selectedElement.color}
                    </Label>
                </>
            )}
        </RightPanelWrapper>
    );
};

export default RightPanel;
