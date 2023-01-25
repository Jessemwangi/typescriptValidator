console.log("PMApp in TS begins...");
console.log("am being watched");
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validateinput: Validatable) {
  let isValid = true;
  if (validateinput.required) {
    isValid = isValid && validateinput.value.toString().trim.length !== 0;
  }
  if (
    validateinput.minLength != null &&
    typeof validateinput.value === "string"
  ) {
    isValid = isValid && validateinput.value.length >= validateinput.minLength;
  }
  if (
    validateinput.maxLength != null &&
    typeof validateinput.value === "string"
  ) {
    isValid = isValid && validateinput.value.length <= validateinput.maxLength;
  }
  if (validateinput.min != null && typeof validateinput.value === "number") {
    isValid = isValid && validateinput.value >= validateinput.min;
  }
  if (validateinput.max != null && typeof validateinput.value === "number") {
    isValid = isValid && validateinput.value <= validateinput.max;
  }
  return isValid;
}

function autobind(_: any, _2: String, descriptor: PropertyDescriptor) {
  const originalMethods = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethods.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + "PROJECTS";
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

class projectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;
    this.hostElement = <HTMLDivElement>document.getElementById("app");

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;

    this.element.id = "user_input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")
    );

    this.attach();
    this.configure();
  }
  private gatheruserinput(): [string, string, number] | void {
    const enterdTitle = this.titleInputElement.value;
    const enterDescritpion = this.descriptionInputElement.value;
    const enterPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enterdTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enterDescritpion,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enterPeople,
      required: true,
      min: 1,
      max: 10,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again");
    } else {
      return [enterdTitle, enterDescritpion, +enterPeople];
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submithandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatheruserinput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log("title", title, "description", desc, "people", people);
      this.clearInput();
    }
    console.log(e.target, this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submithandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}
const prjinput = new projectInput();
