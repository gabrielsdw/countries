// Gabriel Oliveira Santos
import { CountriesService } from "./service.js";
import { fillSelect, fillComponents } from './utils.js'

(async () => {
    const service = new CountriesService()
    const countriesNames = await service.getCountries()
    
    const selectCountries = document.getElementById('countrySelect')
    selectCountries.addEventListener('change', async () => {
        let data = await service.getCountry(selectCountries.value)
        if(data !== null) {
            data = data[0]    
            fillComponents(data)
        }
    })
    fillSelect(selectCountries, countriesNames)
})()