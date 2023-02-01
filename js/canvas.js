// Тип данных, представляющий отдельный мячик
function Ball(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
}

var balls = [];

function addBall() {
    for(let i=0; i<canvas.width*canvas.height/8000; i++) {
        var ball = new Ball(Math.random()*canvas.width,Math.random()*canvas.height, Math.random()*2-1, Math.random()*2-1,Math.random()+0.2);
        balls.push(ball);
	}
}
$('#drawingCanvas').on('click',function(e){
	e.preventDefault();
	var ball = new Ball(e.offsetX,e.offsetY,(Math.random()*2-1)*2,(Math.random()*2-1)*2,Math.random()*0.5+0.2);

    balls.push(ball);
	
});

window.onload = function() {
	 canvas = document.getElementById("drawingCanvas");
     context = canvas.getContext("2d");
     canvas.width=$('#portfolio').width();
     canvas.height=$('#portfolio').height();

     $(window).resize(function() {
          canvas.width=$('#portfolio').width();
          canvas.height=$('#portfolio').height();
     });
    addBall();
		 
	setTimeout("drawFrame()", 20);
}
function drawFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    // Перебираем все мячики
    for(var i=0; i<balls.length; i++) {
        var ball = balls[i];
        ball.x += ball.dx;
        ball.y += ball.dy;

        

        if ((ball.x + ball.radius > canvas.width) || (ball.x - ball.radius < 0)) {
            ball.dx = -ball.dx;
        }

        if ((ball.y + ball.radius > canvas.height) || (ball.y - ball.radius < 0)) {
            ball.dy = -ball.dy; 
        }

        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        context.lineWidth = 1;
        context.fill();
        context.stroke();

        context.beginPath();
        for(var j=i+1;j<balls.length;j++){

            context.lineWidth =440/((Math.pow((balls[i].x-balls[j].x),2)+Math.pow((balls[i].y-balls[j].y),2)));

      	    if((context.lineWidth<0.6)&&(context.lineWidth>0.035)){
                context.moveTo(balls[i].x,balls[i].y);
                context.lineTo(balls[j].x,balls[j].y);
                context.stroke();
      	    }
        }
    }
    setTimeout("drawFrame()", 20);
}
