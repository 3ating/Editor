import { useState, useCallback, useEffect } from 'react';

const useEditable = (items, setItems, pages, setPages, currentPageIndex) => {
    const [isEditing, setIsEditing] = useState(null);
    const [editName, setEditName] = useState('');

    //fix
    const handleElementsDoubleClick = useCallback((item, index) => {
        setIsEditing(item.id);
        setEditName(item.name || `Element ${index + 1}`);
    }, []);

    const handlePagesDoubleClick = useCallback((item, index) => {
        setIsEditing(item.id);
        setEditName(item.name || `Page ${index + 1}`);
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
        handleElementsDoubleClick,
        handlePagesDoubleClick,
        handleNameChange,
        handleElementsKeyDown,
        handlePagesKeyDown,
        handleBlur,
    };
};

export default useEditable;
