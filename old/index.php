<?php
$pdf_name = 'Letter of Price BidD.pdf';
$file = __DIR__ . '/' . $pdf_name;
if (!file_exists($file)) {
    $file = __DIR__ . '/Letter_of_Price_Bid.pdf';
}

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . $pdf_name . '"');
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    ob_clean();
    flush();
    readfile($file);
    exit;
} else {
    http_response_code(404);
    echo "File not found";
    exit;
}
?>
