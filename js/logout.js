let userLogged = JSON.parse(localStorage.getItem('loggedUser'));

if (localStorage.getItem('token') == null) {
    alert('Você precisa estar logado para acessar essa página')
    window.location.href = "../index.html";
}

// Welcome / format name user
let welcome = document.querySelector('#welcome')
let nameLowercase = userLogged.name.toLowerCase();
let hour = new Date()
hour = hour.getHours()
var greetings = ''
if (hour >= 0 && hour < 6) {
    greetings = 'Boa madrugada, '
} else if (hour >= 6 && hour < 12){
    greetings = 'Bom dia, '
} else if (hour >= 12 && hour < 18){
    greetings = 'Boa tarde, '
} else {
    greetings = 'Boa noite, '
}
welcome.innerHTML = (greetings + nameLowercase);

//  LogOut
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    window.location.href = "../index.html";
}