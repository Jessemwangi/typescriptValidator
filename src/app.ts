console.log('PMApp in TS begins...');
console.log('am being watched');

class projectInput {

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    constructor() {
        this.templateElement = document.getElementById('project-input') as HTMLTemplateElement;
        this.hostElement = <HTMLDivElement>document.getElementById('app');

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.attach();
        
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin',this.element)
    }
}
const prjinput = new projectInput();