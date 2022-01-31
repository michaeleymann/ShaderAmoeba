// DECLARATIONS AND CONSTANTS
const MAX_AMOEBAS = 100; // Important for Shader
const MAX_FOOD = 60; // Important for Shader

let amoebas = [];
let food = [];
let hunting;

var theShader;
var shaderTexture;
let bg;

// GAME VARIABLES
let numbAmoebas = MAX_AMOEBAS;
let minSpeed = 0.3;
let maxSpeed = 1.9;
let randomFactor = 0.95;
// Random Factor defines how big the probability of tumbling is
let swarmFactor = 0.9; 
// Swarm factor defines how far from target an amoeba wants to go but also 
// increases randomness of movement. 
// 0 for pretty straight movement to target, 0.9 looks nice above 1.5 they  
// hardly move towards target
let targetDistance = 4;
let numbFood = 15;

// ---------- PRELOAD --------
function preload() {

  theShader = new p5.Shader(this.renderer, vertShader, fragShader);
  
}

//  ---------- P5 SETUP -----------
function setup() {
  pixelDensity( 1 );
  createCanvas( windowWidth, windowHeight, WEBGL );
  shaderTexture = createGraphics( width, height, WEBGL );
  shaderTexture.noStroke();
  noCursor();

  // Draw Amoebas
  createAmoebas();
}

//  ----------  P5 DRAW LOOP  ----------
function draw() {
  translate( -width / 2, -height / 2 );


  // Let Amoebas be Amoebas
  for (let i = 0; i < amoebas.length; i++){
    amoebas[i].beAmoeba();
  }

  // Shader
  shaderTexture.shader(theShader);
        
  let data = serialize();

  theShader.setUniform("resolution", [width, height]);
  theShader.setUniform("numbAmoebas", amoebas.length);
  theShader.setUniform("numbFood", food.length);
  theShader.setUniform("amoebas", data.amoebas);
  theShader.setUniform("food", data.food);
  theShader.setUniform("mouse", [map(mouseX,0,width,0,1),map(mouseY,0,height,1,0)]);
  theShader.setUniform("time", frameCount)
  
  shaderTexture.rect(0, 0, width, height);
  texture(shaderTexture);
  rect(0, 0, width, height);

} // END OF DRAW