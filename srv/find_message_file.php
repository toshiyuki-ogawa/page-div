<?php
require_once './accept_languages.php';

function find_message_file($lang_list, $message_dir, $message_file) {
    $result = false;
    foreach (iterate_languages($lang_list) as $langs) {
        foreach ($langs as $lang) {
            $lang_subtags = explode('-', $lang);
            $start_idx = min(count($lang_subtags), 2); 
            $search_dirs = [];  
            for ($idx = 1; $idx < count($lang_subtags); $idx++) {
                $search_dirs[] = $lang_subtags[0] . '_' . $lang_subtags[$idx];
            }
            $search_dirs[] = $lang_subtags[0];
            foreach ($search_dirs as $dir) {
                $file = implode('/', [$_SERVER['DOCUMENT_ROOT'],
                    $message_dir, $dir, $message_file]);
                error_log($file);
                if (file_exists($file)) {
                    $result = $file;
                    break;
                }
            }
            if ($result) {
                break;
            }
        }
        if ($result) {
            break;
        }
    }
    return $result;
}
// vi: se ts=4 sw=4 et:
