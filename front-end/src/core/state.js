import { Render } from '../utils/render.js';
import TodoApp from '../components/TodoApp.js';



// Fonction pour mettre à jour l'interface
// * type: 'add' 'remove' 'setAt'

export const update = () => {
    const rootElement = document.querySelector('#root');
    const newTree = TodoApp();
    Render(newTree, rootElement);
}


export function StateManager() {
    let state = []; // L'état commence comme un tableau vide

    // Fonction pour mettre à jour l'état
    function setState(newState) {
        state.unshift(newState); // Fusionner le nouvel état avec l'état existant
    }

    // Fonction pour récupérer l'état actuel
    function getState() {
        return state;
    }

    return { setState, getState };
}


// Fonction pour récupérer l'état des todos
export const getTodos = () => {
    return stateManager.getState() || [];
}

// Fonction pour mettre à jour l'état des todos
export const addTodos = (newTodos) => {
    stateManager.setState(newTodos);
}

// Créer une instance de StateManager
const stateManager = StateManager();

// L'état global de l'application
export let todos = stateManager.getState();