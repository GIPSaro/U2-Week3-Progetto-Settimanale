const urlEndpoint = "https://striveschool-api.herokuapp.com/api/product/";
const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjAxMDI1NGU4ODAwMTgzZjE4YTQiLCJpYXQiOjE3MTgzNTM3MjgsImV4cCI6MTcxOTU2MzMyOH0.ZiD7oCZQw3OjVILvPXCHqSeXVgqEWy73qe8hp3fAJ8U";

const productId = new URLSearchParams(window.location.search).get("prId");

document.addEventListener("DOMContentLoaded", (e) => {
  if (productId) {
    editPage();
  } else {
    postPage();
  }
});

const form = document.getElementById("main-form");

//Aggiungere o modificare un prodotto con una POST o una PUT

//Funzione per la POST ( aggiungere un nuovo prodotto)

const postPage = () => {
  form.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("product-name");
    const description = document.getElementById("product-description");
    const brand = document.getElementById("product-brand");
    const img = document.getElementById("img-url");
    const price = document.getElementById("product-price");

    const Product = {
      name: name.value,
      description: description.value,
      brand: brand.value,
      imageUrl: img.value,
      price: price.value,
    };

    fetch(urlEndpoint, {
      method: "POST",
      headers: {
        Authorization: authKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Product),
    })
      .then((resp) => {
        window.alert("New item created successfully!");
        form.reset();
      })
      .catch((err) => window.alert(err));
  };
};

const postBtn = document.getElementById("post-btn");
const putBtn = document.getElementById("put-btn");
const removeBtn = document.getElementById("remove-btn");
const resetBtn = document.getElementById("reset-btn");

//Funzione per la PUT (modificare il prodotto esistente)

const editPage = () => {
  postBtn.classList.add("d-none");
  resetBtn.classList.add("d-none");
  putBtn.classList.remove("d-none");
  removeBtn.classList.remove("d-none");
  const h3 = document.getElementById("backoffice-h3");
  h3.innerText = "Edit product details";

  fetch(urlEndpoint + productId, {
    headers: {
      Authorization: authKey,
    },
  })
    .then((resp) => resp.json())
    .then((productObj) => {
      const name = document.getElementById("product-name");
      const description = document.getElementById("product-description");
      const brand = document.getElementById("product-brand");
      const img = document.getElementById("img-url");
      const price = document.getElementById("product-price");

      name.value = productObj.name;
      description.value = productObj.description;
      brand.value = productObj.brand;
      img.value = productObj.imageUrl;
      price.value = productObj.price;
    })
    .catch((err) =>
      window.alert("An error has occurred. Please consult your developer.")
    );
};

putBtn.onclick = () => {
  const name = document.getElementById("product-name");
  const description = document.getElementById("product-description");
  const brand = document.getElementById("product-brand");
  const img = document.getElementById("img-url");
  const price = document.getElementById("product-price");

  const modProduct = {
    name: name.value,
    description: description.value,
    brand: brand.value,
    img: img.value,
    price: price.value,
  };

  fetch(urlEndpoint + productId, {
    method: "PUT",
    headers: {
      Authorization: authKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modProduct),
  })
    .then((resp) => {
      window.alert("Item successfully modified!");
      window.location.assign("./index.html");
    })
    .catch((err) =>
      window.alert("An error has occurred. Please consult your developer.")
    );
};
// Al click del bottone REMOVE ITEM eliminare il prodotto con una DELETE

removeBtn.onclick = () => {
  if (
    window.confirm("Are you sure to proceed? This operation is irreversible.")
  ) {
    fetch(urlEndpoint + productId, {
      method: "DELETE",
      headers: {
        Authorization: authKey,
      },
    })
      .then((resp) => {
        window.alert("Item deleted.");
        window.location.assign("./backoffice.html");
      })
      .catch((err) =>
        window.alert("An error has occurred. Please consult your developer.")
      );
  }
};

resetBtn.onclick = () => {
  if (window.confirm("Are you sure to proceed?")) {
    form.reset();
  }
};
