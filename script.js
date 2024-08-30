// hamnuger menu
const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const hamburgerIcon = document.getElementById("hamburger-icon");
const closeIcon = document.getElementById("close-icon");
const navLinks = document.querySelectorAll("#mobile-menu a");

const toggleMenu = () => {
  mobileMenu.classList.toggle("-translate-x-full");
  mobileMenu.classList.toggle("translate-x-0");
  hamburgerIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
};

menuButton.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(() => {
      mobileMenu.classList.add("-translate-x-full");
      mobileMenu.classList.remove("translate-x-0");
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }, 800); // Délai 800ms
  });
});

// Shopping cart
const shoppingBagIcon = document.getElementById("shopping-bag-icon");
const shoppingBagContent = document.getElementById("shopping-bag-content");
const itemCount = document.getElementById("item-count");
const bagItems = document.getElementById("bag-items");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

const checkoutButton = document.getElementById("#checkout-home-button");
const checkoutPageContent = document.getElementById("#checkout-page-content");

let hideTimeout;
let itemCountValue = 0;

const shakeBagIcon = () => {
  shoppingBagIcon.classList.add("shake");
  setTimeout(() => {
    shoppingBagIcon.classList.remove("shake");
  }, 500); //
};

const updateBagIcon = () => {
  itemCount.textContent = itemCountValue;
};

const totalPriceElement = document.getElementById("total-price");
let totalPriceValue = 0;

const updateTotalPrice = () => {
  totalPriceElement.textContent = totalPriceValue.toFixed(2);
};

const addItemToBag = (name, description, price, image) => {
  const existingItem = document.querySelector(
    `.bag-item[data-image="${image}"]`
  );

  if (existingItem) {
    const quantityElement = existingItem.querySelector(".quantity");
    const priceElement = existingItem.querySelector(".price");
    const currentQuantity = parseInt(quantityElement.textContent);
    const newQuantity = currentQuantity + 1;
    const newPrice = parseFloat(price) * newQuantity;

    quantityElement.textContent = newQuantity;
    priceElement.textContent = `€${newPrice.toFixed(2)}`;
    totalPriceValue += parseFloat(price);
  } else {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add(
      "bag-item",
      "overflow-y-auto",
      "mb-5",
      "flex",
      "h-40"
    );
    itemDiv.setAttribute("data-image", image);

    itemDiv.innerHTML = `
      <div class="w-32">
        <img class="size-40 object-cover" src="${image}" alt="${name}" />
      </div>
      <div class=" w-52 p-2">
        <span class="block mb-2">${name}</span>
        <span class="block mb-2">Price: <span class="price">€ ${price}</span></span>
        <span class="block mb-2">Quantity: <span class="quantity">1</span></span>
        <span class="block mb-2">${description}</span>
      </div>
      <div>
        <button class="remove-from-cart">
          <img class="size-6" src="images/icons8-x-shopping-bag.png" alt="Remove" />
        </button>
      </div>
    `;

    bagItems.appendChild(itemDiv);

    totalPriceValue += parseFloat(price);

    itemDiv.querySelector(".remove-from-cart").addEventListener("click", () => {
      const quantityElement = itemDiv.querySelector(".quantity");
      const priceElement = itemDiv.querySelector(".price");
      let currentQuantity = parseInt(quantityElement.textContent);

      if (currentQuantity > 1) {
        currentQuantity--;
        const newPrice = parseFloat(price) * currentQuantity;

        quantityElement.textContent = currentQuantity;
        priceElement.textContent = `€${newPrice.toFixed(2)}`;
        totalPriceValue -= parseFloat(price);
        itemCountValue--;
        updateBagIcon();
        shakeBagIcon();
      } else {
        bagItems.removeChild(itemDiv);
        itemCountValue--;
        updateBagIcon();
        shakeBagIcon();
        totalPriceValue -= parseFloat(price);
      }
      updateTotalPrice();
    });
  }
  updateTotalPrice();
};

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const description = button.getAttribute("data-description");
    const price = button.getAttribute("data-price");
    const image = button.getAttribute("data-image");

    itemCountValue++;
    updateBagIcon();
    addItemToBag(name, description, price, image);
    shakeBagIcon();
  });
});

shoppingBagIcon.addEventListener("mouseover", () => {
  clearTimeout(hideTimeout);
  shoppingBagContent.classList.remove("hidden");
  shoppingBagContent.classList.add("block");
});

