// Обработчик клика по лайку
function handleLikeClick(event) {
  const likeButton = event.target;
  const likeCountSpan = likeButton.closest('.card').querySelector('.card__like-count');
  const currentLikes = parseInt(likeCountSpan.textContent, 10) || 0;
  likeCountSpan.textContent = likeButton.classList.contains('card__like-button_is-active') ? currentLikes + 1 : currentLikes - 1;
}

// Обработчик клика по изображению
export function handleImageClick(event) {
  const imageUrl = event.target.src;
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupImageCaption = popupImage.querySelector('.popup__caption');

  popupImageElement.src = imageUrl;
  popupImageCaption.textContent = event.target.alt;
  openPopup(popupImage);
}

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose); // добавляем слушатель для закрытия по Esc
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

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose); // удаляем слушатель
}
