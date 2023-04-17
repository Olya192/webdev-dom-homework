import { getComments } from "./api.js";
import { comments } from "./api.js";
import { postComment } from "./api.js";

const inputNameElement = document.getElementById('input-name');
const inputTextElement = document.getElementById('input-text');
const nameElement = document.getElementById('name');
const textElement = document.getElementById('text');
const buttonElement = document.getElementById('add-button');
const commentsElement = document.getElementById('comments');
const loaderElement = document.getElementById('loader');




getComments();

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




export const likeCommentEvent = () => {
    const likeButtonElements = document.querySelectorAll(".like-button");

    for (const likeButtonElement of likeButtonElements) {

        likeButtonElement.addEventListener('click', (event) => {

            likeButtonElement.classList.add('-loading-like');


            delay(2000)
                .then(() => {


                    const index = likeButtonElement.dataset.index;

                    const selectComments = comments.find((comment) => Number(comment.id) === Number(index));

                    if (!selectComments.isLiked) {
                        selectComments.likes += 1;
                        selectComments.isLiked = true;
                    } else {
                        selectComments.likes -= 1
                        selectComments.isLiked = false;
                    }

                    likeButtonElement.classList.toggle('-active-like');

                    renderComments();
                    likeCommentEvent();
                    loaderElement.style.visibility = "hidden";
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

likeCommentEvent();

inputNameElement.addEventListener('input', function (event) {
    inputsCheck();
})

inputTextElement.addEventListener('input', function (event) {
    inputsCheck();
})

const inputsCheck = () => {
    if (inputNameElement.value === '' || inputTextElement.value === '') {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}





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