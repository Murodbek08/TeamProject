const headerSection = document.querySelector("header");
const footerSection = document.querySelector("footer");

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger label input");
  const navMenu = document.querySelector(".nav-menu-and-search");
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu");
  });
});
function header() {
  return `
    <div class="container">
        <nav>
          <div class="nav-logo">
            <a href="../index.html">
              <img src="../images/header/nav-logo.svg" alt="Nav logo icon ?" />
            </a>
            <div class="hamburger">
              <label for="check" class="menuButton">
                <input id="check" type="checkbox" />
                <span class="top"></span>
                <span class="mid"></span>
                <span class="bot"></span>
              </label>
            </div>
          </div>
          <div class="nav-menu-and-search">
            <div class="search-input">
              <input type="search" placeholder="Search..." />
              <img src="../images/header/lupa-icon.svg" alt="Lupa icon ?" />
            </div>
            <ul>
              <li><a href="../index.html">Home</a></li>
              <li><a href="../pages/ProductsPage.html">Products</a></li>
              <li><a href="../pages/ProductDetailsPage.html">Product Details</a></li>
              <li><a href="../pages/Step.html">Step</a></li>
            </ul>
            <div class="nav-icons">
              <div class="nav-like">
                <span class="like-count"></span>
               <img src="../images/header/like.svg" alt="Like icon ?" />
              </div>
              <div class="nav-korzinka">
                <span class="korzinka-count"></span>
                  <a href="../pages/ShoppingCart.html"><img src="../images/header/korzinka.svg" alt="Person icon ?" /></a>
              </div>
              <div class="nav-person">
                <span class="person-count"></span>
                <img src="../images/header/person-icon.svg" alt="Person icon ?" />
              </div>
            </div>
          </div>
      </nav>
  </div>
  `;
}
headerSection.innerHTML += header();
function footer() {
  return `
   <div class="container">
        <div class="footer-contents">
          <div class="footer-logo">
            <img src="../images/footer/footer-logo.svg" alt="Logo ?" />
            <p>
              We are a residential interior design firm located in Portland. Our boutique-studio
              offers more than
            </p>
          </div>
          <div class="footer-contents-menus">
            <div class="footer-servis">
              <h3>Services</h3>
              <ul>
                <li><a href="#">Bonus program</a></li>
                <li><a href="#">Gift cards</a></li>
                <li><a href="#">Credit and payment</a></li>
                <li><a href="#">Service contracts</a></li>
                <li><a href="#">Non-cash account</a></li>
                <li><a href="#">Payment</a></li>
              </ul>
            </div>
            <div class="footer-asisitans">
              <h3>Assistance to the buyer</h3>
              <ul>
                <li><a href="#">Find an order</a></li>
                <li><a href="#">Terms of delivery</a></li>
                <li><a href="#">Exchange and return of goods</a></li>
                <li><a href="#">Guarantee</a></li>
                <li><a href="#">Frequently asked questions</a></li>
                <li><a href="#">Terms of use of the site</a></li>
              </ul>
            </div>
          </div>
        </div>
    <div>
      <img src="../images/footer/social-icons.svg" alt="Social icons ?" />
    </div>
  </div>
  `;
}
footerSection.innerHTML += footer();

// card

function renderProducts(products) {
  const container = document.querySelector("#product-container");
  container.innerHTML = "";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 285ce5323ed91439c5a44f7b162f8da551953f35
=======

>>>>>>> 285ce5323ed91439c5a44f7b162f8da551953f35
=======

>>>>>>> 250c1502bc7f334125326260810e07a8796d71e8
  products.slice(0, 8).forEach((product) => {
    const productCard = `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button>Buy Now</button>
      </div>
    `;
    container.innerHTML += productCard;
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
renderProducts(products);

=======
=======
>>>>>>> 285ce5323ed91439c5a44f7b162f8da551953f35
=======
>>>>>>> 250c1502bc7f334125326260810e07a8796d71e8

renderProducts(products);



<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 285ce5323ed91439c5a44f7b162f8da551953f35
=======
>>>>>>> 285ce5323ed91439c5a44f7b162f8da551953f35
=======
>>>>>>> 250c1502bc7f334125326260810e07a8796d71e8
// 4tali kard
const productList = document.getElementById("product-list");

productData.slice(0, 4).forEach((el) => {
  const card = document.createElement("div");
  card.className = "card" + (el.title === "MacBook Pro" ? " dark" : "");

  card.innerHTML = `
    <img src="${el.image}" alt="${el.title}">
    <h3>${el.title}</h3>
    <p>${el.description}</p>
    <button>${el.buttonText}</button>
  `;

  productList.appendChild(card);
});
