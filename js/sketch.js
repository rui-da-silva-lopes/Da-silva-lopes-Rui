let imgListe = [];
let compteur = 0;
let gomme =0;
let imgMasque = [];
let imgHorsMasque1, imgHorsMasque2; // Nouveau pinceau hors masque
let imgPinc;
let champialeatoire;
let champiSpawn = [];      // tableau des champis qui apparaissent
let lastSpawn = 0;         // temps du dernier spawn
let spawnInterval = 2000;  // 2000 ms = 2 secondes entre chaque spawn

let newFeuille;


let pinceau;
let x;
let y;
let size =100;







function preload(){
for (let i = 1; i <6; i++) {//importer les images pinceaux
   imgListe[i-1]=loadImage('image/champi ('+i+').png');  
   }      

   champialeatoire = loadImage('image/champimultiplie.png'); 

imgHorsMasque1 = loadImage('image/cham.png'); // Charger le pinceau extérieur
imgHorsMasque2 = loadImage('image/champ.png'); // Charger le pinceau extérieur
imgPinc = loadImage('image/champignongr.png'); 
    for (let i = 1; i <3; i++) {//importer les images masque
    imgMasque[i-1]=loadImage('image/masque ('+i+').png');  

      
  }
  
}
function setup() {
       
    // imageMouvement()
    angleMode(DEGREES);
    rectMode(CENTER)
    //framerate
    imageMode(CENTER)
        createCanvas(windowWidth,windowHeight);
        for (let i = 0; i <imgListe.length; i++) {//redimensionner
       imgListe[i].resize(100,0) //choisir la taille ici
       
    }


    for (let i = 0; i <imgMasque.length; i++) {//redimensionner
       imgMasque[i].resize(0,height/1.5) //choisir la taille ici
   
    x=width/2;
    y=height/2;
   
   
   
   
    }


////création d'un masque :
    newFeuille = createGraphics(width,height)
    newFeuille.background(255);
    newFeuille.blendMode(REMOVE);
    newFeuille.imageMode(CENTER)
    newFeuille.image(imgMasque[0],width/2,height/2)
}




function draw(){        
    // background(255)
    fill(65, 29, 242)  
         //Crée une couleur qui bouge
        let r = map(sin(frameCount * 5), -1, 1, 100, 255);
        let g = map(sin(frameCount * 3 + 100), -1, 1, 50, 200);
        let b = map(sin(frameCount * 4 + 200), -1, 1, 50, 200);


        let couleurDynamique = color(r, g, b);
        image(imgListe[compteur],mouseX,mouseY,tint(couleurDynamique))    //dessiner avec la souris
        x= noise(5000+frameCount*0.01)*width //  Calcul des positions des champis
        y= noise(6000+frameCount*0.01)*height
        tint(255, 0, 0);
        x1= noise(4000+frameCount*0.01)*width
        y1= noise(7000+frameCount*0.01)*height
        image(imgListe[compteur], x, y, size, size);
       
     
     


        //  Appliquer la couleur
        tint(couleurDynamique);
        image(imgListe[compteur], x, y, size, size);


        //  Dessiner le deuxième champi qui tourne
        push();
        translate(x1, y1);
        rotate(frameCount);
        tint(couleurDynamique);
        image(imgListe[3], 0, 0, size);
        pop();
    
    noTint()      
    
    image(newFeuille,width/2, height /2);    //masque activer ou non
    
 let marge = 100; // distance en pixels : plus grand = change plus tôt

let insideMasque = mouseX > width/2 - imgMasque[0].width/2 + marge &&   //&& ca fait les 2 coter
                   mouseX < width/2 + imgMasque[0].width/2 - marge &&
                   mouseY > height/2 - imgMasque[0].height/2 + marge &&
                   mouseY < height/2 + imgMasque[0].height/2 - marge;

  tint(255,55,55)
    if (insideMasque) {
        // À l’intérieur du masque  pinceau actif coloré
        image(imgListe[compteur], mouseX, mouseY, size, size);
    } else {
        // À l’extérieur du masque  devient image 3
        newFeuille.blendMode(BLEND);
        
        if(mouseX>width/2){
        newFeuille.image(imgHorsMasque1, mouseX, mouseY, size, size);
            } else {
        newFeuille.image(imgHorsMasque2, mouseX, mouseY, size, size);
            }
         newFeuille.blendMode(REMOVE);
    newFeuille.imageMode(CENTER)
    newFeuille.image(imgMasque[0],width/2,height/2)
    
// champignon qui bouge
noTint();

// définir le mouvement sinusoïdal
let sineScale = 1;           // vitesse du mouvement
                  
let minSize =200;    // taille max et min 
let maxSize = 300;

let movement = map(sin(frameCount * sineScale ), -1, 1,minSize,maxSize);

push();
translate(1600, 500);           // position fixe
imageMode(CENTER);
let champSize = size * movement * 5;
image(imgPinc, 0, 0, movement,movement);  // grandit et rapetisse
pop();
push();

translate(1400, 500);           // position fixe
imageMode(CENTER);
scale(-1, 1);
image(imgPinc, 0, 0, movement,movement);  // grandit et rapetisse
pop();
          







if (millis() - lastSpawn > spawnInterval) {
    champiSpawn.push({
      x: random(width),
      y: random(height)
    });
    lastSpawn = millis();
  }

  // --- AFFICHER TOUS LES CHAMPIGNONS SPAWNÉS ---
  for (let i = 0; i < champiSpawn.length; i++) {
    let c = champiSpawn[i];
    image(champialeatoire, c.x, c.y, 100, 100);
  }
  
    }
  
    







function mousePressed(){ // changer d'image au clic
                compteur+=1  
       if(compteur>imgListe.length-1){
        compteur = 0;
        }
}




function keyPressed(){ /// mode gomme ou dessin
         console.log(key)
   
   
       
    if(key=='Backspace'){
        if (gomme == 1) {
         gomme = 0;
     blendMode(BLEND);
     } else {
     gomme = 1;
    blendMode(REMOVE);
   
  }  
   
             }
              if(key=='ArrowUp')  {
                //size augmenter
                size+=60


              }
             
  
              


              
   
            
              if(key=='ArrowDown')  {
                //size augmenter
                size-=60


              }
             
                
  }







   


}



