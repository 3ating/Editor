import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ElementItem from './ElementItem';

describe('ElementItem', () => {
    let setPages, handleElementsDoubleClick;

    beforeEach(() => {
        setPages = jest.fn();
        handleElementsDoubleClick = jest.fn();
    });

    it('handles click', () => {
        render(
            <ElementItem
                element={{ id: 1, name: 'Element 1' }}
                index={0}
                setPages={setPages}
                handleElementsDoubleClick={handleElementsDoubleClick}
                active={false}
                currentPageIndex={0}
            />
        );

        fireEvent.click(screen.getByText('Element 1'));
        expect(setPages).toHaveBeenCalled();
    });

    it('handles double click', () => {
        render(
            <ElementItem
                element={{ id: 1, name: 'Element 1' }}
                index={0}
                setPages={setPages}
                handleElementsDoubleClick={handleElementsDoubleClick}
                active={false}
                currentPageIndex={0}
            />
        );

        fireEvent.doubleClick(screen.getByText('Element 1'));
        expect(handleElementsDoubleClick).toHaveBeenCalledWith('element', { id: 1, name: 'Element 1' }, 0);
    });
});
