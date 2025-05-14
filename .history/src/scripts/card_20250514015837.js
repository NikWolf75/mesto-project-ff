// card.js

export function createCard(card, deleteCard, handleLike, handleImageClick) {
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
