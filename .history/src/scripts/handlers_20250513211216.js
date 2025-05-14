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
  const imageUrl = event.target.src; // Получаем URL картинки
  const imageAlt = event.target.alt; // Получаем описание картинки (если нужно для alt текста)

  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupImageDescription = popupImage.querySelector('.popup__caption');

  popupImageElement.src = imageUrl; // Устанавливаем картинку в попап
  popupImageElement.alt = imageAlt; // Устанавливаем описание картинки
  popupImageDescription.textContent = imageAlt; // Добавляем описание (если есть)

  openPopup(popupImage); // Открываем попап с изображением
}
