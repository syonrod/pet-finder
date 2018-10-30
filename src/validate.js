//Validate Zipcode


export function isValidZip (zip) {

    if (! zip) {
        return null;
    }

    zip = zip.toString().trim();

    var us = new RegExp("^\\d{5}(-{0,1}\\d{4})?$");
    var ca = new RegExp(/([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i);

    if (us.test(zip.toString())) {
        return zip;
    }

    if (ca.test(zip.toString().replace(/\W+/g, ''))) {
        return zip;
    }
    return null;
}

//Display alert message
export function showAlert(message, theClassName){
    //Create div
    const div = document.createElement('div');
    //Add Classes
    div.className = `alert alert-${theClassName}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get container
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#pet-form');
    //Insert alert
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}