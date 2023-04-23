import { comments } from "./api.js";

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
};



export { renderComments }
