<?php

//list_join();
//list_course();
if(isset($_POST['action'])){
  if($_POST['action'] == 'list_join'){
    list_join();
  }
  if($_POST['action'] == 'list_course'){
    list_course();
  }
  if($_POST['action'] == 'update_student'){
    edit_student($_POST);
  }
  if($_POST['action'] == 'add_student'){
    insert_student($_POST);
  }
}

function list_join(){
  require_once('conn.php');
  $list = "SELECT * FROM student INNER JOIN course ON course.course_id=student.course_id ORDER by student_id ASC";
  $result = $conn->query($list);
  if ($result->num_rows > 0){
    $json = array();
    while($rows = $result->fetch_assoc()){;
      $json[] = $rows;
    }
    echo json_encode($json);
  }
  else{

  }
  $conn->close();

}

function list_course(){
  require_once('conn.php');
  $list = "SELECT * FROM course";
  $result = $conn->query($list);
  if($result->num_rows > 0){
    $json = array();
    while($rows = $result->fetch_assoc()){
      $json[] = $rows;
    }
    echo json_encode($json);
  }else{

  }
  $conn->close();
}

function insert_student($data){
  require_once('conn.php');
  $firstname = $data['firstname'];
  $lastname = $data['lastname'];
  $address = $data['address'];
  $gender = $data['gender'];
  $age = $data['age'];
  $course_id = $data['course_id'];
  $sql = "INSERT INTO student (firstname, lastname, gender, age, course_id, address) VALUES ('$firstname','$lastname','$gender','$age','$course_id','$address')";
  if($conn->query($sql)){
    echo "Success";
  }
  $conn-close();
}
function insert_course(){


}
function delete_student(){

}
function delete_course(){


}
function edit_student($data){
  require_once('conn.php');
  $student_id = $data['student_id'];
  $firstname = $data['firstname'];
  $lastname = $data['lastname'];
  $address = $data['address'];
  $gender = $data['gender'];
  $age = $data['age'];
  $course_id = $data['course_id'];
  $update = "UPDATE student SET firstname='$firstname',lastname='$lastname',gender='$gender',address='$address',age='$age',course_id='$course_id' WHERE student_id='$student_id'";
  if($conn->query($update)){
    echo 'Success';
  }
  $conn->close();
}

 ?>
