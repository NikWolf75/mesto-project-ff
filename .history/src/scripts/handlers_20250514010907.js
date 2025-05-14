export function openImagePopup(imageUrl, imageAlt) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImgElement = popupImage.querySelector('.popup__image');
  const popupCaptionElement = popupImage.querySelector('.popup__caption');

  popupImgElement.src = imageUrl;
  popupImgElement.alt = imageAlt;
  popupCaptionElement.textContent = imageAlt;

  openPopup(popupImage); // Открываем попап с изображением
}

// Обработчик клика по изображению
export function handleLike(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_active'); // Переключаем активное состояние кнопки лайка
  const likeCount = likeButton.nextElementSibling;
  const currentLikes = parseInt(likeCount.textContent, 10) || 0; // Получаем текущее количество лайков
  likeCount.textContent = likeButton.classList.contains('card__like-button_active') 
    ? currentLikes + 1 
    : currentLikes - 1; // Увеличиваем или уменьшаем количество лайков в зависимости от состояния
}
