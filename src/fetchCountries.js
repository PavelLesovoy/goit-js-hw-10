export function fetchCountries(name) {
    const searchCountry = new URLSearchParams({
        fields: 'name,capital,population,flags,languages',
    });

    const url = `https://restcountries.com/v3.1/name/${name}?${searchCountry}`;

    return fetch(url)
    .then(res => {
        if(!res.ok){
            throw new Error(res.status);
        }
        return res.json();
    })
}


