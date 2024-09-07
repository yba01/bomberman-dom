
import { EventSystem } from './core/events.js';
import { StateManager, update } from './core/state.js';
import { Router } from './core/router.js';
import HomeComponent from './components/home.js';
import RegisterPlayer from './utils/Player.js';

export const stateManager = new StateManager();
export const eventSystem = new EventSystem();
export const router = new Router();

router.registerRoute("/", update(HomeComponent()))
router.navigateTo("/")
eventSystem.on('click', '#submit-name', RegisterPlayer);
