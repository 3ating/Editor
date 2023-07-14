import { useState, useCallback, useEffect } from 'react';

const useEditable = (pages, setPages, currentPageIndex) => {
    const [isEditing, setIsEditing] = useState(null);
    const [editName, setEditName] = useState('');

    const handleDoubleClick = useCallback((type, element, index) => {
        setIsEditing(element.id);
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
                setIsEditing(null);
                setEditName('');
            }
        },
        [editName, currentPageIndex]
    );

    const handlePagesKeyDown = useCallback(
        (e, id) => {
            if (e.key === 'Enter') {
                setPages((prevPages) => prevPages.map((page) => (page.id === id ? { ...page, name: editName } : page)));
                setIsEditing(null);
                setEditName('');
            }
        },
        [editName]
    );

    const handleBlur = useCallback(() => {
        setIsEditing(null);
        setEditName('');
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (isEditing) {
                    setIsEditing(null);
                    setEditName('');
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isEditing]);

    return {
        isEditing,
        editName,
        handleDoubleClick,
        handleNameChange,
        handleElementsKeyDown,
        handlePagesKeyDown,
        handleBlur,
    };
};

export default useEditable;
