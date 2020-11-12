//https://randomuser.me/
//https://randomuser.me/documentation

const cards = document.querySelector('.cards');
const overlay = document.querySelector('.popup-window');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url)
            .then(checkStatus)
            .then(response => response.json())
            .catch(error => {
                cards.innerHTML = '<h3>Looks like there was a problem!</h3>';
            })
}
fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => generateCards(data.results))

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
function generateCards(data) {

    data.map(card => { 
        // parse birthday Date
        const brth = new Date(card.dob.date).toLocaleString('en-GB').split(',');

        //create employed cards
        const cardElem = document.createElement('div');
        cardElem.classList.add('card');

        //add card Element cards container 
        cards.appendChild(cardElem);
        cardElem.innerHTML = `
            <div class="person-img">
                <img src="${card.picture.large}">
            </div>
        
            <div class="person-info">
                <h2>${card.name.first} ${card.name.last}</h2>
                <p class="email">${card.email}</p>
                <p class="city">${card.location.city}</p>
            </div>
            <hr class="line none">
            <div class="more none">
                <p>${card.cell}</p>
                <p>${card.location.street.number} ${card.location.street.name}, ${card.location.state} ${card.location.postcode}</p>
                <p>Birthday: ${brth[0]}</p>
            </div>
        `;
    });
}

function windowOverlay(event){
    //console.log(employedCard);
    const targetCard = event.target;
       console.log(targetCard);
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

console.log(cards.children.length);
