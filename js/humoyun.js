document.addEventListener("DOMContentLoaded", function () {
  let filteredProducts = [...products];
  let currentPage = 1;
  const productsPerPage = 9;
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Initialize the page
  initializePage();

  function initializePage() {
    updateProductCount();
    populateBrandFilter();
    renderProducts();
    renderPagination();
    setupEventListeners();
  }

  function updateProductCount() {
    document.getElementById("product-count").textContent =
      filteredProducts.length;
  }

  function populateBrandFilter() {
    const brandOptions = document.getElementById("brand-options");
    const brands = {};

    // Count products by brand
    products.forEach((product) => {
      if (brands[product.brand]) {
        brands[product.brand]++;
      } else {
        brands[product.brand] = 1;
      }
    });

    // Create brand checkboxes
    Object.keys(brands).forEach((brand) => {
      const option = document.createElement("div");
      option.className = "option";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `brand-${brand}`;
      checkbox.value = brand;
      checkbox.addEventListener("change", handleBrandFilter);

      const label = document.createElement("label");
      label.htmlFor = `brand-${brand}`;
      label.innerHTML = `${brand} <span class="count">${brands[brand]}</span>`;

      option.appendChild(checkbox);
      option.appendChild(label);
      brandOptions.appendChild(option);
    });
  }

  function renderProducts() {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = "";

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    if (paginatedProducts.length === 0) {
      productGrid.innerHTML =
        '<div class="no-products">No products found</div>';
      return;
    }

    paginatedProducts.forEach((product) => {
      const isFavorite = favorites.includes(product.id);

      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
        <button class="favorite-btn" data-id="${product.id}">
          <i class="fa${isFavorite ? "s" : "r"} fa-heart"></i>
        </button>
        <div class="product-image">
          <img src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="product-name">${product.name} ${product.storage} ${
        product.color
      } (${product.model})</div>
        <div class="product-price">$${product.price}</div>
        <button class="buy-btn">Buy Now</button>
      `;

      productGrid.appendChild(productCard);
    });

    // Add event listeners to favorite buttons
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.addEventListener("click", toggleFavorite);
    });

    // Add event listeners to buy buttons
    document.querySelectorAll(".buy-btn").forEach((btn) => {
      btn.addEventListener("click", handleBuy);
    });
  }

  function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Previous button
    const prevBtn = document.createElement("a");
    prevBtn.href = "#";
    prevBtn.className = `page-prev ${currentPage === 1 ? "disabled" : ""}`;
    prevBtn.innerHTML = "&lt;";
    if (currentPage > 1) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage--;
        renderProducts();
        renderPagination();
      });
    }
    pagination.appendChild(prevBtn);

    // First page
    if (currentPage > 2) {
      const firstPage = document.createElement("a");
      firstPage.href = "#";
      firstPage.className = "page-item";
      firstPage.textContent = "1";
      firstPage.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = 1;
        renderProducts();
        renderPagination();
      });
      pagination.appendChild(firstPage);
    }

    // Current page and adjacent pages
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      const pageBtn = document.createElement("a");
      pageBtn.href = "#";
      pageBtn.className = `page-item ${i === currentPage ? "active" : ""}`;
      pageBtn.textContent = i;

      if (i !== currentPage) {
        pageBtn.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = i;
          renderProducts();
          renderPagination();
        });
      }

      pagination.appendChild(pageBtn);
    }

    // Ellipsis and last pages
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        const ellipsis = document.createElement("span");
        ellipsis.className = "page-dots";
        ellipsis.textContent = "...";
        pagination.appendChild(ellipsis);
      }

      const lastPage = document.createElement("a");
      lastPage.href = "#";
      lastPage.className = "page-item";
      lastPage.textContent = totalPages;
      lastPage.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = totalPages;
        renderProducts();
        renderPagination();
      });
      pagination.appendChild(lastPage);
    }

    // Next button
    const nextBtn = document.createElement("a");
    nextBtn.href = "#";
    nextBtn.className = `page-next ${
      currentPage === totalPages ? "disabled" : ""
    }`;
    nextBtn.innerHTML = "&gt;";
    if (currentPage < totalPages) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage++;
        renderProducts();
        renderPagination();
      });
    }
    pagination.appendChild(nextBtn);
  }

  function setupEventListeners() {
    // Toggle filter content when header is clicked
    const filterHeaders = document.querySelectorAll(".filter-header");

    filterHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const content = this.nextElementSibling;
        const icon = this.querySelector(".toggle-icon");

        // Toggle display
        if (content.style.display === "none" || content.style.display === "") {
          content.style.display = "block";
          icon.textContent = "▼";
        } else {
          content.style.display = "none";
          icon.textContent = "▶";
        }
      });
    });

    // Sort dropdown functionality
    const sortSelect = document.getElementById("sort-select");

    sortSelect.addEventListener("change", function () {
      const sortValue = this.value;

      switch (sortValue) {
        case "price-low":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "name":
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "rating":
        default:
          // Default sort (by id)
          filteredProducts.sort((a, b) => a.id - b.id);
          break;
      }

      currentPage = 1;
      renderProducts();
      renderPagination();
    });

    // // Search functionality
    // const searchInput = document.querySelector(".search-box input");

    // searchInput.addEventListener("input", function () {
    //   const searchTerm = this.value.toLowerCase();
    //   const options = document.querySelectorAll(".option");

    //   options.forEach((option) => {
    //     const label = option.querySelector("label").textContent.toLowerCase();
    //     if (label.includes(searchTerm)) {
    //       option.style.display = "flex";
    //     } else {
    //       option.style.display = "none";
    //     }
    //   });
    // });
  }

  function handleBrandFilter() {
    const checkedBrands = Array.from(
      document.querySelectorAll("#brand-options input:checked")
    ).map((input) => input.value);

    if (checkedBrands.length === 0) {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) =>
        checkedBrands.includes(product.brand)
      );
    }

    currentPage = 1;
    updateProductCount();
    renderProducts();
    renderPagination();
  }

  function toggleFavorite(e) {
    const productId = Number(e.currentTarget.dataset.id);
    const icon = e.currentTarget.querySelector("i");

    if (favorites.includes(productId)) {
      // Remove from favorites
      favorites = favorites.filter((id) => id !== productId);
      icon.classList.remove("fas");
      icon.classList.add("far");
    } else {
      // Add to favorites
      favorites.push(productId);
      icon.classList.remove("far");
      icon.classList.add("fas");
    }

    // Save to localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function handleBuy(e) {
    const productCard = e.currentTarget.closest(".product-card");
    const productName = productCard.querySelector(".product-name").textContent;

    alert(`You are buying: ${productName}`);
  }
});
