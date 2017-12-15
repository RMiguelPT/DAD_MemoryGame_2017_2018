(function(){ 
    var url = "/api/login";

    //var $emailInput = $("#email");
    //var $password = $("#password");
    

    //console.log($submitBtn);

    $(".btn.btn-primary").click(function(event){
        if (event){
            event.preventDefault();
            //url = $(event.target).attr("data-url");
            if (url=="null") return;

            
            //axios.defaults.headers.post['Content-Type'] = 'application/json';            
            axios.post(url, {
                "email": $("#email").val(),
                "password": $("#password").val()
                })
                .then(function(response){
                   
                    //console.table(response);
                    if(response.status==200){
                       //console.log("Status: " + response.status);
                       //console.log(response.data.access_token);
                       
                       window.localStorage.setItem('authToken', response.data.access_token);
                       //window.location = "/home";
                      console.log(window.localStorage.getItem('authToken'));

                    }
                })                
                .catch(console.log);
               // console.log("You have clicked the button");
        }      

    });

})();

/*$( "a" ).click(function( event ) {
  event.preventDefault();
  $( "<div>" )
    .append( "default " + event.type + " prevented" )
    .appendTo( "#log" );
});*/


/*
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  */