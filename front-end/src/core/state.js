import { Render } from '../utils/render.js';

// Fonction pour mettre à jour l'interface
// * type: 'add' 'remove' 'setAt'

export const update = (newTree,rootElement) => {
    Render(newTree, rootElement);
}


export function StateManager() {
    let states = {}; // The state starts as an empty object

    // Function to update a specific state category
    function setState(category, newState) {
        if (!states[category]) {
            states[category] = [];
        }
        states[category].unshift(newState);
    }

    // Function to retrieve the current state of a specific category
    function getState(category) {
        return states[category] || [];
    }

    return { setState, getState };
}



// // Create an instance of StateManager
// const stateManager = StateManager();

// // Export functions to interact with the player state
// export const addPlayer = (newPlayer) => stateManager.setState('players', newPlayer);
// export const getPlayers = () => stateManager.getState('players');