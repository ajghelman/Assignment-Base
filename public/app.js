const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const zips = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => zips.push(...data))

function findMatches(wordToMatch, zips){
    return zips.filter(loc => {
        const regex = new RegExp(wordToMatch, 'gi');
        return loc.zip.match(regex)
    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, zips);
    const html = matchArray.map(loc => {
        const regex = new RegExp(this.value, 'gi');
        const zipNum = loc.zip.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
            <li>
                <span class="name">${loc.name}</span>
                <span class="name">${loc.category}</span>
                <span class="zip">${loc.address_line_1}</span>
                <span class="name">${loc.city}</span>
                <span class="name">${zipNum}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);