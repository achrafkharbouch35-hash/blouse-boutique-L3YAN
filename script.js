/* =========================================================
   MEDWEAR — JAVASCRIPT
========================================================= */


/* =========================================================
   CONFIGURATION
   MODIFIE TON NUMÉRO WHATSAPP ICI
========================================================= */

const WHATSAPP_NUMBER = "212600000000";

const SHOP_NAME = "MedWear";


/* =========================================================
   PRODUITS
   Tu peux facilement modifier les produits ici.
========================================================= */

const products = [

  {
    id: 1,
    name: "Pyjama Médical Essential",
    category: "pyjama",
    categoryName: "PYJAMA MÉDICAL",
    price: 249,
    badge: "BEST SELLER",
    description: "Une tenue confortable et élégante pour accompagner vos journées professionnelles.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=85",
    colors: [
      { name: "Bleu", value: "#5a8fb4" },
      { name: "Blanc", value: "#f4f4f1" },
      { name: "Vert", value: "#77a99b" }
    ]
  },

  {
    id: 2,
    name: "Blouse Blanche Premium",
    category: "blouse",
    categoryName: "BLOUSE",
    price: 199,
    badge: "PREMIUM",
    description: "Une blouse blanche classique avec une coupe moderne et professionnelle.",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=85",
    colors: [
      { name: "Blanc", value: "#f4f4f1" }
    ]
  },

  {
    id: 3,
    name: "Pyjama Médical Comfort",
    category: "pyjama",
    categoryName: "PYJAMA MÉDICAL",
    price: 279,
    badge: "NOUVEAU",
    description: "Coupe confortable, idéale pour les longues journées de travail.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=85",
    colors: [
      { name: "Bleu ciel", value: "#8ab8cc" },
      { name: "Vert", value: "#79aa9d" },
      { name: "Rose", value: "#d99aa5" }
    ]
  },

  {
    id: 4,
    name: "Combinaison Pro",
    category: "combinaison",
    categoryName: "COMBINAISON",
    price: 329,
    badge: "PRO",
    description: "Une combinaison pratique et résistante pour les environnements professionnels.",
    image: "https://images.unsplash.com/photo-1584467735871-4f23b0c7b6b0?auto=format&fit=crop&w=800&q=85",
    colors: [
      { name: "Bleu marine", value: "#284b63" },
      { name: "Gris", value: "#858b8c" }
    ]
  },

  {
    id: 5,
    name: "Polaire Medical Soft",
    category: "polaire",
    categoryName: "POLAIRE",
    price: 299,
    badge: "CONFORT",
    description: "Une polaire douce et chaude pour les journées fraîches.",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=800&q=85",
    colors: [
      { name: "Bleu", value: "#436c7a" },
      { name: "Gris", value: "#80898b" }
    ]
  },

  {
    id: 6,
    name: "Ensemble Restaurant Pro",
    category: "restaurant",
    categoryName: "RESTAURATION",
    price: 289,
    badge: "PRO",
    description: "Ensemble professionnel élégant pour restaurants, cafés et hôtels.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=85",
    colors: [
      { name: "Noir", value: "#222222" },
      { name: "Blanc", value: "#f4f4f1" }
    ]
  },

  {
    id: 7,
    name: "Blouse Medical Comfort",
    category: "blouse",
    categoryName: "BLOUSE",
    price: 219,
    badge: "",
    description: "Une blouse légère et confortable avec une silhouette professionnelle.",
    image: "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=800&q=85",
    colors: [
      { name: "Blanc", value: "#f5f5f2" }
    ]
  },

  {
    id: 8,
    name: "Polaire Warm Pro",
    category: "polaire",
    categoryName: "POLAIRE",
    price: 349,
    badge: "NOUVEAU",
    description: "Polaire professionnelle chaude et pratique pour les environnements froids.",
    image: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=800&q=85",
    colors: [
      { name: "Bleu marine", value: "#284b63" },
      { name: "Gris", value: "#858b8c" }
    ]
  }

];


/* =========================================================
   STATE
========================================================= */

let cart = [];

let currentProduct = null;

let selectedSize = "M";

let selectedColor = "";

let currentQuantity = 1;


/* =========================================================
   ELEMENTS
========================================================= */

const productsGrid = document.getElementById("productsGrid");

const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const cartCount = document.getElementById("cartCount");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const cartSidebar = document.getElementById("cartSidebar");

const cartButton = document.getElementById("cartButton");

const closeCart = document.getElementById("closeCart");

const overlay = document.getElementById("overlay");

