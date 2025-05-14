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
  popupImage.src = imageUrl;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt; // Текст для подписи (обычно это alt)

  // Открываем попап с изображением
  openPopup(imagePopup);
}
function handleImageClick(evt) {
  imagePopupElement.src = evt.target.src;  // Устанавливаем картинку
  popupCaption.textContent = evt.target.alt; // Устанавливаем подпись
  openModal(popupImagePopup);  // Открываем попап с изображением
}