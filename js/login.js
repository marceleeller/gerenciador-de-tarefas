const $ = (elemento) => document.querySelector(elemento);

$('#signin').addEventListener('click', (evnt) => {
    evnt.preventDefault();

    const string = localStorage.getItem('user');
    const registeredUser = JSON.parse(string);

    const {login, senha} = registeredUser;
    console.log(registeredUser);

})