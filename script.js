const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');

const scoreDisplay = document.querySelector('.score-value')
let score = 0;

scoreDisplay.textContent = score;
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const midWidth = canvas.width/2;
const midHeight = canvas.height/2;
const playerRadius = 10;

let player = new Player(midWidth, midHeight, playerRadius, 'white');
player.draw();

class Shot {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.velocity.x * shotSpeed;
        this.y += this.velocity.y * shotSpeed;
    }
}

let shotsArray = [];


const shotRadius = 5;
const shotSpeed = 15;
addEventListener('mousedown', function(e) {
    let shotVelocity = {
        x:undefined,
        y:undefined
    }
   let angle = Math.atan2(e.clientY - midHeight,
                            e.clientX - midWidth);

    shotVelocity.x = Math.cos(angle);
    shotVelocity.y = Math.sin(angle);
    shotsArray.push(new Shot(midWidth, midHeight, shotRadius, 'white', shotVelocity))
    

})  

let rotationShot = [];

let Power = addEventListener('mousemove', PowerMethod);

function PowerMethod(e) {

        let shotVelocity = {
            x:undefined,
            y:undefined
        }
       let angle = Math.atan2(e.clientY - midHeight,
                                e.clientX - midWidth);
    
        shotVelocity.x = Math.cos(angle);
        shotVelocity.y = Math.sin(angle);
        rotationShot.push(new Shot(midWidth, midHeight, shotRadius, 'white', shotVelocity))
    

       }
       removeEventListener('mousemove', PowerMethod);

       
       function setGift() {
           
           let powerElement = document.querySelector(".power");
           powerElement.classList.add('gift');
           powerElement.addEventListener("click", () => {
           powerElement.classList.remove('gift');
           //powerElement.style.display = "none";
           addEventListener('mousemove', PowerMethod);
           setTimeout(() => {
              removeEventListener('mousemove', PowerMethod);
           }, 2000)
    
         })
       }



       function Gift() {
        setInterval(() => {
            setGift();
            //powerElement.style.display = "block";
        }, 10000)
       }

       Gift();




class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.velocity.x * enemySpeed;
        this.y += this.velocity.y * enemySpeed;
    }
}

let enemiesArray = [];
let enemySpeed = 1;


setInterval(function() {
    let enemyRadius = Math.random() * 20 + 10;
    let enemyVelocity = {
        x:undefined,
        y:undefined
    }
    
    if(Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0:(canvas.width + enemyRadius);
        y = (Math.random() * canvas.height)
    }
    else {
        y = Math.random() < 0.5 ? 0:(canvas.height + enemyRadius);
        x = (Math.random() * canvas.width)
    }
    
    let angle = Math.atan2(midHeight - y,
        midWidth - x);
        
        enemyVelocity.x = Math.cos(angle);
        enemyVelocity.y = Math.sin(angle);
        
        enemiesArray.push(new Enemy(x, y, enemyRadius,
             `hsl(${ Math.random()*360 }, 80%, 50% `,
              enemyVelocity))
    },500);


    //Particles Effect

    class Particles {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
        }
    
        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    
        update() {
            this.x += this.velocity.x * enemySpeed;
            this.y += this.velocity.y * enemySpeed;
        }
    }
    
let gameOver = false;
function animate() {
    ctx.fillStyle = 'rgb(0,0,0,0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();

    rotationShot.forEach((shot, indexS) => {
        shot.update();
        shot.draw();
        
        if(shot.x < 0 || shot.x > canvas.width||
            shot.y < 0 || shot.y > canvas.height) {
                setTimeout(function() {
                    rotationShot.splice(indexS, 1);

                }, 0) 
            }
    });

    shotsArray.forEach((shot, indexS) => {
        shot.update();
        shot.draw();


        if(shot.x < 0 || shot.x > canvas.width||
            shot.y < 0 || shot.y > canvas.height) {
                setTimeout(function() {
                    shotsArray.splice(indexS, 1);

                }, 0) 
            }
    
    })

    enemiesArray.forEach((enemy, indexE) => {
        enemy.update();
        enemy.draw();
        let distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if((distance - playerRadius - enemy.radius) < 1) {
            gameOver = true;
        }
        
        shotsArray.forEach((shot, indexS) => {
            let distance = Math.hypot(shot.x - enemy.x, shot.y - enemy.y);
            if(((distance - shot.radius - enemy.radius) < 1)) {
                setTimeout(function() {
                    if(enemy.radius - 10 > 10) {

                        for(let i = 0;i < 8;i++) {
                            setTimeout( () => {
                                enemy.radius -= 1;
                            }, 100) 

                        } 
                        shotsArray.splice(indexS, 1);
                    }else {
                        shotsArray.splice(indexS, 1);
                        enemiesArray.splice(indexE, 1);
                    }

                    score++;
                    scoreDisplay.textContent = score;

                }, 0)

                
            }
        })

        rotationShot.forEach((shot, indexS) => {
            let distance = Math.hypot(shot.x - enemy.x, shot.y - enemy.y);
            if(((distance - shot.radius - enemy.radius) < 1)) {
                setTimeout(function() {
                    if(enemy.radius - 10 > 10) {
                                enemy.radius -= 8;
                          
                                rotationShot.splice(indexS, 1);
                    }else {
                        rotationShot.splice(indexS, 1);
                        enemiesArray.splice(indexE, 1);
                    }

                    score++;
                    scoreDisplay.textContent = score;

                }, 0)

                
            }
        })
    })

    animationFrame = requestAnimationFrame(animate);
    if(gameOver) {
        cleanAnimation(animationFrame);
    }
}

animate();

function cleanAnimation (animationFrame) {
    cancelAnimationFrame(animationFrame);
}

