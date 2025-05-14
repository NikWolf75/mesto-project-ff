export function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose); // добавляем слушатель
  popup.addEventListener('click', closePopupByClick); // добавляем обработчик клика на фон
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose); // удаляем слушатель
  popup.removeEventListener('click', closePopupByClick); // удаляем обработчик клика на фон
}

// Обработчик закрытия попапа при нажатии на Esc
function handleEscClose(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Обработчик закрытия попапа при клике на фон
function closePopupByClick(e) {
  const popup = e.target.closest('.popup');
  if (popup && e.target === popup) {
    closePopup(popup);
  }
}
