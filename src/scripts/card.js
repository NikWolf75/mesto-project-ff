export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

export function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function toggleLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function createCard(
  { name, link, description },
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
