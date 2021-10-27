function scrollAndOffset(place, pixels) {
	location.hash = headBanner;
    // Starting with location.hash = headBanner is necessary to overcome the bug of
    // unexpected behaviour when the target div is already displayed on some part of the screen.
    location.hash = `${place}`;
    window.scrollTo(window.scrollX, window.scrollY - pixels);
}

// Simply add any new image here with an index number. No other changes required.
let images = [];
const imagePath = './images/slideshow/'
images[0] = `${imagePath}london-security-landscape.jpeg`;
images[1] = `${imagePath}cyber-padlocks.jpeg`;
images[2] = `${imagePath}countryside-car-security.jpeg`;
images[3] = `${imagePath}security-cyber-silhouettes.jpeg`;
images[4] = `${imagePath}masked-office-man.jpeg`;

const time = 3600;	// Time for each image to show.
let i = 0;

function runImageSlideshow(){
	document.slide.src = images[i];
	if(i < images.length - 1){
		i++;
	} else { 
		i = 0;
	}
	setTimeout('runImageSlideshow()', time);
}

function detectMobileOrNarrow() {
	if (window.innerWidth <= 900) {
		console.log('NARROW SCREEN')
	} else {
		console.log('NORMAL SCREEN');
	}
}

window.onload = () => {
	detectMobileOrNarrow();
	runImageSlideshow();
};

window.onresize = detectMobileOrNarrow();
