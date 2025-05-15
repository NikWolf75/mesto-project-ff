export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  
  if (popup.classList.contains("popup_type_image")) {
    const caption = popup.querySelector(".popup__caption");
    if (caption) caption.textContent = "";
    const image = popup.querySelector(".popup__image");
    if (image) {
      image.src = "";
      image.alt = "";
    }
  }

  setTimeout(() => {
    document.removeEventListener("keydown", handleEscClose);
  }, 300);
}

export function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}