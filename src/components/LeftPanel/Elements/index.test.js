import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Elements from '../Elements';
import '@testing-library/jest-dom/extend-expect';

describe('Elements', () => {
    let setPages;

    const mockElements = [
        { id: 1, name: 'Element 1', active: false },
        { id: 2, name: 'Element 2', active: false },
    ];

    const mockPages = [{ id: 1, elements: mockElements }];

    beforeEach(() => {
        setPages = jest.fn();
    });

    it('renders elements', () => {
        render(<Elements setPages={setPages} currentPageIndex={0} pages={mockPages} />);

        expect(screen.getByText('Element 1')).toBeInTheDocument();
        expect(screen.getByText('Element 2')).toBeInTheDocument();
    });

    it('handles element click', () => {
        render(<Elements setPages={setPages} currentPageIndex={0} pages={mockPages} />);

        fireEvent.click(screen.getByText('Element 1'));
        expect(setPages).toHaveBeenCalled();
    });
});
