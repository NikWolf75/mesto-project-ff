import { likeCard, unlikeCard, deleteCardFromServer } from "./api.js";
import { openConfirmPopup } from "./modal.js";

export function toggleLike(event) {
  const likeButton = event.target;
  const card = likeButton.closest(".card");
  const cardId = card.dataset.id;
  const likeCountElem = card.querySelector(".card__like-count");

  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const request = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  request
    .then((updatedCard) => {
      likeCountElem.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch(console.error);
}

function handleDeleteCard(card, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      card.remove();
    })
    .catch(console.error);
}

export function createCard(
  { name, link, description, likes = [], _id, owner },
  _,
  toggleLike,
  openImagePopup,
  currentUserId
) {
  const card = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardText = card.querySelector(".card__text");
  const likeButton = card.querySelector(".card__like-button");
  const likeCountElem = card.querySelector(".card__like-count");
  const deleteButton = card.querySelector(".card__delete-button");

  card.dataset.id = _id;

  cardImage.src = link || "";
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardText.textContent = description || "";

  likeCountElem.textContent = likes.length;

  if (likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

if (owner && owner._id === currentUserId) {
  deleteButton.style.display = "block";
  deleteButton.addEventListener("click", () => {
    // Вместо открытия попапа вызывай функцию из параметров
    if (typeof _ === "function") {
      _.call(null, _id, card);
    }
  });
} else {
  deleteButton.style.display = "none";
}

  likeButton.addEventListener("click", toggleLike);
  cardImage.addEventListener("click", openImagePopup);

  return card;
}
