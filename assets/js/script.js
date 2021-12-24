$(document).ready(function () {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    localStorage.setItem("mealPlan", 4);
    
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
        $(".menu-grid .row").append(menu);



        // addTocartBtn
      }

    // step function
    const steps= $('#demo').steps({});
    let stepsApi = steps.data('plugin_Steps');

    // meal plan section function
    $('[data-meal-plan]').click(function (e) {
        let target = e.delegateTarget;
        let selectMealPlan = $(target).attr("data-meal-plan");
        localStorage.setItem("mealPlan", selectMealPlan);
    });

    // date propogation function
    let date = new Date();
    let day = date.getDay();
    const numberOfDaysToAdd = 8 - day;
    date.setDate(date.getDate() + numberOfDaysToAdd);

    //loop to show dates
    for (let i = 0; i < 10; i++) {
    // using template list propagation
      let temp = $("template")[0];
    //get the div element from the template:
        let item = temp.content.querySelector("li");;
        if(i==0){
        datePropogation(true,temp,item);
        }else{
        datePropogation(false,temp,item);
        }
    }

    //show date on date page
   showDateOnDatePage();

    function datePropogation(isActive,temp,item) {
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
                showDateOnDatePage();
            }
        });
    }

    function showDateOnDatePage(){
        let dateText="First Delivery Date: "+localStorage.getItem("day")+", "+localStorage.getItem("month")+" "+localStorage.getItem("dayOfMonth");
        $(".show-date").text(dateText);

    }


});
