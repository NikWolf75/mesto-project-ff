export function createCard({ name, link }, deleteCard, handleLike, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Заполнение карточки данными
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Добавление обработчиков
  likeButton.addEventListener('click', handleLike); // Обработчик клика на лайк
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  cardImage.addEventListener('click', handleImageClick);

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
