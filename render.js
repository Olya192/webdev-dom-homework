import { comments } from "./api.js";
import { likeCommentEvent } from "./main.js";

const appEl = document.getElementById('app');
const buttonElement = document.getElementById('add-button');
const loaderElement = document.getElementById('loader');


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

const renderComments = () => {

  const commentsElement = document.getElementById('comments');
  const loaderElement = document.getElementById('loader');
  const commentsHtml = comments
    .map((comment) => getCommentsEdit(comment)).join("");


  commentsElement.innerHTML = commentsHtml;

  loaderElement.style.visibility = "visible"

  const appHtml = `<div class="container">
<ul class="comments" id="comments">
${commentsHtml}
</ul>
<p id="loader">Пожалуйста подождите, загружаю комментарии...</p>
<div class="add-form">

  <input type="text" id="input-name" class="add-form-name" placeholder="Введите ваше имя" />
  <textarea type="textarea" id="input-text" class="add-form-text" placeholder="Введите ваш коментарий"
    rows="4"></textarea>
  <div class="add-form-row">
    <button class="add-form-button" id="add-button">Написать</button>
  </div>
</div>
</div> `

  appEl.innerHTML = appHtml
  buttonElement.disabled = true;

  loaderElement.style.visibility = "hidden";

  buttonElement.addEventListener('click', () => {

    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }
    const commentsDate = new Date().toLocaleString([], options);

    const oldListHTML = commentsElement.innerHTML;


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

    postComment();


  });

  likeCommentEvent

};







export { renderComments }