const productModal = document.getElementById("productModal");

const closeModal = document.getElementById("closeModal");

const toast = document.getElementById("toast");

const menuButton = document.getElementById("menuButton");

const mobileMenu = document.getElementById("mobileMenu");


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

  return `${price.toLocaleString("fr-FR")} DH`;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(list = products) {

  productsGrid.innerHTML = "";

  if (list.length === 0) {

    emptyState.style.display = "block";

    return;

  }

  emptyState.style.display = "none";


  list.forEach((product, index) => {

    const card = document.createElement("article");

    card.className = "product-card";

    card.style.animationDelay = `${index * 60}ms`;


    card.innerHTML = `

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        ${
          product.badge
          ?
          `<span class="product-badge">${product.badge}</span>`
          :
          ""
        }

        <button
          class="product-quick"
          data-product="${product.id}"
          aria-label="Voir le produit"
        >
          <i class="fa-solid fa-eye"></i>
        </button>

      </div>


      <div class="product-info">

        <span class="product-category">
          ${product.categoryName}
        </span>

        <h3 class="product-title">
          ${product.name}
        </h3>

        <p class="product-description">
          ${product.description}
        </p>

        <div class="product-bottom">

          <strong class="product-price">
            ${formatPrice(product.price)}
          </strong>

          <button
            class="product-order"
            data-product="${product.id}"
          >
            Choisir
          </button>

        </div>

      </div>

    `;


    productsGrid.appendChild(card);

  });

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function filterProducts() {

  const activeFilter =
    document.querySelector(".filter.active").dataset.filter;

  const search =
    searchInput.value.toLowerCase().trim();


  const filtered = products.filter(product => {

    const matchesCategory =
      activeFilter === "all" ||
      product.category === activeFilter;


    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.categoryName.toLowerCase().includes(search);


    return matchesCategory && matchesSearch;

  });


  renderProducts(filtered);

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

document.querySelectorAll(".filter").forEach(button => {

  button.addEventListener("click", () => {

    document
      .querySelectorAll(".filter")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    filterProducts();

  });

});


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener("input", filterProducts);


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProduct(productId) {

  const product =
    products.find(p => p.id === Number(productId));


  if (!product) return;


  currentProduct = product;

  selectedSize = "M";

  selectedColor =
    product.colors[0]?.name || "";

  currentQuantity = 1;


  document.getElementById("modalImage").src =
    product.image;

  document.getElementById("modalImage").alt =
    product.name;

  document.getElementById("modalCategory").textContent =
    product.categoryName;

  document.getElementById("modalTitle").textContent =
    product.name;

  document.getElementById("modalPrice").textContent =
    formatPrice(product.price);

  document.getElementById("modalDescription").textContent =
    product.description;

  document.getElementById("modalQuantity").textContent =
    currentQuantity;


  /* SIZE */

  document
    .querySelectorAll(".size-options button")
    .forEach(button => {

      button.classList.toggle(
        "selected",
        button.dataset.size === selectedSize
      );

    });


  /* COLORS */

  const colorOptions =
    document.getElementById("colorOptions");

  colorOptions.innerHTML = "";


  product.colors.forEach((color, index) => {

    const button =
      document.createElement("button");

    button.className = "color-option";

    button.title = color.name;

    button.dataset.color = color.name;

    button.style.background = color.value;

    if (index === 0) {

      button.classList.add("selected");

    }

    colorOptions.appendChild(button);

  });


  productModal.classList.add("active");

  document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeProductModal() {

  productModal.classList.remove("active");

  document.body.style.overflow = "";

}

closeModal.addEventListener("click", closeProductModal);


productModal.addEventListener("click", event => {

  if (event.target === productModal) {

    closeProductModal();

  }

});


/* =========================================================
   PRODUCT CLICK
========================================================= */

productsGrid.addEventListener("click", event => {

  const button =
    event.target.closest("[data-product]");

  if (!button) return;

  openProduct(button.dataset.product);

});


/* =========================================================
   SIZE
========================================================= */

document
  .getElementById("sizeOptions")
  .addEventListener("click", event => {

    const button =
      event.target.closest("[data-size]");

    if (!button) return;

    selectedSize = button.dataset.size;


    document
      .querySelectorAll(".size-options button")
      .forEach(btn => btn.classList.remove("selected"));


    button.classList.add("selected");

  });


/* =========================================================
   COLOR
========================================================= */

document
  .getElementById("colorOptions")
  .addEventListener("click", event => {

    const button =
      event.target.closest("[data-color]");

    if (!button) return;

    selectedColor =
      button.dataset.color;


    document
      .querySelectorAll(".color-option")
      .forEach(btn => btn.classList.remove("selected"));


    button.classList.add("selected");

  });


/* =========================================================
   QUANTITY
========================================================= */

document
  .getElementById("minusQuantity")
  .addEventListener("click", () => {

    if (currentQuantity > 1) {

      currentQuantity--;

      document.getElementById("modalQuantity").textContent =
        currentQuantity;

    }

  });


document
  .getElementById("plusQuantity")
  .addEventListener("click", () => {

    if (currentQuantity < 99) {

      currentQuantity++;

      document.getElementById("modalQuantity").textContent =
        currentQuantity;

    }

  });


/* =========================================================
   ADD TO CART
========================================================= */

document
  .getElementById("addToCart")
  .addEventListener("click", () => {

    if (!currentProduct) return;


    const existing =
      cart.find(item =>
        item.product.id === currentProduct.id &&
        item.size === selectedSize &&
        item.color === selectedColor
      );


    if (existing) {

      existing.quantity += currentQuantity;

    } else {

      cart.push({

        product: currentProduct,

        size: selectedSize,

        color: selectedColor,

        quantity: currentQuantity

      });

    }


    updateCart();

    closeProductModal();

    showToast("Produit ajouté au panier");

  });


/* =========================================================
   UPDATE CART
========================================================= */

function updateCart() {

  const count =
    cart.reduce(
      (total, item) => total + item.quantity,
      0
    );


  cartCount.textContent = count;


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="cart-empty">

        <i class="fa-solid fa-bag-shopping"></i>

        <h3>Votre panier est vide</h3>

        <p>Ajoutez vos produits préférés.</p>

      </div>

    `;

    cartTotal.textContent = "0 DH";

    return;

  }


  let total = 0;


  cartItems.innerHTML = "";


  cart.forEach((item, index) => {

    const itemTotal =
      item.product.price * item.quantity;


    total += itemTotal;


    const element =
      document.createElement("div");

    element.className = "cart-item";


    element.innerHTML = `

      <div class="cart-item-image">

        <img
          src="${item.product.image}"
          alt="${item.product.name}"
        >

      </div>


      <div>

        <h4>${item.product.name}</h4>

        <small>
          Taille : ${item.size}<br>
          Couleur : ${item.color}<br>
          Quantité : ${item.quantity}
        </small>

        <div class="cart-item-price">
          ${formatPrice(itemTotal)}
        </div>

      </div>


      <button
        class="cart-remove"
        data-remove="${index}"
        aria-label="Supprimer"
      >
        <i class="fa-solid fa-trash"></i>
      </button>

    `;


    cartItems.appendChild(element);

  });


  cartTotal.textContent =
    formatPrice(total);

}


/* =========================================================
   REMOVE FROM CART
========================================================= */

cartItems.addEventListener("click", event => {

  const button =
    event.target.closest("[data-remove]");

  if (!button) return;


  const index =
    Number(button.dataset.remove);


  cart.splice(index, 1);

  updateCart();

});


/* =========================================================
   CART OPEN / CLOSE
========================================================= */

function openCart() {

  cartSidebar.classList.add("active");

  overlay.classList.add("active");

  document.body.style.overflow = "hidden";

}


function closeCartPanel() {

  cartSidebar.classList.remove("active");

  overlay.classList.remove("active");

  document.body.style.overflow = "";

}


cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

overlay.addEventListener("click", closeCartPanel);


/* =========================================================
   WHATSAPP
========================================================= */

function openWhatsApp(message) {

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

}


/* =========================================================
   DIRECT PRODUCT WHATSAPP
========================================================= */

document
  .getElementById("modalWhatsapp")
  .addEventListener("click", () => {

    if (!currentProduct) return;


    const message =

`Bonjour ${SHOP_NAME} 👋

Je souhaite commander :

🛍️ Produit : ${currentProduct.name}
📏 Taille : ${selectedSize}
🎨 Couleur : ${selectedColor}
🔢 Quantité : ${currentQuantity}
💰 Prix : ${formatPrice(currentProduct.price * currentQuantity)}

Merci de me confirmer la disponibilité.`;


    openWhatsApp(message);

  });


/* =========================================================
   CART WHATSAPP
========================================================= */

document
  .getElementById("cartWhatsapp")
  .addEventListener("click", () => {

    if (cart.length === 0) {

      showToast("Votre panier est vide");

      return;

    }


    let message =

`Bonjour ${SHOP_NAME} 👋

Je souhaite passer cette commande :

`;


    let total = 0;


    cart.forEach((item, index) => {

      const itemTotal =
        item.product.price * item.quantity;


      total += itemTotal;


      message +=

`${index + 1}. ${item.product.name}
   Taille : ${item.size}
   Couleur : ${item.color}
   Quantité : ${item.quantity}
   Prix : ${formatPrice(itemTotal)}

`;

    });


    message +=

`💰 TOTAL : ${formatPrice(total)}

Merci de me confirmer la disponibilité et les modalités de livraison.`;


    openWhatsApp(message);

  });


/* =========================================================
   HERO WHATSAPP
========================================================= */

document
  .getElementById("heroWhatsapp")
  .addEventListener("click", event => {

    event.preventDefault();


    openWhatsApp(

`Bonjour ${SHOP_NAME} 👋

Je souhaite découvrir vos produits et connaître les modèles disponibles.`

    );

  });


/* =========================================================
   DEVIS WHATSAPP
========================================================= */

document
  .getElementById("quoteWhatsapp")
  .addEventListener("click", event => {

    event.preventDefault();


    openWhatsApp(

`Bonjour ${SHOP_NAME} 👋

Je souhaite demander un devis pour une commande professionnelle en quantité.

Pouvez-vous m'envoyer les informations concernant vos modèles, tailles, couleurs et tarifs ?`

    );

  });


/* =========================================================
   CONTACT WHATSAPP
========================================================= */

function setupWhatsappButton(id, message) {

  const button =
    document.getElementById(id);


  if (!button) return;


  button.addEventListener("click", event => {

    event.preventDefault();

    openWhatsApp(message);

  });

}


setupWhatsappButton(
  "contactWhatsapp",
  `Bonjour ${SHOP_NAME} 👋\n\nJ'aimerais avoir plus d'informations sur vos produits.`
);


setupWhatsappButton(
  "contactOrder",
  `Bonjour ${SHOP_NAME} 👋\n\nJe souhaite passer une commande.`
);


setupWhatsappButton(
  "footerWhatsapp",
  `Bonjour ${SHOP_NAME} 👋\n\nJe souhaite vous contacter concernant vos produits.`
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

  toast.querySelector("span").textContent =
    message;


  toast.classList.add("active");


  clearTimeout(toastTimer);


  toastTimer = setTimeout(() => {

    toast.classList.remove("active");

  }, 2800);

}


/* =========================================================
   MOBILE MENU
========================================================= */

menuButton.addEventListener("click", () => {

  mobileMenu.classList.toggle("open");


  const icon =
    menuButton.querySelector("i");


  if (mobileMenu.classList.contains("open")) {

    icon.classList.remove("fa-bars");

    icon.classList.add("fa-xmark");

  } else {

    icon.classList.remove("fa-xmark");

    icon.classList.add("fa-bars");

  }

});


document
  .querySelectorAll(".mobile-menu a")
  .forEach(link => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("open");

      menuButton
        .querySelector("i")
        .classList.remove("fa-xmark");

      menuButton
        .querySelector("i")
        .classList.add("fa-bars");

    });

  });


