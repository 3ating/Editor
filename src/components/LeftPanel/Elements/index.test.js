import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Elements from '../Elements';
import '@testing-library/jest-dom/extend-expect';

describe('Elements', () => {
    let setElements, setSelectedElement, setPages;

    const mockElements = [
        { id: 1, name: 'Element 1' },
        { id: 2, name: 'Element 2' },
    ];

    const mockPages = [{ id: 1, elements: mockElements }];

    beforeEach(() => {
        setElements = jest.fn();
        setSelectedElement = jest.fn();
        setPages = jest.fn();
    });

    it('renders elements', () => {
        render(
            <Elements
                elements={mockElements}
                setElements={setElements}
                setSelectedElement={setSelectedElement}
                currentPageIndex={0}
                setPages={setPages}
                pages={mockPages}
            />
        );

        expect(screen.getByText('Element 1')).toBeInTheDocument();
        expect(screen.getByText('Element 2')).toBeInTheDocument();
    });

    it('handles element click', () => {
        render(
            <Elements
                elements={mockElements}
                setElements={setElements}
                setSelectedElement={setSelectedElement}
                currentPageIndex={0}
                setPages={setPages}
                pages={mockPages}
            />
        );

        fireEvent.click(screen.getByText('Element 1'));
        expect(setSelectedElement).toHaveBeenCalledWith(mockElements[0]);
    });
});
