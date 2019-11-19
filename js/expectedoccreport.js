/*<tr>
<td scope="row">2019-08-13</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>0</td>
</tr>*/
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
    today = "2019-08-01";
    
    console.log(today);
    $.ajax({
        url: 'https://se532.herokuapp.com/expOccupancyReport',
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

            $("#avgocc").append (data.data.averageOccupancy.toFixed(2)).append(" %");
                var eocctable = "";
                $.each(data.data.occupancy, function (index, element) {
                    eocctable += "<tr><td>" + element.date + "</td><td>" + element.incentive + "</td><td>" + element.conventional + "</td><td>" + element.prepaid + "</td><td>" + element.sixtyDays + "</td></tr>";
                    /*console.log(element.date);
                    console.log(element.incentive);
                    console.log(element.conventional);
                    console.log(element.prepaid);
                    console.log(element.sixtyDays);*/
                    console.log(eocctable);
                    document.querySelector("tbody").innerHTML = eocctable;
                });
                /* document.querySelector("tbody").innerHTML = rateTable;
             } else {
                 rateTable += "No Rates Found";
                 document.querySelector("tbody").innerHTML = rateTable;*/
            }
        }

    })


});