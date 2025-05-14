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
  const imageUrl = event.target.src; // Получаем URL изображения
  const imageAlt = event.target.alt; // Получаем alt текста (для подписи)

  // Устанавливаем изображение и подпись в попап

  console.log('Image clicked:', imageUrl, imageAlt); // Добавляем лог

  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupImageDescription = popupImage.querySelector('.popup__caption');

  popupImageElement.src = imageUrl;
  popupImageElement.alt = imageAlt;
  popupImageDescription.textContent = imageAlt;

  openPopupFn(popupImage); // открываем попап
}