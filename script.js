const registeredUsername = window.localStorage.getItem("username");
const registeredPassword = window.localStorage.getItem("password");

function setFormMessage(fromElement, type, message) {
  const messageElement = fromElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "form__message--success",
    "form__message--error"
  );
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = "";
}
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // local storage
    
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    if (
      loginUsername == registeredUsername &&
      loginPassword == registeredPassword
    ) {
      setFormMessage(loginForm, "success", "Welcome back!");
      loginForm.classList.add("form--hidden");
      document.querySelector(".container").style.display = "none";
      document.querySelector(".landingPage").style.display = "block";
      } else {
      setFormMessage(loginForm, "error", "Invalid username/password combination");
    }

  });
  createAccountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // local storage
    window.localStorage.setItem(
      "username",
      document.getElementById("signupUsername").value
    );
    setFormMessage(loginForm, "error", "Invalid username/password combination");
    console.log(window.localStorage.getItem("username"));

    window.localStorage.setItem(
      "email",
      document.getElementById("emailAddress").value
    );
    setFormMessage(loginForm, "error", "Invalid username/password combination");
    console.log(window.localStorage.getItem("email"));

    window.localStorage.setItem(
      "password",
      document.getElementById("password").value
    );
    setFormMessage(loginForm, "error", "Invalid username/password combination");
    console.log(window.localStorage.getItem("password"));

    window.localStorage.setItem(
      "confirmPassword",
      document.getElementById("confirmPassword").value
    );
    setFormMessage(loginForm, "error", "Invalid username/password combination");
    console.log(window.localStorage.getItem("confirmPassword"));

    createAccountForm.reset();
    setFormMessage(createAccountForm, "success", "Account created!");
  });

  document.querySelectorAll(".form__input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "signupUsername" &&
        e.target.value.length > 0 &&
        e.target.value.length < 10
      ) {
        setInputError(
          inputElement,
          "Username must be at least 10 characters in length"
        );
      }
    });

    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });
  });
});


//pokemonAPI
document.querySelector('#search').addEventListener("click", getPokemon);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
    return string.toLowerCase();
}


function getPokemon(e) {
    const name = document.querySelector('#pokemonName').value;
    const pokemonName = lowerCaseName(name);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector(".pokemonBox").innerHTML = `
            <div>
                <img 
                    src="${data.sprites.other["official-artwork"].front_default}"
                    alt="${capitalizeFirstLetter(data.name)}"
                />
            </div>
            <div class="pokemonInfo">
                <h1 id="pokeName">${capitalizeFirstLetter(data.name)}</h1>
                <p>Weight : ${data.weight} </p>  
                <button id="favoriteBtn">favorite</button>  
            </div>
            `;
    //favorite pokemon
    document.getElementById("favoriteBtn").addEventListener("click", favoritePokemon);

    function favoritePokemon() {
        var localStage[pokemonFavorites] = new Array();
        pokemonFavorite = window.localStorage.setItem("favoritePokemon", document.getElementById("pokeName").textContent);
}        
    })
    .catch((err) => {
        console.log("Pokemon not found", err);
    });

    e.preventDefault();
}

