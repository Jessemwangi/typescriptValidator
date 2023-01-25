console.log('PMApp in TS begins...');
console.log('am being watched');

function autobind(
    _: any,
        _2: String,
            descriptor:PropertyDescriptor
) {
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
        this.templateElement = document.getElementById('project-input') as HTMLTemplateElement;
        this.hostElement = <HTMLDivElement>document.getElementById('app');

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;

        

        this.element.id = 'user_input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description')
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people')
        
     

        this.attach();
        this.configure();
    }

    private submithandler(e: Event) {
        e.preventDefault();
        console.log(e.target, this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submithandler)
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin',this.element)
    }
}
const prjinput = new projectInput();