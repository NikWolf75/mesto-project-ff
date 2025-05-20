const cohortId = "wff-cohort-39"; 
const token = "ba26a2bd-21bb-4faa-8017-2c8d6bacad83"; 

const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo() {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

// -------------------------

import { getUserInfo } from './api.js';

getUserInfo()
  .then(userData => {
    document.querySelector('.profile__title').textContent = userData.name;
    document.querySelector('.profile__description').textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;

    // Можно сохранить ID пользователя, если нужно
    const userId = userData._id;
  })
  .catch(err => {
    console.error(err);
  });
