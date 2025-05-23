// card.js
import { likeCard, unlikeCard } from './api.js';

function toggleLike(event, likeButton, card, likeCountElem) {
  const cardId = card.dataset.id;
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const request = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  request
    .then((updatedCard) => {
      likeCountElem.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(console.error);
}

function createCard(
  { name, link, description, likes = [], _id, owner },
  handleDelete,
  openImagePopup,
  currentUserId
) {
  const card = document
    .querySelector('#card-template')
    .content.querySelector('.card')
    .cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardText = card.querySelector('.card__text');
  const likeButton = card.querySelector('.card__like-button');
  const likeCountElem = card.querySelector('.card__like-count');
  const deleteButton = card.querySelector('.card__delete-button');

  card.dataset.id = _id;

  cardImage.src = link || '';
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardText.textContent = description || '';
  likeCountElem.textContent = likes.length;

  if (likes.some((user) => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (owner && owner._id === currentUserId) {
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', () => {
      handleDelete(_id, card);
    });
  } else {
    deleteButton.style.display = 'none';
  }

  likeButton.addEventListener('click', (event) =>
    toggleLike(event, likeButton, card, likeCountElem)
  );
  cardImage.addEventListener('click', openImagePopup);

  return card;
}

export { createCard };
