let userLogged = JSON.parse(localStorage.getItem('loggedUser'));

if (localStorage.getItem('token') == null) {
    alert('Você precisa estar logado para acessar essa página')
    window.location.href = "./login.html";
}

// Welcome / format name user
let welcome = document.querySelector('#welcome')
let nameLowercase = userLogged.name.toLowerCase();
welcome.innerHTML = ('Olá, ' + nameLowercase);

//  LogOut
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    window.location.href = "./login.html";
}