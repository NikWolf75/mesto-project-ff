const cohortId = "wff-cohort-39";
const token = "ba26a2bd-21bb-4faa-8017-2c8d6bacad83";

const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function getUserInfo() {
  return fetch(`${baseUrl}/users/me`, {
    headers: { authorization: token },
  }).then(checkResponse);
}

function getInitialCards() {
  return fetch(`${baseUrl}/cards`, {
    headers: { authorization: token },
  }).then(checkResponse);
}

function updateUserInfo({ name, about }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, about }),
  }).then(checkResponse);
}

function addNewCard({ name, link }) {
  return fetch(`${baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link }),
  }).then(checkResponse);
}

function likeCard(cardId) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: { authorization: token },
  }).then(checkResponse);
}

function unlikeCard(cardId) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: { authorization: token },
  }).then(checkResponse);
}

function deleteCardFromServer(cardId) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: { authorization: token },
  }).then(checkResponse);
}

function updateAvatar(avatarUrl) {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then(checkResponse);
}

export {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  likeCard,
  unlikeCard,
  deleteCardFromServer,
  updateAvatar
};
