import { render, fireEvent, screen } from '@testing-library/react';
import PositionLabel from './PositionLabel';
import '@testing-library/jest-dom/extend-expect';

describe('PositionLabel', () => {
    it('changes value on input change', () => {
        const mockOnChange = jest.fn();
        render(<PositionLabel label='Test Label' value={10} onChange={mockOnChange} />);

        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: '20' } });

        expect(mockOnChange).toHaveBeenCalled();
    });

    it('renders with correct label and value', () => {
        const mockOnChange = jest.fn();
        render(<PositionLabel label='Test Label' value={10} onChange={mockOnChange} />);

        const input = screen.getByRole('spinbutton');
        expect(input).toHaveValue(10);
    });
});
