document.addEventListener("DOMContentLoaded", () => {
  const productDisplay = document.getElementById("productDisplay");
  let allProducts = [];

  async function loadProducts() {
    productDisplay.innerHTML = `<div class="loading">Indlæser produkter...</div>`;
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      allProducts = data.products;
      showCategoryProducts();
    } catch (err) {
      console.error("Fejl ved hentning af produkter:", err);
      productDisplay.innerHTML = `<p>Kunne ikke hente produkter.</p>`;
    }
  }

  function getCurrentCategory() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("foodstuff")) return "groceries";
    if (path.includes("indretning")) return "home-decoration";
    if (path.includes("furniture")) return "furniture";
    if (path.includes("dufte") || path.includes("fragrance")) return "fragrances";
    return "homepage";
  }

  function showCategoryProducts() {
    const category = getCurrentCategory();
    let categoryProducts = [];

    switch (category) {
      case "fragrances":
        categoryProducts = allProducts.filter(p => p.category.toLowerCase() === "fragrances").slice(0, 3);
        break;
      case "home-decoration":
        categoryProducts = allProducts.filter(p => p.category.toLowerCase() === "home-decoration").slice(0, 3);
        break;
      case "furniture":
        categoryProducts = allProducts.filter(p => p.category.toLowerCase() === "furniture").slice(0, 3);
        break;
      case "groceries":
        categoryProducts = allProducts.filter(p => p.category.toLowerCase() === "groceries").slice(0, 3);
        break;
      case "homepage":
        categoryProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
        break;
      default:
        productDisplay.innerHTML = `<p style="text-align:center;">Denne side viser ikke produkter.</p>`;
        return;
    }

    renderProducts(categoryProducts);
  }

  function renderProducts(products) {
    productDisplay.innerHTML = "";
    const row = document.createElement("div");
    row.className = "product-row";

    products.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.thumbnail}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p class="price">$${p.price}</p>
      `;

      // Buy Now button
      const buyButton = document.createElement("button");
      buyButton.textContent = "Buy Now";
      buyButton.className = "buy-now";
      buyButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent opening product details
        if (typeof cart !== "undefined") {
          cart.addItem(p);
          alert(`Added "${p.title}" to your cart!`);
        } else {
          console.error("Cart is not initialized.");
        }
      });

      card.appendChild(buyButton);

      // Click card to show details
      card.addEventListener("click", () => showProductDetails(p.id));

      row.appendChild(card);
    });

    productDisplay.appendChild(row);
  }

  function showProductDetails(id) {
    const product = allProducts.find((p) => p.id === id);
    if (!product) return;

    productDisplay.innerHTML = `
      <div class="product-detail">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Kategori:</strong> ${product.category}</p>
        <p>${product.description}</p>
        <p><strong>Pris:</strong> $${product.price}</p>
        <p><strong>Rating:</strong> ${product.rating}</p>
        <button id="backButton">Tilbage</button>
      </div>
    `;

    document.getElementById("backButton").addEventListener("click", showCategoryProducts);
  }

  loadProducts();
});

