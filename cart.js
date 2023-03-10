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
let totalItem = items.length;
listItems();
function listItems() {
    document.getElementById("items").innerHTML = "";
    var itemAvailable = false;
    var visibleIndex = 0;
    items.forEach((item, key) => {
        if (item.visible) {
            itemAvailable = true;
            var list = document.getElementById("item-list").innerHTML;
            let element = document.createElement("div");
            element.onclick = () => addItem(key);
            element.innerHTML = list;
            document.querySelector("#items").append(element);
            document.querySelectorAll(".item-image")[visibleIndex].src =
              item.image;
            document.querySelectorAll(".item-name")[visibleIndex].innerHTML =
              item.name;
            document.querySelectorAll(".item-quantity")[visibleIndex].innerHTML =
              item.quantity;
            document.querySelectorAll(".item-price")[visibleIndex].innerHTML =
              item.price;
            document.querySelectorAll(".item-tax")[visibleIndex].innerHTML =
              item.tax + "%";
            if (item.quantity == 0) {
                document.querySelectorAll(".transform")[visibleIndex].classList.add("border-red-500");
            }
            visibleIndex++;
        }
    });
    if (!itemAvailable) {
        document.getElementById("items").innerHTML = document.getElementById("page_not_found").innerHTML;
    }
}
let cart = [];
const addItem = (i) => {
    if (items[i].quantity == 0) {
        alert("sold out");
        return false;
    }
    var addCart = true;
    if (cart.find((x) => x.id === items[i].id)) {
        cart.find((x) => x.id === items[i].id).quantity += 1;
        addCart = false;
    }
    if (addCart) {
        cart.push({
          id: items[i].id,
          name: items[i].name,
          image: items[i].image,
          quantity: 1,
          price: items[i].price,
          discount: items[i].discount,
          tax: items[i].tax,
          visible: items[i].tax,
        });
    }
    items[i].quantity = items[i].quantity - 1;
    let cartBasket = document.querySelector(".cart-content");
    while (cartBasket.hasChildNodes()) {
        cartBasket.removeChild(cartBasket.firstChild);
    }
    cart.forEach((cart, key) => {
        let newProductElement = createCartProduct(cart);
        let element = document.createElement("div");
        element.innerHTML = newProductElement;
        cartBasket.append(element);
        document.querySelectorAll(".w-10")[key].src = cart.image;
        document.querySelectorAll(".w-10")[key].alt = cart.name;
        document.querySelectorAll(".discount")[key].value = cart.discount;
        document.querySelectorAll(".actual-price")[key].value = cart.price;
        document
          .querySelectorAll(".decrease")
          [key].setAttribute("decrease-id", cart.id);
        document.querySelectorAll(".cart-quantity")[key].value = cart.quantity;
        document
          .querySelectorAll(".cart-quantity")
          [key].setAttribute("data-id", cart.id);
        document
          .querySelectorAll(".increase")
          [key].setAttribute("increase-id", cart.id);
        document
          .querySelectorAll(".cart-remove")
          [key].setAttribute("remove-id", cart.id);
        document.querySelectorAll(".cart-price")[key].text = cart.price;
        document.querySelectorAll(".product-name")[key].innerHTML = cart.name;
    });
    loadContent();
    listItems();
};

function createCartProduct(item) {
    var cart = document.getElementById("cart").innerHTML;
    return cart;
}
function search() {
    var input = document.getElementById("searchbar");
    var filter = input.value.toUpperCase();
    items.forEach((item, key) => {
        var text = "$" + item.price.toString();
        if (item.name.toUpperCase().indexOf(filter) > -1 || text.toUpperCase().indexOf(filter) > -1) {
            item.visible = true;
        } else {
            item.visible = false;
        }
    });
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

    cart.find((cartValue, i) => {
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
    cart.find((value, i) => {
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
    cart.find((value, i) => {
        if (value.id == id) {
          items.find((x) => x.id == id).quantity += 1;
          value.quantity -= 1;
          if (value.quantity == 0) {
            this.parentElement.parentElement.remove();
            cart.splice(i, 1);
          }
          this.parentElement.children[1].value = parseInt(this.parentElement.children[1].value) - 1;
        }
    });
    loadContent();
    listItems();
}
function removeItem() {
    var id = this.getAttribute("remove-id");
    if (cart.length == 1) {
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
  cart.find((value, i) => {
      if (value.id == id) {
          key = i;
          items.find((x) => x.id == id).quantity += value.quantity;
      }
  });
    cart.splice(key, 1);
    listItems();
}
function containerClean() {
    cart.find((value, i) => {
        items.find((x) => x.id === value.id).quantity += value.quantity;
    });
    cart = [];
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
    cartItems.forEach((item) => {
        let priceElement = item.querySelector(".cart-price");
        let price = item.querySelector(".actual-price").value;
        let qty = item.querySelector(".cart-quantity").value;
        let discountPersontage = item.querySelector(".discount").value;
        var sum = price * qty;
        item.querySelector(".cart-price").innerText = sum;
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
