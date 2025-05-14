export function createCard(data, handleDelete, handleLike, handleImageClick) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Добавляем обработчик для лайка
  cardLikeButton.addEventListener('click', handleLike);

  // Добавляем обработчик для изображения
  cardImage.addEventListener('click', handleImageClick);

  // Добавляем обработчик для удаления карточки
  cardDeleteButton.addEventListener('click', handleDelete);

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
