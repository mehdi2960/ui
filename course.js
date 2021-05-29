const courses = document.getElementById('courses')
const subNav = document.querySelector('.sub-nav')
const popup = document.querySelector('.popup')
const signUpButton = document.querySelector('.header-button-link')
const closePopup = document.querySelector('.fa-times')
const overlay = document.querySelector('.overlay')
const form = document.getElementById('form')
const username = document.getElementById('username')
const password = document.getElementById('password')
const recaptha = document.getElementById('recaptha-box')
const menuIcon = document.getElementById('openMenu')
const closeHamergurMenu = document.getElementById('closeMenu')
const hambergerMenu = document.getElementById('nav')
const globalHeader = document.querySelector('.global-header')
const topBar = document.querySelector('.top-bar')
const container = document.querySelector('.container')
const mobileItemChildren = document.querySelector('.menu-item-has-children')
const userIcon = document.querySelector('.fa-user-circle')
const toggleSearch = document.getElementById('toggleSearch')
const headerRow = document.querySelector('.header-row')
const searchRow = document.querySelector('.search-row')
const searchInput = document.querySelector('.search-input')
const featuredCourse = document.querySelector('.featured-course')
const backToTop = document.querySelector('.back-to-top')
//event listener
courses.addEventListener('mouseover', function () {
    subNav.style.display = 'flex'
})
subNav.addEventListener('mouseleave', function () {
    this.style.display = 'none'
})
userIcon.addEventListener('click', showModal)
signUpButton.addEventListener('click', showModal)
closePopup.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkInputs()
})
menuIcon.addEventListener('click', openHambergerMenu)
closeHamergurMenu.addEventListener('click', closeHambergerMenu)
mobileItemChildren.addEventListener('click', toggleDropDownMenuMobile)
toggleSearch.addEventListener('click', toggleSearchHandler)
backToTop.addEventListener('click', goToTopPage)

//Function

function showModal() {
    const span = signUpButton.querySelector('span')
    if (span.innerText === 'ورود و ثبت نام') {
        popup.classList.add('active')
        overlay.classList.add('active')
        document.body.style.overflow = 'hidden'
    }

}

function closeModal() {
    popup.classList.remove('active')
    overlay.classList.remove('active')
    document.body.style.overflow = 'visible'
}

function checkInputs() {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    if (usernameValue === '') {
        setErrorFor(username, 'نام کاربری باید حتما وارد شود')
    } else if (!validateEmail(usernameValue)) {
        setErrorFor(username, 'ایمیل باید با فرمت صحیح وارد شود')
    } else {
        setSuccessFor(username)
    }
    if (passwordValue === '') {
        setErrorFor(password, 'رمز عبور باید حتما وارد شود')
    }
    if (passwordValue.length < 6) {
        setErrorFor(password, 'رمز عبور باید حداقل 6 کاراکتر باشد ')
    } else {
        setSuccessFor(password)
    }
    checkRecaptcha()
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error'
    return false
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.style.visibilty = 'visible';
    formControl.className = 'form-control success'
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

function checkRecaptcha() {
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
        setErrorFor(recaptha, 'من ربات نیستم را تیک بزنید')
    } else {
        closeModal();
        const span = signUpButton.querySelector('span')
        span.innerText = 'حساب کاربری'
    }
}

function openHambergerMenu() {
    hambergerMenu.classList.add('active');
    const width = window.getComputedStyle(hambergerMenu).getPropertyValue('width');
    globalHeader.style.transform = `translate(${width},0)`
    container.style.transform = `translate(${width},0)`
    topBar.style.transform = `translate(${width},0)`
    document.body.style.overflow = 'hidden';
    closeHamergurMenu.style.display = 'block';
    this.style.display = 'none'
}

function closeHambergerMenu() {
    hambergerMenu.classList.remove('active');

    globalHeader.style.transform = `translate(0,0)`
    container.style.transform = `translate(0,0)`
    topBar.style.transform = `translate(0,0)`
    document.body.style.overflow = 'visible';
    menuIcon.style.display = 'block';
    this.style.display = 'none'
}

function toggleDropDownMenuMobile() {
    const iElement = this.querySelector('i')
    if (iElement.className === "fa fa-angle-left") {
        this.querySelector('i').className = "fa fa-angle-down"
    } else {
        this.querySelector('i').className = "fa fa-angle-left"
    }
    const ulElement = this.querySelector('ul');
    ulElement.classList.toggle('active')
    iElement.setAttribute('style', 'position:absolute;left:0')
    this.classList.toggle('active')
}

