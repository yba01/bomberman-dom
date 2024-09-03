import { createElement } from "../core/dom.js";


export function Render(newTree, rootElement) {
    
    rootElement.innerHTML = '';
    
    rootElement.appendChild(newTree.render());
    
        const footer = createElement('footer', { class: 'info' },
            createElement('p', {}, 'Double-click to edit a todo'),
            createElement('p', {}, 'Created by the TodoMVC Team'),
            createElement('p', {},
                'Part of ',
                createElement('a', { href: 'http://todomvc.com' }, 'TodoMVC')
            )
        );
        rootElement.appendChild(footer.render())
    
}

