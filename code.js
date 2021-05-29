const courses = document.getElementById('courses');
const subnav = document.querySelector('.sub-nav');
const headerbuttonlink = document.querySelector('.header-button-link');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.fa-times');
const overlay = document.querySelector('.overlay');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const nav = document.getElementById('nav');
const globalHeader = document.querySelector('.global-header');
const container = document.querySelector('.container');
const menuItemHasChildren = document.querySelector('.menu-item-has-children');
const toggleSearch = document.getElementById('toggleSearch')
const headerRow = document.querySelector('.header-row')
const searchInput = document.querySelector('.search-input')
const searchRow = document.querySelector('.search-row')
const featuredCourse = document.querySelector('.featured-course')
const backToTop = document.querySelector('.back-to-top')
const topBar = document.querySelector('.top-bar')

// EventListener
courses.addEventListener('mouseover', function () {
    subnav.style.display = 'flex'
})
subnav.addEventListener('mouseleave', function () {
    this.style.display = 'none'
})
headerbuttonlink.addEventListener('click', showModal)
closePopup.addEventListener('click', closemodal)
openMenu.addEventListener('click', navHambergerMenu)
closeMenu.addEventListener('click', closeHambergerMenu)
menuItemHasChildren.addEventListener('click', toggleDropDown)
toggleSearch.addEventListener('click', toggleSearchHandler)
backToTop.addEventListener('click', goToTopPage)
// EventListener


// Function
function showModal() {
    popup.classList.add('active')
    document.body.style.overflow = 'hidden'
    overlay.classList.add('active')
}

function closemodal() {
    popup.classList.remove('active')
    document.body.style.overflow = 'visible'
    overlay.classList.remove('active')
}

function navHambergerMenu() {
    nav.classList.add('active')
    const width = window.getComputedStyle(nav).getPropertyValue('width')
    globalHeader.style.transform = `translate(${width},0)`
    container.style.transform = `translate(${width},0)`
    document.body.style.overflow = 'hidden'
    closeMenu.style.display = 'block'
    this.style.display = 'none'
}

function closeHambergerMenu() {
    nav.classList.remove('active')
    globalHeader.style.transform = `translate(0,0)`
    container.style.transform = `translate(0,0)`
    document.body.style.overflow = 'visible'
    openMenu.style.display = 'block'
    this.style.display = 'none'
}

function toggleDropDown() {
    const iElement = this.querySelector('i')
    if (iElement.className === "fa fa-angle-left") {
        this.querySelector('i').className = "fa fa-angle-down"
    } else {
        this.querySelector('i').className = "fa fa-angle-left"
    }
    const ulElement = this.querySelector('ul')
    ulElement.classList.toggle('active')
    iElement.setAttribute('style', 'position:absolute;left:0')
    this.classList.toggle('active')
}

function toggleSearchHandler() {
    if (this.className === 'fas fa-search') {
        headerRow.classList.add('disabled')
        searchRow.classList.add('active')
        this.className = 'fa fa-times'
        addSeachRecoginition()
    } else {
        headerRow.classList.remove('disabled')
        searchRow.classList.remove('active')
        this.className = 'fas fa-search'
    }


}

function addSeachRecoginition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition();
    recognition.lang = 'fa-IR';
    recognition.interimResults = true;
    recognition.addEventListener('result', e => {
        //console.log(e.results)
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join("")
        console.log(transcript)
        if (e.results[0].isFinal) {
            searchInput.value = transcript
        }
    })
    recognition.addEventListener('end', recognition.start)
    recognition.start()
}

function goToTopPage() {
    window.scrollTo({top: 0, behavior: `smooth`})
}

// Function


// Animation Border
const menuItem = document.querySelectorAll('.nav-menu li')
const span = document.createElement('span')
span.classList.add('highlight')
document.body.appendChild(span)
menuItem.forEach((item) => {
    item.addEventListener('mouseenter', highlight)
})

