/**
 * Evelocore 2024
 * Compare colours in a pixel of image
 */
const video = document.getElementById('videoElement');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing webcam:', error);
    });

// Capture image from video feed
captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // To download the captured image, you can convert the canvas to data URL and create a link
    const link = document.createElement('a')
    link.download = 'captured.png'
    link.href = canvas.toDataURL()
    link.click()
});

let imageData = null
// Capture image from video feed and get color of middle pixel
setInterval(() => {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    const camColorLive = document.getElementsByClassName("camColorLive")
    // Get the color of the middle pixel
    imageData = context.getImageData(canvas.width / 2, canvas.height / 2, 1, 1)
    const pixelColor = `rgb(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]})`
    camColorLive[0].innerHTML = imageData.data[0]
    camColorLive[1].innerHTML = imageData.data[1]
    camColorLive[2].innerHTML = imageData.data[2]
    camColorLive[0].style.backgroundColor = `rgb(${imageData.data[0]}, 0, 0)`
    camColorLive[1].style.backgroundColor = `rgb(0, ${imageData.data[1]}, 0)`
    camColorLive[2].style.backgroundColor = `rgb(0, 0, ${imageData.data[2]})`
    camColorLive[3].innerHTML = pixelColor
    camColorLive[3].style.backgroundColor = pixelColor
    if(imageData.data[0] > 120 && imageData.data[1] > 120 && imageData.data[2] > 120){
        camColorLive[3].style.color = "black"
        camColorLive[3].style.boxShadow = "00 1px 10px rgb(0, 0, 0)"
        document.querySelectorAll('.cam-item')[1].style.border = "1px solid black"
        document.querySelectorAll('.cam-item')[2].style.backgroundColor = "black"
        document.querySelectorAll('.cam-item')[3].style.backgroundColor = "black"
    }else{
        camColorLive[3].style.color = "white"
        camColorLive[3].style.boxShadow = "00 1px 0px rgb(0, 0, 0)"
        document.querySelectorAll('.cam-item')[1].style.border = "1px solid white"
        document.querySelectorAll('.cam-item')[2].style.backgroundColor = "white"
        document.querySelectorAll('.cam-item')[3].style.backgroundColor = "white"
    }
}, 100)

//variables
let MEMORY = {
    memoryA: [0,0,0],
    memoryB: [0,0,0]
}
//learn memory A
function learnMemoryA() {
    //setup name
    const title = document.getElementsByClassName("enterName")[0].value || 'Memory A'
    memory1title.innerHTML = title
    //setup image
    memory1_img.src = canvas.toDataURL()
    //get pixels
    memory1_R.innerHTML = MEMORY.memoryA[0] = imageData.data[0] //R
    memory1_G.innerHTML = MEMORY.memoryA[1] = imageData.data[1] //G
    memory1_B.innerHTML = MEMORY.memoryA[2] = imageData.data[2] //B
    console.log("Memory A => "+MEMORY.memoryA)
}
//learn memory B
function learnMemoryB() {
    //setup name
    const title = document.getElementsByClassName("enterName")[1].value || 'Memory B'
    memory2title.innerHTML = title
    //setup image
    memory2_img.src = canvas.toDataURL()
    //get pixels
    memory2_R.innerHTML = MEMORY.memoryB[0] = imageData.data[0] //R
    memory2_G.innerHTML = MEMORY.memoryB[1] = imageData.data[1] //G
    memory2_B.innerHTML = MEMORY.memoryB[2] = imageData.data[2] //B
    console.log("Memory A => "+MEMORY.memoryA)
}
// Matching
setInterval(()=>{
    //Matching - Memory A
    var memoryA_matchR = Math.floor((255 - Math.abs(MEMORY.memoryA[0] - imageData.data[0])) / 255 * 100) // Red Match
    var memoryA_matchG = Math.floor((255 - Math.abs(MEMORY.memoryA[1] - imageData.data[1])) / 255 * 100) // Green Match
    var memoryA_matchB = Math.floor((255 - Math.abs(MEMORY.memoryA[2] - imageData.data[2])) / 255 * 100) // Blue Match
    var memoryA_match  = Math.floor((memoryA_matchR + memoryA_matchG + memoryA_matchB) / 3)
    document.querySelectorAll('.flexrow-match-buttons button')[0].innerText = memoryA_matchR
    document.querySelectorAll('.flexrow-match-buttons button')[1].innerText = memoryA_matchG
    document.querySelectorAll('.flexrow-match-buttons button')[2].innerText = memoryA_matchB
    document.querySelectorAll('.flexrow-match-buttons button')[3].innerText = memoryA_match

    //Matching - Memory B
    var memoryB_matchR = Math.floor((255 - Math.abs(MEMORY.memoryB[0] - imageData.data[0])) / 255 * 100) // Red Match
    var memoryB_matchG = Math.floor((255 - Math.abs(MEMORY.memoryB[1] - imageData.data[1])) / 255 * 100) // Green Match
    var memoryB_matchB = Math.floor((255 - Math.abs(MEMORY.memoryB[2] - imageData.data[2])) / 255 * 100) // Blue Match
    var memoryB_match  = Math.floor((memoryB_matchR + memoryB_matchG + memoryB_matchB) / 3)
    document.querySelectorAll('.flexrow-match-buttons button')[4].innerText = memoryB_matchR
    document.querySelectorAll('.flexrow-match-buttons button')[5].innerText = memoryB_matchG
    document.querySelectorAll('.flexrow-match-buttons button')[6].innerText = memoryB_matchB
    document.querySelectorAll('.flexrow-match-buttons button')[7].innerText = memoryB_match

    //Final desition
    if(memoryA_match > memoryB_match){
        // memory A is correct
        machedName.innerHTML = memory1title.innerHTML || 'Memory A'
    }else{
        // memory B is correct
        machedName.innerHTML = memory2title.innerHTML || 'Memory B'
    }
}, 100)