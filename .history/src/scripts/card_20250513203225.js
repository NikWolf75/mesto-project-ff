export function createCard({ name, link }, deleteCard, handleLike = null, handleImageClick = null) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  if (handleLike) {
    likeButton.addEventListener('click', handleLike);
  }

  if (deleteCard) {
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
  }

  if (handleImageClick) {
    cardImage.addEventListener('click', handleImageClick);
  }

  return cardElement;
  
  export function deleteCard(cardElement) {
  cardElement.remove();
}
}