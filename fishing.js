function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function doFishing(){
    fishingBar = parseInt(document.getElementsByClassName('progress-gradient-wrapper')[0].style.height.replace('%',''));
    while(fishingBar < 100){
        document.getElementsByClassName('indicator')[0].style.transform = document.getElementsByClassName('fish')[0].style.transform;
        fishingBar = parseInt(document.getElementsByClassName('progress-gradient-wrapper')[0].style.height.replace('%',''));
        await sleep(250);
        if (fishingBar >= 100){
            break;
        }
    }
}

doFishing();