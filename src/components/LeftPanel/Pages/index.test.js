import React from 'react';
import { render, screen } from '@testing-library/react';
import Pages from '../Pages';
import '@testing-library/jest-dom/extend-expect';

describe('Pages', () => {
    const setCurrentPageIndex = jest.fn();
    const pages = [
        { id: 1, name: 'Page 1' },
        { id: 2, name: 'Page 2' },
    ];

    it('renders pages', () => {
        render(<Pages pages={pages} setCurrentPageIndex={setCurrentPageIndex} />);

        expect(screen.getByText('Page 1')).toBeInTheDocument();
        expect(screen.getByText('Page 2')).toBeInTheDocument();
    });
});
