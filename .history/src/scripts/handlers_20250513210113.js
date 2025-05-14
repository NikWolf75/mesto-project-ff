export function handleLike(event) {
  const likeButton = event.target;
  const isLiked = likeButton.classList.contains('card__like-button_liked');

  // Переключаем класс для изменения цвета кнопки
  if (isLiked) {
    likeButton.classList.remove('card__like-button_liked');
    likeButton.style.backgroundImage = 'url("../images/like-inactive.svg")'; // смена изображения при отмене лайка
  } else {
    likeButton.classList.add('card__like-button_liked');
    likeButton.style.backgroundImage = 'url("../images/like-active.svg")'; // смена изображения при лайке
  }
}

export function handleImageClick(event) {
  const imageSrc = event.target.src;
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  // Открываем попап с изображением
  popupImage.src = imageSrc;
  popupCaption.textContent = event.target.alt;
  const popup = document.querySelector('.popup_type_image');
  openPopup(popup);
}
