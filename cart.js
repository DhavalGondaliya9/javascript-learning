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
listItems();
function listItems() {
    document.getElementById("items").innerHTML = "";
    var itemAvailable = false;
    var visibleIndex = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i].visible) {
            itemAvailable = true;
            var list = document.getElementById("item-list").innerHTML;
            let element = document.createElement("div");
            element.onclick = () => addItem(i);
            element.innerHTML = list;
            document.querySelector("#items").append(element);
            document.querySelectorAll(".item-image")[visibleIndex].src = items[i].image;
            document.querySelectorAll(".item-name")[visibleIndex].innerHTML = items[i].name;
            document.querySelectorAll(".item-quantity")[visibleIndex].innerHTML = items[i].quantity;
            document.querySelectorAll(".item-price")[visibleIndex].innerHTML = items[i].price;
            document.querySelectorAll(".item-tax")[visibleIndex].innerHTML = items[i].tax + "%";
            if (items[i].quantity == 0) {
                document.querySelectorAll(".transform")[visibleIndex].classList.add("border-red-500");
            }
            visibleIndex++;
        }
    }
    if (!itemAvailable) {
        document.getElementById("items").innerHTML = document.getElementById("page_not_found").innerHTML;
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
    for (let j = 0; j < addCart.length; j++) {
        let newProductElement = createCartProduct(addCart[j]);
        let element = document.createElement("div");
        element.innerHTML = newProductElement;
        cartBasket.append(element);
        document.querySelectorAll(".w-10")[j].src = addCart[j].image;
        document.querySelectorAll(".w-10")[j].alt = addCart[j].name;
        document.querySelectorAll(".discount")[j].value = addCart[j].discount;
        document.querySelectorAll(".actual-price")[j].value = addCart[j].price;
        document
          .querySelectorAll(".decrease")
          [j].setAttribute("decrease-id", addCart[j].id);
        document.querySelectorAll(".cart-quantity")[j].value = addCart[j].quantity;
        document
          .querySelectorAll(".cart-quantity")
          [j].setAttribute("data-id", addCart[j].id);
        document
          .querySelectorAll(".increase")
          [j].setAttribute("increase-id", addCart[j].id);
        document
          .querySelectorAll(".cart-remove")
          [j].setAttribute("remove-id", addCart[j].id);
        document.querySelectorAll(".cart-price")[j].text = addCart[j].price;
        document.querySelectorAll(".product-name")[j].innerHTML = addCart[j].name;
    }
    loadContent();
    listItems();
};
function cart(item) {
    var isExit = false;
    if (addCart.find((x) => x.id === item.id)) {
      addCart.find((x) => x.id === item.id).quantity += 1;
      isExit = true;
    }
    if (!isExit) {
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
    var cart = document.getElementById("cart").innerHTML;
    return cart;
}
function search() {
    var input = document.getElementById("searchbar");
    var filter = input.value.toUpperCase();
    for (let i = 0; i < totalRecord; i++) {
        var text = "$" + items[i].price.toString();
        if (items[i].name.toUpperCase().indexOf(filter) > -1 || text.toUpperCase().indexOf(filter) > -1) {
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
    var v = this.value;

    if (isNaN(v) || v < 1) {
        this.parentElement.parentElement.remove();
        quantityUpdate(id);
        loadContent();
        listItems();
        return;
    }

    addCart.find((cartValue, i) => {
        if (cartValue.id == id) {
            items.find((itemValue, j) => {
                if (itemValue.id == id) {
                    if (cartValue.quantity != v) {
                      var totalQuantity = cartValue.quantity + itemValue.quantity;
                      var plus = v > cartValue.quantity ? v - cartValue.quantity : false;
                      var minus = v < cartValue.quantity ? cartValue.quantity - v : false;
                      if (plus) {
                        if (totalQuantity < cartValue.quantity + plus) {
                          alert(
                            "This product only " + totalQuantity + " quantity available"
                          );
                          this.value = cartValue.quantity;
                          return false;
                        }
                        cartValue.quantity += plus;
                        itemValue.quantity -= plus;
                      }
                      if (minus) {
                        cartValue.quantity -= minus;
                        itemValue.quantity += minus;
                      }
                  }
              }
          });
      }
    });
    loadContent();
    listItems();
}

function increaseQty() {
    var id = this.getAttribute("increase-id");
    addCart.find((value, i) => {
        if (value.id == id) {
            if (items.find((x) => x.id == id).quantity == 0) {
              alert("sold out");
              return false;
            }
            items.find((x) => x.id == id).quantity -= 1;
            value.quantity += 1;
            this.parentElement.children[1].value = parseInt(this.parentElement.children[1].value) + 1;
        }
    });
    loadContent();
    listItems();
}

function decreaseQty() {
    var id = this.getAttribute("decrease-id");
    addCart.find((value, i) => {
        if (value.id == id) {
          items.find((x) => x.id == id).quantity += 1;
          value.quantity -= 1;
          if (value.quantity == 0) {
            this.parentElement.parentElement.remove();
            addCart.splice(i, 1);
          }
          this.parentElement.children[1].value = parseInt(this.parentElement.children[1].value) - 1;
        }
    });
    loadContent();
    listItems();
}
function removeItem() {
    var id = this.getAttribute("remove-id");
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
    addCart.find((value, i) => {
        if (value.id == id) {
          items.find((x) => x.id == id).quantity += value.quantity;
          addCart.splice(i, 1);
        }
    });
    listItems();
}
function containerClean() {
    addCart.find((value, i) => {
        items.find((x) => x.id === value.id).quantity += value.quantity;
    });
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
