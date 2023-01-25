"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
console.log("PMApp in TS begins...");
console.log("am being watched");
function validate(validateinput) {
    let isValid = true;
    if (validateinput.required) {
        isValid = isValid && validateinput.value.toString().trim.length !== 0;
    }
    if (validateinput.minLength != null &&
        typeof validateinput.value === 'string') {
        isValid =
            isValid && validateinput.value.length >= validateinput.minLength;
    }
    if (validateinput.maxLength != null &&
        typeof validateinput.value === 'string') {
        isValid =
            isValid && validateinput.value.length <= validateinput.maxLength;
    }
    if (validateinput.min != null &&
        typeof validateinput.value === 'number') {
        isValid = isValid && validateinput.value >= validateinput.min;
    }
    if (validateinput.max != null &&
        typeof validateinput.value === 'number') {
        isValid = isValid && validateinput.value <= validateinput.max;
    }
    return isValid;
}
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
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user_input";
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = (this.element.querySelector("#description"));
        this.peopleInputElement = (this.element.querySelector("#people"));
        this.attach();
        this.configure();
    }
    gatheruserinput() {
        const enterdTitle = this.titleInputElement.value;
        const enterDescritpion = this.descriptionInputElement.value;
        const enterPeople = this.peopleInputElement.value;
        if (enterdTitle.trim().length === 0 || enterDescritpion.trim().length === 0 || enterPeople.trim().length === 0) {
            alert('invalid input');
        }
        else {
            return [enterdTitle, enterDescritpion, +enterPeople];
        }
    }
    clearInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submithandler(e) {
        e.preventDefault();
        const userInput = this.gatheruserinput();
        if (Array.isArray((userInput))) {
            const [title, desc, people] = userInput;
            console.log('title', title, 'description', desc, 'people', people);
            this.clearInput();
        }
        console.log(e.target, this.titleInputElement.value);
    }
    configure() {
        this.element.addEventListener("submit", this.submithandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    autobind
], projectInput.prototype, "submithandler", null);
const prjinput = new projectInput();
