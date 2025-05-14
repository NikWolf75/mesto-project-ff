export function createCard({ name, link }, deleteCard, handleLike, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardElement = document.createElement('li');
  cardElement.classList.add('place-card');
const cardImage = document.createElement('img');
  cardImage.classList.add('place-card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  // Назначаем обработчик клика на картинку
  cardImage.addEventListener('click', handleImageClick);

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('place-card__title');
  cardTitle.textContent = card.name;

  const likeButton = document.createElement('button');
  likeButton.classList.add('place-card__like-button');
  likeButton.addEventListener('click', handleLike);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('place-card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  cardElement.append(cardImage, cardTitle, likeButton, deleteButton);
  return cardElement;
}
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
