export function openModal(popup, validationConfig) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('mousedown', handleOverlayClose);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('mousedown', handleOverlayClose);
}

function handleEscClose(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function handleOverlayClose(e) {
  // Проверка, что клик был по фону (а не внутри попапа)
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}