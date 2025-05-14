
import '../pages/index.css';


import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';

// Импорт изображения, если оно используется
import '../images/logo.svg';

// Вывод карточек
const placesList = document.querySelector('.places__list');

initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});

