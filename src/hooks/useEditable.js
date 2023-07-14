import { useState, useCallback, useEffect } from 'react';

const useEditable = (pages, setPages, currentPageIndex) => {
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');

    const handleDoubleClick = useCallback((type, element, index) => {
        setEditingId(element.id);
        setEditName(element.name || `${type === 'page' ? 'Page' : 'Element'} ${index + 1}`);
    }, []);

    const handleNameChange = useCallback((e) => {
        setEditName(e.target.value);
    }, []);

    const handleElementsKeyDown = useCallback(
        (e, id) => {
            if (e.key === 'Enter') {
                setPages((prevPages) =>
                    prevPages.map((page, index) =>
                        index === currentPageIndex
                            ? {
                                  ...page,
                                  elements: page.elements.map((el) => (el.id === id ? { ...el, name: editName } : el)),
                              }
                            : page
                    )
                );
                setEditingId(null);
                setEditName('');
            }
        },
        [editName, currentPageIndex]
    );

    const handlePagesKeyDown = useCallback(
        (e, id) => {
            if (e.key === 'Enter') {
                setPages((prevPages) => prevPages.map((page) => (page.id === id ? { ...page, name: editName } : page)));
                setEditingId(null);
                setEditName('');
            }
        },
        [editName]
    );

    const handleBlur = useCallback(() => {
        setEditingId(null);
        setEditName('');
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (editingId) {
                    setEditingId(null);
                    setEditName('');
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [editingId]);

    return {
        editingId,
        editName,
        handleDoubleClick,
        handleNameChange,
        handleElementsKeyDown,
        handlePagesKeyDown,
        handleBlur,
    };
};

export default useEditable;
