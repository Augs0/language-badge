let countries;
let selectedCountries = [];
const preview = document.querySelector(".preview");
const selector = document.getElementById('languages');


fetch("https://restcountries.eu/rest/v2/all")
    .then(response => response.json())
    // .then(data => populateSelector(data))
    .then(data => getData(data))
    .catch(err => console.error(err))

function getData(data) {
    countries = data;
    let output = '<option value="Choose a country">Choose a country</option>';
    countries.forEach(country => {
        output += `<option class="countries" value="${country.alpha2Code}">
                        ${country.name}
                    </option>   
                `;
    });
    selector.innerHTML = output;
    grabFlag(selector.value)
}

selector.addEventListener('change', (e) => {
    grabFlag(e.currentTarget.value)
    const countryOptions = document.querySelectorAll('.countries');
    for (let i = 0, len = countryOptions.length; i < len; i++) {
        countryOptions[i].selected = countryOptions[i].defaultSelected;
    }
})


function grabFlag(alpha2Code) {
    // selectedCountries = [];
    const info = countries.find(country => country.alpha2Code === alpha2Code);
    if (info && selectedCountries.includes(info) === false) {
        selectedCountries.push(info)
        console.log(selectedCountries)
    }
}

const previewBtn = document.getElementById('preview-badge');
previewBtn.addEventListener('click', () => {
    makeBadge(selectedCountries)
    selectedCountries = []
})

function makeBadge(selectedCountries) {
    const badgeWrapper = document.querySelector('.badge-wrapper');
    const namebadge = document.querySelector('.namebadge');
    const nameToAdd = document.getElementById('username').value;
    const usercolour = document.querySelector('.userbg').value;
    const usertext = document.querySelector('.usertext').value;

    badgeWrapper.style.backgroundColor = usercolour;
    badgeWrapper.style.color = usertext;

    namebadge.innerHTML = nameToAdd;
    selectedCountries.forEach(country => {
        const imgs = `<img src="${country.flag}" class="flag_img" alt="flag of ${country.name}" />`

        badgeWrapper.innerHTML += imgs;

        preview.appendChild(badgeWrapper);
    })
}

const htmlBtn = document.getElementById('preview-html');
htmlBtn.addEventListener('click', () => {
    grabHtml();
})

function grabHtml() {
    const usercolour = document.querySelector('.userbg').value;
    const usertext = document.querySelector('.usertext').value;
    const htmlWrapper = document.querySelector('.html-wrapper');
    const badgehtml = document.querySelector('.badge-wrapper').outerHTML;
    const badgehtmlformatted = badgehtml.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    let htmlcontent = `
    <code>
        //HTML <br/>
        ${badgehtmlformatted}<br/><br/>
        /* CSS */ </br>
        padding:10px;<br/>
        min-width:500px; /*container should be flex*/</br>
        font-family: 'Raleway', sans-serif;
        height:auto;</br>
        border-radius:5px;</bR>
        background-color:${usercolour};</br>
        color:${usertext}; <br/>
        </code>
    `;

    htmlWrapper.innerHTML = htmlcontent;
}