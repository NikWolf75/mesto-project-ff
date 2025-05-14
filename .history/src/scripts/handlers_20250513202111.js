// Обработчик клика по лайку
export function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

// Обработчик клика по изображению
export function handleImageClick(event) {
  const imageUrl = event.target.src; // получаем ссылку на изображение
  const popupImage = document.querySelector('.popup_type_image'); // находим попап
  const popupImageElement = popupImage.querySelector('.popup__image'); // находим элемент для изображения
  const popupImageCaption = popupImage.querySelector('.popup__caption'); // находим элемент для подписи

  popupImageElement.src = imageUrl; // ставим изображение
  popupImageCaption.textContent = event.target.alt; // ставим подпись
  openPopup(popupImage); // открываем попап
}

function handleLikeClick(event) {
  const likeButton = event.target;
  const likeCountSpan = likeButton.closest('.card').querySelector('.card__like-count');
  const currentLikes = parseInt(likeCountSpan.textContent, 10) || 0;
  likeCountSpan.textContent = likeButton.classList.contains('card__like-button_is-active') ? currentLikes + 1 : currentLikes - 1;
}
