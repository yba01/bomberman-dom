class Router {
    constructor() {
        this.routes = {}
        this.currentPath = '/';
        window.addEventListener('popstate', () => this.onRouteChange());
    }

    onRouteChange() {
        this.currentPath = window.location.hash || '#/';
        const routeHandler = this.routes[this.currentPath] || (() => this.showNotFound())
        routeHandler();
    }

    registerRoute(path, handler) {
       this.routes[path] = handler
    }


    
    navigateTo(path) {
        history.pushState(null, '', path)
        this.onRouteChange();
    }

    showNotFound() {
        console.log('not found');
    }
}

export { Router }
