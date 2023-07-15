import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { PageContext, ElementContext } from '../../App';
import RightPanel from '../RightPanel';
import '@testing-library/jest-dom/extend-expect';

describe('RightPanel', () => {
    it('calls handleElementChange when inputs change', () => {
        const mockPageContext = {
            currentPageIndex: 0,
            pages: [{ elements: [{ x: 0, y: 0, o: 1, color: '#000000', id: 'test', active: false }] }],
            setPages: jest.fn(),
        };

        const mockElementContext = {
            selectedElement: { x: 0, y: 0, o: 100, color: '#000000', id: 'test', active: false },
        };

        render(
            <PageContext.Provider value={mockPageContext}>
                <ElementContext.Provider value={mockElementContext}>
                    <RightPanel />
                </ElementContext.Provider>
            </PageContext.Provider>
        );

        const positionInputX = screen.getByLabelText(/X/i);
        fireEvent.change(positionInputX, { target: { value: '10' } });
        expect(mockPageContext.setPages).toHaveBeenCalled();

        const positionInputY = screen.getByLabelText(/Y/i);
        fireEvent.change(positionInputY, { target: { value: '20' } });
        expect(mockPageContext.setPages).toHaveBeenCalled();

        const opacityInput = screen.getAllByRole('spinbutton')[0];
        fireEvent.change(opacityInput, { target: { value: '0.5' } });
        expect(mockPageContext.setPages).toHaveBeenCalled();

        const colorInput = screen.getByLabelText(/B/i);
        fireEvent.change(colorInput, { target: { value: '#FFFFFF' } });
        expect(mockPageContext.setPages).toHaveBeenCalled();
    });
});
