import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PageContext, ElementContext } from '../../App';
import ColorPicker from './ColorPicker';
import PositionLabel from './PositionLabel';
import OpacityControl from './OpacityControl';

const RightPanelWrapper = styled.div`
    padding: 8px;
`;

const RightPanel = () => {
    const { currentPageIndex, setPages } = useContext(PageContext);
    const { selectedElement, setSelectedElement, elements, setElements } = useContext(ElementContext);

    useEffect(() => {
        setSelectedElement(null);
    }, [currentPageIndex, setSelectedElement]);

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
                    <PositionLabel
                        label='X'
                        value={selectedElement.x}
                        onChange={(e) => handleElementChange('x', parseInt(e.target.value))}
                    />
                    <PositionLabel
                        label='Y'
                        value={selectedElement.y}
                        onChange={(e) => handleElementChange('y', parseInt(e.target.value))}
                    />
                    <OpacityControl opacity={selectedElement.o} handleElementChange={handleElementChange} />
                    <ColorPicker
                        label='B'
                        color={selectedElement.color}
                        onChangeColor={(color) => handleElementChange('color', color)}
                    />
                </>
            )}
        </RightPanelWrapper>
    );
};

function rightPanelPropsAreEqual(prevProps, nextProps) {
    return (
        prevProps.currentPageIndex === nextProps.currentPageIndex &&
        prevProps.selectedElement?.id === nextProps.selectedElement?.id
    );
}

export default React.memo(RightPanel, rightPanelPropsAreEqual);
