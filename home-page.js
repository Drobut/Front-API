var username = document.getElementById("username");
var email = document.getElementById("email");
var passwordBuffer = document.getElementById("password");
var registerAlert = document.getElementById("registerAlert");
var signUpButtonLogin = document.getElementById("signUpButtonLogin");
var signInButtonNavigator = document.getElementById("signInButtonNavigator");
username.addEventListener("keyup", enableButton);
email.addEventListener("keyup", enableButton);
passwordBuffer.addEventListener("keyup", enableButton);
function emailvalidator() {
    var filter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!filter.test(email.value)) {
        return false;
    }
    else {
        return true;
    }
}
function passwordValidator() {
    var passFilter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passFilter.test(passwordBuffer.value)) {
        return false;
    }
    else {
        return true;
    }
}
function enableButton() {
    if (username.value !== null &&
        passwordValidator() === true &&
        emailvalidator() === true) {
        signUpButtonLogin.removeAttribute("disabled");
    }
    else {
        signUpButtonLogin.setAttribute("disabled", "disabled");
        passwordValidator();
    }
}
signUpButtonLogin.onclick = function () {
    var data = {
        name: username.value,
        email: email.value,
        password: passwordBuffer.value
    };
    var user = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch("https://crud-tasks-api.onrender.com/user", user)
        .then(function (response) { return response.json(); })
        .then(function (user) {
        if (user.error) {
            messageAlert();
        }
        else {
            localStorage.clear();
            window.location.href = "signIn-page.html";
        }
    })["catch"](function (e) {
        console.log(e);
    });
};
signInButtonNavigator.onclick = function () {
    window.location.href = "signIn-page.html";
};
function messageAlert() {
    var registerAlerts = document.createElement("div");
    if (registerAlert) {
        registerAlerts.innerHTML =
            '<div class="registerAlertInner" id="registerAlertInner">' +
                '<div class="alert alert-danger mt-3" role="alert">' +
                "Email already registered " +
                '<a href="signIn-page.html" class="alert-link"' +
                ">click here to sign in</a>.";
        registerAlert === null || registerAlert === void 0 ? void 0 : registerAlert.append(registerAlerts);
        registerAlert.classList.toggle("fadeOut");
        signUpButtonLogin.setAttribute("disabled", "disabled");
    }
    signUpButtonLogin.setAttribute("class", "btn btn-primary mb-5");
    messageAlertFadeOut();
}
function messageAlertFadeOut() {
    setInterval(function () {
        var _a;
        (_a = document.getElementById("registerAlertInner")) === null || _a === void 0 ? void 0 : _a.remove();
        registerAlert.classList.remove("fadeOut");
        signUpButtonLogin.setAttribute("class", "btn btn-primary mb-5 mt-5");
    }, 5000);
}
