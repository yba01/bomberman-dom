export class EventSystem {
    constructor() {
        this.events = {};
    }

    // Method to register an event handler
    on(event, element, handler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push({ element, handler });
        element.addEventListener(event, handler); // Add event listener directly to the element
    }

    // Method to remove an event handler
    off(event, element, handler) {
        if (!this.events[event]) return;

        // Remove the event handler from the element
        element.removeEventListener(event, handler);

        // Filter out the event from the registered events list
        this.events[event] = this.events[event].filter(
            (e) => e.element !== element || e.handler !== handler
        );

        // Clean up if no more listeners for the event
        if (this.events[event].length === 0) {
            delete this.events[event];
        }
    }
}
