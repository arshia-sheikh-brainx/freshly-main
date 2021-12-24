$(document).ready(function () {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = new Date();
    let day = date.getDay();
    const numberOfDaysToAdd = 8 - day;
    date.setDate(date.getDate() + numberOfDaysToAdd);
    localStorage.setItem("mealPlan", 4);  //default meal plan
    let mealPlan =Number(localStorage.getItem("mealPlan"));
    let itemCount=0;
    let cart=[];  //initaize cart array

    // //check if the cart is in local storage or not
    // if(localStorage.getItem("cart")===null) {
    //     localStorage.setItem("cart", JSON.stringify(cart));
    // }else{
    //     cart= JSON.parse(localStorage.getItem("cart"));
        
    // }
    
    
    //get menu data
    $.get("menu.json", function(data, status){
        if(status=="success"){
            
             const menuItems = data;
             for (let i=0 ; i<menuItems.length ; i++){
                 let id=menuItems[i].id;
                 let name=menuItems[i].name;
                 let additionalItem=menuItems[i].additionalItem;
                 let gluten = menuItems[i].gluten;
                 let cals=menuItems[i].cals;
                 let carbs= menuItems[i].carbs;
                 let protein=menuItems[i].protein;
                 let imageUrl=menuItems[i].url;
                 let price = menuItems[i].price;

                 displayMenu(id,name,additionalItem,gluten,cals,carbs,protein,imageUrl,price);
             }
 
        }
      });

      //display menu items
      function displayMenu(id,name,additionalItem,gluten,cals,carbs,protein,imageUrl,price){

        let temp = $("template")[1];
        let div=temp.content.querySelector("div");
        let menu = document.importNode(div, true);
        $(menu).children(".menuItem").attr("data-id",id);
        $(menu).find(".menu-img").attr({
            "src":imageUrl,
            "alt":name
        });
        $(menu).find(".menuTitle").text(name);
        $(menu).find(".extra").text(additionalItem);
        $(menu).find(".glutenValue").text(gluten);
        $(menu).find(".calValue").text(cals);
        $(menu).find(".crbsValue").text(carbs);
        $(menu).find(".protienValue").text(protein);

        //onclick add to the cart this item
        $(menu).find(".addTocartBtn").click((e)=>{
            addToCart(id,name,additionalItem,imageUrl,price);      
        });

        //append to the menu grid
        $(".menu-grid .row").append(menu);

      }

      //add to cart function
      function addToCart(id,name,additionalItem,imageUrl,price){
        //icrement item count
        itemCount++;

       //item to add to cart
        let item={
            id:id,
            name:name,
            additionalItem:additionalItem,
            imageUrl:imageUrl,
            price:price,
            count:1
        };
       let check= isExist(item.id);
       if(check == -1){
           cart.push(item);
       }else{
           cart[check].count +=1;
       }
      
        let temp = $("template")[2];
        let div=temp.content.querySelector("div");
          let cartItem=document.importNode(div,true);
          $(cartItem).find(".cart-item").attr("data-id",id);
          $(cartItem).find(".cart-item-img img").attr(
              {
              "src":imageUrl,
              "alt":name
          });
          $(cartItem).find(".name").text(name);
          //append cart item
           $(".cart").append(cartItem);

           //plus btn
          $(cartItem).find(".fa-plus").click(()=>{
            addToCart(id,name,additionalItem,imageUrl,price)
          });
          //remove item
          $(cartItem).find(".fa-minus").click(function(){
              removeItem(this,id);
            
          });
         
      }

      //clear cart function
          $(".cart .clear").click((e)=>{
              $(e.target).parent().nextAll().remove();
              itemCount=0;
              cart=[];
          })

      
     //remove item function
     function removeItem(itemToRemove , id){
        itemCount--;
        $(itemToRemove).parents(".cart-item-section").remove();
        let index = isExist(id);
        if(cart[index].count>1){
            cart[index].count--;
        }else{
            cart.splice(index, 1);
        }


     }




    // step function
    const steps= $('#demo').steps({});
    let stepsApi = steps.data('plugin_Steps');

    // meal plan section function
    $('[data-meal-plan]').click(function (e) {
        let target = e.delegateTarget;
        let selectMealPlan = $(target).attr("data-meal-plan");
        localStorage.setItem("mealPlan", selectMealPlan);
        mealPlan=selectMealPlan;
    });

 


    //loop to show dates
    for (let i = 0; i < 10; i++) {
    // using template list propagation
      let temp = $("template")[0];
    //get the div element from the template:
        let item = temp.content.querySelector("li");;
        if(i==0){
        createDateList(true,item);
        }else{
        createDateList(false,item);
        }
    }

    //show date on date page + menu page 
       showDate();

   //  function create date list
    function createDateList(isActive,item) {
        let day = date.getDay();
        let month = date.getMonth();
        let dayOfMonth = date.getDate();
        date.setDate(date.getDate() + 1);

          //Create a new node, based on the template:
         let li = document.importNode(item, true);
          $(li).attr({
            "data-day": days[day],
            "data-day-of-month": dayOfMonth,
            "data-month": months[month]
        });
        let text = ", " + months[month] + " " + dayOfMonth;
        $(li).children( "strong" ).text(days[day]);
        let popular="<span class='badge green-text'><i class='far fa-star'></i> Most Poular</span>"
        $(li).append(text);
      
        if(isActive){ 
                $(li).append(popular);
                 $(li).addClass('active-date');
                 localStorage.setItem("day", days[day]);
                 localStorage.setItem("dayOfMonth", dayOfMonth);
                 localStorage.setItem("month", months[month]);
                }
          //add Event listener to list item
        $(li).click((e) => {
            addListStyle(e)
        });
          //append list item to the date-list div
          $(".date-list").append(li);
    
    }
    //add style to selected date
    function addListStyle(e) {
        $('.date-list .list-group-item').each(function () {
            $(this).removeClass('active-date');
           
            if (this == e.currentTarget) {
                $(this).addClass('active-date');
                let day = $(this).attr("data-day");
                let dayOfMonth = $(this).attr("data-day-of-month");
                let month = $(this).attr("data-month");
                localStorage.setItem("day", day);
                localStorage.setItem("dayOfMonth", dayOfMonth);
                localStorage.setItem("month", month);
                //update text when date change
                showDate();
            }
        });
    }
   //show date on page 

    function showDate(){
        let dateText="First Delivery Date: "+localStorage.getItem("day")+", "+localStorage.getItem("month")+" "+localStorage.getItem("dayOfMonth");
        $(".show-date").text(dateText);
        $(".delivery-date strong").text(localStorage.getItem("day")+", "+localStorage.getItem("month")+" "+localStorage.getItem("dayOfMonth"));

    }

    
    //function check if the item is already in the cart
    //if it is then return the index of the item else return -1
   function isExist(id){
    for(let i=0; i<cart.length; i++){
        if(cart[i].id==id){
            return i;
        }
    }
    return -1;
    } 

});
