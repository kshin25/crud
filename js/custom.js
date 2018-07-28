/*
  custom js
  created by Fernando Bolima Jr.
  5/21/2018
*/
$(function(){

  add_student();
  add_course();
  list_course();
  list_join();
  search();
  $(".close").click(function(e){
    e.preventDefault();
    $('#modal').hide();
    $('.modal-body').html('');
  });
});

function list_join(){
  $.ajax({
    type:"POST",
    data:{action:'list_join'},
    url:"assets/functions.php",
    success: function(data){
      var a = JSON.parse(data);
      //console.log(a);
      var row = "";
      for(var i = 0; i<a.length;i++){
        row += " <tr class='filter'>";
        row +="      <td>"+a[i].student_id+"</td>";
        row +="      <td>"+a[i].firstname+"</td>";
        row +="      <td>"+a[i].lastname+"</td>";
        row +="      <td>"+a[i].gender+"</td>";
        row +="      <td>"+a[i].age+"</td>";
        row +="      <td>"+a[i].address+"</td>";
        row +="      <td>"+a[i].course_name+"</td>";
        row +='      <td><a href="#" class="btn-edit btn-1">edit</a><a href="#" class="btn-del btn-2">delete</a></td>';
        row +=" </tr>";
      }
      $(".table-body-1 table").append(row);
      edit_student(a);
      delete_student();
    }
  });
}
function list_course(){
  $.ajax({
    type:"POST",
    data:{action:'list_course'},
    url:"assets/functions.php",
    success: function(course){
      var a = JSON.parse(course);
      //console.log(a);
      var table =  "<table>"+
        " <tr>"+
        "      <th>Course ID</th>"+
        "      <th>Course</th>"+
        "      <th></th>"+
        " </tr>"
        "</table>";
      $(".table-body-2").append(table);

      var row = "";
      for(var i = 0; i<a.length;i++){
        row += " <tr>";
        row += "      <td>"+a[i].course_id+"</td>";
        row += "      <td class='course'>"+a[i].course_name+"</td>";
        row += "      <td ><a href='#' class='btn-del btn-4'>delete</a></td>";
        row += " </tr>";
      }
      $(".table-body-2 table").append(row);
      delete_course();
    }
  });
}

