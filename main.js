import { getComments, comments, postComment } from "./api.js";
import { likeButtonEvent } from "./listeners.js";
import { renderComments } from "./render.js";

const inputNameElement = document.getElementById('input-name');
const inputTextElement = document.getElementById('input-text');
const nameElement = document.getElementById('name');
const textElement = document.getElementById('text');
const buttonElement = document.getElementById('add-button');
const commentsElement = document.getElementById('comments');





getComments();

export const likeCommentEvent = () => {
    const likeButtonElements = document.querySelectorAll(".like-button");

    const onSuccessCallback = () => {
        renderComments();
        likeCommentEvent();
        loaderElement.style.visibility = "hidden";
    }


    for (const likeButtonElement of likeButtonElements) {

        likeButtonEvent(likeButtonElement, comments, onSuccessCallback);

    }

}




// inputNameElement.addEventListener('input', function (event) {
//     inputsCheck();
// })

// inputTextElement.addEventListener('input', function (event) {
//     inputsCheck();
// })

// const inputsCheck = () => {
//     if (inputNameElement.value === '' || inputTextElement.value === '') {
//         buttonElement.disabled = true;
//     } else {
//         buttonElement.disabled = false;
//     }
// }





export const commentsInputElement = () => {
    const commentsElements = document.querySelectorAll(".comment");
    console.log(commentsElements)

    for (const commentsElement of commentsElements) {



        commentsElement.addEventListener('click', () => {

            const index = commentsElement.dataset.comment;


            const selectComment = comments.find((comment) => Number(comment.id) === Number(index));


            inputTextElement.value = `${selectComment.author.name} 
    ${selectComment.text}`;

        })



    }

}



console.log("It works!");