"use strict";
console.log('PMApp in TS begins...');
console.log('am being watched');
function autobind(_, _2, descriptor) {
    const originalMethods = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethods.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class projectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user_input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.attach();
        this.configure();
    }
    submithandler(e) {
        e.preventDefault();
        console.log(e.target, this.titleInputElement.value);
    }
    configure() {
        this.element.addEventListener('submit', this.submithandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const prjinput = new projectInput();
