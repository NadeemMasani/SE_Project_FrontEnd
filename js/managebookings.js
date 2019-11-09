$(document).ready(function () {
    
var date = new Date();
var dd = date.getDate();
var mm = date.getMonth()+1; 
var yyyy = date.getFullYear();
if(dd<10) 
    dd='0'+dd;
if(mm<10) 
    mm='0'+mm;
    //today = mm+'-'+dd+'-'+yyyy;
    var today="2019-08-12";
    console.log(today);
    reservations(today);  
    $("#getReg-btn").click(function(){
        console.log("hello");
        var list = document.getElementById('card-id');
        var day = $("#regDate").val();
        console.log(day);
        while(list.firstChild){
        list.removeChild(list.firstChild);}   
        reservations(day);   
    });


function reservations(resdate){
    $("#nobookings").empty();
    $.ajax({
        url: 'https://se532.herokuapp.com/getAllReservations',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'date': resdate
        }),
        success: function (data, status) {
             var records ="";
            if (data.success === 0) {
                console.log(data.success);
                console.log(data.data);
                $("#nobookings").append("No Bookings found for today");
            }

            else{
                //console.log(data.success);
                //console.log(data.data);


                $.each(data.data, function (index, element) {
                   // records += "<div class=\"row\">  <div class=\"col-sm\">" + element.rid + "<div>";
                    records += "<div class=\"card-header\" id=\"" + element.rid + index + "\"><h5 class=\"mb-0\"><button class=\"btn btn-link\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse"+ element.rid + "\" aria-expanded=\"false\" aria-controls=\"collapse"+ element.rid + "\"> Reservation ID :" + element.rid+"</button></h5></div>";
                    records += "<div id=\"collapse" + element.rid + "\" class=\"collapse\" aria-labelledby=\"" + element.rid + index + "\" data-parent=\"#accordionExample\"><div class=\"card-body\"> First Name: " + element.firstName +" <br> " + "Reservation start date : " + element.startDate + "<br>";
                    records += "Reservation End Date : " + element.endDate +"<br>";
                    records += "Total ammount : $" + element.totalAmount +"<br>";
                    records += "Ammount Paid : $" + element.amountPaid +"<br>";
                    records += "Reservation Type : " + element.reservationType +"<br>";
                    if ( element.roomNo === null )
                    records += "Room Number : Not Allocated yet" +"<br>";
                    else
                    records += "Room Number : "+ element.roomNo +"<br>";
                    records += "<input type=\"button\" class =\"btn btn-primary\" value =\"Check in\">";
                    records += "<input type=\"button\" class =\"btn btn-primary\" value =\"Check out\">";
                    records += "<input type=\"button\" class =\"btn btn-primary\" value =\"Modify\">";
                    records += "<input type=\"button\" class =\"btn btn-primary\" value =\"Generate Email\">";
                    records += "<input type=\"button\" class =\"btn btn-primary\" value =\"Charge Penalty\">";
                    records += "</div></div>";
                    console.log(element.rid);
                   // console.log(element.baseRate);
                    console.log(element.totalAmount);
                    console.log(element.firstName);
                    console.log(element.reservationType);
                    console.log(element.startDate);
                });
                console.log(records);
               $(".card").append(records);
            }
        }
    })

}
});