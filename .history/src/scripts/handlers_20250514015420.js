// Обработчик лайка
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

export function handleImageClick(evt) {
  const imagePopupElement = document.createElement('img');  // создаем новый элемент img
  imagePopupElement.src = evt.target.src;  // устанавливаем картинку
  imagePopupElement.alt = evt.target.alt;  // если нужно, можно установить alt для картинки

  // Открытие изображения на весь экран
  if (imagePopupElement.requestFullscreen) {
    imagePopupElement.requestFullscreen();
  } else if (imagePopupElement.mozRequestFullScreen) { // Firefox
    imagePopupElement.mozRequestFullScreen();
  } else if (imagePopupElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
    imagePopupElement.webkitRequestFullscreen();
  } else if (imagePopupElement.msRequestFullscreen) { // IE/Edge
    imagePopupElement.msRequestFullscreen();
  }

  // Добавляем изображение в body, чтобы оно отображалось на экране
  document.body.appendChild(imagePopupElement);

  // Закрытие полноэкранного режима при клике на изображение
  imagePopupElement.addEventListener('click', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      document.body.removeChild(imagePopupElement); // удаляем картинку после закрытия полноэкранного режима
    }
  });
}
