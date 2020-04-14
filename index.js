const search = document.getElementById('search');
const filter = document.getElementById('filter');
const container = document.querySelector('.country-container');
const list = [];
let region;

async function getData() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await res.json();
    addDataToDom(data);
}

function addDataToDom(data) {
    console.log(data);
    container.innerHTML = `${data.map(el => 
                             `<div class="block">
                                <img src="${el.flag}">
                                <h3>${el.name}</h3>
                                <div class="country-info">
                                  <small><strong>Population: </strong>${el.population}</small>
                                  <small class="region"><strong>Region: </strong>${el.region}</small>
                                  <small><strong>Capital: </strong>${el.capital}</small>
                                </div>
                              </div>
                              <div class="detail">
                              <button class="btn-back" type="button"><i class="fas fa-long-arrow-alt-left"></i> Back</button>
                                <img src="${el.flag}">
                                <div class="detail-info-container">
                                  <h2>${el.name}</h2>
                                  <div class="detail-info">
                                    <div class="left control">
                                      <small><strong>Native name: </strong>${el.alpha2Code}</small>
                                      <small><strong>Population: </strong>${el.population}</small>
                                      <small><strong>Region: </strong>${el.region}</small>
                                      <small><strong>Subregion: </strong>${el.subregion}</small>
                                      <small><strong>Capital: </strong>${el.capital}</small>
                                    </div>
                                    <div class="right control">
                                      <small><strong>Top Level Domain: </strong>${el.topLevelDomain}</small>
                                      <small><strong>Currencies: </strong>${el.currencies[0].name}</small>
                                      <small><strong>Languages: </strong>${el.languages.map(langque => langque.name)}</small>
                                    </div>
                                  </div>
                                  <div class="border">
                                    <small><strong>Borders:</strong>${el.borders.map(border => `<span class="little">${border}      </span>`).join('')}</small>
                                  </div>
                                </div>
                              </div>`
                           ).join('')}`;
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        block.addEventListener('click', (e) => {
            blocks.forEach(block => block.style.display = 'none');
            const detail = block.nextElementSibling;
            detail.classList.add('on');
        })
    });

    const details = document.querySelectorAll('.detail');
    details.forEach(detail => {
        detail.addEventListener('click', (e) => {
            if(e.target.classList.contains('btn-back')) {
                detail.classList.remove('on');
                blocks.forEach(block => block.style.display = 'flex');
            }
        })
    })
    
}

search.addEventListener('input', (e) => {
    const term = search.value.trim().toUpperCase();
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        //console.log(block);
        const name = block.querySelector('h3').innerText.toUpperCase();
        if(name.indexOf(term) > -1) {
            block.style.display = 'flex';
        }else{
            block.style.display = 'none';
        }
    })
})

getData();

filter.addEventListener('change', (e) => {
    region = e.target.value.toUpperCase();
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        const regionName = block.querySelector('.region').innerText.replace('Region:', '').toUpperCase();
        console.log(region);
        
        if(regionName.indexOf(region) > -1) {
            block.style.display = 'flex';
        }else{
            block.style.display = 'none';
        }
    })
})