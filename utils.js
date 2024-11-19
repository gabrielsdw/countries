import { CountriesService } from "./service.js";

async function fillCountry(data) {
    document.getElementById('countryName').innerHTML = data.name.common;
}

async function fillCapital(data) {
    document.getElementById('capital').innerHTML = data.capital[0]
}

async function fillContinents(data) {
    let string = ''
    for(const continent of data.continents) {
        string += `, ${continent}`
    }
    string = string.replace(', ', '', 1)
    document.getElementById('continents').innerHTML = string
}

async function fillPopulation(data) {
    document.getElementById('population').innerHTML = data.population
}

async function fillArea(data) {
    document.getElementById('area').innerHTML = data.area
}

async function fillCurrencies(data) {
    let string = ''
    for(const key in data.currencies) {
        const currence = data.currencies[key]
        if('symbol' in currence) {
            string += `, ${currence.name} (${currence.symbol})`
        }
        else {
            string += `, ${currence.name}`
        }
    }
    string = string.replace(', ', '', 1)
    document.getElementById('currencies').innerHTML = string
}

async function fillLanguages(data) {
    let string = ''
    for(const key in data.languages) {
        const language = data.languages[key]
        string += `, ${language}`
    }
    string = string.replace(', ', '', 1)
    document.getElementById('languages').innerHTML = string
}

async function fillFlag(data) {
    document.getElementById('flag').setAttribute('src', data.flags.png)
}

async function fillBorderCountries(data) {
    const borderCountriesList = document.getElementById('borderCountries')
    borderCountriesList.innerHTML = ''
    
    const select = document.getElementById('countrySelect')
    
    if('borders' in data) {
        for(const border of data.borders) {
            const button = document.createElement('button')
            button.id = border;
            button.textContent = border;
            
            button.onclick = async function () {
                const service = new CountriesService()
                let data = await service.getCountryPerCode(`${button.id}`)
                if(data !== null) {
                    data = data[0]
                    fillComponents(data)
                    select.value = data.name.common
                }
                
            }
            borderCountriesList.appendChild(button)
        }
    }
    else {
        document.querySelector('.border-countries').style.display = 'none'
    }   
}

export async function fillComponents(data) {
    document.getElementById('countryInfo').style.display = 'flex'
    document.querySelector('.border-countries').style.display = 'flex'
    
    await fillCountry(data)
    await fillCapital(data)
    await fillArea(data)
    await fillPopulation(data)
    await fillFlag(data)
    await fillLanguages(data)
    await fillCurrencies(data)
    await fillContinents(data)
    await fillBorderCountries(data)
}

export async function fillSelect(selectCountries, countriesNames) {
    for(const name of countriesNames) {
        const option = document.createElement('option')
        option.textContent = name;
        selectCountries.appendChild(option);
    }
}
