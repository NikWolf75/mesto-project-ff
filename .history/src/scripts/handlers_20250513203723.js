// Обработчик клика по лайку
function handleLikeClick(event) {
  const likeButton = event.target;
  const likeCountSpan = likeButton.closest('.card').querySelector('.card__like-count');
  const currentLikes = parseInt(likeCountSpan.textContent, 10) || 0;
  likeCountSpan.textContent = likeButton.classList.contains('card__like-button_is-active') ? currentLikes + 1 : currentLikes - 1;
}

// Обработчик клика по изображению
export function handleLike(event) {
  const likeButton = event.target;
  const likeCountSpan = likeButton.closest('.card').querySelector('.card__like-count');

  const isActive = likeButton.classList.toggle('card__like-button_active');
  const currentLikes = parseInt(likeCountSpan.textContent, 10) || 0;

  likeCountSpan.textContent = isActive ? currentLikes + 1 : Math.max(currentLikes - 1, 0);
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
export function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_active');
}