$("form").submit(function(event){
    $("#error").empty();
    event.preventDefault();
    var emailid = $("#inputEmail").val();
    var pwd = $("#inputPassword").val();
$.ajax({
        url: 'https://se532.herokuapp.com/login',
        method: 'POST',
        contentType : 'application/json',
        dataType : 'json',
        data: JSON.stringify({
            'email': emailid,
            'password': pwd
        }),
        success: function (data, status) {
        console.log(data.success);
        console.log(data.data);

        if ( data.success === 0){
          $("#error").append("Invalid credentials. Please try again");

        }
        else{
            window.location.href = "manager.html";
        }
    }
})
});