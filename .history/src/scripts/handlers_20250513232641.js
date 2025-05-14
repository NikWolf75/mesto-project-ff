export function handleLike(event) {
  const likeButton = event.target;

  // Проверка, если кнопка уже лайкнута
  if (likeButton.classList.contains('card__like-button_is-active')) {
    // Убираем класс и меняем изображение
    likeButton.classList.remove('card__like-button_is-active');
    likeButton.style.backgroundImage = 'url("../images/like-inactive.svg")'; // неактивное изображение
  } else {
    // Добавляем класс и меняем изображение
    likeButton.classList.add('card__like-button_is-active');
    likeButton.style.backgroundImage = 'url("../images/like-active.svg")'; // активное изображение
  }
}

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
