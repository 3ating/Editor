import { useState } from 'react';

const useEditable = (items, setItems, pages, setPages, currentPageIndex) => {
    const [isEditing, setIsEditing] = useState(null);
    const [editName, setEditName] = useState('');

    const handleDoubleClick = (item, index) => {
        setIsEditing(item.id);
        setEditName(item.name || `Element ${index + 1}`);
    };

    const handleNameChange = (e) => {
        setEditName(e.target.value);
    };

    const handlePagesKeyDown = (e, id) => {
        if (e.key === 'Enter') {
            setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, name: editName } : item)));
            setIsEditing(null);
            setEditName('');
        }
    };

    const handleElementsKeyDown = (e, id) => {
        if (e.key === 'Enter') {
            const updatedItems = items.map((item) => (item.id === id ? { ...item, name: editName } : item));
            setItems(updatedItems);
            setPages((prevPages) => {
                return prevPages.map((page, index) =>
                    index === currentPageIndex ? { ...page, elements: updatedItems } : page
                );
            });
            setIsEditing(null);
            setEditName('');
        }
    };

    const handleBlur = () => {
        setIsEditing(null);
        setEditName('');
    };

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
