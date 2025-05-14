export function createCard(cardData, deleteCard, handleLike, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  // Установка данных карточки
  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  // Удаление карточки
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  // Лайк
  likeButton.addEventListener('click', () => handleLike(likeButton));

  // 🔥 Открытие картинки
  image.addEventListener('click', () => handleImageClick(cardData.name, cardData.link));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