shoppingBagIcon.addEventListener("mouseleave", () => {
  hideTimeout = setTimeout(() => {
    shoppingBagContent.classList.remove("block");
    shoppingBagContent.classList.add("hidden");
  }, 300); // Délai
});

shoppingBagContent.addEventListener("mouseover", () => {
  clearTimeout(hideTimeout);
  shoppingBagContent.classList.remove("hidden");
  shoppingBagContent.classList.add("block");
});

shoppingBagContent.addEventListener("mouseleave", () => {
  hideTimeout = setTimeout(() => {
    shoppingBagContent.classList.remove("block");
    shoppingBagContent.classList.add("hidden");
  }, 300); // Délai
});

const toTopButton = document.getElementById("toTopButton");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 1000) {
    if (currentScrollY > lastScrollY) {
      toTopButton.classList.remove("hidden");
      toTopButton.classList.add("block");
    } else {
      toTopButton.classList.remove("block");
      toTopButton.classList.add("hidden");
    }
  } else {
    toTopButton.classList.remove("block");
    toTopButton.classList.add("hidden");
  }

  lastScrollY = currentScrollY;
});

toTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*----------------1---------------------*/

let currentIndex1 = 0;
const images1 = document.querySelectorAll("#carousel1 img");
const totalImages1 = images1.length;

function showImage1(index) {
  const carousel = document.getElementById("carousel1");
  if (index >= totalImages1) {
    currentIndex1 = 0;
  } else if (index < 0) {
    currentIndex1 = totalImages1 - 1;
  } else {
    currentIndex1 = index;
  }
  carousel1.style.transform = `translateX(-${currentIndex1 * 100}%)`;
}

function nextImage1() {
  showImage1(currentIndex1 + 1);
}

function prevImage1() {
  showImage1(currentIndex1 - 1);
}

/*----------------2---------------------*/

let currentIndex2 = 0;
const images2 = document.querySelectorAll("#carousel2 img");
const totalImages2 = images2.length;

function showImage2(index) {
  const carousel = document.getElementById("carousel2");
  if (index >= totalImages2) {
    currentIndex2 = 0;
  } else if (index < 0) {
    currentIndex2 = totalImages2 - 1;
  } else {
    currentIndex2 = index;
  }
  carousel2.style.transform = `translateX(-${currentIndex2 * 100}%)`;
}

function nextImage2() {
  showImage2(currentIndex2 + 1);
}

function prevImage2() {
  showImage2(currentIndex2 - 1);
}

/*----------------3---------------------*/

let currentIndex3 = 0;
const images3 = document.querySelectorAll("#carousel3 img");
const totalImages3 = images3.length;

function showImage3(index) {
  const carousel = document.getElementById("carousel3");
  if (index >= totalImages3) {
    currentIndex3 = 0;
  } else if (index < 0) {
    currentIndex3 = totalImages3 - 1;
  } else {
    currentIndex3 = index;
  }
  carousel3.style.transform = `translateX(-${currentIndex3 * 100}%)`;
}

function nextImage3() {
  showImage3(currentIndex3 + 1);
}

function prevImage3() {
  showImage3(currentIndex3 - 1);
}

/*----------------4---------------------*/

let currentIndex4 = 0;
const images4 = document.querySelectorAll("#carousel4 img");
const totalImages4 = images4.length;

function showImage4(index) {
  const carousel = document.getElementById("carousel4");
  if (index >= totalImages4) {
    currentIndex4 = 0;
  } else if (index < 0) {
    currentIndex4 = totalImages4 - 1;
  } else {
    currentIndex4 = index;
  }
  carousel4.style.transform = `translateX(-${currentIndex4 * 100}%)`;
}

function nextImage4() {
  showImage4(currentIndex4 + 1);
}

function prevImage4() {
  showImage4(currentIndex4 - 1);
}

/*----------------5---------------------*/

let currentIndex5 = 0;
const images5 = document.querySelectorAll("#carousel5 img");
const totalImages5 = images5.length;

function showImage5(index) {
  const carousel = document.getElementById("carousel5");
  if (index >= totalImages5) {
    currentIndex5 = 0;
  } else if (index < 0) {
    currentIndex5 = totalImages5 - 1;
  } else {
    currentIndex5 = index;
  }
  carousel5.style.transform = `translateX(-${currentIndex5 * 100}%)`;
}

function nextImage5() {
  showImage5(currentIndex5 + 1);
}

function prevImage5() {
  showImage5(currentIndex5 - 1);
}

/*----------------6---------------------*/

let currentIndex6 = 0;
const images6 = document.querySelectorAll("#carousel6 img");
const totalImages6 = images6.length;

