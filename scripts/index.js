const TODO_LIST = [
    { title: "Погладить кота" },
    { title: "Изучить Javascript" },
    { title: "Полить цветы" },
    { title: "Купить еды" },
    { title: "Погулять в парке" }
];

const listContainer = document.querySelector(".todo__list");
const template = document.querySelector(".template");

const addButton = document.querySelector(".button_add");
const input = document.querySelector(".input");

const buttonAddClassName = "button_add";
const buttonEditClassName = "button_edit";

let editingElement;

function render() {
    const html = TODO_LIST.map(getElement);
    listContainer.append(...html);
}

function getElement(item) {
    const newItem = template.content.cloneNode(true);
    const title = newItem.querySelector(".card__title");
    const removeButton = newItem.querySelector(".button_remove");
    const duplicateButton = newItem.querySelector(".button_duplicate");
    const editButton = newItem.querySelector(".button_edit");

    title.textContent = item.title;

    removeButton.addEventListener("click", handleRemoveElement);
    duplicateButton.addEventListener("click", handleDuplicateElement);
    editButton.addEventListener("click", handleEditElement);

    return newItem;
}

function handleRemoveElement(evt) {
    const element = evt.target.closest(".card");
    element.remove();
}

function handleDuplicateElement(evt) {
    const element = evt.target.closest(".card");
    const title = element.querySelector(".card__title").textContent;
    const newElement = getElement({ title });
    element.after(newElement);
}

function handleEditElement(evt) {
    editingElement = evt.target.closest(".card");
    const title = editingElement.querySelector(".card__title").textContent;

    addButton.classList.remove(buttonAddClassName);
    addButton.classList.add(buttonEditClassName);

    input.value = title;

    addButton.removeEventListener("click", handleAddElement);
    addButton.addEventListener("click", handleEditConfirm);
}

function handleEditConfirm() {
    editingElement.querySelector(".card__title").textContent = input.value;

    input.value = "";
    editingElement = null;

    addButton.classList.remove(buttonEditClassName);
    addButton.classList.add(buttonAddClassName);

    addButton.removeEventListener("click", handleEditConfirm);
    addButton.addEventListener("click", handleAddElement);
}

function handleAddElement() {
    const element = getElement({ title: input.value });
    listContainer.prepend(element);
    input.value = "";
}

addButton.addEventListener("click", handleAddElement);

render();