export function createCard({ name, link }, deleteCard, handleLike = null, handleImageClick = null) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardElement = createCard(card, deleteCard, handleLike, handleImageClick);

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Добавляем обработчик лайка
  if (handleLike) {
    likeButton.addEventListener('click', handleLike);
  }

  // Добавляем обработчик удаления карточки
  if (deleteCard) {
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
  }

  // Добавляем обработчик клика на картинку
  if (handleImageClick) {
    cardImage.addEventListener('click', handleImageClick);
  }

  return cardElement;
}
export function deleteCard(cardElement) {
  cardElement.remove();
}