function showImage6(index) {
  const carousel = document.getElementById("carousel6");
  if (index >= totalImages6) {
    currentIndex6 = 0;
  } else if (index < 0) {
    currentIndex6 = totalImages6 - 1;
  } else {
    currentIndex6 = index;
  }
  carousel6.style.transform = `translateX(-${currentIndex6 * 100}%)`;
}

function nextImage6() {
  showImage6(currentIndex6 + 1);
}

function prevImage6() {
  showImage6(currentIndex6 - 1);
}

/*----------------7---------------------*/

let currentIndex7 = 0;
const images7 = document.querySelectorAll("#carousel7 img");
const totalImages7 = images7.length;

function showImage7(index) {
  const carousel = document.getElementById("carousel7");
  if (index >= totalImages7) {
    currentIndex7 = 0;
  } else if (index < 0) {
    currentIndex7 = totalImages7 - 1;
  } else {
    currentIndex7 = index;
  }
  carousel7.style.transform = `translateX(-${currentIndex7 * 100}%)`;
}

function nextImage7() {
  showImage7(currentIndex7 + 1);
}

function prevImage7() {
  showImage7(currentIndex7 - 1);
}

/*----------------8---------------------*/

let currentIndex8 = 0;
const images8 = document.querySelectorAll("#carousel8 img");
const totalImages8 = images8.length;

function showImage8(index) {
  const carousel = document.getElementById("carousel8");
  if (index >= totalImages8) {
    currentIndex8 = 0;
  } else if (index < 0) {
    currentIndex8 = totalImages8 - 1;
  } else {
    currentIndex8 = index;
  }
  carousel8.style.transform = `translateX(-${currentIndex8 * 100}%)`;
}

function nextImage8() {
  showImage8(currentIndex8 + 1);
}

function prevImage8() {
  showImage8(currentIndex8 - 1);
}

/*----------------9---------------------*/

let currentIndex9 = 0;
const images9 = document.querySelectorAll("#carousel9 img");
const totalImages9 = images9.length;

function showImage9(index) {
  const carousel = document.getElementById("carousel9");
  if (index >= totalImages9) {
    currentIndex9 = 0;
  } else if (index < 0) {
    currentIndex9 = totalImages9 - 1;
  } else {
    currentIndex9 = index;
  }
  carousel9.style.transform = `translateX(-${currentIndex9 * 100}%)`;
}

function nextImage9() {
  showImage9(currentIndex9 + 1);
}

function prevImage9() {
  showImage9(currentIndex9 - 1);
}

/*----------------10---------------------*/

let currentIndex10 = 0;
const images10 = document.querySelectorAll("#carousel10 img");
const totalImages10 = images10.length;

function showImage10(index) {
  const carousel = document.getElementById("carousel10");
  if (index >= totalImages10) {
    currentIndex10 = 0;
  } else if (index < 0) {
    currentIndex10 = totalImages10 - 1;
  } else {
    currentIndex10 = index;
  }
  carousel10.style.transform = `translateX(-${currentIndex10 * 100}%)`;
}

function nextImage10() {
  showImage10(currentIndex10 + 1);
}

function prevImage10() {
  showImage10(currentIndex10 - 1);
}

/*----------------11---------------------*/

let currentIndex11 = 0;
const images11 = document.querySelectorAll("#carousel11 img");
const totalImages11 = images10.length;

function showImage11(index) {
  const carousel = document.getElementById("carousel11");
  if (index >= totalImages11) {
    currentIndex11 = 0;
  } else if (index < 0) {
    currentIndex11 = totalImages11 - 1;
  } else {
    currentIndex11 = index;
  }
  carousel11.style.transform = `translateX(-${currentIndex11 * 100}%)`;
}

function nextImage11() {
  showImage11(currentIndex11 + 1);
}

function prevImage11() {
  showImage11(currentIndex11 - 1);
}

/*----------------12---------------------*/

let currentIndex12 = 0;
const images12 = document.querySelectorAll("#carousel12 img");
const totalImages12 = images10.length;

function showImage12(index) {
  const carousel = document.getElementById("carousel12");
  if (index >= totalImages12) {
    currentIndex12 = 0;
  } else if (index < 0) {
    currentIndex12 = totalImages12 - 1;
  } else {
    currentIndex12 = index;
  }
  carousel12.style.transform = `translateX(-${currentIndex12 * 100}%)`;
}

function nextImage12() {
  showImage12(currentIndex12 + 1);
}

function prevImage12() {
  showImage12(currentIndex12 - 1);
}
