// Initialise Elements
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');  //play wala at the end
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName'); //song name at end 
let songItems=Array.from(document.getElementsByClassName('songItem')); //all 10 songs class ka array ban jayega

// array of objects : associative array
let songs=[
    {songName: " Choomantar ", filePath:"songs/1.mp3", coverPath:"https://a10.gaanacdn.com/gn_img/albums/w4MKPDOKoj/4MKPDVqoKo/size_xs.webp"},
    {songName: " MashAllah ", filePath:"songs/2.mp3", coverPath:"https://a10.gaanacdn.com/gn_img/albums/BZgWoQOK2d/ZgWo4D5b2d/size_xs.webp"},
    {songName: " Ab To Forever ", filePath:"songs/3.mp3", coverPath:"https://a10.gaanacdn.com/gn_img/albums/Oxd3xzPbgV/xd3xjq5bgV/size_xs.webp"},
    {songName: " I Hate Luv Storys ", filePath:"songs/4.mp3", coverPath:"https://a10.gaanacdn.com/gn_img/albums/01A3mrWNQX/1A3molL9bN/size_xs.webp"},
    {songName: " Bheegi Si Bhaagi Si ", filePath:"songs/5.mp3", coverPath:"	https://a10.gaanacdn.com/gn_img/albums/MmqK5pEbwR/mqK5OBVWwR/size_xs.webp"},
    {songName: " Chori Kiya Re Jiya ", filePath:"songs/6.mp3", coverPath:"https://a10.gaanacdn.com/gn_img/albums/YoEWlwa3zX/YoEWlAmbzX/size_xs.webp"},
    {songName: " Dil Leke ", filePath:"songs/7.mp3", coverPath:"https://a10.gaanacdn.com/gn_img/albums/9En3pqeWXD/9En3pzGbXD/size_xs.webp"},
    {songName: " Nazrein Milaana Nazrein Churaana ", filePath:"songs/8.mp3", coverPath:"https://a10.gaanacdn.com/gn_img/albums/mGjKrP1W6z/mGjKrP1W6z/size_xs.webp"},
    {songName: " Jab Se Tere Naina ", filePath:"songs/9.mp3", coverPath:"https://a10.gaanacdn.com/gn_img/albums/koMWQ7BKqL/oMWQpxB3qL/size_xs.webp"},
    {songName: " Dekha Hazaro Dafaa ", filePath:"songs/10.mp3", coverPath:"https://a10.gaanacdn.com/gn_img/albums/Dk9KN2KBx1/k9KN8zvJWB/size_xs.webp"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML=songs[i].songName;
})

// audioElement.play()

// Handle play/Pause /stop click at the end 
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause()
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity=0;
    }
})

makeAllPlay=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// ab ye 10 play button ki baat ho rahe hai 
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.addEventListener('click',(e)=>{
            if(audioElement.paused || audioElement.currentTime<=0){
                makeAllPlay();
                songIndex = parseInt(e.target.id);
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.src = `songs/${songIndex}.mp3`;
                masterSongName.innerHTML=songs[songIndex-1].songName;
                audioElement.currentTime=0;

                audioElement.play();
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity=1;
        }
            else{
                audioElement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterPlay.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                gif.style.opacity=0;
            }
        })  
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// Listen to events
audioElement.addEventListener('timeupdate',()=>{     //yaha seekbar aapne app aage aage bhadhega jaise song chalega 
    // update seekbar
    var progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{   //hum seekbar ko automatically change kar sakte hai from where we have to play it 
    audioElement.currentTime = ((myProgressBar.value*audioElement.duration)/100);
})