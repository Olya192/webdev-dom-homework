
import { renderComments, likeCommentEvent, commentsInputElement } from "./render.js";
let comments = [];

const host = "https://webdev-hw-api.vercel.app/api/v2/olga-buchkova/comments"

export const getComments = () => {


    return fetch(host, {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            comments = responseData.comments;
            renderComments(comments);
            likeCommentEvent(comments);
            commentsInputElement(comments);
            const loaderElement = document.getElementById('loader');
            loaderElement.style.visibility = "hidden"
        });
}

export const postComment = ((token) => {
    const loaderElement = document.getElementById('loader');
    loaderElement.style.visibility = "visible";
    const inputNameElement = document.getElementById('input-name');
    const inputTextElement = document.getElementById('input-text');
    const buttonElement = document.getElementById('add-button');
    fetch(host, {
        method: "POST",
        body: JSON.stringify({

            text: inputTextElement.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),

        }),
        headers: {

            'Authorization': token,
        },
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
            renderComments(comments);
            inputNameElement.value = "";
            inputTextElement.value = "";
            buttonElement.disabled = false;
            commentsInputElement(comments);
            likeCommentEvent(comments);
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

export function loginUser({ login, password }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Неверный логин или пароль");
        }
        return response.json();
    });
}





export { comments }
