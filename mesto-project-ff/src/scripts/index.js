import { initialCards } from "./cards.js";
import { createCard, likeHandler, deleteCard } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";
import { enableValidation, clearValidation } from './validation.js';
import '../pages/index.css';

const elements = {
    cardsContainer: document.querySelector('.places__list'),
    editPopup: document.querySelector('.popup_type_edit'),
    addCardPopup: document.querySelector('.popup_type_new-card'),
    imagePopup: document.querySelector('.popup_type_image'),
    imagePopup_image: document.querySelector('.popup__image'),
    imagePopup_caption: document.querySelector('.popup__caption'),
    editButton: document.querySelector('.profile__edit-button'),
    addButton: document.querySelector('.profile__add-button'),
    profileName: document.querySelector('.profile__title'),
    profileDesc: document.querySelector('.profile__description'),
    editForm: document.forms['edit-profile'],
    editForm_nameInput: document.forms['edit-profile'].elements['name'],
    editForm_jobInput: document.forms['edit-profile'].elements['description'],
    addForm: document.forms['new-place'],
    addForm_nameInput: document.forms['new-place'].elements['place-name'],
    addForm_linkInput: document.forms['new-place'].elements['link'],
};

elements.editButton.addEventListener('click', () => { handleEditProfile(); });
elements.addButton.addEventListener('click', () => { handleAddCard(); });

elements.editForm.addEventListener('submit', handleEditSubmit);
elements.addForm.addEventListener('submit', handleAddSubmit);

initialCards.forEach(item => elements.cardsContainer.append(createCard(item, deleteCard, likeHandler, handleImagePopup)));

function handleEditProfile() {
    const { name, description } = elements.editForm.elements;
    name.value = elements.profileName.textContent;
    description.value = elements.profileDesc.textContent;
    clearValidation(elements.editForm, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inputErrorClass: 'popup__input_invalid'
    });
    openModal(elements.editPopup);
}

function handleAddCard() {
    elements.addForm.reset();
    clearValidation(elements.addForm, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inputErrorClass: 'popup__input_invalid'
    });
    openModal(elements.addCardPopup);
}

function handleImagePopup(cardInfo) {
    elements.imagePopup_image.src = cardInfo.link;
    elements.imagePopup_image.alt = cardInfo.name;
    elements.imagePopup_caption.textContent = cardInfo.name;
    openModal(elements.imagePopup);
}

function handleEditSubmit(evt) {
    evt.preventDefault();
    elements.profileName.textContent = elements.editForm_nameInput.value;
    elements.profileDesc.textContent = elements.editForm_jobInput.value;
    closeModal(elements.editPopup);
}

function handleAddSubmit(evt) {
    evt.preventDefault();
    const placeNameInput = elements.addForm_nameInput;
    const sourceLinkInput = elements.addForm_linkInput;
    const cardInfo = {
        name: placeNameInput.value,
        link: sourceLinkInput.value
    };
    elements.cardsContainer.prepend(createCard(cardInfo, deleteCard, likeHandler, handleImagePopup));
    closeModal(elements.addCardPopup);
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_invalid'
});