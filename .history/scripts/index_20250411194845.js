// @todo: Темплейт карточки
const cardTemplate = ducument.querySelector("#card-template");
// @todo: DOM узлы
const placeslist = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCArd(cardData, deleteCard) {
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardButtonDelete = cardElement.querySelector(".card__delete-button");
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardButtonDelete.addEventListener("click", () => deleteCard(cardElement));
    return cardElement;
}
// @todo: Функция удаления карточки
function delete
// @todo: Вывести карточки на страницу
