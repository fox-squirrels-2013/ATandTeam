$(document).ready(function(){
  $("#create-map").on('click',function(){
    $.get("tripmaps/new", function(form){
      $("#container-create-map").html(form)
    })
  })
})
