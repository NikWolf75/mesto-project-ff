// card.js

export function createCard(card, deleteCard, handleLike, handleImageClick) {
  const cardElement = document.createElement('li');
  cardElement.classList.add('places__item');
  cardElement.innerHTML = `
    <div class="card">
      <img class="card__image" src="${card.link}" alt="${card.name}" />
      <div class="card__description">
        <h2 class="card__title">${card.name}</h2>
        <button class="card__like-button"></button>
      </div>
      <button class="card__delete-button"></button>
    </div>
  `;
  
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const image = cardElement.querySelector('.card__image');

  likeButton.addEventListener('click', handleLike);
  image.addEventListener('click', handleImageClick); // добавлен обработчик для клика по картинке
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

export function deleteCard(evt) {
  const card = evt.target.closest('.places__item');
  card.remove();
}
