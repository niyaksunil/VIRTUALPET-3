// created the Food class
class Food{
    constructor(){
 
// created variables inside the constructor()
        this.foodStock;
        this.lastFed;
        this.image = milkImg;
    }

    getFoodStock(){
 
// getting the 'Food' data from database
        this.foodStock = database.ref('Food');
        this.foodStock.on("value",function(data){
          stock = data.val();
        });

    }

    getLastFed(){
   
// getting the 'FeedTime' data from database
        this.foodStock = database.ref('FeedTime/lastFed');
        this.foodStock.on("value",function(data){
          lastFed = data.val();
        });

    }

    updateFoodStock(){

// increasing the 'Food' and updating it
        stock += 1;
        if(stock <= 30){
            database.ref("/").update({
                Food:stock
            });
        }
       
    }

    deductFood(){

// decreasing the stock and updating it
        stock -= 1;
        if(stock >= 0){
            database.ref("/").update({
                Food:stock
            });
        }
    
    }

// created the bedRoom()
    bedRoom(){
        image(bedRoomImg,250,250, 500,500);
        
    }

// created the garden()
    garden(){
        image(gardenImg,250,250, 500,500);
        
    }

// created the washRoom()
    washRoom(){
        image(washroomImg,250,250, 500,500);

    }

// created the livingRoom()
    livingRoom(){
        image(livingRoomImg,250,250, 500,500)
    }

// displaying the function
    display(){
       
        var x =80, y = 100;
        this.getFoodStock();
        this.getLastFed();
        imageMode(CENTER);
        image(this.image, 375, 360 ,70,70);
        if(stock !=  0){
            for(var i = 0 ;i < stock; i ++){
                if(i%10 === 0){
                    x= 80;
                    y = y+50;
                }
                image(this.image, x, y ,50,50);
                x = x+30;
            }
        }

    }

                                                
}