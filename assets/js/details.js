const urlEndpoint = "https://striveschool-api.herokuapp.com/api/product/";
const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjAxMDI1NGU4ODAwMTgzZjE4YTQiLCJpYXQiOjE3MTgzNTM3MjgsImV4cCI6MTcxOTU2MzMyOH0.ZiD7oCZQw3OjVILvPXCHqSeXVgqEWy73qe8hp3fAJ8U";
const productId = new URLSearchParams(window.location.search).get("prId");

window.onload = () => {
  const productH1 = document.getElementById("product-h1");
  const productBrand = document.getElementById("brand");
  const productImg = document.getElementById("product-img");
  productImg.className = "w-100 rounded";
  const productDescript = document.getElementById("description");
  const productPrice = document.getElementById("price");

  fetch(urlEndpoint + productId, {
    headers: {
      Authorization: authKey,
    },
  })
    .then((resp) => resp.json())
    .then((productObj) => {
      productH1.innerText = productObj.name;
      productBrand.innerText = `Produced by: ${productObj.brand}`;
      productImg.setAttribute("src", productObj.imageUrl);
      productImg.setAttribute("alt", `${productObj.name} image`);
      productDescript.innerText = productObj.description;
      productPrice.innerText = `Price: ${productObj.price} €`;
    })
    .catch((err) =>
      alert("An error has occurred. Please contact the website manager.")
    );
};
