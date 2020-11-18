//https://randomuser.me/
//https://randomuser.me/documentation

let employees = [];
//const urlAPI = 'https://randomuser.me/api/?results=12&nat=us';
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US';
const cards = document.querySelector('.cards');
const overlay = document.querySelector('.popup-window');
const modalClose = document.querySelector('.close');
const modalContent = document.querySelector('.modal-content');
const searchImput = document.getElementById('search');


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
    let employeeHTML = '';

    // loop through each employee
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        
        employeeHTML += `
            <div class="card" data-fancybox="employee" data-index="${index}" data-name="${name.first} ${name.last}">
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
    let { name, dob, phone, email, picture } = employees[index];

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
                <p> ${employees[index].location.street.number} ${employees[index].location.street.name}, ${employees[index].location.city} ${employees[index].location.postcode} ${employees[index].location.state}</p>
                <p>Birthday: ${brth[0]}</p>
            </div>
            <a class="prev">&#10094;</a>
            <a class="next">&#10095;</a>
    `
    overlay.classList.remove('hidden');
    modalContent.innerHTML = modalHTML;

    //exceeds expectations Arrows
    const nextArrow = document.querySelector('.next'); //console.log(nextArrow);
    const prevArrow = document.querySelector('.prev');
        //next arrow
        nextArrow.addEventListener('click', () => {
            // displayModal(index + 1);
            if (index < employees.length - 1) {
                index++;
				displayModal(index);
			}
        })
        //preview arrow
        prevArrow.addEventListener('click', () => {
            //displayModal(index - 1);
            if (index > 0) {
				index--;
				displayModal(index);
			}
        })
}


// // ------------------------------------------
// //  EVENT LISTENERS
// // ------------------------------------------

//open modal window
cards.addEventListener('click', e => {
    if (e.target !== cards){
        const card = e.target.closest('.card');
        let index = card.getAttribute('data-index');
        displayModal(index);

    }

})

//close modal window 
modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
})

//exceeds expectations
//searchImput.value

searchImput.addEventListener('keyup', event => { 
    const index = document.querySelectorAll('.card');
    if(searchImput.value.length > 0) {
        for(let i = 0; i < index.length; i++) {
            //console.log(index[i]);
            if(index[i].getAttribute('data-name').toLowerCase().indexOf(searchImput.value.toLowerCase()) < 0) {
                index[i].style.display = 'none';
            } else{
                index[i].style.display = 'inherit';
            }
        }
    }
})

