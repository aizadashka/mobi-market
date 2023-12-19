function togglePassword(togglerID, inputID) {
    const passwordToggler = document.querySelector(`#${togglerID}`)
    const passwordInput = document.querySelector(`#${inputID}`)

    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)

    passwordToggler.classList.toggle("turn-blue")
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

const toastStyle = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    closeButton: false,
    pauseOnHover: true,
    draggable: true,
    theme: "colored"
}

export { togglePassword, isValidEmail, toastStyle }