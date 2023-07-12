import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../App';
import { PageContext, ElementContext } from '../../App';

import ColorPicker from './ColorPicker';

const RightPanelWrapper = styled.div`
    padding: 8px;
`;
const Label = styled.label`
    display: grid;
    grid-template-columns: 16px auto minmax(0, 1fr);
    grid-gap: 8px;
`;

const Input = styled.input`
    width: 100%;
`;

const RightPanel = () => {
    // const { currentPageIndex, selectedElement, setSelectedElement, elements, setElements, pages, setPages } =
    //     useContext(AppContext);
    const { currentPageIndex, setPages } = useContext(PageContext);
    const { selectedElement, setSelectedElement, elements, setElements } = useContext(ElementContext);
    const handleElementChange = (prop, value) => {
        if (selectedElement) {
            const updatedElement = { ...selectedElement, [prop]: value };
            setSelectedElement(updatedElement);
            const updatedElements = elements.map((el) => (el.id === selectedElement.id ? updatedElement : el));
            setElements(updatedElements);
            setPages((prevPages) =>
                prevPages.map((page, index) =>
                    index === currentPageIndex ? { ...page, elements: updatedElements } : page
                )
            );
        }
    };

    return (
        <RightPanelWrapper>
            {selectedElement && (
                <>
                    <Label>
                        X
                        <Input
                            type='number'
                            min={0}
                            max={999}
                            value={selectedElement.x}
                            onChange={(e) => handleElementChange('x', parseInt(e.target.value))}
                        />
                    </Label>
                    <Label>
                        Y
                        <Input
                            type='number'
                            min={0}
                            max={999}
                            value={selectedElement.y}
                            onChange={(e) => handleElementChange('y', parseInt(e.target.value))}
                        />
                    </Label>
                    <Label>
                        O
                        <Input
                            type='number'
                            min={0}
                            max={100}
                            value={parseInt(selectedElement.o * 100)}
                            onChange={(e) => handleElementChange('o', parseFloat(e.target.value) / 100)}
                        />
                        <input
                            type='range'
                            min={0}
                            max={100}
                            value={parseInt(selectedElement.o * 100)}
                            onChange={(e) => handleElementChange('o', parseFloat(e.target.value) / 100)}
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
