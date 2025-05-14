export function createCard({ name, link }, deleteCard, handleLike = null, handleImageClick = null) {
  // Клонируем шаблон карточки
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Устанавливаем изображение и текст
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Обработчик для лайка
  if (handleLike) {
    likeButton.addEventListener('click', handleLike);
  }

  // Обработчик для удаления карточки
  if (deleteCard) {
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
  }

  // Обработчик для клика на изображение
  if (handleImageClick) {
    cardImage.addEventListener('click', handleImageClick);
  }

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
