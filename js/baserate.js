$(document).ready(function () {
    refereshBaseRate();
    $("#setRate").submit(function (event) {
        event.preventDefault();
        $("#success").empty();
        console.log("hello");
        var startdate = $("#sdate").val();
        var enddate = $("#edate").val();
        var rate = Number($("#rate").val());
        console.log(startdate);

        if(startdate === "" || enddate === ""){
            $("#success").append("Please enter all required fields before submitting");
        }
        else{
        $.ajax({
            url: 'https://se532.herokuapp.com/setBaseRate',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                'fromDate': startdate,
                'toDate': enddate,
                'rate': rate
            }),
            success: function (data, status) {
                console.log(data.success);
                console.log(data.data);

                if (data.success === 1) {
                    $("#success").append("Base Rate updated successfully");
                    refereshBaseRate();
                }
            }
        })

    }
    });
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });


function refereshBaseRate(){

    var date = new Date();
    var currentMonth = (date.getMonth() + 1 );
    var currentYear = date.getFullYear();
    console.log(currentMonth);
    console.log(currentYear);

    $.ajax({
        url: 'https://se532.herokuapp.com/getRate',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            'month': currentMonth,
            'year': currentYear
        }),
        success: function (data, status) {
            //console.log(data.success);
            //console.log(data.data);
            var rateTable="";

            if (data.success === 1) {
                $.each(data.data, function (index, element) {
                   // console.log(index);
                   // console.log(element.date);
                    //console.log(element.rate);
                    rateTable +=  "<tr><td>" +element.date + "</td><td>" +element.rate + "</td></tr>";
                    
                });
                console.log(rateTable);
                document.querySelector("tbody").innerHTML = rateTable;
            }
        }
    })

}      

});