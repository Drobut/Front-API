var usersAndCards = JSON.parse(localStorage.getItem("ids") || "[]");
var idUser = usersAndCards[0].id;
renderCards();
var addBtn = document.getElementById("addButton");
var welcome = document.getElementById("NameSpace");
var deleteBtn = document.getElementById("deleteBtn");
welcome.innerHTML = "<b>Welcome, </b>" + usersAndCards[0].name;
addBtn.onclick = function () {
    var data = {
        title: "",
        message: "",
        archive: "false"
    };
    var card = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch("https://crud-tasks-api.onrender.com/user/".concat(idUser, "/errand"), card)["catch"](function (e) {
        console.log(e);
    });
    renderCards();
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function editCards(id) {
    var titleAuto = document.getElementById("titulo_" + id);
    var anotacaoAuto = document.getElementById("anotacao_" + id);
    var data = {
        title: titleAuto.value,
        message: anotacaoAuto.value,
        archive: "false"
    };
    var edit = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch("https://crud-tasks-api.onrender.com/user/".concat(idUser, "/errand/").concat(id), edit)["catch"](function (e) {
        console.log(e);
    });
    renderCards();
}
//eslint-disable-next-line @typescript-eslint/no-unused-vars
function deleteCards(id) {
    var dell = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch("https://crud-tasks-api.onrender.com/user/".concat(idUser, "/errand/").concat(id), dell).then(function (res) { return res.text(); });
    renderCards();
}
function renderCards() {
    fetch("https://crud-tasks-api.onrender.com/user/".concat(idUser))
        .then(function (reponse) { return reponse.json(); })
        .then(function (user) {
        var cardsEle = document.querySelector("#cards");
        cardsEle.innerHTML = "";
        user.map(function (card) {
            var cardEle = document.createElement("div");
            cardEle.classList.add("card");
            cardEle.innerHTML =
                '<textarea type="textarea" onblur=editCards(' +
                    '"' +
                    card.idErrand +
                    '"' +
                    ') class="titulo" id="titulo_' +
                    card.idErrand +
                    '" placeholder="Titulo" style="resize: none;" size="18" maxlength="18">' +
                    card.title +
                    "</textarea>" +
                    '<textarea type="textarea" onblur=editCards(' +
                    '"' +
                    card.idErrand +
                    '"' +
                    ') class="anotacao" id="anotacao_' +
                    card.idErrand +
                    '" placeholder="Escreva sua anotação aqui" style="resize: none;">' +
                    card.message +
                    "</textarea>" +
                    '<div class="editaButtons">' +
                    '<button id="excluirBtn" data-bs-toggle="modal" onClick=filterCards(' +
                    '"' +
                    card.idErrand +
                    '"' +
                    ') data-bs-target="#exampleModal"class="excluirButton"(' +
                    '"' +
                    card.idErrand +
                    '"' +
                    ')"></button>' +
                    "</div>";
            cardsEle.append(cardEle);
        });
    });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function filterCards(id) {
    deleteBtn.onclick = function () {
        deleteCards(id);
    };
}
