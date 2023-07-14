import React from 'react';
import styled from 'styled-components';

const LabelWrapper = styled.label`
    display: grid;
    grid-template-columns: 16px auto minmax(0, 1fr);
    grid-gap: 8px;
`;

const Input = styled.input`
    width: 50px;
`;

const PositionLabel = React.memo(
    ({ label, value, onChange, min, max }) => {
        return (
            <LabelWrapper>
                {label}
                <Input type='number' value={value} onChange={onChange} />
            </LabelWrapper>
        );
    },
    (prevProps, nextProps) => prevProps.value === nextProps.value
);

export default PositionLabel;
