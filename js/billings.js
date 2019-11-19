var date = new Date();
var dd = date.getDate();
var mm = date.getMonth() + 1;
var yyyy = date.getFullYear();
if (dd < 10)
    dd = '0' + dd;
if (mm < 10)
    mm = '0' + mm;
var today = yyyy + '-' + mm + '-' + dd;
var name = window.localStorage.getItem('name');
var role = window.localStorage.getItem('role');
$("#role").append("Welcome: " + name + "  Role: " + role);
// var today = "2019-08-12";
var name = window.localStorage.getItem('name');
var role = window.localStorage.getItem('role');
$("#role").append("Welcome: " + name + "  Role: " + role);
console.log(today);
reservations(today);
var list = document.getElementById('card-id');
$("#getReg-btn").click(function () {
    var day = $("#endDate").val();
    console.log(day);
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    reservations(day);
});
function reservations(endDate) {
    $("#nobookings").empty();
    $.ajax({
        url: 'https://se532.herokuapp.com/getAllReservations',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'date': endDate
        }),
        success: function (data, status) {
            var records = "";
            if (data.success === 0) {
                console.log(data.success);
                console.log(data.data);
                $("#nobookings").append("No Bookings found for today");
            }

            else {
                $.each(data.data, function (index, element) {
                     //if (element.endDate === today) {
                        records += "<div class=\"card-header\" id=\"" + element.rid + index + "\"><h5 class=\"mb-0\"><button class=\"btn btn-link\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse" + element.rid + "\" aria-expanded=\"false\" aria-controls=\"collapse" + element.rid + "\"> Reservation ID :" + element.rid + "</button></h5></div>";
                        records += "<div id=\"collapse" + element.rid + "\" class=\"collapse\" aria-labelledby=\"" + element.rid + index + "\" data-parent=\"#accordionExample\"><div class=\"card-body\"> First Name: " + element.firstName + " <br> " + "Reservation start date : " + element.startDate + "<br>";
                        records += "Reservation End Date : " + element.endDate + "<br>";
                        records += "Total ammount : $" + element.totalAmount + "<br>";
                        records += "Ammount Paid : $" + element.amountPaid + "<br>";
                        records += "Reservation Type : " + element.reservationType + "<br>";

                        if (element.checkinTime !== null) {
                            records += "Check In : " + element.checkinTime + "<br>";
                        }
                        if (element.roomNo === null)
                            records += "Room Number : Not Allocated yet" + "<br>";
                        else
                            records += "Room Number : " + element.roomNo + "<br>";
                        if (element.checkinTime === null)
                            records += "<input type=\"button\" class =\"btn btn-primary\"  onclick=\"checkInUser(" + element.rid + ")\" value =\"Check in\">";
                        records += "<input type=\"button\" class =\"btn btn-primary\" value =\"Generate Bill\">";
                        records += "<input type=\"button\" class =\"btn btn-primary\" onclick=\"paybill(" + element.rid + ")\" value =\"Pay Bill\">";
                        records += "</div></div>";
                    //}
                });
                $(".card").append(records);
            }
        }
    })

}

function paybill(rid) {
    console.log(rid);

    $.ajax({
        url: 'https://se532.herokuapp.com/paybill',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'rid': rid
        }),

        success: function (data, status) {
            alert(data.data);
            console.log(today);
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            reservations(today);
        }


    })
}