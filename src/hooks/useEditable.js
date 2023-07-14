import { useState, useCallback, useEffect } from 'react';

const useEditable = (setItems, setPages, currentPageIndex) => {
    const [isEditing, setIsEditing] = useState(null);
    const [editName, setEditName] = useState('');

    const handleDoubleClick = useCallback((item, index, type) => {
        setIsEditing(item.id);
        setEditName(item.name || `${type === 'page' ? 'Page' : 'Element'} ${index + 1}`);
    }, []);

    const handleNameChange = useCallback((e) => {
        setEditName(e.target.value);
    }, []);

    const handlePagesKeyDown = useCallback(
        (e, id) => {
            if (e.key === 'Enter') {
                setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, name: editName } : item)));
                setIsEditing(null);
                setEditName('');
            }
        },
        [editName]
    );

    const handleElementsKeyDown = useCallback(
        (e, id) => {
            if (e.key === 'Enter') {
                setItems((prevItems) => {
                    const updatedItems = prevItems.map((item) => (item.id === id ? { ...item, name: editName } : item));
                    setPages((prevPages) =>
                        prevPages.map((page, index) =>
                            index === currentPageIndex ? { ...page, elements: updatedItems } : page
                        )
                    );
                    return updatedItems;
                });
                setIsEditing(null);
                setEditName('');
            }
        },
        [editName, currentPageIndex]
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
