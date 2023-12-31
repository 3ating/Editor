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
    const { currentPageIndex, pages, setPages } = useContext(PageContext);
    const { selectedElement } = useContext(ElementContext);

    useEffect(() => {
        setPages((prevPages) =>
            prevPages.map((page, index) =>
                index === currentPageIndex
                    ? { ...page, elements: page.elements.map((el) => ({ ...el, active: false })) }
                    : page
            )
        );
    }, [currentPageIndex, setPages]);

    const handleElementChange = (selectedElement, prop, value) => {
        if (selectedElement) {
            setPages((prevPages) =>
                prevPages.map((page, index) =>
                    index === currentPageIndex
                        ? {
                              ...page,
                              elements: page.elements.map((el) =>
                                  el.id === selectedElement.id ? { ...el, [prop]: value } : el
                              ),
                          }
                        : page
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
                        onChange={(e) => handleElementChange(selectedElement, 'x', parseInt(e.target.value))}
                    />
                    <PositionLabel
                        label='Y'
                        value={selectedElement.y}
                        onChange={(e) => handleElementChange(selectedElement, 'y', parseInt(e.target.value))}
                    />
                    <OpacityControl
                        opacity={selectedElement.o}
                        onChange={(e) => handleElementChange(selectedElement, 'o', parseFloat(e.target.value) / 100)}
                    />
                    <ColorPicker
                        label='B'
                        color={selectedElement.color}
                        onChangeColor={(color) => handleElementChange(selectedElement, 'color', color)}
                    />
                </>
            )}
        </RightPanelWrapper>
    );
};

const rightPanelPropsAreEqual = (prevProps, nextProps) => {
    return (
        prevProps.currentPageIndex === nextProps.currentPageIndex &&
        prevProps.selectedElement?.id === nextProps.selectedElement?.id
    );
};

export default React.memo(RightPanel, rightPanelPropsAreEqual);
