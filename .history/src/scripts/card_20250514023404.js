export function createCard({ name, link, description }, deleteCard, handleLike, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardText = cardElement.querySelector('.card__text'); // Добавляем текст
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Проверка на наличие пути к изображению
  if (link) {
    cardImage.src = link;
  } else {
    cardImage.src = 'path/to/default-image.jpg'; // Замените на путь к изображению по умолчанию
    console.warn('Путь к изображению пустой, используется изображение по умолчанию');
  }

  cardImage.alt = name;
  cardTitle.textContent = name;
  cardText.textContent = description; // Заполняем описание

  // Если передан обработчик для лайка, привязываем его
  if (handleLike) {
    likeButton.addEventListener('click', handleLike);
  }

  // Привязываем обработчик для удаления карточки
  if (deleteCard) {
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
  }

  // Привязываем обработчик для клика по изображению
  if (handleImageClick) {
    cardImage.addEventListener('click', handleImageClick);
  }

  return cardElement;
}
