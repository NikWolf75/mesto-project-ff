export function handleLike(event) {
  const likeButton = event.target;

  // Проверка, содержит ли кнопка класс, который указывает на лайкнутый статус
  if (likeButton.classList.contains('card__like-button_liked')) {
    // Если уже лайкнуто, убираем класс и меняем изображение на неактивное
    likeButton.classList.remove('card__like-button_liked');
    likeButton.style.backgroundImage = 'url("../images/like-inactive.svg")'; // неактивное изображение
  } else {
    // Если не лайкнуто, добавляем класс и меняем изображение на активное
    likeButton.classList.add('card__like-button_liked');
    likeButton.style.backgroundImage = 'url("../images/like-active.svg")'; // активное изображение
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
