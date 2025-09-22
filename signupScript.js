let nameInp = document.querySelector("#nameInp")
let emailInp = document.querySelector("#emailInp")
let passwordInp = document.querySelector("#passInp")
let message = document.getElementById("message")
let signBtn = document.querySelector(".submitBtn")
let signupForm = document.querySelector("#formSubmit")
let errorMsg = document.querySelector("#error")

let signupData = localStorage.getItem("signupData")
    ? JSON.parse(localStorage.getItem("signupData")) : []

let errors = [];
passwordInp.addEventListener("input", () => {
    errors = []
    const value = passwordInp.value;

    if (value.length < 8) {
        errors.push("At least 8 characters");
    }
    if (!/[A-Z]/.test(value)) {
        errors.push("At least 1 uppercase letter");
    }
    if (!/[a-z]/.test(value)) {
        errors.push("At least 1 lowercase letter");
    }
    if (!/[0-9]/.test(value)) {
        errors.push("At least 1 number");
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
        errors.push("At least 1 special character");
    }

    if (errors.length > 0) {
        message.className = "error";
        message.textContent = "❌ " + errors.join(", ");
        signBtn.disabled = true;
    } else {
        message.className = "success";
        message.textContent = "✅ Strong password!";
        signBtn.disabled = false;
    }
})

signupForm.addEventListener("submit", () => {
    event.preventDefault()
})

signBtn.addEventListener("click", (event) => {
    let name = nameInp.value.trim()
    let email = emailInp.value.trim()
    let password = passwordInp.value

    let signupObj = { name, email, password }

    let foundUser = signupData.find(user => user.email === email)

    if (foundUser) {
        errorMsg.innerText = `* This email is already taken, try another...`
        errorMsg.style.color = "red"
        emailInp.focus()
    } else {
        signBtn.innerText = "Please Wait..."
        setTimeout(() => {
            signupData.push(signupObj)
            localStorage.setItem("signupData", JSON.stringify(signupData))
            errorMsg.style.color = "green"
            errorMsg.innerText = `* Hey ${name}, You have registered successfully!`
            signBtn.innerText = "Signup"
            signupForm.reset();
            
            errors = []
            message.textContent = "";
            message.className = "";
            signBtn.disabled = true;
        }, 2000);
    }
})