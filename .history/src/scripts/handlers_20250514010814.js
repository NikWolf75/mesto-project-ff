export function handleImageClick(evt) {
  const imageUrl = evt.target.src;  // Получаем ссылку на изображение
  const imageAlt = evt.target.alt;  // Получаем alt-атрибут изображения
  openImagePopup(imageUrl, imageAlt);  // Открываем попап с изображением
}

export function openImagePopup(imageUrl, imageAlt) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');

  popupImageElement.src = imageUrl;
  popupImageElement.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  popupImage.classList.add('popup_opened');
}

export function handleLike(evt) {
  const likeButton = evt.target; // Находим кнопку лайка
  likeButton.classList.toggle('like-button_active'); // Переключаем класс активности на кнопке
}