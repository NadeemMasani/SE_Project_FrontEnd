
$(document).ready(function () {
    var name = window.localStorage.getItem('name');
var role = window.localStorage.getItem('role');
$("#role").append("Welcome: " + name + "  Role: " + role);
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10)
        mm = '0' + mm;
    //var today = yyyy + '-' + mm + '-' + dd;
    today = "2019-12-12";
    console.log(today);
    $.ajax({
        url: 'https://se532.herokuapp.com/expRoomIncome',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'date': today
        }),
        success: function (data, status) {
            
            // console.log(data.data);
            //console.log(data.success);
            if (data.success === 1) {
                console.log(data.data.averageIncome);
                
            $("#totalinc").append (data.data.totalIncome.toFixed(2));
            $("#avginc").append (data.data.averageIncome.toFixed(2));
                var einctable = "";
                $.each(data.data.expectedIncome, function (index, element) {
                    einctable += "<tr><td>" + element.date + "</td><td>" + element.expectedIncome +"</td></tr>";
                    /*console.log(element.date);
                    console.log(element.incentive);
                    console.log(element.conventional);
                    console.log(element.prepaid);
                    console.log(element.sixtyDays);*/
                    console.log(einctable);
                    document.querySelector("tbody").innerHTML = einctable;
                });
                /* document.querySelector("tbody").innerHTML = rateTable;
             } else {
                 rateTable += "No Rates Found";
                 document.querySelector("tbody").innerHTML = rateTable;*/
            }
        }

    })


});