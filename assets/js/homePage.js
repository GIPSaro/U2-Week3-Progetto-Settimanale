const urlEndpoint = "https://striveschool-api.herokuapp.com/api/product";
const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjAxMDI1NGU4ODAwMTgzZjE4YTQiLCJpYXQiOjE3MTgzNTM3MjgsImV4cCI6MTcxOTU2MzMyOH0.ZiD7oCZQw3OjVILvPXCHqSeXVgqEWy73qe8hp3fAJ8U";

window.onload = () => {
  fetch(urlEndpoint, {
    headers: {
      Authorization: authKey,
    },
  })
    .then((resp) => resp.json())
    .then((productsArr) => {
      productsArr.forEach((productObj) => {
        const imageUrl = productObj.imageUrl;
        const name = productObj.name;
        const description = productObj.description;
        const price = productObj.price;
        const productId = productObj._id;

        cardCreation(imageUrl, name, description, price, productId);
        const spinner = document.getElementById("spinner");
        spinner.classList.add("d-none");
      });
    });
};

const cardCreation = (imageUrl, name, description, price, productId) => {
  const row = document.getElementById("main-row");
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
  const card = document.createElement("div");
  card.className = "card h-100 shadow";
  const cardImg = document.createElement("img");
  cardImg.className = "card-img-top";
  cardImg.src = imageUrl;
  cardImg.alt = name + "image";
  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column";
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerText = name;
  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerText = description;
  const cardFooter = document.createElement("div");
  cardFooter.className =
    "mt-auto d-flex justify-content-between align-items-center flex-sm-column flex-lg-row";
  const cardPrice = document.createElement("span");
  cardPrice.className = "fw-bold";
  cardPrice.innerText = price + "€";
  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";
  btnGroup.setAttribute("role", "group");
  const detailsBtn = document.createElement("button");
  detailsBtn.className = "btn btn-primary py-1 px-2";
  detailsBtn.innerText = "Show more";
  detailsBtn.addEventListener("click", () => {
    window.location.assign("./details.html?prId=" + productId);
  });
  const modifyBtn = document.createElement("button");
  modifyBtn.className = "btn btn-success py-1 px-2 modify";
  modifyBtn.innerText = "Edit Item";
  modifyBtn.addEventListener("click", () => {
    window.location.assign("./backoffice.html?prId=" + productId);
  });

  btnGroup.appendChild(detailsBtn);
  btnGroup.appendChild(modifyBtn);
  cardFooter.appendChild(cardPrice);
  cardFooter.appendChild(btnGroup);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardFooter);
  card.appendChild(cardImg);
  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);
};
