// INSTALL LOCOMOTIVE SCROLL
let locoScroll;
locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    inertia: 0.75,
    getDirection: true,
    smartphone: {
        smooth: true,
        inertia: 0.75,
        getDirection: true
    },
    mobile: {
        smooth: true,
        inertia: 0.75,
        getDirection: true
    },
    tablet: {
        smooth: true,
        inertia: 0.75,
        getDirection: true
    }
});

new ResizeObserver(() => locoScroll.update()).observe(
    document.querySelector("[data-scroll-container]")
);

/* LOCOMOTIVE ALL ANCHOR SMOOTH SCROLLING */
const anchorLinks = document.querySelectorAll('a[href^=\\#]:not([href$=\\#])');

anchorLinks.forEach((anchorLink) => {
    let hashval = anchorLink.getAttribute('href');
    let target = document.querySelector(hashval);

    anchorLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        locoScroll.scrollTo(target);
    });
});

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

const preloader = document.querySelector("[data-preloader]");
const header = document.querySelector("[data-header]");
const mainContent = document.querySelector("[data-main-content]");
const features = document.querySelector("[data-features]");
const hero = document.querySelector("[data-hero]");
const heroLabel = document.querySelector("[data-hero-label]");
const heroHeading = document.querySelector("[data-hero-heading]");
const heroText = document.querySelector("[data-hero-text]");
const heroLink = document.querySelector("[data-hero-link]");
const heroBtn = document.querySelector("[data-hero-btn]");
const heroBanner = document.querySelector("[data-hero-banner]");
const navigation = document.querySelector("[data-navigation]");

window.addEventListener("load", () => {
    preloader.classList.add("remove");
    header.classList.add("display-block");
    mainContent.classList.add("display-block");
    hero.classList.add("display-block");
    heroLabel.classList.add("animation");
    heroHeading.classList.add("animation");
    heroText.classList.add("animation");
    navigation.classList.add("display-block");
});

const addEventOnElements = function (elements, eventType, callBack) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callBack);
    }
}

const navbar = document.querySelector("[data-navbar]");
const navbarTogglers = document.querySelectorAll("[data-navbar-toggler]");
const html = document.querySelector("html");
const mainContentBackdrop = document.querySelector(".main-content");
const headerMobileNavOpen = document.querySelector(".header__wrapper");

const toggleNav = function () {
    navbar.classList.toggle("active");
    mainContentBackdrop.classList.toggle("backdrop");
    html.classList.toggle("overflow-hidden");
    headerMobileNavOpen.classList.toggle("opacity-none");
}

addEventOnElements(navbarTogglers, "click", toggleNav);

locoScroll.on('scroll', (instance) => {
    if (instance.scroll.y > 50) {
        header.classList.add("active-scroll");
    } else {
        header.classList.remove("active-scroll");
    }
});

window.onload = function () {
    document.addEventListener("click", documentActions);

    function documentActions(e) {
        const targetElement = e.target;

        if (targetElement.classList.contains('destination__btn')) {
            getProducts(targetElement);
            e.preventDefault();
        }
    }

    // Load More Products
    async function getProducts(button) {
        if (!button.classList.contains('_hold')) {
            button.classList.add('_hold');
            const file = "js/products.json";
            let response = await fetch(file, {
                method: "GET"
            });
            if (response.ok) {
                let result = await response.json();
                loadProducts(result);
                button.classList.remove('_hold');
                button.remove();
            } else {
                alert("Ошибка");
            }
        }
    }

    function loadProducts(data) {
        const productsItems = document.querySelector('.destination__wrapper');
        data.products.forEach(item => {
            const productId = item.id;
            const productUrl = item.url;
            const productPrice = item.price;
            const productStar = item.star;
            const productReview = item.review;
            const productImage = item.image;
            const productTitle = item.title;
            const productText = item.text;
            let productTemplateStart = `<div data-pid="${productId}" class="destination-card">`;
            let productTemplateEnd = `</div>`;

            let productTemplateImage = `
		<div href="${productUrl}" class="destination-card__img">
			<img src="img/${productImage}" alt="${productTitle}">
		</div>
	`;

            let productTemplateBodyStart = `<a href="#destination" class="destination-card__link"><div class="destination-card__content"><div class="price">${productPrice}</div>`;
            let productTemplateBodyEnd = `</a></div>`;


            let productTemplateContent = `
		<div class="destination-card__content destination-content">
			<h3 class="destination-content__heading content-feature__heading">${productTitle}</h3>
			<p class="destination-content__location content-feature__text">${productText}</p>
		</div>
        
	`;


            let productTemplateActions = `
            <div class="destination-card__review destination-review">
            <p class="destination-review__star">
                <ion-icon name="star" aria-hidden="true"></ion-icon>${productStar}
            </p>
            <p class="destination-review__number">${productReview}</p>
        </div>
	`;

            let productTemplateBody = '';
            productTemplateBody += productTemplateBodyStart;
            productTemplateBody += productTemplateContent;
            productTemplateBody += productTemplateActions;
            productTemplateBody += productTemplateBodyEnd;

            let productTemplate = '';
            productTemplate += productTemplateStart;
            productTemplate += productTemplateImage;
            productTemplate += productTemplateBody;
            productTemplate += productTemplateEnd;

            productsItems.insertAdjacentHTML('beforeend', productTemplate);
        });
    }
}

// Set current year in copyright
const year = document.querySelector(".current-year");
const currentYear = new Date().getFullYear();
year.textContent = currentYear;