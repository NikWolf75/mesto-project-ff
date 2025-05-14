export function handleLike(event) {
  const likeButton = event.target;
  const isLiked = likeButton.classList.contains('card__like-button_liked');

  // Переключаем класс для изменения цвета кнопки
  if (isLiked) {
    likeButton.classList.remove('card__like-button_liked');
    likeButton.style.backgroundImage = 'url("../images/like-inactive.svg")'; // смена изображения при отмене лайка
  } else {
    likeButton.classList.add('card__like-button_liked');
    likeButton.style.backgroundImage = 'url("../images/like-active.svg")'; // смена изображения при лайке
  }
}
