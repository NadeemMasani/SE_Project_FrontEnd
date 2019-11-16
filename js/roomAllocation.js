var date = new Date();
var dd = date.getDate();
var mm = date.getMonth() + 1;
var yyyy = date.getFullYear();

if (dd < 10)
    dd = '0' + dd;
if (mm < 10)
    mm = '0' + mm;
//var today = yyyy+'-'+mm+'-'+dd  ; 
var today = "2019-11-16";
console.log(today);
var rooms =getAvailableRooms()
var reservations;
reservations =getAllReservations();
console.log(reservations);
console.log(rooms);
$('.dropdown-menu a').click(function () {
    $('#selected').text($(this).text());
    console.log($(this).text());
});
function getAvailableRooms() {
    var today = "2019-11-17";
    var rooms = new Array();
    $.ajax({
        url: 'https://se532.herokuapp.com/getAvailableRooms',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'date': today
        }),
        success: function (data, status) {
            var roomList = "";
            console.log(data.success);
            //console.log(data.data);
            if (data.success === 1) {
                $.each(data.data, function (index, element) {
                    rooms.push(element);
                });

            }
            else {
                console.log("No Rooms");
            }
        }
    })
    return rooms;
}

function getAllReservations() {
    var reservations = new Array();
    $.ajax({
        url: 'https://se532.herokuapp.com/getAllReservations',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'date': today
        }),
        success: function (data, status) {
           
            if (data.success === 0) {
                console.log(data.success);
                console.log(data.data);
            }

            else {
                $.each(data.data, function (index, element) {
                    //console.log(element.rid);
                    reservations.push(element.rid);

                });
               
        }
    }
        })

       return reservations;

    }
