localStorage.clear();
var local = JSON.parse(localStorage.getItem("id") || "[]");
var emailLogin = document.getElementById("email");
var registerAlertLogin = document.getElementById("registerAlert");
var passwordBufferLogin = document.getElementById("password");
var navigatorHome = document.getElementById("navigatorHome");
var signIpButton = document.getElementById("signIpButton");
emailLogin.addEventListener("keyup", enableButtonLogin);
passwordBufferLogin.addEventListener("keyup", enableButtonLogin);
function emailvalidatorLogin() {
    var filter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!filter.test(emailLogin.value)) {
        return false;
    }
    else {
        return true;
    }
}
function passwordValidatorLogin() {
    var passFilter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passFilter.test(passwordBufferLogin.value)) {
        return false;
    }
    else {
        return true;
    }
}
function enableButtonLogin() {
    if (passwordValidatorLogin() === true && emailvalidatorLogin() === true) {
        signIpButton.removeAttribute("disabled");
    }
    else {
        signIpButton.setAttribute("disabled", "disabled");
        passwordValidatorLogin();
    }
}
navigatorHome.onclick = function () {
    window.location.href = "index.html";
};
signIpButton.onclick = function () {
    var data = {
        email: email.value,
        password: passwordBufferLogin.value
    };
    var user = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch("https://crud-tasks-api.onrender.com/user/login", user)
        .then(function (response) { return response.json(); })
        .then(function (user) {
        if (user.error) {
            messageAlertLogin();
        }
        else {
            localStorage.clear();
            local.push(user);
            localStorage.setItem("ids", JSON.stringify(local));
            window.location.href = "errand-list.html";
        }
    })["catch"](function (e) {
        console.log(e);
    });
};
function messageAlertLogin() {
    var registerAlerts = document.createElement("div");
    if (registerAlertLogin) {
        registerAlerts.innerHTML =
            '<div class="registerAlertInner" id="registerAlertInner">' +
                '<div class="alert alert-danger mt-1 mb-4" role="alert">' +
                "Email or password is invalid " +
                '<a href="index.html" class="alert-link"' +
                ">click here to sign up</a>.";
        registerAlertLogin === null || registerAlertLogin === void 0 ? void 0 : registerAlertLogin.append(registerAlerts);
        registerAlertLogin.classList.toggle("fadeOut");
        signIpButton.setAttribute("disabled", "disabled");
    }
    signIpButton.setAttribute("class", "btn btn-primary mb-5");
    messageAlertFadeOutLogin();
}
function messageAlertFadeOutLogin() {
    setInterval(function () {
        var _a;
        (_a = document.getElementById("registerAlertInner")) === null || _a === void 0 ? void 0 : _a.remove();
        registerAlert.classList.remove("fadeOut");
        signIpButton.setAttribute("class", "btn btn-primary mb-5 mt-3");
    }, 5000);
}
