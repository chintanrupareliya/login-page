const token = sessionStorage.getItem("jwtToken");
console.log(token);
async function getuserdata() {
  await fetch("http://localhost:3030/api/auth/getuser", {
    method: "POST",
    headers: {
      "auth-token": token,
    },
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((userdata) => {
      let user = document.querySelector(".user");
      user.innerHTML = `Welcome ${userdata.name} ${userdata.email}`;
    })
    .catch((err) => {
      console.log(err);
    });
}
getuserdata();
// window.addEventListener("beforeunload", () => {
//   sessionStorage.removeItem("jwtToken");
// });
// login with google code
const urlParams = new URLSearchParams(window.location.hash.substring(1));
const accessToken = urlParams.get("access_token");
urlParams.forEach((value, key) => {
  localStorage.setItem(key, value);
  window.location.href = "http://127.0.0.1:5501/FRONTEND/main.html";
});

//function for logout

let logout = document.querySelector(".logout");
logout.addEventListener("click", () => {
  sessionStorage.removeItem("jwtToken");
  localStorage.clear();
  location.reload();
  window.location.href = "http://127.0.0.1:5501/FRONTEND/login.html";
});

//function for show user ditails on page

const img = document.createElement("img");
const info = document.querySelector(".info");
if (localStorage.getItem("access_token") != null) {
  fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let user = document.querySelector(".user");
      user.innerHTML = data.given_name;
      img.setAttribute("src", data.picture);
      info.prepend(img);
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });
}
