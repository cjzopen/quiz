<?php
// session_start();
// $msg = array();
// $msg['session'] = false;
// if(isset($_SESSION['ares_2018_oracle_test'])){
  $msg['session'] = true;
// }
// unset($_SESSION['ares_2018_oracle_test']);
if(isset($_SERVER['PHP_AUTH_USER'])){
  $user_name = str_replace("admin\\", '', strtolower($_SERVER['PHP_AUTH_USER']));
}else{
  $user_name = 'unknow';
}
$msg['user']=$user_name;

echo json_encode($msg);