import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { PageContext, ElementContext } from '../../App';
import Canvas from '../Canvas';
import '@testing-library/jest-dom';

describe('Canvas', () => {
    const mockSetPages = jest.fn();
    const mockElements = [
        { id: '1', x: 0, y: 0, width: 100, height: 100, o: 1, color: 'blue', active: false },
        { id: '2', x: 100, y: 100, width: 100, height: 100, o: 1, color: 'red', active: false },
    ];

    const mockPageContextValue = {
        currentPageIndex: 0,
        pages: [{ id: '1', elements: mockElements }],
        setPages: mockSetPages,
    };

    const mockElementContextValue = {
        elements: mockElements,
        selectedElement: null,
    };

    it('renders the correct elements', () => {
        render(
            <PageContext.Provider value={mockPageContextValue}>
                <ElementContext.Provider value={mockElementContextValue}>
                    <Canvas />
                </ElementContext.Provider>
            </PageContext.Provider>
        );

        mockElements.forEach((el) => {
            const element = screen.getByTestId(el.id);
            expect(element).toBeInTheDocument();
        });
    });

    it('calls setPages on element click', () => {
        render(
            <PageContext.Provider value={mockPageContextValue}>
                <ElementContext.Provider value={mockElementContextValue}>
                    <Canvas />
                </ElementContext.Provider>
            </PageContext.Provider>
        );

        const element = screen.getByTestId(mockElements[0].id);
        fireEvent.click(element);
        expect(mockSetPages).toHaveBeenCalled();
    });
});
