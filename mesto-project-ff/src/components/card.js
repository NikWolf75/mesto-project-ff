const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardInfo, deleteHandler, likeHandler, imageHandler) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardTitle.textContent = cardInfo.name;

    cardImage.addEventListener('click', () => imageHandler(cardInfo));
    cardDeleteButton.addEventListener('click', () => deleteHandler(cardElement));
    cardLikeButton.addEventListener('click', likeHandler);
    return cardElement;
}

function likeHandler(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(cardElement) {
    cardElement.remove();
}

export { createCard, likeHandler, deleteCard};