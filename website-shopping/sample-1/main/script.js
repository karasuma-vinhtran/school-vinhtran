// const paramsSearchUrl = new URLSearchParams(window.location.search)
const contactNotification = document.querySelector("#contact-notification")
const listPage = document.querySelectorAll(".list-page ul li")
const iconChangePageMobile = document.querySelectorAll(".list-page .mobile-ui .change-page .icon")
const ulChangePageMobile = document.querySelector(".list-page .mobile-ui .ul-mobile-ui")
const content = document.querySelector("#content")
const contentPage = document.querySelectorAll("#content .page")
const introduceContent = document.querySelector("#introduce .introduce-content")
const productsTitle = document.querySelector("#products .products-title")
const listCategory = document.querySelector("#products .products-content .products-category .list-category")
const productsList = document.querySelector("#products .products-content .products-list")
const policyTitle = document.querySelector("#policy .policy-title")
const policyList = document.querySelector("#policy .policy-content")
const footer = document.querySelector("#footer")

const langDisplay = "vi-VN"
var itemSelectedNumber = 0
var langNumber = 1
var scrollSelected = 0
var scrollWindowAction = false
var scrollProductAction = false
// langDisplay = paramsSearchUrl.get("lang")
// if (langDisplay == "en-US") {
// 	langNumber = 0
// } else if (langDisplay == "vi-VN") {
// 	langNumber = 1
// }

window.addEventListener("resize", onWindowResize)
productsList.onmouseover = () => {
	scrollProductAction = true
}
productsList.onmouseout = () => {
	scrollProductAction = false
}
introduceContent.querySelector(".action").onclick = () => {
	contactNotification.classList.add("show")
}
contactNotification.querySelector(".header-contact .action-contact ion-icon").onclick = () => {
	contactNotification.classList.remove("show")
}
contactNotification.querySelector(".content-contact .submit-contact button").onclick = () => {
	alert("Chỉ là web demo mẫu 1 nên chức năng này không được làm!")
}

for (let i = 0; i < listPage.length; i++) {
	listPage[i].onclick = () => {
		for (let j = 0; j < listPage.length; j++) {
			listPage[j].classList.remove("selected")
		}
		listPage[i].classList.add("selected")
	}
}

for (let i = 0; i < iconChangePageMobile.length; i++) {
	iconChangePageMobile[i].onclick = () => {
		for (let j = 0; j < iconChangePageMobile.length; j++) {
			iconChangePageMobile[j].classList.remove("selected")
		}
		switch (i) {
			case 0:
				ulChangePageMobile.classList.add("show")
				iconChangePageMobile[i + 1].classList.add("selected")
				break
			case 1:
				ulChangePageMobile.classList.remove("show")
				iconChangePageMobile[i - 1].classList.add("selected")
				break
		}
	}
}

fetch("./language.json")
	.then(res => {
		return res.json()
	})
	.then(data => {
		introduceContent.querySelector(".title").innerText = data[langDisplay].titleIntroduce
		introduceContent.querySelector(".describe").innerText = data[langDisplay].describeIntroduce
		introduceContent.querySelector(".action").innerText = data[langDisplay].buttonIntroduce
		productsTitle.querySelector(".text").innerText = data[langDisplay].titleProducts
		policyTitle.querySelector(".text").innerText = data[langDisplay].titlePolicy
		for (let i = 0; i < data[langDisplay].listPolicies.length; i++) {
			policyList.innerHTML += `
				<div class="item-policy">
					<span class="title-policies">${i + 1}. ${data[langDisplay].listPolicies[i].titlePolicies}</span>
					<span class="describe-policies">${data[langDisplay].listPolicies[i].describePolicies}</span>
				</div>
			`
		}
		footer.innerHTML = `<span class="coder">${data[langDisplay].titleCoder}: <a href="https://vinhtran-karasuma.netlify.app/">Vinh Trần (Karasuma)</a></span>`
	})

if (window.innerWidth > 500) {
	setTimeout(() => {
		alert("Có cả UI điện thoại!")
	}, 5000)

	window.addEventListener(
		"wheel",
		e => {
			if (!scrollProductAction) {
				e.preventDefault()
				if (!scrollWindowAction) {
					if (e.deltaY < 0) {
						scrollWindowAction = true
						if (scrollSelected == 0) {
							scrollSelected = 0
						} else {
							scrollSelected -= 1
							contentPage[scrollSelected].scrollIntoView({ behavior: "smooth" })
						}
					} else {
						scrollWindowAction = true
						if (scrollSelected == contentPage.length - 1) {
							scrollSelected == contentPage.length - 1
							footer.scrollIntoView({ behavior: "smooth" })
						} else {
							scrollSelected += 1
							contentPage[scrollSelected].scrollIntoView({ behavior: "smooth" })
						}
					}
					for (let j = 0; j < listPage.length; j++) {
						listPage[j].classList.remove("selected")
					}
					listPage[scrollSelected].classList.add("selected")
					setTimeout(() => {
						scrollWindowAction = false
					}, 500)
				}
			}
		},
		{ passive: false }
	)
}

