import fetchJsonp from 'fetch-jsonp';
import { isValidZip, showAlert } from './validate';



const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', fetchAnimals);

//Fetch animals from API

function fetchAnimals(e){
    e.preventDefault();

    //Get user input

    const animal = document.querySelector('#animal').value;
    const zip = document.querySelector('#zip').value;

    //Validate Zip
    if (!isValidZip(zip)) {
        showAlert('Please Enter A Valid Zipcode from US or CA', 'danger');
    }

    //Fetch Pets
    fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=2a10c1aaa237f5820ec58e71e0a88f8e&animal=${animal}&location=${zip}&callback=callback`, {
        jsonpCallbackFunction: 'callback'
    })
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .catch(err => console.log(err));

}

//Show list of pets
function showAnimals(pets){
    const results = document.querySelector('#result');

//Clear results first
    results.innerHTML = '';

//Loop through pets
    pets.forEach(pet => {
        console.log(pet);
        const div = document.createElement('div');

        div.classList.add('card', 'card-body', 'mb-3');
        div.innerHTML = `
            <div class="row">
                <div class="col-sm-6">
                    <h4>${pet.name.$t} (${pet.age.$t})</h4>
                    <p class="text-secondary">${pet.breeds.breed.$t}</p>
                    <p class="text-secondary">${pet.contact.address1.$t} ${pet.contact.city.$t} ${pet.contact.state.$t} ${pet.contact.zip.$t}</p>
                    <ul class="list-group">
                        <li class="list-group-item">Phone: ${pet.contact.phone.$t} </li>
                        ${pet.contact.email.$t ? `<li class="list-group-item">Email: ${pet.contact.email.$t} </li>` : ``}
                        <li class="list-group-item">Shelter ID: ${pet.shelterId.$t} </li>
                    </ul>
                </div>

                <div class="col-sm-6 text-center">
                    <img class="img-fluid rounded mt-2" src="${pet.media.photos.photo[3].$t}">
                </div>
            </div>
        `;

        results.appendChild(div);
    });


}
