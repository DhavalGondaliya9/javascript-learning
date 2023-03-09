let items = [
  {
    id: 1,
    name: "Kit Kat",
    image: "https://picsum.photos/50/50",
    price: 10,
    discount: 5,
    tax: 18,
    quantity: 5,
    visible: true,
  },
  {
    id: 2,
    name: "Dairy Milk",
    image: "https://picsum.photos/50/50",
    price: 15,
    discount: 5,
    tax: 18,
    quantity: 5,
    visible: true,
  },
  {
    id: 3,
    name: "Juice",
    image: "https://picsum.photos/50/50",
    price: 25,
    discount: 5,
    tax: 18,
    quantity: 5,
    visible: true,
  },
  {
    id: 4,
    name: "Waffle",
    price: 60,
    image: "https://picsum.photos/50/50",
    discount: 5,
    tax: 18,
    quantity: 5,
    visible: true,
  },
  {
    id: 5,
    name: "Biscuit",
    price: 80,
    image: "https://picsum.photos/50/50",
    discount: 5,
    tax: 18,
    quantity: 5,
    visible: true,
  },
];
let totalRecord = items.length;

var item = items[Math.floor(Math.random() * items.length)];
listItems();
function listItems() {
  document.getElementById("items").innerHTML = "";
  var itemAvailable = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].visible) {
      itemAvailable = true;
      let div = document.createElement("div");
      div.setAttribute("id", "item-" + items[i].id);
      div.setAttribute(
        "class",
        "transform hover:scale-105 transition duration-300 px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between"
      );
      if (items[i].quantity == 0) {
        div.setAttribute(
          "class",
          "transform hover:scale-105 transition duration-300 px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between border-red-500"
        );
      }
      div.setAttribute("onclick", "addItem(" + i + ")");
      let parentDiv = document.createElement("div");
      let subParentDiv = document.createElement("div");

      subParentDiv.setAttribute("class", "font-bold text-gray-800");
      subParentDiv.innerHTML = items[i].name;
      parentDiv.appendChild(subParentDiv);

      subParentSpan = document.createElement("span");
      subParentSpan.setAttribute("class", "font-light text-sm text-gray-400");
      subParentSpan.innerHTML = "Quantity: " + items[i].quantity;

      parentDiv.appendChild(subParentSpan);
      div.appendChild(parentDiv);
      let parentDiv2 = document.createElement("div");
      let parentImg = document.createElement("img");
      parentImg.setAttribute("src", items[i].image);
      parentImg.setAttribute("class", "h-14 w-14 object-cover rounded-md");

      parentDiv2.setAttribute(
        "class",
        "flex flex-row justify-between items-center"
      );

      subParentDiv2 = document.createElement("div");
      subParentDiv2.setAttribute(
        "class",
        "flex space-x-0 self-end font-bold text-lg text-yellow-500"
      );
      subParentSpan2 = document.createElement("span");
      subParentSpan2.innerHTML = "$" + items[i].price;
      subParentDiv2.appendChild(subParentSpan2);
      parentDiv2.appendChild(subParentDiv2);
      subParentDiv2 = document.createElement("div");
      subParentDiv2.setAttribute(
        "class",
        "flex space-x-0 self-end font-bold text-lg text-red-500"
      );
      subParentSpan2 = document.createElement("span");
      subParentSpan2.innerHTML = items[i].tax + "%";
      subParentDiv2.appendChild(subParentSpan2);
      parentDiv2.appendChild(subParentDiv2);

      parentDiv2.appendChild(parentImg);
      div.appendChild(parentDiv2);
      document.getElementById("items").appendChild(div);
    }
  }
  if (!itemAvailable) {
    console.log('aasasas');
    document.getElementById("items").innerHTML =
      "<div width='100%'></div><h1 class='text-center mt-40 text-2xl'>Product Not found</h1></div>";
  }
}
let addCart = [];
const addItem = (i) => {
  if (items[i].quantity == 0) {
    alert("sold out");
    return false;
  }
  cart(items[i]);

  items[i].quantity = items[i].quantity - 1;
  let cartBasket = document.querySelector(".cart-content");
  while (cartBasket.hasChildNodes()) {
    cartBasket.removeChild(cartBasket.firstChild);
  }
  for (let ii = 0; ii < addCart.length; ii++) {
    let newProductElement = createCartProduct(addCart[ii]);
    let element = document.createElement("div");
    element.innerHTML = newProductElement;
    cartBasket.append(element);
  }
  loadContent();
  listItems();
};
function cart(item) {
  var isExit = false;
  for (let i = 0; i < totalRecord; i++) {
    if (typeof addCart[i] !== "undefined" && addCart[i].id == item.id) {
      isExit = true;
      addCart[i].quantity = addCart[i].quantity + 1;
    }
  }
  if (!isExit) {
    console.log("here");
    addCart.push({
      id: item.id,
      name: item.name,
      image: item.image,
      quantity: 1,
      price: item.price,
      discount: item.discount,
      tax: item.tax,
      visible: item.tax,
    });
  }
}

