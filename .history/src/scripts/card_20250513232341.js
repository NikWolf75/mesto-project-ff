// Функция создания карточки
export function createCard(cardData, deleteCard, handleLike, handleImageClick) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('place-card');
  
  const cardImage = document.createElement('div');
  cardImage.classList.add('place-card__image');
  cardImage.style.backgroundImage = `url(${cardData.link})`;
  cardImage.alt = cardData.name;

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('place-card__name');
  cardTitle.textContent = cardData.name;

  const likeButton = document.createElement('button');
  likeButton.classList.add('place-card__like-button', 'like-button');
  
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('place-card__delete-button');

  cardElement.appendChild(cardImage);
  cardElement.appendChild(cardTitle);
  cardElement.appendChild(likeButton);
  cardElement.appendChild(deleteButton);

  // Добавляем обработчики событий
  likeButton.addEventListener('click', handleLike);
  cardImage.addEventListener('click', handleImageClick);
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
