const paramsSearchUrl = new URLSearchParams(window.location.search)
const productContent = document.querySelector("#content .product-content")
const reduceQuantity = document.querySelector(".action-quantity .reduce-quantity")
const numberQuantity = document.querySelector(".action-quantity .number-quantity span")
const moreQuantity = document.querySelector(".action-quantity .more-quantity")
const orderProduct = document.querySelector(".action-product .order-product")
const addToCartProduct = document.querySelector(".action-product .add-to-cart-product")
const footer = document.querySelector("#footer")

var idProduct = paramsSearchUrl.get("idProduct")
var langDisplay = "vi-VN"
var numberProduct = 1

if (langDisplay == "en-US") {
	langNumber = 0
} else if (langDisplay == "vi-VN") {
	langNumber = 1
}
numberQuantity.innerText = numberProduct

fetch("./language.json")
	.then(res => {
		return res.json()
	})
	.then(data => {
		footer.innerHTML = `<span class="coder">${data[langDisplay].titleCoder}: <a href="https://vinhtran-karasuma.netlify.app/">Vinh Trần (Karasuma)</a></span>`
	})

if (idProduct) {
	const idProductConfirm = /^\d{4}-\d{3}-\d{4}$/
	if (idProductConfirm.test(idProduct)) {
		const idCommodity = idProduct.match(/^\d{4}-\d{3}/)[0]
		fetch("./products.json")
			.then(res => {
				return res.json()
			})
			.then(data => {
				if (data[`commodity-${idCommodity}`].commodityOnSale) {
					getProductById = id => data[`commodity-${idCommodity}`].list.find(product => product.idProduct === id)
					if (!getProductById(idProduct)) {
						console.log("Hiện không có sản phẩm nào này!")
						alert("Hiện không có sản phẩm nào này!")
					} else {
						productContent.querySelector(".img-product img").src = getProductById(idProduct).imgProduct
						productContent.querySelector(".imformation-product .name-product").innerText = getProductById(idProduct).nameProduct
						productContent.querySelector(".imformation-product .price-new-product").innerText = convertMoney(getProductById(idProduct).priceNewProduct) + " ₫"
						productContent.querySelector(".imformation-product .price-old-product").innerText = convertMoney(getProductById(idProduct).priceOldProduct) + " ₫"
						productContent.querySelector(".imformation-product .classification-product .name-classification").innerText = data[`commodity-${idCommodity}`].commodityName[langNumber]
						productContent.querySelector(".imformation-product .quantity-in-shop-product span").innerText = getProductById(idProduct).quantityInShopProduct
					}
				} else {
					console.log("Hiện không có sản phẩm nào của loại hàng này!")
					alert("Hiện không có sản phẩm nào của loại hàng này!")
				}

				reduceQuantity.onclick = () => {
					if (numberProduct > 1) {
						numberProduct -= 1
					}
					numberQuantity.innerText = numberProduct
				}

				moreQuantity.onclick = () => {
					if (numberProduct < getProductById(idProduct).quantityInShopProduct) {
						numberProduct += 1
					}
					numberQuantity.innerText = numberProduct
				}
			})
	} else {
		console.log("Mã sản phẩm không đúng!")
		alert("Mã sản phẩm không đúng!")
	}
} else {
	console.log("Không có thuộc tính idProduct trên url!")
	alert("Không có thuộc tính idProduct trên url!")
}

orderProduct.onclick = () => {
	alert("Chỉ là web demo mẫu 1 nên chức năng này không được làm!")
}

addToCartProduct.onclick = () => {
	alert("Chỉ là web demo mẫu 1 nên chức năng này không được làm!")
}

function convertMoney(value) {
	value = value.toString()
	if (value.length > 3 && value.length <= 6) {
		value = value.slice(0, -3) + "." + value.slice(-3, value.length)
	} else if (value.length > 6 && value.length <= 9) {
		value = value.slice(0, -6) + "." + value.slice(-6, -3) + "." + value.slice(-3, value.length)
	} else if (value.length > 9) {
		value = value.slice(0, -9) + "." + value.slice(-9, -6) + "." + value.slice(-6, -3) + "." + value.slice(-3, value.length)
	}
	return value
}
