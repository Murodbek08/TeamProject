document.addEventListener("DOMContentLoaded", function () {
  // Get all products
  const products = document.querySelectorAll(".product");

  // Calculate initial totals
  updateCartTotals();

  // Add event listeners to each product
  products.forEach((product) => {
    const minusBtn = product.querySelector(".minus-btn");
    const plusBtn = product.querySelector(".plus-btn");
    const deleteBtn = product.querySelector(".delete-btn");
    const quantityEl = product.querySelector(".quantity");

    // Plus button - increase quantity
    plusBtn.addEventListener("click", function () {
      let quantity = parseInt(quantityEl.textContent);
      quantity += 1;
      quantityEl.textContent = quantity;

      // Update product price
      updateProductPrice(product);

      // Update cart totals
      updateCartTotals();
    });

    // Minus button - decrease quantity
    minusBtn.addEventListener("click", function () {
      let quantity = parseInt(quantityEl.textContent);
      if (quantity > 1) {
        quantity -= 1;
        quantityEl.textContent = quantity;

        // Update product price
        updateProductPrice(product);

        // Update cart totals
        updateCartTotals();
      }
    });

    // Delete button - remove product
    deleteBtn.addEventListener("click", function () {
      product.remove();

      // Check if cart is empty
      if (document.querySelectorAll(".product").length === 0) {
        const productsContainer = document.querySelector(".products");
        productsContainer.innerHTML =
          '<div class="empty-cart">Your cart is empty</div>';
      }

      // Update cart totals
      updateCartTotals();
    });
  });

  // Function to update product price based on quantity
  function updateProductPrice(product) {
    const basePrice = parseFloat(product.getAttribute("data-price"));
    const quantity = parseInt(product.querySelector(".quantity").textContent);
    const priceEl = product.querySelector(".price");

    const totalPrice = basePrice * quantity;
    priceEl.textContent = "$" + totalPrice;
  }

  // Function to update cart totals
  function updateCartTotals() {
    let subtotal = 0;

    // Calculate subtotal from all products
    document.querySelectorAll(".product").forEach((product) => {
      const priceText = product.querySelector(".price").textContent;
      const price = parseFloat(priceText.replace("$", ""));
      subtotal += price;
    });

    // Update subtotal
    document.getElementById("subtotal").textContent = "$" + subtotal;

    // Calculate tax (approximately 2%)
    const tax = Math.round(subtotal * 0.02);
    document.getElementById("tax").textContent = "$" + tax;

    // Calculate shipping
    const shipping = subtotal > 2000 ? 0 : 29;
    document.getElementById("shipping").textContent = "$" + shipping;

    // Calculate total
    const total = subtotal + tax + shipping;
    document.getElementById("total").textContent = "$" + total;
  }

  // Apply button functionality
  const applyBtn = document.querySelector(".apply-btn");
  applyBtn.addEventListener("click", function () {
    // alert("Promo code applied!");
  });

  // Checkout button functionality
  const checkoutBtn = document.getElementById("checkout-btn");
  checkoutBtn.addEventListener("click", function () {
    if (document.querySelectorAll(".product").length === 0) {
      alert("Your cart is empty!");
    } else {
      // alert("Proceeding to checkout!");
    }
  });
});
