<?php
  header('Content-Type: application/javascript');
  readfile("../app/" . $_GET['app']);
?>