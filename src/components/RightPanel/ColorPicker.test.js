import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ColorPicker from './ColorPicker';
import '@testing-library/jest-dom/extend-expect';

describe('ColorPicker', () => {
    it('renders correctly', () => {
        const mockOnChangeColor = jest.fn();
        render(<ColorPicker label='Test' color='#000000' onChangeColor={mockOnChangeColor} />);

        const label = screen.getByText(/Test/i);
        expect(label).toBeInTheDocument();

        const colorInput = screen.getByLabelText(/Test/i);
        expect(colorInput).toHaveValue('#000000');
    });

    it('calls onChangeColor when color input changes', () => {
        const mockOnChangeColor = jest.fn();
        render(<ColorPicker label='Test' color='#000000' onChangeColor={mockOnChangeColor} />);

        const colorInput = screen.getByLabelText(/Test/i);
        fireEvent.change(colorInput, { target: { value: '#FFFFFF' } });

        expect(mockOnChangeColor).toHaveBeenCalledWith('#ffffff'); // <-- change here
    });
});
