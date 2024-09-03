export class VirtualNode {
    constructor(tag, props = {}, children = []) {
      this.tag = tag;
      this.props = props;
      this.children = children;
    }
  
    // Method to render the virtual node to an actual DOM node
    render() {
      const element = document.createElement(this.tag);
  
      // Set properties/attributes
      for (let prop in this.props) {
        element.setAttribute(prop, this.props[prop]);
      }
    
      // Append children
      this.children.forEach(child => {
        const childElement = (child instanceof VirtualNode) ? child.render() : document.createTextNode(child); // If the child is a virtual node, render it Otherwise, it's a text node
        element.appendChild(childElement);
      });
  
      return element;
    }
  }
  
  // Helper function to create a virtual node
export const createElement = (tag, props, ...children) => {
    return new VirtualNode(tag, props, children);
  };
  