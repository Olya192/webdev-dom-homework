import { getComments, loginUser } from "./api.js";


export const renderLogin = ({ setToken, setUser, renderComments }, mode = true) => {
  let isLoginMode = mode;
  const appEl = document.getElementById('app');
  const loginText = `<div class="container">
  <div class="add-form">
<h3 class="form-title"> Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
<div class="form-row">
  ${isLoginMode ? "" : `Имя <input type="text" id="name-input" class="add-form-name" placeholder = "Введите ваше имя" />
    <br>`}
    <input type="text" id="login-input" class="add-form-name" placeholder = "Введите ваш логин"/>
    <br />
    <br />
    <input type="password" id="password-input" class="add-form-name" placeholder = "Введите пароль" />
    </div>
    <br />
    <button class="button" id="login-button" class="add-form-button">${isLoginMode ? "Войти" : "Зарегистрироваться"
    }</button>
    <br /><br /><br />
    <button class="button" id="toggle-button" class="add-form-button">Перейти ${isLoginMode ? "к регистрации" : "ко входу"
    }</button>
    </div>
    </div>`;

  appEl.innerHTML = loginText;
  document.getElementById("login-button").addEventListener("click", () => {

    const login = document.getElementById("login-input").value;
    const password = document.getElementById("password-input").value;

    if (isLoginMode) {

      if (!login) {
        alert("Введите логин");
        return;
      }

      if (!password) {
        alert("Введите пароль");
        return;
      }
    }

    loginUser({
      login: login,
      password: password,
    })
      .then((user) => {
        setToken(`Bearer ${user.user.token}`);
        setUser(user.user.name);
        getComments();
      })
      .catch((error) => {
        console.log(error);
        // alert(error.message);
      })

    document.getElementById("toggle-button").addEventListener("click", () => {
      renderLogin(!isLoginMode);
    });

  });
};
