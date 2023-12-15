function togglePassword(togglerID, inputID) {
    const passwordToggler = document.querySelector(`#${togglerID}`)
    const passwordInput = document.querySelector(`#${inputID}`)

    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)

    passwordToggler.classList.toggle("turn-blue")
}

function handleChange(e) {
    const { name, value }= e.target
    setUser(prev => {
        return {
            ...prev,
            [name]: value
        }
    })
}

export {togglePassword, handleChange}