const musicdata = [
  {
    id: "Bahor",
    musicname: "Bahor",
    muallif: "Sherali Jorayev",
  },
  {
    id: "Dostim",
    musicname: "Dostim",
    muallif: "Osman Navroz",
  },
  {
    id: "inson",
    musicname: "inson",
    muallif: "Konsta",
  },
  {
    id: "Loseyourself",
    musicname: "Loseyourself",
    muallif: "Eminem",
  },
  {
    id: "ona",
    musicname: "ona",
    muallif: "Ozodbek Nazarbekov",
  },
  {
    id: "torkocha",
    musicname: "torkocha",
    muallif: "Ziyoda",
  },
  {
    id: "baland",
    musicname: "baland",
    muallif: "Shoxruh rep",
  },
];
const mainimg = document.querySelector(".mainimg");
const realmusic = document.querySelector(".realmusic");
const forward = document.querySelector("#forward");
const preview = document.querySelector("#preview");
const modal = document.querySelector(".modal");
const modalopen = document.querySelector("#modalopen");
const exit = document.querySelector(".exit");
const heart = document.querySelector(".heart");
const players = document.querySelector(".players");
const pauses = document.querySelector(".pauses");
const musicnomio = document.querySelector(".musicnomio");
const musiqa=document.querySelector(".musiqa")
const currentimes=document.querySelector(".currentimes")
const alltime=document.querySelector(".alltime")
const authorname=document.querySelector(".authorname")
const slider=document.querySelector(".slider")
const nuqta=document.querySelector(".nuqta")
const rangeinput=document.querySelector(".rangeinput")
const mainrow=document.querySelector(".mainrow")
const shuffelelement=document.querySelector("#shuffelelement")
const rotatemusic=document.querySelector("#rotatemusic")
let newnumber = 0;
const writedata = (index) => {
  mainimg.src = `./imgs/${musicdata[index].id}.jpg`;
  realmusic.src = `./music/${musicdata[index].id}.mp3`;
  musicnomio.textContent=`${musicdata[index].id}`
  authorname.textContent=`${musicdata[index].muallif}`
} 
writedata(newnumber);
forward.addEventListener("click", () => {
nextmusic()

});
const nextmusic=()=>{
if (musicdata.length - 1 > newnumber) {
    newnumber++;
    musiqa.classList.add("active")
    writedata(newnumber);
     mainimg.classList.add("active")
  } else {
    newnumber = 0;
    writedata(newnumber);
  }
  realmusic.play()
}
preview.addEventListener("click", () => {
 previesmusic()
  realmusic.play();
});
const previesmusic=()=>{
   if (newnumber > 0) {
    newnumber--;
    writedata(newnumber);
    musiqa.classList.add("active")
    mainimg.classList.add("active")
  } else {
    newnumber = musicdata.length - 1;
    writedata(newnumber);
  }
  realmusic.play()
}
modalopen.addEventListener("click", () => {
  modal.classList.add("active");
});
exit.addEventListener("click", () => {
  modal.classList.remove("active");
});
musiqa.addEventListener('click', () => {
if(musiqa.classList.contains("active")){
  musiqa.classList.remove("active")
  mainimg.classList.remove("active")
  realmusic.pause()
}else{
  musiqa.classList.add("active")
  realmusic.play()
  mainimg.classList.add("active")
}
});
realmusic.addEventListener("timeupdate",(e)=>{
let duration=e.target.duration
let currenttime=e.target.currentTime
let result=currenttime*100/duration

nuqta.style=`width:${result}%`

alltime.textContent=timeformattor(duration)
currentimes.textContent=timeformattor(currenttime)
})
const timeformattor=(time)=>{
  if(isNaN(time)){
    return "00:00"
  }else{
     let minut=Math.floor(time / 60)>=10?Math.floor(time / 60):"0"+Math.floor(time / 60)
     let sec=Math.floor(time % 60)>=10?Math.floor(time % 60):"0"+Math.floor(time % 60)
     return `${minut}:${sec}`
  }
}
slider.addEventListener("click",(e)=>{
  let clientwidth=e.currentTarget.clientWidth
  let offsetx=e.offsetX
  let time =realmusic.duration*offsetx/clientwidth
  realmusic.currentTime=time
  musiqa.classList.add("active")
  realmusic.play()
})
realmusic.addEventListener("ended", () => {
    if(rotatemusic.classList.contains("active")) {
        realmusic.currentTime = 0;
        realmusic.play();
    } else {
        nextmusic();
    }
});

const pausedMusic=()=>{
if(musiqa.classList.contains("active")){
  musiqa.classList.remove("active")
  realmusic.pause()
}else{
  musiqa.classList.add("active")
  realmusic.play()
}
}
window.addEventListener("keydown",(e)=>{  
 if(e.key=="ArrowRight"){
  nextmusic()
 }else if(e.key=="ArrowLeft"){
  previesmusic()}
  else if(e.key==="ArrowUp"){
    realmusic.volume =rangeinput.value/100+0.1
    rangeinput.value=realmusic.volume*100
  }
  else if(e.key==="ArrowDown"){
   realmusic.volume =rangeinput.value/100-0.1
    rangeinput.value=realmusic.volume*100
  }else if(e.code === "Space"){
  e.preventDefault(); 
  pausedMusic();
}
})

heart.addEventListener("click",()=>{
  heart.classList.toggle("active")
})
rangeinput.addEventListener("input",()=>{
  realmusic.volume=rangeinput.value/100
})
const writemusics=(newdata)=>{
   mainrow.innerHTML=""
newdata.forEach((items,index)=>{
  mainrow.innerHTML+=`
  <div class="rowarray" onclick="playmusics(${index})">
              <span class="musicnumber">${index+1}</span>
              <h1 class="musicnames">${items.musicname}</h1>
              <img class="lastimg" src="./imgs/${items.musicname}.jpg" alt="" />
            </div>
  `
})
}
writemusics(musicdata)
const playmusics=(index)=>{
  modal.classList.remove("active")
newnumber=index
writedata(newnumber)
musiqa.classList.add("active")
realmusic.play()
mainimg.classList.add("active")
}
shuffelelement.addEventListener("click",()=>{
let newindex;
do {
    newindex=Math.floor(Math.random()*musicdata.length)
} while (newindex===newnumber);
newnumber=newindex
writedata(newnumber)
realmusic.play()
mainimg.classList.add("active")
musiqa.classList.add("active")
})
rotatemusic.addEventListener("click",()=>{
  rotatemusic.classList.toggle("active")
})