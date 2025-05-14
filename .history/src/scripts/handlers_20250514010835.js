export function openImagePopup(imageUrl, imageAlt) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImgElement = popupImage.querySelector('.popup__image');
  const popupCaptionElement = popupImage.querySelector('.popup__caption');

  popupImgElement.src = imageUrl;
  popupImgElement.alt = imageAlt;
  popupCaptionElement.textContent = imageAlt;

  openPopup(popupImage); // Открываем попап с изображением
}

// Обработчик клика по изображению
export function handleImageClick(evt) {
  const imageUrl = evt.target.src; // Получаем ссылку на изображение
  const imageAlt = evt.target.alt; // Получаем alt-атрибут изображения
  openImagePopup(imageUrl, imageAlt); // Открываем попап с изображением
}