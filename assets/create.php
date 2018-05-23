<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "crud_sample";

$conn = new mysqli($servername, $username, $password);
$createdb = "CREATE DATABASE ".$db;
$conn->query($createdb);
$conn = new mysqli($servername, $username, $password, $db);

$tbl1 = "CREATE TABLE student (
student_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
gender VARCHAR(6) NOT NULL,
age INT(3),
course_id INT(3),
address VARCHAR(50) NOT NULL,
reg_date TIMESTAMP
)";
$tbl2 = "CREATE TABLE course (
course_id INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
course_name VARCHAR(50) NOT NULL
)";

$qry = "INSERT INTO student (firstname, lastname, gender, age, course_id, address) VALUES ('Fernando','Bolima','male','25','1','tondo manila')";
$qry2 = "INSERT INTO course (course_name) VALUES ('Bachelor of Science in Information Technology')";

$conn->query($tbl1);
$conn->query($tbl2);
$conn->query($qry);
$conn->query($qry2);

 ?>
