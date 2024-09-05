import { createElement } from "../core/dom.js";

function HomeComponent() {
    const nameInput = createElement('input', { type: 'text', placeholder: 'Enter your name', id: 'username' });
    const submitButton = createElement('button', { id: 'submit-name' }, 'Join Game');

    // Create a container for the form
    return createElement('div', { class: 'form-container' }, nameInput, submitButton);
}


export default HomeComponent