/* =========================================================
   CATEGORY CARDS
========================================================= */

document
  .querySelectorAll(".category-card")
  .forEach(card => {

    card.addEventListener("click", () => {

      const category =
        card.dataset.category;


      document
        .querySelectorAll(".filter")
        .forEach(button => {

          button.classList.toggle(
            "active",
            button.dataset.filter === category
          );

        });


      filterProducts();


      document
        .getElementById("products")
        .scrollIntoView({
          behavior: "smooth"
        });

    });

  });


/* =========================================================
   HEADER SCROLL
========================================================= */

const header =
  document.getElementById("header");


window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

});


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal, .reveal-right"
  );


const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: .12
    }

  );


revealElements.forEach(element => {

  observer.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll("main section[id]");

const navLinks =
  document.querySelectorAll(".desktop-menu a");


window.addEventListener("scroll", () => {

  let current = "";


  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 160;


    if (window.scrollY >= sectionTop) {

      current = section.id;

    }

  });


  navLinks.forEach(link => {

    link.classList.remove("active");


    if (
      link.getAttribute("href") === `#${current}`
    ) {

      link.classList.add("active");

    }

  });

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeProductModal();

    closeCartPanel();

  }

});


/* =========================================================
   YEAR
========================================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================================================
   INITIALIZE
========================================================= */

renderProducts();

updateCart();
