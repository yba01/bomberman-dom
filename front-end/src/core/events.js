
export class EventSystem {
    constructor() {
        this.events = {};
    }

    // Method to register an event handler
    on(event, selector, handler) {
        // console.log(event);
        
        if (!this.events[event]) {
            this.events[event] = [];
            document.addEventListener(event, (e) => this.dispatch(e));
        }
        this.events[event].push({ selector, handler });
    }

    // Method to dispatch events to the appropriate handlers
    dispatch(event) {
        const eventType = event.type;
        const target = event.target;

        if (this.events[eventType]) {
            this.events[eventType].forEach(({ selector, handler }) => {
                if (target.matches(selector)) {
                    handler.call(target, event);
                }
            });
        }
    }

    off(event, selector, handler) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(
            (e) => e.selector !== selector || e.handler !== handler
        );

        if (this.events[event].length === 0) {
            document.removeEventListener(event, (e) => this.dispatch(e));
        }
    }
}
// Example usage
// export const eventSystem = new EventSystem();

// // Attaching a click event to a button with a specific ID
// eventSystem.on('click', '#myButton', function (e) {
//     console.log(e.target);
//     //  e.target
//     // alert('Button clicked!');
// });
