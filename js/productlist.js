 
 const urlParams = new URLSearchParams(window.location.search);
 // in the URL grab id and store it's value in id
 const brandname = urlParams.get("brandname");
 console.log(brandname);
 
 document.querySelector("main>h2").textContent = brandname;

 const url = "https://kea-alt-del.dk/t7/api/products?brandname=" + brandname;

 fetch(url)
     .then(function (res) {
         return res.json();
     })
     .then(function (data) {
         handleProductList(data);
     });

 function handleProductList(data) {
     console.log(data);
     data.forEach(showProduct);
 }

 /*
             <img src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp"
                 alt="Sahara Team India Fanwear Round Neck Jersey" />
             <h3>Sahara Team India Fanwear Round Neck Jersey</h3>
             <p class="price"><span>Prev.</span> DKK 1595,-</p>
             <div class="discounted">
                 <p>Now DKK 1560,-</p>
                 <p>-34%</p>
             </div>
             <a href="product.html">Read More</a>
         </article>

 */

 function showProduct(product) {
     console.log(product);
     //soldOut onSale
     // grab the template
     const template = document.querySelector("#smallProductTemplate").content;
     // clone it
     const copy = template.cloneNode(true);
     // change content
     copy.querySelector("article a").setAttribute("href", "product.html?id=" + product.id);
     copy.querySelector(".subtle").textContent = `${product.articletype} | ${product.brandname}`;
     copy.querySelector("h3").textContent = `${product.productdisplayname}`;
     copy.querySelector(".productimage").src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
     copy.querySelector(".price").textContent = `DKK ${product.price},-`;

     if (product.soldout) {
         copy.querySelector("article").classList.add("soldOut");
     }

     if (product.discount) {
         copy.querySelector("article").classList.add("onSale");

         //  <div class="discounted">
         //          <p>Now DKK 1560,-</p>
         //          <p>-34%</p>
         //      </div>

         var discountPrice = Math.round(product.price - ((product.price / 100) * product.discount));

         // <p class="price"><span>Prev.</span> DKK 1595,-</p>
         copy.querySelector(".price").innerHTML = `<span>Prev.</span> DKK ${product.price},-`;
         copy.querySelector(".discounted p").textContent = `Now DKK ${discountPrice},-`;
         copy.querySelector(".discountpercentage").textContent = `-${product.discount}%`;
     }

     // grab parent
     const parent = document.querySelector("main");
     // append
     parent.appendChild(copy);
 }