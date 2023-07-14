import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageContext, ElementContext } from '../../App';
import LeftPanel from '../LeftPanel';
import '@testing-library/jest-dom/extend-expect';

describe('LeftPanel', () => {
    const mockSetCurrentPageIndex = jest.fn();
    const mockSetPages = jest.fn();
    const mockSetElements = jest.fn();
    const mockSetSelectedElement = jest.fn();

    const pageContextValue = {
        currentPageIndex: 0,
        setCurrentPageIndex: mockSetCurrentPageIndex,
        pages: [
            { id: 1, name: 'Page 1' },
            { id: 2, name: 'Page 2' },
        ],
        setPages: mockSetPages,
    };

    const elementContextValue = {
        elements: [
            { id: 1, name: 'Element 1' },
            { id: 2, name: 'Element 2' },
        ],
        setElements: mockSetElements,
        selectedElement: null,
        setSelectedElement: mockSetSelectedElement,
    };

    const renderWithProviders = () =>
        render(
            <PageContext.Provider value={pageContextValue}>
                <ElementContext.Provider value={elementContextValue}>
                    <LeftPanel />
                </ElementContext.Provider>
            </PageContext.Provider>
        );

    it('renders Pages and Elements components', () => {
        renderWithProviders();
        expect(screen.getByText('Page 1')).toBeInTheDocument();
        expect(screen.getByText('Page 2')).toBeInTheDocument();
        expect(screen.getByText('Element 1')).toBeInTheDocument();
        expect(screen.getByText('Element 2')).toBeInTheDocument();
    });
});
