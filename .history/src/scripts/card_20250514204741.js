export function createCard(
  { name, link, description },
  deleteCard,
  handleLike,
  handleImageClick
) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.cloneNode(true);
  const cardElement = cardTemplate.querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardText = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (link) {
    cardImage.src = link;
  } else {
    cardImage.src = "path/to/default-image.jpg";
    console.warn(
      "Путь к изображению пустой, используется изображение по умолчанию"
    );
  }

  cardImage.alt = name;
  cardTitle.textContent = name;
  cardText.textContent = description;

  if (handleLike) {
    likeButton.addEventListener("click", handleLike);
  }

  if (deleteCard) {
    deleteButton.addEventListener("click", () => deleteCard(cardElement));
  }

  if (handleImageClick) {
    cardImage.addEventListener("click", handleImageClick);
  }

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function handleImageClick(evt) {
  const imagePopupElement = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");

  imagePopupElement.src = evt.target.src;
  imagePopupElement.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;

  const popupImagePopup = document.querySelector(".popup_type_image");
  openModal(popupImagePopup);
}

export function handleEscClose(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closeModal(openPopup);
  }
}

export function openModal(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(popup) {
  if (popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscClose);
  }
}
