
import { renderComments } from "./render.js";
import { likeCommentEvent } from "./main.js";
import { commentsInputElement } from "./main.js";
let comments = [];

const loaderElement = document.getElementById('loader');
const inputNameElement = document.getElementById('input-name');
const inputTextElement = document.getElementById('input-text');
const buttonElement = document.getElementById('add-button');


const getComments = () => {


    return fetch("https://webdev-hw-api.vercel.app/api/v1/olga-buchkova/comments", {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            comments = responseData.comments;
            renderComments();
            likeCommentEvent();
            commentsInputElement();
            loaderElement.style.visibility = "hidden"
        });
}

export const postComment = (() => {

    loaderElement.style.visibility = "visible";

    fetch("https://webdev-hw-api.vercel.app/api/v1/olga-buchkova/comments", {
        method: "POST",
        body: JSON.stringify({

            text: inputTextElement.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
            name: inputNameElement.value.replaceAll("<", "&lt").replaceAll(">", "&gt")
            // forceError: true,

        })
    })
        .then((response) => {

            if (response.status === 400) {
                throw new Error("Ваше имя и комментарий должны содержать хотя бы 3 символа");
            } else if (response.status === 500) {
                postComment();
                // throw new Error("Сервис временно недоступен, пожалуйста попробуйте позже");
            } else {
                return response.json();
            }
        })
        .then(() => {

            return getComments();

        })
        .then(() => {
            renderComments();
            inputNameElement.value = "";
            inputTextElement.value = "";
            buttonElement.disabled = false;
            commentsInputElement();
            loaderElement.style.visibility = "hidden";
        })
        .catch((error) => {
            buttonElement.disabled = false;
            if (error.message === 'Failed to fetch') {
                alert('Нет соединения с интернетом, проверьте ваше подключение');
            } else {
                alert(error.message);
            }
            loaderElement.style.visibility = "hidden";
        });

})



export { getComments }
export { comments }
