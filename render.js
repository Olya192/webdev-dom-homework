import { postComment } from "./api.js";
import { renderLogin } from "./login.js";

const appEl = document.getElementById('app');
const loaderElement = document.getElementById('loader');
const inputNameElement = document.getElementById('input-name');
const inputTextElement = document.getElementById('input-text');
const nameElement = document.getElementById('name');
const textElement = document.getElementById('text');
const buttonElement = document.getElementById('add-button');
const commentsElement = document.getElementById('comments');


let token = 0
let nameUser;

export const likeCommentEvent = (comments) => {
  const likeButtonElements = document.querySelectorAll(".like-button");

  for (const likeButtonElement of likeButtonElements) {

    likeButtonElement.addEventListener('click', (event) => {

      likeButtonElement.classList.add('-loading-like');
      const loaderElement = document.getElementById('loader');

      delay(2000)
        .then(() => {


          const index = likeButtonElement.dataset.index;

          const selectComments = comments.find((comment) => comment.id === index);
          if (!selectComments.isLiked) {
            selectComments.likes += 1;
            selectComments.isLiked = true;
          } else {
            selectComments.likes -= 1
            selectComments.isLiked = false;
          }

          likeButtonElement.classList.toggle('-active-like');
          console.log('111', comments);
          renderComments(comments);
          likeCommentEvent(comments);
          loaderElement.style.visibility = "hidden";
          console.log('222', comments);
        })

      event.stopPropagation();
    })
  }

}


function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}


const getCommentsEdit = (comment) => {
  return `<li class="comment" data-comment="${comment.id}">
    <div class="comment-header">
      <div id="name">${comment.author.name}</div>
      <div>${convertDate(comment.date)}</div>
    </div>
    <div class="comment-body">
      <div id="text" class="comment-text">
        ${comment.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span  class="likes-counter">${comment.likes}</span>
        <button data-index="${comment.id}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
      </div>
    </div>
  </li>`;
}

const convertDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }
  return new Date(date).toLocaleString([], options);
}

const renderComments = (comments) => {


  const commentsElement = document.getElementById('comments');

  const commentsHtml = comments
    .map((comment) => getCommentsEdit(comment)).join("");





  const inputHtml =
    `<div class="add-form">
    <input type = "text" id = "input-name" class="add-form-name" placeholder = "Введите ваше имя" />
    <textarea type="textarea" id="input-text" class="add-form-text" placeholder="Введите ваш коментарий"
      rows="4"></textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="add-button">Написать</button>
    </div>
  </div >`;



  const appHtml = `<div class="container">
  <ul class="comments" id="comments">
  ${commentsHtml}
  </ul>
    <p id="loader">Пожалуйста подождите, загружаю комментарии...</p>
    <div id="inputForm">${!token ? `Что бы добавить комментарий <a id="authorization" href="#"> авторизируйтесь </a>` : inputHtml}</div>
    </div >`;

  appEl.innerHTML = appHtml;

  if (token) {
    const inputNameElement = document.getElementById('input-name');
    inputNameElement.value = nameUser;
    inputNameElement.disabled = true;
  }


  const authorizationElement = document.getElementById('authorization');

  if (authorizationElement) {
    authorizationElement.addEventListener('click', () => {
      renderLogin({
        setToken: (newToken) => {
          token = newToken;
        },
        setUser: (newUser) => {
          nameUser = newUser;
        },
      });
    });
  }





  const buttonElement = document.getElementById('add-button');
  if (buttonElement) {
    buttonElement.disabled = true;
    buttonInputEvent();
    inputEvent();
  }

  const loaderElement = document.getElementById('loader');
  loaderElement.style.visibility = "hidden";

  commentsInputElement(comments);
};

const buttonInputEvent = () => {

  const buttonElement = document.getElementById('add-button');
  buttonElement.addEventListener('click', () => {
    const inputNameElement = document.getElementById('input-name');
    const inputTextElement = document.getElementById('input-text');


    inputNameElement.style.backgroundColor = '';
    inputTextElement.style.backgroundColor = '';

    if (inputNameElement.value === '') {
      inputNameElement.style.backgroundColor = '#f0c5c5';
      return;
    }

    if (inputTextElement.value === '') {
      inputTextElement.style.backgroundColor = '#f0c5c5';
      return;
    }

    buttonElement.disabled = true;

    postComment(token);


  });
}

export const inputEvent = () => {

  const buttonElement = document.getElementById('add-button');
  const inputNameElement = document.getElementById('input-name');
  const inputTextElement = document.getElementById('input-text');

  const inputsCheck = () => {
    if (inputNameElement.value === '' || inputTextElement.value === '') {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }

  inputNameElement.addEventListener('input', function (event) {
    inputsCheck();
  })

  inputTextElement.addEventListener('input', function (event) {
    inputsCheck();
  })

}




export const commentsInputElement = (comments) => {
  const commentsElements = document.querySelectorAll(".comment");
  console.log(commentsElements)
  const inputTextElement = document.getElementById('input-text');
  for (const commentsElement of commentsElements) {

    commentsElement.addEventListener('click', () => {
      const index = commentsElement.dataset.comment;
      const selectComment = comments.find((comment) => comment.id === index);
      inputTextElement.value = `${selectComment.author.name} 
  ${selectComment.text} `;
    })
  }

}





export { renderComments }
