<?php
    header("Access-Control-Allow-Origin:*");

    if (isset($_POST['submit'])) {
        $target_dir = "upload/";
        $file = $_FILES["fileToUpload"]['name'];
        $path = pathinfo($file);
        $filename = $path['filename'];
        $ext = $path['extension'];

        $temp_name = $_FILES['fileToUpload']['tmp_name'];
        $path_filename_ext = $target_dir.$filename.".".$ext;

        move_uploaded_file($temp_name, $path_filename_ext);
            echo ("File Uploaded");
    }

    echo ("works");

?>
