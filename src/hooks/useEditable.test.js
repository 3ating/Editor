import { renderHook, act } from '@testing-library/react-hooks';
import useEditable from './useEditable';

describe('useEditable', () => {
    let setPagesMock;
    let initialPages;
    let currentPageIndex;

    beforeEach(() => {
        setPagesMock = jest.fn();
        initialPages = [
            {
                id: '1',
                name: 'Page 1',
                elements: [
                    { id: 'e1', name: 'Element 1', active: true },
                    { id: 'e2', name: 'Element 2', active: false },
                ],
            },
        ];
        currentPageIndex = 0;
    });

    it('should handle double click', () => {
        const { result } = renderHook(() => useEditable(initialPages, setPagesMock, currentPageIndex));
        act(() => result.current.handleDoubleClick('element', initialPages[0].elements[0], 0));

        expect(result.current.editingId).toBe('e1');
        expect(result.current.editName).toBe('Element 1');
    });

    it('should handle name change', () => {
        const { result } = renderHook(() => useEditable(initialPages, setPagesMock, currentPageIndex));
        act(() => result.current.handleNameChange({ target: { value: 'New Name' } }));

        expect(result.current.editName).toBe('New Name');
    });

    it('should handle elements key down', () => {
        const { result } = renderHook(() => useEditable(initialPages, setPagesMock, currentPageIndex));
        act(() => result.current.handleElementsKeyDown({ key: 'Enter' }, initialPages[0].elements[0].id));

        expect(setPagesMock).toHaveBeenCalled();
        expect(result.current.editingId).toBeNull();
        expect(result.current.editName).toBe('');
    });

    it('should handle pages key down', () => {
        const { result } = renderHook(() => useEditable(initialPages, setPagesMock, currentPageIndex));
        act(() => result.current.handlePagesKeyDown({ key: 'Enter' }, initialPages[0].id));

        expect(setPagesMock).toHaveBeenCalled();
        expect(result.current.editingId).toBeNull();
        expect(result.current.editName).toBe('');
    });

    it('should handle blur', () => {
        const { result } = renderHook(() => useEditable(initialPages, setPagesMock, currentPageIndex));
        act(() => result.current.handleBlur());

        expect(result.current.editingId).toBeNull();
        expect(result.current.editName).toBe('');
    });
});
