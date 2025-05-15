export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

export function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}

export function handleImageClick(evt) {
  const imagePopupElement = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  const popupImagePopup = document.querySelector(".popup_type_image");

  imagePopupElement.src = evt.target.src;
  imagePopupElement.alt = evt.target.alt;

  const cardElement = evt.target.closest(".card");
  const cardTitle = cardElement.querySelector(".card__title").textContent;
  const cardDescription = cardElement.querySelector(".card__text")?.textContent;

  popupCaption.textContent = cardDescription
    ? `${cardTitle} - ${cardDescription}`
    : cardTitle;

  openPopup(popupImagePopup);
}
