

export const likeButtonEvent = (likeButtonElement, comments, onSuccessCallback) => {
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

                onSuccessCallback();

            })

        event.stopPropagation();
    })
}

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}


export const inputEvent = (inputNameElement, inputTextElement, buttonElement) => {

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







