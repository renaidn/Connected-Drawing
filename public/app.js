let socket = io(); //opens and connects to the socket

//listen for confirmation
socket.on('connect', () => {
    console.log('connected to the server via sockets');
})

//P5 code
function setup() {
    createCanvas(400, 400);
    background(220);
    r = random(0,255);
    b = random(0,255);
    g = random(0,255);
    socket.on('mouseDataFromServer', (data) => {
        console.log(data);
        drawEllipseWithData(data);
    })
}

function draw() {
    // background(220);
    // socket.on('mouseDataFromServer', (data) => {
    //     ellipse(data.x,data.y,10,10);
    // })
}

//emit information of mouse position
function mouseDragged() {
    let mousePos = {
        x: round(mouseX),
        y: round(mouseY),
        red: r,
        blue: b,
        green: g
    };
    //emit this information to the server
    socket.emit('mousePositionData', mousePos);
}

function drawEllipseWithData(data) {
    fill(data.red, data.blue, data.green);
    ellipse(data.x, data.y, 20, 20);
}