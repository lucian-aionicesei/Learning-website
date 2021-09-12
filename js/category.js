// create navigation
// <li><a href="#letter_a">A</a></li>
const letters = "abcdefghijklmnopqrstuvwxyz"

const letterArray = letters.split("")
console.log(letterArray);
letterArray.forEach(handleLetter);



function handleLetter(letter) {
    createNavLink(letter);
    // create section
    createBrandSection(letter);

}

function createBrandSection(letter) {
    // <section class="letterGroup" id="letter_a">
    //             <h2>A</h2>
    //             <ol></ol>
    //         </section>

    const template = document.querySelector("#sectionTemplate").content;
    const clone = template.cloneNode(true);
    clone.querySelector("h2").textContent = letter;
    // clone.querySelector("section").id = `#letter_${letter}`;
    document.querySelector(".brandList").appendChild(clone);
}

function createNavLink(letter) {
    // create nav-link
    const temp = document.querySelector("#linkTemplate").content;
    const copy = temp.cloneNode(true);
    copy.querySelector("a").textContent = letter;
    copy.querySelector("a").href = `#letter_${letter}`
    document.querySelector(".letterLinks ol").appendChild(copy);
}

//fetch data

const url = "https://kea-alt-del.dk/t7/api/brands";

fetch(url)
    .then(res => res.json())
    .then(data => gotData(data));

function gotData(data) {
    data.forEach(showBrand);
}

function showBrand(brand) {
    // console.log(brand.brandname);
    const template = document.querySelector("#linkTemplate").content;
    const copy = template.cloneNode(true);
    copy.querySelector("a").textContent = brand.brandname;
    // copy.querySelector("a").setAttribute("href", "productlist.html?brandname=" + brand.brandname);
    copy.querySelector("a").href = "productlist.html?brandname=" + brand.brandname;
    const topParent = document.querySelector("#letter_a");
    const elemParent = topParent.querySelector("ol");

    elemParent.appendChild(copy);
}

//loop through

//grab a template clone change grab append