function createCartProduct(item) {
  return `  <div class="flex flex-row justify-between items-center mb-4 cart-box">
                <div class="flex flex-row items-center w-2/5">
                    <input type="hidden" class="discount" value="${item.discount}">
                    <input type="hidden" class="actual-price" value="${item.price}">
                    <img src="${item.image}" class="w-10 h-10 object-cover rounded-md">
                    <span class="ml-4 font-semibold text-sm">${item.name}</span>
                </div>
                <div class="w-32 flex justify-between">
                    <button class="px-3 py-1 rounded-md bg-gray-300 decrease" data-id="${item.id}">-</button>
                    <input class="mx-2 border text-center w-8 input-quantity cart-quantity" data-id="${item.id}" value="${item.quantity}" type="number">
                    <button class="px-3 py-1 rounded-md bg-gray-300 increase" data-id="${item.id}">+</button>
                </div>
                <div class="flex pl-3 font-semibold text-lg w-16 text-center" >
                    <div class="currency-sign">$</div>
                    <div class="price cart-price">${item.price}</div>
                </div>
                <span class="px-3 py-1 rounded-md bg-red-300 text-white cart-remove" data-id="${item.id}">x</span>
            </div>
  `;
}
function search() {
  var input = document.getElementById("searchbar");
  var filter = input.value.toUpperCase();
  for (let i = 0; i < totalRecord; i++) {
    var text = '$'+items[i].price.toString();
    if (
      items[i].name.toUpperCase().indexOf(filter) > -1 ||
      text.toUpperCase().indexOf(filter) > -1
    ) {
      items[i].visible = true;
    } else {
      items[i].visible = false;
    }
  }
  listItems();
}
function loadContent() {
  let qtyElements = document.querySelectorAll(".cart-quantity");
  qtyElements.forEach((input) => {
    input.addEventListener("change", changeQty);
  });

  let btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  let increase = document.querySelectorAll(".increase");
  increase.forEach((btn) => {
    btn.addEventListener("click", increaseQty);
  });

  let decrease = document.querySelectorAll(".decrease");
  decrease.forEach((btn) => {
    btn.addEventListener("click", decreaseQty);
  });

  updateTotal();
}

function changeQty() {
  var id = this.getAttribute("data-id");
  var value = this.value;

  if (isNaN(value) || value < 1) {
    this.parentElement.parentElement.remove();
    quantityUpdate(id);
    loadContent();
    listItems();
    return;
  }
  for (let i = 0; i < addCart.length; i++) {
    if (addCart[i].id == id) {
      for (let j = 0; j < items.length; j++) {
        if (items[j].id == id) {
          if (addCart[i].quantity != value) {
            var totalQuantity = addCart[i].quantity + items[j].quantity;
            var plus =
              value > addCart[i].quantity ? value - addCart[i].quantity : false;
            var minus =
              value < addCart[i].quantity ? addCart[i].quantity - value : false;
            if (plus) {
              if (totalQuantity < addCart[i].quantity + plus) {
                alert("This product only " + totalQuantity + " quantity available");
                this.value = addCart[i].quantity;
                return false;
              }
              addCart[i].quantity += plus;
              items[j].quantity -= plus;
            }
            if (minus) {
              addCart[i].quantity -= minus;
              items[j].quantity += minus;
            }

          }
        }
      }
    }
  }
  loadContent();
  listItems();
}

