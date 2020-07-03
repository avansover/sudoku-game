document.getElementById('prepBox').style.visibility = "hidden"
localStorage.removeItem('SelectedDifficulty');


function radius() {
    let userName = document.getElementById('userNameInput').value
    let password = document.getElementById('passwordInput').value
    console.log(userName);
    console.log(password);

    if (userName == "abcd" && password == "1234") {
        console.log("good");
        document.getElementById('userNameOutput').innerHTML = "";
        document.getElementById('passwordOutput').innerHTML = "";
        document.getElementById('welcomeOutput').innerHTML = "Welcome abcd";
        document.getElementById('welcomeOutput').style.color = "green"
        document.getElementById('prepBox').style.visibility = "visible"
    } else if (userName == "abcd" && password != "1234") {
        console.log("wrong password");
        document.getElementById('userNameOutput').innerHTML = "Ok";
        document.getElementById('userNameOutput').style.color = "green"
        document.getElementById('passwordOutput').innerHTML = "Wrong password";
        document.getElementById('passwordOutput').style.color = "red"
    } else {
        console.log("no such username");
        document.getElementById('userNameOutput').innerHTML = "No such username";
        document.getElementById('userNameOutput').style.color = "red"
    }

}

function checkDifficulty() {

    var radios = document.getElementsByName('radioDifficulty');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            localStorage.setItem('SelectedDifficulty', radios[i].value);

            window.open("Sudoku.html", "_self")
        }
    }

}