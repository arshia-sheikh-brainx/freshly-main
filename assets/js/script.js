$(document).ready(function () {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    localStorage.setItem("mealPlan", 4);
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
        if(i==0){
        datePropogation(true);
        }else{
            datePropogation();
        }
    }

    //show date on date page
   showDateOnDatePage();

    function datePropogation(isActive=false) {
        let day = date.getDay();
        let month = date.getMonth();
        let dayOfMonth = date.getDate();
        date.setDate(date.getDate() + 1);

        //create list item
        let dateItem = document.createElement("li");
        let daySpan = document.createElement("strong");
        let popular="<span class='badge green-text'><i class='far fa-star'></i> Most Poular</span>"
        $(daySpan).text(days[day]);
        let text = ", " + months[month] + " " + dayOfMonth;
        $(dateItem).attr({
            "data-day": days[day],
            "data-day-of-month": dayOfMonth,
            "data-month": months[month],
        });
        $(dateItem).append(daySpan, text).addClass("list-group-item");
        if(isActive){ 
            $(dateItem).append(popular);
             $(dateItem).addClass('active-date');
             localStorage.setItem("day", days[day]);
             localStorage.setItem("dayOfMonth", dayOfMonth);
             localStorage.setItem("month", months[month]);

            }
       

        //add Event listener to list item
        $(dateItem).click((e) => {
            addListStyle(e)
        });

        //append list item to the date-list div
        $(".date-list").append(dateItem);
        
    


    }

    function addListStyle(e) {
        $('.date-list .list-group-item').each(function () {
            if (this == e.target) {
                $(this).addClass('active-date');
                let day = $(this).attr("data-day");
                let dayOfMonth = $(this).attr("data-day-of-month");
                let month = $(this).attr("data-month");
                localStorage.setItem("day", day);
                localStorage.setItem("dayOfMonth", dayOfMonth);
                localStorage.setItem("month", month);
                //update text when date change
                showDateOnDatePage();
            } else {
                $(this).removeClass('active-date');
            }
        });
    }

    function showDateOnDatePage(){
        let dateText="First Delivery Date: "+localStorage.getItem("day")+", "+localStorage.getItem("month")+" "+localStorage.getItem("dayOfMonth");
        $(".show-date").text(dateText);

    }


});
