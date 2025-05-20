export function toggleLike(event) {
  const likeButton = event.target;
  const likeCountElem = likeButton.nextElementSibling;

  likeButton.classList.toggle("card__like-button_is-active");

  let count = parseInt(likeCountElem.textContent, 10);
  if (likeButton.classList.contains("card__like-button_is-active")) {
    count++;
  } else {
    count--;
  }
  likeCountElem.textContent = count;
}

export function deleteCard(card) {
  card.remove();
}

export function createCard(
  { name, link, description, likes = [] },
  deleteCard,
  toggleLike,
  openImagePopup
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

  cardImage.src = link || "";
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardText.textContent = description || "";

  likeCountElem.textContent = likes.length;

  if (likes.length > 0) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", toggleLike);
  deleteButton.addEventListener("click", () => deleteCard(card));
  cardImage.addEventListener("click", openImagePopup);

  return card;
}
