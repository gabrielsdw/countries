export class CountriesService {
    constructor() {
        this.baseUrl = 'https://restcountries.com/v3.1'
    }
    
    async getCountries() {
        const response = await fetch(`${this.baseUrl}/all`)
        const countries = await response.json()
        
        const names = []
        try {
            for(const countrie of countries) {
                names.push(countrie.name.common)
            }
            return names.sort()
        }
        catch(error) {
            return []
        }
    }

    async getCountry(name) {
        const response = await fetch(`${this.baseUrl}/name/${name}?fullText=true`)
        const country = await response.json()
        return country || null
    }

    async getCountryPerCode(code) {
        const response = await fetch(`${this.baseUrl}/alpha/${code}`)
        const countries = await response.json()
        return countries || null
    }
}
