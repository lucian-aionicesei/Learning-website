const urlParams = new URLSearchParams(window.location.search);
// in the URL grab id and store it's value in id
const id = urlParams.get("id");

const url = "https://kea-alt-del.dk/t7/api/products/" + id;

// fetch the data

fetch(url)
    .then(res => res.json())
    .then(data => showProduct(data));

// populate the page

function showProduct(product) {
    console.log(product);
    document.querySelector(".breadcrumbs .brand").textContent = product.brandname;
    document.querySelector(".breadcrumbs .productname").textContent = product.productdisplayname;
    document.querySelector(".purchaseBox h3").textContent = product.productdisplayname;
    document.querySelector(".purchaseBox p").textContent = ` ${product.brandname} | ${product.articletype}`;

    document.querySelector("img.productimage").src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
    document.querySelector("img.productimage").alt = product.productdisplayname;

}