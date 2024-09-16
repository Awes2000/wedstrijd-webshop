document.addEventListener("DOMContentLoaded", () => {
  let selectedProduct = null;
  let selectedColor = null;
  let selectedSymbol = null;
  let totalPrice = 0;

  // Load the dataset.json file
  fetch("dataset.json")
    .then((response) => response.json())
    .then((data) => {
      loadProducts(data.products, data.colours, data.symbols);
    })
    .catch((error) => console.error("Error loading JSON:", error));

  // Function to load products
  function loadProducts(products, colours, symbols) {
    const productSections = document.querySelectorAll(".producten");

    // Loop through the products and assign to each product section
    productSections.forEach((section, index) => {
      const product = products[index];

      section.querySelector("h3").innerText = product.name;
      section.querySelector("p").innerText = `€${product.price.toFixed(2)}`;

      // Handle product selection
      section.querySelector("button").addEventListener("click", () => {
        selectedProduct = product;
        totalPrice = selectedProduct.price;
        alert(`You selected: ${product.name}`);
        showColorOptions(section, colours);
      });
    });
  }

  // Show color options for the selected product
  function showColorOptions(section, colours) {
    const colorSection = section.querySelector(".colorOptions");
    colorSection.innerHTML = ""; // Clear previous color options
    colorSection.style.display = "flex";

    // Loop through all colors and display them
    colours.forEach((color) => {
      const colorImg = document.createElement("img");
      colorImg.src = `products/${selectedProduct.name}-${color.name}.png`; // Adjust image path according to product
      colorImg.alt = `${selectedProduct.name} ${color.name}`;
      colorImg.classList.add("color-img");

      // Add color selection logic
      colorImg.addEventListener("click", () => {
        selectedColor = color;
        totalPrice = selectedProduct.price + color.price_add; // Add price increase
        alert(
          `You selected color: ${color.name} (Price increase: €${color.price_add})`
        );
        showSymbolOptions();
      });

      colorSection.appendChild(colorImg);
    });
  }

  // Show symbol options
  function showSymbolOptions() {
    const symbolContainer = document.createElement("div");
    symbolContainer.innerHTML = `
      <h2>Select a Symbol</h2>
      <div class="symbolOptions">
        <button id="symbol1">BAM</button>
        <button id="symbol2">BANG</button>
        <button id="symbol3">BOO</button>
        <button id="symbol4">BOOM</button>
      </div>
    `;
    document.body.appendChild(symbolContainer);

    // Handle symbol selection
    document.querySelectorAll(".symbolOptions button").forEach((symbolBtn) => {
      symbolBtn.addEventListener("click", () => {
        selectedSymbol = symbolBtn.innerText;
        alert(`You selected symbol: ${selectedSymbol}`);
        finalizeOrder();
      });
    });
  }

  // Finalize order and display the total price
  function finalizeOrder() {
    alert(`Final selection:
      Product: ${selectedProduct.name}
      Color: ${selectedColor.name}
      Symbol: ${selectedSymbol}
      Total Price: €${totalPrice.toFixed(2)}
    `);
  }
});
