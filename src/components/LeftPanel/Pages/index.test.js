import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Pages from '../Pages';
import useEditable from '../../../hooks/useEditable';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../hooks/useEditable', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('Pages', () => {
    beforeEach(() => {
        useEditable.mockImplementation(() => ({
            editingId: null,
            editName: '',
            handleDoubleClick: jest.fn(),
            handleNameChange: jest.fn(),
            handlePagesKeyDown: jest.fn(),
            handleBlur: jest.fn(),
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const mockProps = {
            currentPageIndex: 0,
            setCurrentPageIndex: jest.fn(),
            pages: [{ id: '1', name: 'Page 1' }],
            setPages: jest.fn(),
        };

        render(<Pages {...mockProps} />);

        expect(screen.getByText(/Pages/i)).toBeInTheDocument();

        expect(screen.getByText(/Page 1/i)).toBeInTheDocument();
    });

    it('handles double click correctly', () => {
        const mockProps = {
            currentPageIndex: 0,
            setCurrentPageIndex: jest.fn(),
            pages: [{ id: '1', name: 'Page 1' }],
            setPages: jest.fn(),
        };

        render(<Pages {...mockProps} />);

        const pageItem = screen.getByText(/Page 1/i);

        useEditable.mockImplementation(() => ({
            editingId: '1',
            editName: 'Page 2',
            handleDoubleClick: jest.fn(),
            handleNameChange: jest.fn(),
            handlePagesKeyDown: jest.fn(),
            handleBlur: jest.fn(),
        }));

        render(<Pages {...mockProps} />);

        fireEvent.doubleClick(pageItem);

        expect(screen.getByDisplayValue(/Page 2/i)).toBeInTheDocument();
    });
});
