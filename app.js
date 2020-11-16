//https://randomuser.me/
//https://randomuser.me/documentation

let employees = [];
//const urlAPI = 'https://randomuser.me/api/?results=12&nat=us';
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US';
const cards = document.querySelector('.cards');
const overlay = document.querySelector('.popup-window');
const modalClose = document.querySelector('.close');
const modalContent = document.querySelector('.modal-content');



// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch(urlAPI)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => response.results)
    .then(generateCards)
    .catch(error => {
        cards.innerHTML = '<h3>Looks like there was a problem!</h3>';
    })

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    } else{
        return Promise.reject(new Error(response.statusText));
    }
}
//employee cards
function generateCards(data) {
    employees = data;
    //console.log(data);
    let employeeHTML = '';

    // loop through each employee
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
                <div class="person-img">
                    <img src="${picture.large}">
                </div>
                <div class="person-info">
                    <h2>${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="city">${city}</p>
                </div>
            </div>
        `   
    });
    cards.innerHTML = employeeHTML;
   
}

//overflow Modal box
function displayModal(index) { //name, picture, email, location, phone, dob
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    // parse birthday Date
    const brth = new Date(dob.date).toLocaleString('en-GB').split(',');
    const modalHTML = `
            <div class="person-img">
                <img src="${picture.large}">
            </div>
        
            <div class="person-info">
                <h2>${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="city">${location.city}</p>
            </div>
            <hr class="line">
            <div class="more">
                <p>${phone}</p>
                <p>${location.street}, ${location.state} ${location.postcode}</p>
                <p>Birthday: ${brth[0]}</p>
            </div>
    `
    overlay.classList.remove('hidden');
    modalContent.innerHTML = modalHTML;
}

// // ------------------------------------------
// //  EVENT LISTENERS
// // ------------------------------------------

cards.addEventListener('click', e => {
    if (e.target !== cards){
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');
        console.log('not cards container');
        displayModal(index);
    }
})
modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
})