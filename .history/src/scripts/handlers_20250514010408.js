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

export function handleImageClick(card) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');

  popupImageElement.src = card.link;  // Используем card.link
  popupImageElement.alt = card.name;  // Используем card.name
  popupCaption.textContent = card.name;  // Используем card.name

  openModal(popupImage);  // Передаем сам попап
}
export function handleImageClick(evt) {
  const imageUrl = evt.target.src;
  const imageAlt = evt.target.alt;
  openImagePopup(imageUrl, imageAlt);
}