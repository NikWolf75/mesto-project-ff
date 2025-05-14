export function handleLike(event) {
  const likeButton = event.target;

  // Проверяем, был ли уже лайкнут
  if (likeButton.classList.contains('card__like-button_is-active')) {
    // Убираем активный класс
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    // Добавляем активный класс
    likeButton.classList.add('card__like-button_is-active');
  }
}

export function handleImageClick(event) {
  // Реализуйте логику для открытия изображения в полноэкранном режиме или другое действие
  const clickedImageSrc = event.target.src;
  const popupImage = document.querySelector('.popup__image');
  const popupDescription = document.querySelector('.popup__description');
  popupImage.src = clickedImageSrc;
  popupDescription.textContent = event.target.alt;

  // Открыть попап с изображением
  document.querySelector('.popup_type_image').classList.add('popup_opened');
}
