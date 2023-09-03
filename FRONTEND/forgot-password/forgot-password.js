const forgotpass = document.querySelector(".form-forgot-pass");
forgotpass.addEventListener("submit", forgotpassword);
async function forgotpassword(event) {
  event.preventDefault();
  const email = document.querySelector(".email").value;
  if (email === "") {
    alert("please enter email");
    return;
  }
  await fetch("http://localhost:3030/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((errorData) => {
          throw errorData;
        });
      }
    })
    .then((data) => {
      if (data) {
        alert(data.message);
      }
    })
    .catch((err) => {
      alert(err.errors);
    });
}
