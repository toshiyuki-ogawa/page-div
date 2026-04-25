<?php

$end_slash = strrpos($_SERVER['REQUEST_URI'], '/', -1);
$root = substr($_SERVER['REQUEST_URI'], 0, $end_slash + 1); 

header('Content-Length: ' . strlen($root));
header('Content-Type: ', 'plain/text');
echo $root;

// vi: se ts=4 sw=4 et:
