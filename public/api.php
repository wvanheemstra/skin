<?php
  header('Content-Type: application/javascript');
  readfile("../api/" . $_GET['api']);
?>