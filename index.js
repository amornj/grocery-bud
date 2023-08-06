
const groceryInput = document.querySelector('#grocery');
console.log(groceryInput);

const submitBtn = document.querySelector(".submit-btn");
console.log(submitBtn);


const list =document.querySelector('.grocery-list')
console.log(list);

const alert = document.querySelector('.alert');

const clearnBtn = document.querySelector('.clear-btn');
console.log(clearnBtn);

submitBtn.addEventListener('click', addItem);
clearnBtn.addEventListener("click", clearItems);

let editElement = null;
let editFlag = false;




function addItem(event) {
    event.preventDefault();
    const inputValue = groceryInput.value;
    console.log(inputValue);
    const newGroceryList = `
    // <div class="grocery-list">
    //     <article class="grocery-item">
    //         <p class="title">${inputValue}</p>
    //         <div class="btn-container">
    //             <button type="button" class="edit-btn">
    //                 <i class="fa-regular fa-pen-to-square"></i>
    //             </button>        
    //             <button class="delete-btn">
    //                 <i class="fa-regular fa-trash-can"></i>
    //             </button>

    //         </div>
    //     </article>
    // </div>
    // `;
    // list.insertAdjacentHTML('afterend', newGroceryList);
    const element = document.createElement('article');
    let attribute = document.createAttribute('data-id');
    const id = new Date().getTime().toString();
    attribute.value = id;
    element.setAttributeNode(attribute)

    element.classList.add("grocery-item");
    element.innerHTML = ` 
    <p class="title">${inputValue}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fa-regular fa-pen-to-square"></i>
        </button>        
        <button class="delete-btn">
            <i class="fa-regular fa-trash-can"></i>
        </button>
    </div>`;

    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener('click', editItem);

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener('click', deleteItem);


    //ADD item mode
    if(inputValue !== "" && !editFlag) {
    list.appendChild(element);

    const groceryObject = {
        id: id,
        value: inputValue
    };
    console.log(groceryObject);
    let itemFormLocalStorage = JSON.parse(localStorage.getItem("list"));


    console.log.apply(itemFormLocalStorage);
    if(!itemFormLocalStorage) {
        itemFormLocalStorage = [];
    }
    itemFormLocalStorage.push(groceryObject);
    localStorage.setItem('list', JSON.stringify(itemFormLocalStorage));

    groceryInput.value = " ";
    alert.textContent= "item added to the list";
    alert.classList.add('alert-success');
    setTimeout(function(){
        console.log('alert will disappear');
        alert.textContent = "";
        alert.classList.remove('alert-success');
        }, 3000);          
    }
    else if(inputValue !== "" &&  editFlag){
        editElement.innerHTML = inputValue;
    }

    }

function deleteItem(event) {
    const element = event.currentTarget;
    console.log(element);
    const parentOfDeleteBtn = element.parentElement;
    console.log(parentOfDeleteBtn);
    const article = parentOfDeleteBtn.parentElement;
    console.log(article);
    list.removeChild(article);

    alert.textContent= "item removed";
    alert.classList.add('alert-danger');
    setTimeout(function(){
        console.log('alert will disappear');
        alert.textContent = "";
        alert.classList.remove('alert-danger');
        }, 3000);          
}

function editItem (event){
   editElement = event.currentTarget.parentElement.previousElementSibling;
   console.log(editElement);
   groceryInput.value = editElement.innerHTML;
   submitBtn.textContent = "edit";
   editFlag = true;
}

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    console.log(items);
    if(items.length > 0) {
        items.forEach(function(item){
            console.log(item);
            list.removeChild(item);
        });
    }
    alert.textContent= "item removed";
    alert.classList.add('alert-danger');
    setTimeout(function(){
        console.log('alert will disappear');
        alert.textContent = "";
        alert.classList.remove('alert-danger');
        }, 3000);          
}

function setupItems{
    let itemFormLocalStorage = JSON.parse(localStorage.getItem('list'))

    itemFormLocalStorage.forEach(function(item){
        const element = document.createElement('article');
        let attribute = document.createAttribute('data-id');
        attribute.value = item.id;
        element.setAttributeNode(attribute);
        element.classList.add('grocery-item');
        element.innerHTML =  ` 
        <p class="title">${item.Value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>        
            <button class="delete-btn">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>`;
        list.appendChild(element);
    });
}

window.addEventListener('DOMContentLoaded', setupItems);