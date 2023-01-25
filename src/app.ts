console.log("PMApp in TS begins...");
console.log("am being watched");

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
  private gatheruserinput():[string,string,number] | void {
    const enterdTitle = this.titleInputElement.value;
    const enterDescritpion = this.descriptionInputElement.value;
    const enterPeople = this.peopleInputElement.value;

    if (enterdTitle.trim().length === 0 || enterDescritpion.trim().length === 0 || enterPeople.trim().length === 0)
    {
        alert('invalid input');
    }
    else {
        return [enterdTitle, enterDescritpion, +enterPeople];
    }
  
}

private clearInput() {
this.titleInputElement.value = '';
this.descriptionInputElement.value = '';
this.peopleInputElement.value =''

}

  @autobind
  private submithandler(e: Event) {
      e.preventDefault();
      const userInput = this.gatheruserinput();
      
      if (Array.isArray((userInput))) {
          const [title, desc, people] = userInput;
          console.log('title', title, 'description', desc, 'people', people)
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