function highlight() {
    const itemCoordinates = this.getBoundingClientRect();
    const {left, width, bottom} = itemCoordinates;
    span.style.width = `${width}px`;
    span.style.transform = `translate(${left}px,${bottom}px)`
}

// Animation Border

// Stick nav
window.addEventListener('scroll', function () {
    if (window.scrollY >= globalHeader.offsetHeight) {
        globalHeader.style.position = 'fixed'
    } else {
        globalHeader.style.position = 'relative'
    }
    if (window.scrollY > featuredCourse.scrollHeight / 2) {
        featuredCourse.classList.add('active')
    }
    if (window.scrollY > 100) {
        backToTop.classList.add('active')
    } else {
        backToTop.classList.remove('active')

    }
});
// Stick nav

/* countdown*/
const daysElement = document.getElementById('days')
const hoursElement = document.getElementById('hours')
const minutesElement = document.getElementById('minutes')
const secondsElemet = document.getElementById('seconds')
const publishDate = '20 Feb 2021';

function countDown() {
    const newPublishDate = new Date(publishDate);
    const currentDate = new Date()
    const totalSeconds = (newPublishDate - currentDate) / 1000
    const days = Math.floor(totalSeconds / 3600 / 24)
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds % 60)
    daysElement.innerText = days;
    hoursElement.innerText = hours;
    minutesElement.innerText = minutes;
    secondsElemet.innerText = seconds

}

countDown()
setInterval(countDown, 1000)
/* countdown*/

// shoppingCart
const shoppingCartIcon = document.querySelector('.fa-shopping-bag')
const shoppingCartBox = document.querySelector('.shopping-cart-box')
const shoppingCartItems = document.querySelector('.shopping-cart-items')

// show and hide shopping box
shoppingCartIcon.addEventListener('click', toggleShoppingCartBox)

function toggleShoppingCartBox() {
    shoppingCartBox.classList.toggle('active')
}

//calcute sum of items in shopping cart
function calculateSumShoppingCartItems() {
    const coursesPrice = shoppingCartBox.querySelectorAll('.item-price')
    const reactappCartNumber = topBar.querySelector('.reactapp-cart-number')
    const topBarCartNumber = topBar.querySelector('.top-bar-items-mobile .reactapp-cart-number')
    reactappCartNumber.innerText = coursesPrice.length
    topBarCartNumber.innerText = coursesPrice.length
    let sum = 0;
    coursesPrice.forEach((course) => {
        sum += Number(course.innerText.match(/\d+/))
    })
    const totoalShoppingCart = shoppingCartBox.querySelector('.shopping-cart-total')
    totoalShoppingCart.innerText = `${sum} تومان`
}

calculateSumShoppingCartItems()

//delete shopping cart item
shoppingCartItems.addEventListener('click', deleteCartItem)

function deleteCartItem(e) {
    const item = e.target;
    if (item.className === "fas fa-times") {
        const cartItem = item.parentElement;
        cartItem.remove()
        calculateSumShoppingCartItems()
    }
}

// delete shopping cart item

// Add Items ToShopping Cart
const products = document.querySelectorAll('.course .add-to-cart')
products.forEach((item) => {
    item.addEventListener('click', addToBasket)
});

function addToBasket(e) {
    e.preventDefault();
    const course = (e.target.parentElement.parentElement.parentElement)
    const imageCourse = course.querySelector('img').src;
    const titleCourse = course.querySelector('.course-title a').innerText
    let coursePrice = course.querySelector('.course-price .price .amount').innerText
    if (coursePrice === 'رایگان!') {
        coursePrice = 0;
    } else {
        coursePrice = Number(coursePrice)
    }
    createItem(imageCourse, titleCourse, coursePrice);
}

