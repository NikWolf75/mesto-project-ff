
import '../pages/index.css';


export function deleteCard(cardElement) {
  cardElement.remove();
}

import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';

// Импорт изображения, если оно используется
import logo from '../images/logo.svg';

// Вывод карточек
const placesList = document.querySelector('.places__list');

initialCards.forEach((images) => {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});