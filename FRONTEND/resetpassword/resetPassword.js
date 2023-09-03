// Purpose: To reset the password of the user.
// Extract the reset token from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const resetToken = urlParams.get("token");

// Get references to HTML elements
const password = document.querySelector(".password");
const confirmpassword = document.querySelector(".cpassword");
const resetpass = document.querySelector(".form-reset-pass");

// Add an event listener to the form submission
resetpass.addEventListener("submit", resetpassword);

// Function to handle password reset
async function resetpassword(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  try {
    // Get user input values
    const email = document.querySelector(".email").value;
    const newPassword = password.value;
    const cpassword = confirmpassword.value;

    // Check if any of the required fields are empty
    if (email === "" || newPassword === "" || cpassword === "") {
      throw new Error("Please don't leave any field empty");
    }

    // Check if the reset token is missing
    if (!resetToken) {
      throw new Error("Please come from the forgot password link");
    }

    // Check if the password and confirm password match
    if (newPassword !== cpassword) {
      throw new Error("Password and confirm password do not match");
    }

    // Send a POST request to reset the password
    await fetch("http://localhost:3030/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        resetToken,
        newPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw errorData;
          });
        }
      })
      .then((data) => {
        if (data) {
          alert(data.message);
          window.location.href = "http://127.0.0.1:5501/FRONTEND/login.html";
        }
      })
      .catch((error) => {
        alert(error.errors);
      });
  } catch (error) {
    console.error(error);
    alert(error.errors);
  }
}
