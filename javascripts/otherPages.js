function scrollAndOffset(place, pixels) {
    let headPoint = document.getElementsByClassName('headBannerOtherPages')[0]
    location.hash = `${headPoint}`;
    // Starting with window.scrollTo(0,0) is necessary to overcome the bug of
    // unexpected behaviour when the target div is already displayed on some part of the screen.
    location.hash = `${place}`;
    window.scrollTo(window.scrollX, window.scrollY - pixels);
}

document.getElementsByClassName('logoAtTopOtherPages')[0].addEventListener('click', goHome);

function goHome() {
    window.location.href = "../main.html"
}

const btnsToBuyPage = document.getElementsByClassName('btnToBuyPage');

// console.log(btnsToBuyPage);

for (let btn of btnsToBuyPage) {
    btn.innerText = 'Engage our services!';
    btn.addEventListener('click', () => {
        window.location.href='/views/buy-services.html';
    });
}

