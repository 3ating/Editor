import { render, fireEvent, screen } from '@testing-library/react';
import OpacityControl from './OpacityControl';
import '@testing-library/jest-dom/extend-expect';

describe('OpacityControl', () => {
    it('changes opacity on input or range change', () => {
        const mockOnChange = jest.fn();
        render(<OpacityControl opacity={0.5} onChange={mockOnChange} />);

        const textInput = screen.getByRole('spinbutton');
        fireEvent.change(textInput, { target: { value: '30' } });
        expect(mockOnChange).toHaveBeenCalledWith(expect.anything());

        const rangeInput = screen.getByRole('slider');
        fireEvent.change(rangeInput, { target: { value: '70' } });
        expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
    });

    it('renders with correct opacity', () => {
        const mockOnChange = jest.fn();
        render(<OpacityControl opacity={0.5} onChange={mockOnChange} />);

        const textInput = screen.getByRole('spinbutton');
        expect(textInput.value).toBe('50');

        const rangeInput = screen.getByRole('slider');
        expect(rangeInput.value).toBe('50');
    });
});
