// Selecting DOM elements
const forms = document.querySelector(".forms"),
  eyeicon = document.querySelector("#eye-icon"),
  ceyeicon = document.querySelector("#ceyeicon"),
  leyeicon = document.querySelector("#leyeicon"),
  links = document.querySelectorAll(".link");
console.log(process.env.GOOGLE_CLIENT_ID);
// Event listener for password visibility toggle
eyeicon.addEventListener("click", () => {
  let password = document.querySelector(".singup-pass");
  if (password.type === "password") {
    password.type = "text";
    eyeicon.classList.replace("bx-hide", "bx-show");
    return;
  }
  password.type = "password";
  eyeicon.classList.replace("bx-show", "bx-hide");
});

// Event listener for confirm password visibility toggle
ceyeicon.addEventListener("click", () => {
  let cpassword = document.querySelector(".confirm-password");
  if (cpassword.type === "password") {
    cpassword.type = "text";
    ceyeicon.classList.replace("bx-hide", "bx-show");
    return;
  }
  cpassword.type = "password";
  ceyeicon.classList.replace("bx-show", "bx-hide");
});

// Event listener for login password visibility toggle
leyeicon.addEventListener("click", () => {
  let lpassword = document.querySelector(".login-pass");
  if (lpassword.type === "password") {
    lpassword.type = "text";
    leyeicon.classList.replace("bx-hide", "bx-show");
    return;
  }
  lpassword.type = "password";
  leyeicon.classList.replace("bx-show", "bx-hide");
});

// Event listener for links (probably navigation links)
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Preventing form submit
    forms.classList.toggle("show-singup");
  });
});

// Code for finding user from the backend
const formlogin = document.querySelector(".form-login");
formlogin.addEventListener("submit", loginuser);

async function loginuser(event) {
  event.preventDefault();
  const email = document.querySelector(".login-email").value;
  const password = document.querySelector(".login-pass").value;

  if (email === "" || password === "") {
    alert("Please enter email and password");
    return;
  }

  // Sending a POST request to the backend for login
  await fetch("http://localhost:3030/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        // Successful response
        return res.json();
      } else {
        // Error response
        return res.json().then((errorData) => {
          throw errorData; // Throw the error data to be caught in the next .catch block
        });
      }
    })
    .then((data) => {
      if (data) {
        const newtoken = JSON.stringify(data).substring(
          1,
          JSON.stringify(data).length - 1
        );
        sessionStorage.setItem("jwtToken", newtoken);
        window.location.href = "./main.html";
      }
    })
    .catch((err) => {
      alert(err.errors);
    });
}

// Code for creating a new user
const formsingup = document.querySelector(".form-singup");
formsingup.addEventListener("submit", signupuser);

async function signupuser(event) {
  event.preventDefault();
  const name = document.querySelector(".singin-name").value;
  const email = document.querySelector(".singup-email").value;
  const password = document.querySelector(".singup-pass").value;
  const confirmpassword = document.querySelector(".confirm-password").value;

  if (password === confirmpassword) {
    // Sending a POST request to the backend for user registration
    await fetch("http://localhost:3030/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((errorData) => {
            throw errorData; // Throw the error data to be caught in the next .catch block
          });
        }
      })
      .then((data) => {
        if (data) {
          const newtoken = JSON.stringify(data).substring(
            1,
            JSON.stringify(data).length - 1
          );
          sessionStorage.setItem("jwtToken", newtoken);
          window.location.href = "./main.html";
        }
      })
      .catch((err) => {
        alert(err.errors);
      });
  } else {
    alert("Password and confirm password do not match");
  }
}

// Function for Google OAuth sign-in
function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    client_id: "YOUR_GOOGLE_AUTH_CLIENT_ID",
    redirect_uri: "http://127.0.0.1:5501/FRONTEND/main.html",
    response_type: "token",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    include_granted_scopes: "true",
    state: "pass-through value",
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  // Add form to the page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}