fetch("./products.json")
	.then(res => {
		return res.json()
	})
	.then(data => {
		// console.log(data)
		for (let i = 0; i < Object.keys(data).length; i++) {
			if (i == itemSelectedNumber) {
				listCategory.innerHTML += `
				<li class="item-category selected" id="${Object.keys(data)[i]}">
					<div class="left">
						<span class="title">${data[Object.keys(data)[i]].commodityName[langNumber]}</span>
					</div>
					<div class="right">
						<ion-icon name="chevron-forward" class="icon"></ion-icon>
					</div>
				</li>
			`
			} else {
				listCategory.innerHTML += `
				<li class="item-category" id="${Object.keys(data)[i]}">
					<div class="left">
						<span class="title">${data[Object.keys(data)[i]].commodityName[langNumber]}</span>
					</div>
					<div class="right">
						<ion-icon name="chevron-forward" class="icon"></ion-icon>
					</div>
				</li>
			`
			}
		}
		if (data[Object.keys(data)[itemSelectedNumber]].commodityOnSale) {
			for (let j = 0; j < data[Object.keys(data)[itemSelectedNumber]].list.length; j++) {
				productsList.innerHTML += `
					<a class="item-products" id="${Object.keys(data)[itemSelectedNumber]}" href="./product.html?idProduct=${data[Object.keys(data)[itemSelectedNumber]].list[j].idProduct}">
						<div class="top">
							<img class="img-product" src="${data[Object.keys(data)[itemSelectedNumber]].list[j].imgProduct}" />
						</div>
						<div class="bottom">
							<span class="name-product">${data[Object.keys(data)[itemSelectedNumber]].list[j].nameProduct}</span>
							<div class="price-product">
								<span class="price-new-product">${convertMoney(data[Object.keys(data)[itemSelectedNumber]].list[j].priceNewProduct)} ₫</span>
								<span class="price-old-product">${convertMoney(data[Object.keys(data)[itemSelectedNumber]].list[j].priceOldProduct)} ₫</span>
							</div>
							<span class="quantity-in-shop-product">Còn ${data[Object.keys(data)[itemSelectedNumber]].list[j].quantityInShopProduct} sản phẩm</span>
						</div>
					</a>
				`
			}
		} else {
			productsList.innerHTML = "<span>Danh mục này chưa có sản phẩm nào!</span>"
			productsList.style.display = "flex"
			productsList.style.justifyContent = "center"
			productsList.style.alignItems = "center"
		}

		var itemCategory = document.querySelectorAll("#products .products-content .products-category .list-category .item-category")
		for (let i = 0; i < itemCategory.length; i++) {
			itemCategory[i].onclick = () => {
				for (let j = 0; j < itemCategory.length; j++) {
					itemCategory[j].classList.remove("selected")
				}
				itemCategory[i].classList.add("selected")

				itemSelectedNumber = i
				productsList.innerHTML = ""
				if (data[Object.keys(data)[itemSelectedNumber]].commodityOnSale) {
					for (let j = 0; j < data[Object.keys(data)[itemSelectedNumber]].list.length; j++) {
						productsList.innerHTML += `
							<a class="item-products" id="${Object.keys(data)[itemSelectedNumber]}" href="./product.html?idProduct=${data[Object.keys(data)[itemSelectedNumber]].list[j].idProduct}">
								<div class="top">
									<img class="img-product" src="${data[Object.keys(data)[itemSelectedNumber]].list[j].imgProduct}" />
								</div>
								<div class="bottom">
									<span class="name-product">${data[Object.keys(data)[itemSelectedNumber]].list[j].nameProduct}</span>
									<div class="price-product">
										<span class="price-new-product">${convertMoney(data[Object.keys(data)[itemSelectedNumber]].list[j].priceNewProduct)} ₫</span>
										<span class="price-old-product">${convertMoney(data[Object.keys(data)[itemSelectedNumber]].list[j].priceOldProduct)} ₫</span>
									</div>
									<span class="quantity-in-shop-product">Còn ${data[Object.keys(data)[itemSelectedNumber]].list[j].quantityInShopProduct} sản phẩm</span>
								</div>
							</a>
						`
						productsList.style.display = "grid"
						if (window.innerWidth > 500) {
							productsList.style.gridTemplateColumns = "repeat(5, 1fr)"
						} else {
							productsList.style.gridTemplateColumns = "repeat(2, 1fr)"
						}
					}
				} else {
					console.log(123)
					productsList.innerHTML = "<span>Danh mục này chưa có sản phẩm nào!</span>"
					productsList.style.display = "flex"
					productsList.style.justifyContent = "center"
					productsList.style.alignItems = "center"
				}
			}
		}
	})

function onWindowResize() {
	content.style.height = window.innerHeight + "px"
}
onWindowResize()

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