function edit_student(a){
  $(".btn-1").click(function(e){
    e.preventDefault();
    //console.log(a);
    var stud_id = $(this).closest('tr').find('td:nth-child(1)').text();
    for(var i = 0; i<a.length;i++){
      if(a[i].student_id == stud_id){
        modal(a[i] , 1);
      }
    }
  });

}
function delete_student(){
  $(".btn-2").click(function(e){
    e.preventDefault();
    //console.log(a);
    var stud_id = $(this).closest('tr').find('td:nth-child(1)').text();
    modal(stud_id , 3);
  });

}
function delete_course(){
  $(".btn-4").click(function(e){
    e.preventDefault();
    //console.log(a);
    var c_id = $(this).closest('tr').find('td:nth-child(1)').text();
    if(modal(c_id , 4) == true){
      $(this).closest('tr').remove;
    }
  });

}
function add_student(){
  $(".btn-add").click(function(e){
    e.preventDefault();
    //console.log(a);
    var stud_id = $(this).closest('tr').find('td:nth-child(1)').text();
    modal(0, 2);
  });

}


 function modal(data, check){
   $('#modal').fadeIn('3000');

   if(check == 1){
     var content =
     '<form id="edit-student" action="" method="POST">'+
     '<div class="group"><label>student ID</label> : '+data.student_id+'</div>'+
      '<div class="group"><label>firstname</label> : <input type="text" name="fname" required value="'+data.firstname+'" class="fname"></div>'+
      '<div class="group"><label>lastname</label> : <input type="text" name="lname" required value="'+data.lastname+'" class="lname"></div>'+
      '<div class="group"><label>age</label> : <input type="number" name="age" required value="'+data.age+'" class="age" max="100" min="10"></div>'+
      '<div class="group"><label>gender</label> : <input type="text" name="gender" required value="'+data.gender+'" class="gender" ></div>'+
      '<div class="group"><label>address</label> : <input type="text" name="address" required value="'+data.address+'" class="adr"></div>'+
      '<div class="group"><label>course</label> : <select name="course" id="select" class="course_id"><option value="'+data.course_id+'">'+data.course_name+'</option></select></div>'+
      '<div class="group-btn"><input type="button" name="action" value="Update" /></div>'+
     '</form>';
     $('.modal-body').append(content);
     course_select();
     var id = data.student_id;
     update_student(id);
   }
   if(check == 2){
     var content =
     '<form id="add-student" action="" method="POST">'+
      '<div class="group"><label>firstname</label> : <span class="error error-fname"></span> <input type="text" name="fname" required class="fname"></div>'+
      '<div class="group"><label>lastname</label> : <span class="error error-lname"></span><input type="text" name="lname" required  class="lname"></div>'+
      '<div class="group"><label>age</label> : <span class="error error-age"></span><input type="number" name="age" required class="age" max="100" min="10"></div>'+
      '<div class="group"><label>gender</label> : <span class="error error-gender"></span><input type="text" name="gender" required class="gender" ></div>'+
      '<div class="group"><label>address</label> : <span class="error error-address"></span> <input type="text" name="address" required class="adr"></div>'+
      '<div class="group"><label>course</label> : <span class="error error-course"></span><select name="course" id="select" class="course_id"><option value="0" >Select Course</option></select></div>'+
      '<div class="group-btn"><input type="button" name="action" value="Submit" /></div>'+
     '</form>';
     $('.modal-body').append(content);
     course_select();
     submit_student();
   }
   if(check == 3){
     var content = '<div class="group-content">Do you want to continue?</div>'+
     '<div class="group-btn"><input type="button" id="confirm" value="Confirm" /> <input type="button" id="cancel" value="Cancel" /></div>';
     $('.modal-body').append(content);
     confirm(data, 1);
   }
   if(check == 4){
     var content = '<div class="group-content">Do you want to continue?</div>'+
     '<div class="group-btn"><input type="button" id="confirm" value="Confirm" /> <input type="button" id="cancel" value="Cancel" /></div>';
     $('.modal-body').append(content);
     confirm(data, 2);
   }

 }
 function course_select(){
   $.ajax({
     type:"POST",
     data:{action:'list_course'},
     url:"assets/functions.php",
     success: function(se){
       var sel = JSON.parse(se);
       console.log(sel);
       for(var i=0; i<sel.length; i++){
         $("#select").append('<option value="'+sel[i].course_id+'">'+sel[i].course_name+'</option>');
       }
     }
  });
 }
 function update_student(id){
   $('.group-btn input').click(function(){
      $('.group-btn input').prop("disabled",true);
      var fname = $('.fname').val();
      var lname = $('.lname').val();
      var adr = $('.adr').val();
      var age = $('.age').val();
      var gender = $('.gender').val();
      var course_id = $('.course_id').val();

      var arr = {
        action:'update_student',
        firstname:fname,
        lastname:lname,
        gender:gender,
        address:adr,
        student_id:id,
        age:age,
        course_id:course_id
      }
      $.ajax({
        type:"POST",
        data:arr,
        url:"assets/functions.php",
        success: function(data){
            $('.modal-h').html('<div class="message">Data has been updated!</div>');
            setTimeout(function(){
              $('.modal-h .message').remove();
              $('.group-btn input').prop("disabled",false);
            }, 3000);
            location.reload();
        }
      });
   })
 }
 function submit_student(){

   $('.group-btn input').click(function(){
     $('.error').text('');
     $('.group-btn input').prop("disabled",true);
     var fname = $('.fname').val();
     var lname = $('.lname').val();
     var adr = $('.adr').val();
     var age = $('.age').val();
     var gender = $('.gender').val();
     var course_id = $('.course_id').val();
     var arr = {
       action:'add_student',
       firstname:fname,
       lastname:lname,
       gender:gender,
       address:adr,
       age:age,
       course_id:course_id
     }
     var error = '';
     if(fname == ''){
       var error = true;
       $('.error-fname').text('Required');
     }
     if(lname == ''){
       error = true;
       $('.error-lname').text('Required');
     }
     if(adr == ''){
       error = true;
       $('.error-address').text('Required');
     }
     if(age == ''){
       error = true;
       $('.error-age').text('Required');
     }
     if(gender == ''){
       error = true;
       $('.error-gender').text('Required');
     }
     if(course_id == '0'){
       error = true;
       $('.error-course').text('Select a course');
     }

     if(error != true){

       $.ajax({
         type:"POST",
         data:arr,
         url:"assets/functions.php",
         success: function(data){
           $('.modal-h').html('<div class="message">Data has been Added!</div>');
           setTimeout(function(){
             $('.modal-h .message').remove();
             $('.group-btn input').prop("disabled",false);
             $('.fname').val('');
             $('.lname').val('');
             $('.adr').val('');
             $('.age').val('');
             $('.gender').val('');
             $('.course_id').val('');
           }, 3000);
           location.reload();
         }
       });

     }else{
       $('.modal-h').html('<div class="message-danger">Data was not been saved!</div>');
       setTimeout(function(){
         $('.modal-h .message-danger').fadeOut('1000').remove();
         $('.group-btn input').prop("disabled",false);
       }, 3000);
     }

   });
 }
 function confirm(id , stat){
   $("#cancel").click(function(){
     $('#modal').hide();
     $('.modal-body').html('');
   });
   if(stat == 1){
    $("#confirm").click(function(){
      $.ajax({
        type:"POST",
        data:{action:'delete_student', id:id},
        url:"assets/functions.php",
        success: function(data){
          $('.modal-body').html('<div class="group-content">Data has been removed</div>');
          setTimeout(function(){
            location.reload();
          },1000);

        }

      });

    });
   }
   if(stat == 2){
     $("#confirm").click(function(){
       $.ajax({
         type:"POST",
         data:{action:'delete_course', id:id},
         url:"assets/functions.php",
         success: function(data){
           $('.modal-body').html('<div class="group-content">Data has been removed</div>');
           setTimeout(function(){
             location.reload();
           },1000);

         }

       });

     });
   }
 }
 function add_course(){
   $('.form .add-btn').click(function(){
     $('.form .add-btn').prop("disabled",true);
     var course = $('.form .add-course').val();
     if(course.length < 10){
       alert('Invalid input data');
       $('.form .add-btn').prop("disabled",false);
     }else{
       $.ajax({
         type:"POST",
         data:{action:'add_course', course:course},
         url:"assets/functions.php",
         success:function(data){

             var row = " <tr>"+
             "      <td>"+data+"</td>"+
             "      <td class='course'>"+course+"</td>"+
             "      <td ><a href='#' class='btn-del btn-4'>delete</a></td>"+
             " </tr>";
           $(".table-body-2 table").append(row);
           $('.form add-course').val('');
           $('.form .add-btn').delay(1000).prop("disabled",false);
         }
       });
     }



   });
 }
 function search(){
    $(document).ready(function(){
      $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".table-body-1 table .filter").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
 }
