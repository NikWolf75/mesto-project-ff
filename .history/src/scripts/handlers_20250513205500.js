export function handleLike(event) {
  const likeButton = event.target;  // кнопка лайка
  likeButton.classList.toggle('card__like-button_active');  // переключаем класс для активного лайка
}
// Обработчик для клика на изображение
export function handleImageClick(event) {
  const image = event.target.closest('.image');
  const popupImage = document.querySelector('.popup_type_image');
  const imageElement = popupImage.querySelector('.popup__image');
  const captionElement = popupImage.querySelector('.popup__caption');

  imageElement.src = image.src;
  imageElement.alt = image.alt;
  captionElement.textContent = image.alt;

  openPopup(popupImage); // Открытие попапа с изображением
}
