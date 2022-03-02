const searchPhone = () => {
    const searchField = document.getElementById('search');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';
    if (searchText == '') {
        return alert("No Data Input!!");
    }
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.data))
}

// result section
const displayResult = results => {
    const phoneResult = document.getElementById('phoneResult');
    phoneResult.textContent = '';
    results.forEach(result => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img class="w-50" src="${result.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${result.phone_name}</h5>
                <button onclick="showDetails('${result.slug}')" id="btn" type="button" class="btn btn-primary">Show Details</button>
                <p class="card-text">${result.slug}</p>
            </div>
        </div>
        `
        phoneResult.appendChild(div);
    })
}
// show section
const showDetails = details => {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => phoneDetails(data));
}

// details section
const phoneDetails = phone => {
    const displayPhoneDetails = document.getElementById('section');
    const div = document.createElement('div');
    displayPhoneDetails.textContent = '';
    div.classList.add('card');
    div.innerHTML = `
    <div class="card h-50">
            <img class="w-50 " src="${phone.data.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h2 class="card-title">${phone.data.name}</h2>
            <p class="card-text"><h4>MainFeatures:</h4> 
            <h5>Storage:</h5> ${phone.data.mainFeatures.storage}, 
            <h5>Memory:</h5> ${phone.data.mainFeatures.memory},
            <h5>Sensor:</h5> ${phone.data.mainFeatures.sensors[0]}, ${phone.data.mainFeatures.sensors[1]}, ${phone.data.mainFeatures.sensors[2]}, ${phone.data.mainFeatures.sensors[3]}, ${phone.data.mainFeatures.sensors[4]}, ${phone.data.mainFeatures.sensors[5]},
            <h5>Release Date:</h5> ${phone.data.releaseDate}</p>
        </div>
    </div>
    `;
    displayPhoneDetails.appendChild(div);
}