function createItem(imageCourse, titleCourse, coursePrice) {
    const createItemElement = document.createElement('div');
    createItemElement.className = 'shopping-cart-item'
    createItemElement.innerHTML = `
    <i class="fas fa-times"></i>
       <img src="${imageCourse}" alt="${titleCourse}">
    <div class="cart-item-content">
        <span class="item-name">${titleCourse}</span>
        <span class="item-price">${coursePrice} تومان</span>
    </div>
    `
    shoppingCartItems.appendChild(createItemElement)
    calculateSumShoppingCartItems()
}

// Add Items ToShopping Cart

// shoppingCart

// Slider
const slider = document.querySelector('.course-container')
const carousel = document.querySelector('.newest-course')
const next = document.querySelector('.newest-course-container .fa-angle-right')
const prev = document.querySelector('.newest-course-container .fa-angle-left')
const courseItems = document.querySelectorAll('.course-container .course')
const width = window.getComputedStyle(courseItems[0]).getPropertyValue('width')
let direction;
next.addEventListener('click', function () {
    direction = -1
    carousel.style.justifyContent = 'flex-start'
    slider.style.transform = `translate(-${width})`
})
prev.addEventListener('click', function () {
    if (direction === -1) {
        direction = 1
        slider.appendChild(slider.firstElementChild)
    }
    carousel.style.justifyContent = 'flex-end'
    slider.style.transform = `translate(${width})`
})
slider.addEventListener('transitionend', function () {
    if (direction === 1) {
        slider.append(slider.lastElementChild)
    } else {
        slider.appendChild(slider.firstElementChild)
    }
    slider.style.transition = `none`
    slider.style.transform = `translate(0)`
    setTimeout(() => {
        slider.style.transition = `all 300ms`
    })
}, false)
// Slider

// user Comments
const comments = document.querySelectorAll('.comments-container .comment')
const dotsContainer = document.querySelector('.dots-container')
const commentsContainer = document.querySelector('.comments-container')
comments.forEach((item, index) => {
    const span = document.createElement('span')
    span.classList.add('dots')
    span.setAttribute('position', index)
    span.addEventListener('click', slideComment)
    dotsContainer.appendChild(span)
});
let commentWidth = window.getComputedStyle(comments[0]).getPropertyValue('width')
commentWidth = Number(commentWidth.match(/\d+/))

function slideComment(e) {
    const position = e.target.getAttribute('position')
    commentsContainer.style.transform = `translateX(-${commentWidth * position}px)`;
    dotsContainer.querySelectorAll('.dots').forEach(item => item.style.opacity = '0.5')
    e.target.style.opacity = '1'
}

// user Comments

// magnifiy
const magnifiy = (function () {
    const picCourse = document.querySelector('.course-info .pic-course')
    const img = picCourse.querySelector('img')
    const glass = document.createElement('div')
    const glassDimensions = 150;
    let isVisible = false;

    glass.classList.add('glass');
    glass.style.width = `${glassDimensions}px`
    glass.style.height = `${glassDimensions}px`
    glass.style.backgroundImage = `url(${img.src})`
    picCourse.append(glass)

    img.addEventListener('mouseover', function () {
        glass.style.display = 'block'
        isVisible = true
    })
    img.addEventListener('mouseout', function () {
        glass.style.display = 'none'
        isVisible = false
    })
    picCourse.addEventListener('mousemove', function (evt) {
        if (isVisible) {
            const mouseX = evt.clientX
            const mouseY = evt.clientY;
            //console.log(mouseX,mouseY)
            const imgCoordinates = img.getBoundingClientRect();
            const {left, top} = imgCoordinates;
            //console.log(left,top)
            const bgX = 100 * (mouseX - left) / img.offsetWidth;
            const bgY = 100 * (mouseY - top) / img.offsetHeight;
            glass.style.left = `${mouseX - left - glassDimensions / 2}px`
            glass.style.top = `${mouseY - top - glassDimensions / 2}px`
            glass.style.backgroundPosition = `${bgX}% ${bgY}%`

        }
    })

})();
// magnifiy