function toggleSearchHandler() {
    if (this.className === "fa fa-search") {
        headerRow.classList.add('disabled')
        searchRow.classList.add('active')
        this.className = "fa fa-times"
        addSeachRecoginition()
    } else {
        headerRow.classList.remove('disabled')
        searchRow.classList.remove('active')
        this.className = "fa fa-search"
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

/* animation border menu item */
const menuItems = document.querySelectorAll('.nav-menu li')
const span = document.createElement('span')
span.classList.add('highlight')
document.body.appendChild(span)
menuItems.forEach((item) => {
    item.addEventListener('mouseenter', highlight)
})

function highlight() {
    const itemCoordinates = this.getBoundingClientRect();
    const {left, width, bottom} = itemCoordinates;
    span.style.width = `${width}px`;
    span.style.transform = `translate(${left}px,${bottom}px)`
}

/* animation border menu item */

/* stick nav */
const courseContent = document.querySelector('.course-content')
const studyMode = document.querySelector('.study-mode')
const courseInfo = document.querySelector('.course-info')
const courseDetailInfo = document.querySelector('.course-detail-info')
window.addEventListener('scroll', function () {
    if (window.scrollY >= globalHeader.offsetHeight) {
        globalHeader.style.position = 'fixed'
    } else {
        globalHeader.style.position = 'relative'
    }

    //backToTop
    const opacityBackToTop = window.getComputedStyle(backToTop).getPropertyValue('opacity')
    if (window.scrollY > 100) {
        if (opacityBackToTop < 1)
            backToTop.classList.add('active')
    } else {
        backToTop.classList.remove('active')
    }
    //backToTop

    if (window.scrollY > courseContent.offsetTop + 80 && window.scrollY + 20 < courseInfo.offsetHeight) {
        studyMode.style.position = 'fixed'
        studyMode.style.right = '100px';
        studyMode.style.top = `${studyMode.offsetHeight / 4}px`
    } else if (window.scrollY < courseContent.offsetTop + 80) {
        studyMode.style.position = 'absolute'
        studyMode.style.right = '-54px';
        studyMode.style.top = `0`
    } else if (window.scrollY + 20 > courseInfo.offsetHeight) {
        studyMode.style.position = 'absolute'
        studyMode.style.right = '-54px';
        studyMode.style.top = `${courseContent.offsetHeight - 40}px`
    }

    //sidebar Fixed
    if (window.scrollY > courseDetailInfo.parentElement.offsetTop && window.scrollY < courseContent.offsetHeight + 50) {
        courseDetailInfo.style.position = 'fixed';
        courseDetailInfo.style.left = '50px';
        courseDetailInfo.style.top = '0px';
        courseDetailInfo.parentElement.classList.add('fixed')

    } else if (window.scrollY >= courseContent.offsetHeight + 50) {
        courseDetailInfo.style.position = 'relative';
        courseDetailInfo.parentElement.classList.remove('fixed')
        courseDetailInfo.style.top = `${courseInfo.offsetHeight - courseDetailInfo.offsetHeight}px`
    } else {
        courseDetailInfo.style.position = 'relative';
        courseDetailInfo.parentElement.classList.remove('fixed')
    }
})
/* stick nav */

/*shopping cart */
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
    const reactappCartNumber = topBar.querySelector('.studiare-cart-number')
    const topBarCartNumber = topBar.querySelector('.top-bar-items-mobile .studiare-cart-number')
    const navCartNumber = hambergerMenu.querySelector('.studiare-cart-number')

    // reactappCartNumber.innerText = coursesPrice.length
    // topBarCartNumber.innerText = coursesPrice.length
    // navCartNumber.innerText = coursesPrice.length
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

//add item to shopping cart

const products = document.querySelectorAll('.featured-course-container .add-to-cart')
products.forEach((item) => {
    item.addEventListener('click', addToBascket)
})

function addToBascket(e) {
    e.preventDefault();
    const course = (e.target.parentElement.parentElement.parentElement)
    const imageCoourse = course.querySelector('img').src;
    const courseTitle = course.querySelector('.course-title a').innerText
    let coursePrice = course.querySelector('.course-price .price .amount').innerText
    // console.log(imageCoourse,courseTitle,coursePrice)
    if (coursePrice === 'رایگان!') {
        coursePrice = 0;
    } else {
        coursePrice = Number(coursePrice)
    }
    createItem(imageCoourse, courseTitle, coursePrice)
}

function createItem(imageCoourse, courseTitle, coursePrice) {
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'shopping-cart-item'
    cartItemElement.innerHTML = `
    <i class="fas fa-times"></i>
    <img src="${imageCoourse}" alt="${courseTitle}" />
    <div class="cart-item-content">
        <span class="item-name">${courseTitle}</span>
        <span class="item-price">${coursePrice}  تومان</span>
    </div>
    `
    shoppingCartItems.appendChild(cartItemElement)
    calculateSumShoppingCartItems()
}

/*shopping cart */
// magnifiy
const magnifiy = (function () {
    const picCourse = document.querySelector('.course-info .pic-course')
    const img = picCourse.querySelector('img')
    const glass = document.createElement('div')
    const glassDimensions = 100;
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

// study Mode
const studyModeBtn = document.querySelector('.study-mode-btn')
let isActive = false
studyModeBtn.addEventListener('click', function () {
    isActive = !isActive
    if (isActive) {
        courseInfo.style.width = '80%'
        courseDetailInfo.style.display = 'none'
    } else {
        courseInfo.style.width = '60%'
        courseDetailInfo.style.display = 'block'
    }
})
// study Mode

// accordian
const accorianTcons = document.querySelectorAll('.course-section .fa-chevron-down')
accorianTcons.forEach(item => item.addEventListener('click', toggleAccordian))

function toggleAccordian(event) {
    const icon = event.target
    const courseSection = (icon.parentElement.parentElement)
    const panelGroup = courseSection.querySelector('.panel-group')
    const height = window.getComputedStyle(panelGroup).getPropertyValue('height')
    if (height === '0px') {
        panelGroup.style.height = 'auto'
        panelGroup.style.transform = 'scaleY(1)'
        icon.style.transform = 'rotate(180deg)'
    } else {
        panelGroup.style.height = '0px'
        panelGroup.style.transform = 'scaleY(0)'
        icon.style.transform = 'rotate(360deg)'
    }

}

// accordian
