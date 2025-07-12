<?php
#function renderPdfViewer($url, $height = "600px") {
#    echo '<iframe src="' . htmlspecialchars($url) . '" style="width:100%; height:'.$height.'; border:none;"></iframe>';
#}


//require_once __DIR__ . '/../../../../../upload/example.pdf';

#header('Content-Type: application/pdf');
#echo file_get_contents("./../../../../upload/example.pdf");

// Ruta al archivo PDF
$pdfPath = __DIR__ . '/../../../../../upload/example.pdf';

// Verificar que el archivo existe
if (!file_exists($pdfPath)) {
    http_response_code(404);
    echo "Archivo no encontrado.";
    exit;
}

// Establecer encabezados adecuados
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="example.pdf"');
header('Content-Length: ' . filesize($pdfPath));

// Leer y enviar el contenido binario
readfile($pdfPath);
exit;

