var arr = [];  
var n =2;
for(var i = 0; i< 68; i++){ 
    arr.push(n);
    n+=2;
}

function draw(n, color) {
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var width = 5;
        var currX = 10;
        ctx.clearRect(0, 0, canvas.width, canvas.height);	
        for(var i = 0; i < n.length; i++){
            if(i == color){
                ctx.fillStyle = 'red';
            }else{
                ctx.fillStyle = 'yellow';
            }
            var h = n[i];
            console.log(n[i]);
            ctx.fillRect(currX, canvas.height-h, width, h);
            currX += width +1 ;
        }
      }
}

function* bubbleSort(arr) { 
   
    var step = 0;
    
    
   
    
    
    
        var len = arr.length,
            i, j;
    
        for (i=0; i < len; i++){
           
            for (j=0 ; j <len-1; j++){
                if (arr[j] > arr[j+1]){
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                   
                    step++;
                    document.getElementById("Display").innerHTML = step;
                    draw(arr, j);
                     yield step; 
                }
            }
        }
    
      
    
        
    
}

function start(){
    canvas = document.getElementById('myCanvas');
    var sort = bubbleSort(arr);
     
      function animation(){
        requestAnimationFrame(animation);
        
        sort.next(); 
      }
   
      animation(arr);
}



function shufAndDraw(){ 
    shuffle(arr);
    draw(arr, 0);
}

function shuffle(array) {
      var currentIndex = array.length;

      
      while (currentIndex !=0) {

        
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
console.log(randomIndex);
        
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
       
      }

      return array;
    }

window.onload = function(){
    canvas = document.getElementById('myCanvas');
    draw(arr, 0);
}
document.getElementById("sort").onclick = function() {
    start();
};

document.getElementById("shufAndDraw").onclick = function() {
    shufAndDraw();
};
