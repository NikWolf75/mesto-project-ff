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

  // Добавляем обработчик для лайка
  if (handleLike) {
    likeButton.addEventListener('click', handleLike);
  }

  // Обработчик для удаления карточки
  if (deleteCard) {
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
  }

  // Обработчик для клика на изображение (если нужно)
  if (handleImageClick) {
    cardImage.addEventListener('click', handleImageClick);
  }

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
function createCard({ name, link }, handleCardClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');

  image.src = link;
  image.alt = name;
  title.textContent = name;

  image.addEventListener('click', () => handleCardClick(name, link));

  return cardElement;
}