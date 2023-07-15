import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const ColorPickerWrapper = styled.div`
    width: 16px;
    height: 16px;
    align-self: center;
    overflow: hidden;
`;

const ColorInput = styled.input`
    opacity: 0;
    display: block;
    width: 32px;
    height: 32px;
    border: none;
    cursor: pointer;
`;

ColorInput.defaultProps = {
    type: 'color',
};

const TestLabel = styled.label`
    display: grid;
    grid-template-columns: 16px auto minmax(0, 1fr);
    grid-gap: 8px;
`;

const ColorPicker = ({ label, color, onChangeColor }) => {
    const colorPickerWrapperRef = useRef();
    useEffect(() => {
        colorPickerWrapperRef.current.style.background = color;
    }, [color]);

    return (
        <TestLabel>
            {label}
            <ColorPickerWrapper ref={colorPickerWrapperRef}>
                <ColorInput value={color} onChange={(e) => onChangeColor(e.target.value)} />
            </ColorPickerWrapper>
            {color}
        </TestLabel>
    );
};

export default React.memo(ColorPicker);
