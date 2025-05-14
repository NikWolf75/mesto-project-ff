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
// Функция открытия попапа с изображением
function openImagePopup(imageUrl, imageAlt) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');
  
  popupImageElement.src = imageUrl;
  popupImageElement.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  
  openPopup(popupImage); // Открываем попап
}

// Обработчик клика по изображению
function handleImageClick(evt) {
  const imageUrl = evt.target.src; // Получаем ссылку на изображение
  const imageAlt = evt.target.alt; // Получаем alt-атрибут изображения
  openImagePopup(imageUrl, imageAlt); // Открываем попап с изображением
}