import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ElementItem from './ElementItem';

describe('ElementItem', () => {
    let setSelectedElement, handleElementsDoubleClick;

    beforeEach(() => {
        setSelectedElement = jest.fn();
        handleElementsDoubleClick = jest.fn();
    });

    it('handles click', () => {
        render(
            <ElementItem
                element={{ id: 1, name: 'Element 1' }}
                index={0}
                setSelectedElement={setSelectedElement}
                handleElementsDoubleClick={handleElementsDoubleClick}
                active={false}
            />
        );

        fireEvent.click(screen.getByText('Element 1'));
        expect(setSelectedElement).toHaveBeenCalledWith({ id: 1, name: 'Element 1' });
    });

    it('handles double click', () => {
        render(
            <ElementItem
                element={{ id: 1, name: 'Element 1' }}
                index={0}
                setSelectedElement={setSelectedElement}
                handleElementsDoubleClick={handleElementsDoubleClick}
                active={false}
            />
        );

        fireEvent.doubleClick(screen.getByText('Element 1'));
        expect(handleElementsDoubleClick).toHaveBeenCalledWith({ id: 1, name: 'Element 1' }, 0);
    });
});
