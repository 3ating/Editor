import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from './App';

const ElementsWrapper = styled.div``;

const ElementItem = styled.div`
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#0274ff' : 'gray')};
`;

const Elements = () => {
    const { elements, setElements, selectedElement, setSelectedElement, pages, setPages, currentPage } =
        useContext(AppContext);
    const [isEditing, setIsEditing] = useState(null);
    const [editName, setEditName] = useState('');
    const handleDoubleClick = (element, index) => {
        setIsEditing(element.id);
        setEditName(element.name || `Element ${index + 1}`);
    };

    const handleNameChange = (e) => {
        setEditName(e.target.value);
    };

    const handleKeyDown = (e, id) => {
        if (e.key === 'Enter') {
            const updatedElements = elements.map((el) => (el.id === id ? { ...el, name: editName } : el));

            setElements(updatedElements);

            setPages((prevPages) => {
                return prevPages.map((page, index) =>
                    index === currentPage ? { ...page, elements: updatedElements } : page
                );
            });

            setSelectedElement((prevElement) => {
                if (prevElement.id === id) {
                    return { ...prevElement, name: editName };
                } else {
                    return prevElement;
                }
            });

            setIsEditing(null);
            setEditName('');
        }
    };

    const handleBlur = () => {
        setIsEditing(null);
        setEditName('');
    };

    return (
        <ElementsWrapper>
            <h4>Elements</h4>
            {elements.map((element, index) => (
                <ElementItem
                    key={element.id}
                    onClick={() => setSelectedElement(element)}
                    isActive={selectedElement && selectedElement.id === element.id}
                    onDoubleClick={() => handleDoubleClick(element, index)}
                >
                    {isEditing === element.id ? (
                        <input
                            value={editName}
                            onChange={handleNameChange}
                            onKeyDown={(e) => handleKeyDown(e, element.id)}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    ) : (
                        element.name || `Element ${index + 1}`
                    )}
                </ElementItem>
            ))}
        </ElementsWrapper>
    );
};

export default Elements;
