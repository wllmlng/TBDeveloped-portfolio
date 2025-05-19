import React, {useEffect} from 'react';
import styles from './NestedCheckboxes.module.scss';

const mockData = {
    "VP of Engineering": {
        "Engineering Manager": {
            "Senior Engineer": {
                "Intern1": {},
                "Intern2": {},
            },
            "Junior Engineer": {}
        },
        "Engineering Manager 2": {
            "Senior Engineer 2": {},
            "Junior Engineer 2": {}
        }
    },
    "Head of Product": {
        "Product Manager1": {},
        "Product Manager2": {},
    }
}

class NestedCheckboxesClass {
    data: Record<string, unknown>;
    root: string;

    constructor(data:Record<string, unknown>, root: string){
        this.data = data;
        this.root = root;
    }
    createList(data: Record<string, any>){
        const ul = document.createElement('ul');
        for(const key of Object.keys(data)){
            
            const li = document.createElement('li');
            li.innerText = key;
            const label = document.createElement('label');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            
            label.appendChild(checkbox);
            label.appendChild(li);
            ul.appendChild(label);

            if(Object.keys(data[key]).length > 0){
                const nestedList = this.createList(data[key]);
                li.appendChild(nestedList);
            }
        }
        return ul
    };

    addCheckboxesListeners(){
        const container = document.getElementById(this.root);
        container?.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.type === 'checkbox'){
                const isChecked = target.checked
                this.updateChildCheckbox(target.parentNode as HTMLLabelElement, isChecked)
            }
        })
    };
    updateChildCheckbox(parentNode: any, isChecked: boolean){
        const nestedInputs = parentNode.querySelectorAll('input[type="checkbox"]')
        nestedInputs.forEach((input: HTMLInputElement) => {
            input.checked = isChecked;
        })
    };
    getSelectionOptions(){};
    init(){
        const container = document.getElementById(this.root);
        const list = this.createList(this.data);
        if(container){
            container.appendChild(list);
            console.log('container', container);        
        }
    }
}
const NestedCheckboxes = () => {
    
    useEffect(() => {
        const nestedCheckboxes = new NestedCheckboxesClass(mockData, 'nestedCheckboxes');
        nestedCheckboxes.addCheckboxesListeners()
        nestedCheckboxes.init();
    },[])



    return (
        <div id="nestedCheckboxes" className={styles.nestedCheckboxes}>Vanilla Nested Checkboxes</div>
    )
}
export default NestedCheckboxes;