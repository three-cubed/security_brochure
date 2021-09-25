if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', addEventListeners)
} else {
	addEventListeners();
}

function addEventListeners() {
    document.getElementsByClassName('logoAtTopOtherPages')[0].addEventListener('click', goHome);

    const btnsToBuyPage = document.getElementsByClassName('btnToBuyPage');
    for (let btn of btnsToBuyPage) {
        btn.innerText = 'Engage our services!';
        btn.addEventListener('click', () => {
            window.location.href='/toBuy/buy';
        });
    }
}

function scrollAndOffset(place, pixels) {
    let headPoint = document.getElementsByClassName('headBannerOtherPages')[0]
    location.hash = `${headPoint}`;
    // Starting with headpoint is necessary to overcome the bug of
    // unexpected behaviour when the target div is already displayed on some part of the screen.
    location.hash = `${place}`;
    window.scrollTo(window.scrollX, window.scrollY - pixels);
}

function goHome() {
    window.location.href = "../"
}