function increaseQty() {
  var id = this.getAttribute("data-id");
  for (let i = 0; i < addCart.length; i++) {
    if (addCart[i].id == id) {
      for (let j = 0; j < items.length; j++) {
        if (items[j].id == id) {
          if (items[j].quantity == 0) {
            alert("sold out");
            return false;
          }
          this.parentElement.children[1].value =
            parseInt(this.parentElement.children[1].value) + 1;
          addCart[i].quantity += 1;
          items[j].quantity -= 1;
        }
      }
    }
  }
  loadContent();
  listItems();
}

function decreaseQty() {
  var id = this.getAttribute("data-id");
  var key = 0;
  for (let i = 0; i < addCart.length; i++) {
    if (addCart[i].id == id) {
      for (let j = 0; j < items.length; j++) {
        if (items[j].id == id) {
          this.parentElement.children[1].value =
            this.parentElement.children[1].value - 1;
          addCart[i].quantity -= 1;
          items[j].quantity += 1;
          if (addCart[i].quantity == "0") {
            this.parentElement.parentElement.remove();
            addCart.splice(i, 1);
          }
        }
      }
    }
  }
  loadContent();
  listItems();
}
function removeItem() {
  var id = this.getAttribute("data-id");
  if (addCart.length == 1) {
    if (confirm("Are Your Sure to Remove")) {
      quantityUpdate(id);
      this.parentElement.remove();
      loadContent();
    }
    return;
  }
  quantityUpdate(id);
  this.parentElement.remove();
  loadContent();

}

function quantityUpdate(id) {
  var key = 0;
  for (let i = 0; i < addCart.length; i++) {
    if (addCart[i].id == id) {
      for (let j = 0; j < items.length; j++) {
        if (items[j].id == id) {
          key = i;
          items[j].quantity += addCart[i].quantity;
        }
      }
    }
  }

  addCart.splice(key, 1);
  listItems();
}
function containerClean() {
  for (let i = 0; i < addCart.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (addCart[i].id == items[j].id) {
        items[j].quantity += addCart[i].quantity;
      }
    }
  }
  addCart = [];
  document.querySelector(".cart-content").innerHTML = "";
  updateTotal();
  listItems();
}
function updateTotal() {
  const cartItems = document.querySelectorAll(".cart-box");
  const totalValue = document.getElementById("total");
  const subTotal = document.getElementById("subtotal");
  const salesTax = document.getElementById("sales-tax");
  const totalDiscount = document.getElementById("discount-price");
  let total = 0;
  let discount = 0;
  cartItems.forEach((product) => {
    let priceElement = product.querySelector(".cart-price");
    let price = product.querySelector(".actual-price").value;
    let qty = product.querySelector(".cart-quantity").value;
    let discountPersontage = product.querySelector(".discount").value;
    var sum = price * qty;
    product.querySelector(".cart-price").innerText = sum;
    discount += (sum * discountPersontage) / 100;
    total += sum;
  });
  subTotal.innerHTML = "$" + total.toFixed(2);

  totalDiscount.innerHTML = "- $" + discount.toFixed(2);
  const tax = 18;
  const totaltax = (total * tax) / 100;
  salesTax.innerHTML = "+ $" + totaltax.toFixed(2);
  const alltotal = total + totaltax - discount;
  totalValue.innerHTML = "$" + alltotal.toFixed(2);
}
