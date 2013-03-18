<?php
//database parameters
$host='localhost';
$port='3306';
$user='vanheems_core'; 
$pw='Rb6GLZO]@+xe';
$db='vanheems_core';

if (isset($_GET['timezone'])) {
  $timezone = $_GET['timezone'];
  date_default_timezone_set($timezone);
};
