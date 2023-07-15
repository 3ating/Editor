import React from 'react';
import styled from 'styled-components';
import useEditable from '../../../hooks/useEditable';
import ElementItem from './ElementItem';

const ElementsWrapper = styled.div``;

const Elements = React.memo(({ pages, setPages, currentPageIndex }) => {
    const { editingId, editName, handleDoubleClick, handleNameChange, handleElementsKeyDown, handleBlur } = useEditable(
        pages,
        setPages,
        currentPageIndex
    );

    const elements = pages[currentPageIndex].elements;

    return (
        <ElementsWrapper>
            <h4>Elements</h4>
            {elements.map((element, index) => (
                <ElementItem
                    key={element.id}
                    element={element}
                    index={index}
                    editingId={editingId}
                    editName={editName}
                    handleNameChange={handleNameChange}
                    handleElementsKeyDown={handleElementsKeyDown}
                    handleBlur={handleBlur}
                    handleElementsDoubleClick={handleDoubleClick}
                    active={element.active}
                    setPages={setPages}
                    currentPageIndex={currentPageIndex}
                />
            ))}
        </ElementsWrapper>
    );
});

const propsAreEqual = (prevProps, nextProps) => {
    return prevProps.pages === nextProps.pages;
};

export default React.memo(Elements, propsAreEqual);
