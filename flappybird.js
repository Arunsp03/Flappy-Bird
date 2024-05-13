let board;
let ctx;
let gravity=1;
let friction=0.9
//board

let boardheight=640;
let boardwidth=360;

//bird 

let birdwidth=34
let birdheight=24;
let birdx=boardwidth/8;
let birdy=boardheight/2
let birdimg;
let bird={
    x:birdx,
    y:birdy,
    width:birdwidth,
    height:birdheight,
    dx:0,
    dy:5
}

//pipes

let pipearray=[]
let pipewidth=64;
let pipeheight=512
let pipex=boardwidth
let pipey=0
let toppipeimg;
let bottompipeimg;

//Pipes Physics
let velocityx=-2

window.addEventListener("load",function(){
    board=document.getElementById("board")
    ctx=board.getContext("2d")
    board.height=boardheight;
    board.width=boardwidth

    // ctx.fillStyle="green"
    //ctx.fillRect(bird.x,bird.y,bird.width,bird.height)
    birdimg=new Image()
    birdimg.src="./flappybird.png"
    birdimg.onload=function(){
    ctx.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height)
    }
   
    toppipeimg=new Image();
    toppipeimg.src="./toppipe.png"

    bottompipeimg=new Image()
    bottompipeimg.src="./bottompipe.png"
    
    setInterval(placepipes,1500)
    requestAnimationFrame(update)
}
)

function update()
{
    
    requestAnimationFrame(update)
    ctx.clearRect(0,0,board.width,board.height)
    if(bird.y+bird.height+bird.dy>board.height )
    {
        bird.dy=-bird.dy*friction
       
    }
    else{
        bird.dy+=gravity;
    }
    bird.y+=bird.dy; 
    
    ctx.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height)

    for(let i=0;i<pipearray.length;i++)
        {
            let pipe=pipearray[i]
            pipe.x+=velocityx
            ctx.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height)
        }
    
}


function placepipes(){
    let randompipey=pipey-pipeheight/4-Math.random()*pipeheight/2
    let randomheight=pipeheight
    let toppipe={
        img:toppipeimg,
        x:pipex,
        y:randompipey,
        width:pipewidth,
        height:randomheight,
        passed:false
    }
    let bottompipe={
        img:bottompipeimg,
        x:pipex,
        y:randompipey+pipeheight+(board.height/4),
        width:pipewidth,
        height:randomheight,
        passed:false
    }
    pipearray.push(toppipe)
    pipearray.push(bottompipe)
}