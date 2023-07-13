// useElement.js
import { useContext, useMemo } from 'react';
import { PageContext, ElementContext } from '../App';

export default function useElement() {
    const { currentPageIndex, setPages } = useContext(PageContext);
    const { selectedElement, setSelectedElement, elements, setElements } = useContext(ElementContext);

    const handleElementChange = useMemo(
        () => (prop, value) => {
            if (selectedElement) {
                const updatedElement = { ...selectedElement, [prop]: value };
                setSelectedElement(updatedElement);
                const updatedElements = elements.map((el) => (el.id === selectedElement.id ? updatedElement : el));
                setElements(updatedElements);
                setPages((prevPages) =>
                    prevPages.map((page, index) =>
                        index === currentPageIndex ? { ...page, elements: updatedElements } : page
                    )
                );
            }
        },
        [selectedElement, setSelectedElement, elements, setElements, currentPageIndex, setPages]
    );

    return { selectedElement, handleElementChange };
}
