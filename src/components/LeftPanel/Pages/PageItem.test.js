import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PageItem from './PageItem';

describe('PageItem', () => {
    const handleNameChange = jest.fn();
    const handlePagesKeyDown = jest.fn();
    const handleBlur = jest.fn();
    const setCurrentPageIndex = jest.fn();
    const handlePagesDoubleClick = jest.fn();

    it('should call setCurrentPageIndex when clicked', () => {
        render(
            <PageItem
                page={{ id: 1, name: 'Page 1' }}
                index={0}
                setCurrentPageIndex={setCurrentPageIndex}
                handlePagesDoubleClick={handlePagesDoubleClick}
                active={false}
            />
        );

        fireEvent.click(screen.getByText('Page 1'));
        expect(setCurrentPageIndex).toHaveBeenCalledWith(0);
    });

    it('should call handlePagesDoubleClick when double clicked', () => {
        render(
            <PageItem
                page={{ id: 1, name: 'Page 1' }}
                index={0}
                setCurrentPageIndex={setCurrentPageIndex}
                handlePagesDoubleClick={handlePagesDoubleClick}
                active={false}
            />
        );

        fireEvent.doubleClick(screen.getByText('Page 1'));
        expect(handlePagesDoubleClick).toHaveBeenCalledWith({ id: 1, name: 'Page 1' }, 0);
    });
});
