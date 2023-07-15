import React from 'react';
import styled from 'styled-components';

const OpacityContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LabelWrapper = styled.label`
    display: grid;
    grid-template-columns: 16px auto minmax(0, 1fr);
    grid-gap: 8px;
`;

const Input = styled.input`
    width: 50px;
`;

Input.defaultProps = {
    type: 'number',
    min: 0,
    max: 100,
};

const RangeInput = styled.input`
    width: 100%;
`;

RangeInput.defaultProps = {
    type: 'range',
    min: 0,
    max: 100,
};

const OpacityControl = ({ opacity, onChange }) => (
    <OpacityContainer>
        <LabelWrapper>
            O
            <Input value={parseInt(opacity * 100)} onChange={onChange} />
        </LabelWrapper>
        <RangeInput value={parseInt(opacity * 100)} onChange={onChange} />
    </OpacityContainer>
);

const opacityControlPropsAreEqual = (prevProps, nextProps) => {
    return prevProps.opacity === nextProps.opacity;
};

export default React.memo(OpacityControl, opacityControlPropsAreEqual);
