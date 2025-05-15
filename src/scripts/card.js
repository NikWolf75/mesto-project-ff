export function toggleLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function createCard(
  { name, link, description },
  deleteCard,
  toggleLike,
  openImagePopup
) {
  const template = document
    .querySelector("#card-template")
    .content.cloneNode(true);
  const card = template.querySelector(".card");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardText = card.querySelector(".card__text");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = link || "";
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardText.textContent = description || "";

  likeButton.addEventListener("click", toggleLike);
  deleteButton.addEventListener("click", () => deleteCard(card));
  cardImage.addEventListener("click", openImagePopup);

  return card;
}

export function deleteCard(card) {
  card.remove();
}
