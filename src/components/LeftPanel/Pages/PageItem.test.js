import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PageItem from './PageItem';
import '@testing-library/jest-dom';

describe('<PageItem />', () => {
    const page = { id: 1, name: 'Page 1', elements: [] };
    const handlePagesDoubleClick = jest.fn();
    const handleNameChange = jest.fn();
    const handlePagesKeyDown = jest.fn();
    const handleBlur = jest.fn();
    const setCurrentPageIndex = jest.fn();
    const setPages = jest.fn();

    beforeEach(() => {
        handlePagesDoubleClick.mockClear();
        handleNameChange.mockClear();
        handlePagesKeyDown.mockClear();
        handleBlur.mockClear();
        setCurrentPageIndex.mockClear();
        setPages.mockClear();
    });

    it('renders correctly', () => {
        render(
            <PageItem
                page={page}
                index={0}
                editingId={null}
                editName=''
                handleNameChange={handleNameChange}
                handlePagesKeyDown={handlePagesKeyDown}
                handleBlur={handleBlur}
                setCurrentPageIndex={setCurrentPageIndex}
                handlePagesDoubleClick={handlePagesDoubleClick}
                active={false}
                setPages={setPages}
                currentPageIndex={0}
            />
        );
        expect(screen.getByText('Page 1')).toBeInTheDocument();
    });

    it('handles click event', () => {
        render(
            <PageItem
                page={page}
                index={0}
                editingId={null}
                editName=''
                handleNameChange={handleNameChange}
                handlePagesKeyDown={handlePagesKeyDown}
                handleBlur={handleBlur}
                setCurrentPageIndex={setCurrentPageIndex}
                handlePagesDoubleClick={handlePagesDoubleClick}
                active={false}
                setPages={setPages}
                currentPageIndex={0}
            />
        );
        fireEvent.click(screen.getByText('Page 1'));
        expect(setCurrentPageIndex).toHaveBeenCalledWith(0);
    });

    it('handles double click event', () => {
        render(
            <PageItem
                page={page}
                index={0}
                editingId={null}
                editName=''
                handleNameChange={handleNameChange}
                handlePagesKeyDown={handlePagesKeyDown}
                handleBlur={handleBlur}
                setCurrentPageIndex={setCurrentPageIndex}
                handlePagesDoubleClick={handlePagesDoubleClick}
                active={false}
                setPages={setPages}
                currentPageIndex={0}
            />
        );
        fireEvent.dblClick(screen.getByText('Page 1'));
        expect(handlePagesDoubleClick).toHaveBeenCalled();
    });

    it('renders input box if editing', () => {
        render(
            <PageItem
                page={page}
                index={0}
                editingId={1}
                editName='New Page 1'
                handleNameChange={handleNameChange}
                handlePagesKeyDown={handlePagesKeyDown}
                handleBlur={handleBlur}
                setCurrentPageIndex={setCurrentPageIndex}
                handlePagesDoubleClick={handlePagesDoubleClick}
                active={false}
                setPages={setPages}
                currentPageIndex={0}
            />
        );
        expect(screen.getByDisplayValue('New Page 1')).toBeInTheDocument();
    });

    it('handles keydown and blur event on input box', () => {
        render(
            <PageItem
                page={page}
                index={0}
                editingId={1}
                editName='New Page 1'
                handleNameChange={handleNameChange}
                handlePagesKeyDown={handlePagesKeyDown}
                handleBlur={handleBlur}
                setCurrentPageIndex={setCurrentPageIndex}
                handlePagesDoubleClick={handlePagesDoubleClick}
                active={false}
                setPages={setPages}
                currentPageIndex={0}
            />
        );
        const inputBox = screen.getByDisplayValue('New Page 1');
        fireEvent.keyDown(inputBox, { key: 'Enter', code: 'Enter' });
        expect(handlePagesKeyDown).toHaveBeenCalled();
        fireEvent.blur(inputBox);
        expect(handleBlur).toHaveBeenCalled();
    });
});
