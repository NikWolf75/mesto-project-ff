export function createCard({ name, link }, deleteCard, handleLike, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Если передан обработчик для лайка, привязываем его
  if (handleLike) {
    likeButton.addEventListener('click', handleLike);
  }

  // Привязываем обработчик для удаления карточки
  if (deleteCard) {
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
  }

  // Привязываем обработчик для клика по изображению
  if (handleImageClick) {
    cardImage.addEventListener('click', handleImageClick);
  }

  return cardElement;
}
// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
