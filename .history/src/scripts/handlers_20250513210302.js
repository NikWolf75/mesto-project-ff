export function handleLike(event) {
  const likeButton = event.target;

  // Проверка, лайкнуто ли
  if (likeButton.classList.contains('card__like-button_liked')) {
    // Убираем класс и меняем картинку на неактивную
    likeButton.classList.remove('card__like-button_liked');
    likeButton.style.backgroundImage = 'url("../images/like-inactive.svg")';
  } else {
    // Добавляем класс и меняем картинку на активную
    likeButton.classList.add('card__like-button_liked');
    likeButton.style.backgroundImage = 'url("../images/like-active.svg")';
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
