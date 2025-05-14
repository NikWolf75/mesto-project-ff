export function handleLike(event) {
  const likeButton = event.target;

  // Проверяем, был ли уже лайкнут
  if (likeButton.classList.contains('card__like-button_is-active')) {
    // Убираем активный класс и меняем изображение на неактивное
    likeButton.classList.remove('card__like-button_is-active');
    likeButton.style.backgroundImage = 'url("../images/like-inactive.svg")'; // изображение для неактивного лайка
  } else {
    // Добавляем активный класс и меняем изображение на активное
    likeButton.classList.add('card__like-button_is-active');
    likeButton.style.backgroundImage = 'url("../images/like-active.svg")'; // изображение для активного лайка
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
