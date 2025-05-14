// Обновление createCard.js
export function createCard(card, deleteCard, handleLike, handleImageClick) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('place-card');

  const imageElement = document.createElement('img');
  imageElement.classList.add('place-card__image');
  imageElement.src = card.link;
  imageElement.alt = card.name;
  
  // Передаем обработчик клика на картинку
  imageElement.addEventListener('click', () => handleImageClick(card));

  const titleElement = document.createElement('h3');
  titleElement.classList.add('place-card__name');
  titleElement.textContent = card.name;

  // Другие элементы карточки, такие как лайк, удаление и т.д.
  
  // Добавляем все элементы в карточку
  cardElement.append(imageElement, titleElement);
  
  return cardElement;
}
