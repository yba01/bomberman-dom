
export function Render(newTree, rootElement) {
    
    rootElement.innerHTML = '';
    
    rootElement.appendChild(newTree.render());
}

