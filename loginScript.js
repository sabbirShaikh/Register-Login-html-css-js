let signupObj = JSON.parse(localStorage.getItem("signupData"))

let emailInp = document.querySelector("#emailInp")
let passwordInp = document.querySelector("#passInp")
let loginBtn = document.querySelector("#formSubmit")
let errorMsg = document.querySelector("#error")

loginBtn.addEventListener("submit", (event) => {
    event.preventDefault()
    let email = emailInp.value
    let password = passwordInp.value

    let foundUser = signupObj.find(user => user.email === email && user.password === password)

    let loginUser;
    if (foundUser) {
        loginUser = foundUser.name
        window.location.href = "./Home.html"
    } else {
        errorMsg.style.color = "red"
        errorMsg.innerText = `* Your email or password is incorrect.`
    }
    localStorage.setItem("loginUser", loginUser)
})
