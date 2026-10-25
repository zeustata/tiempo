Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\NUC\Downloads\IA\Tiempo\icons\source_icon_blue.jpg"
$img = [System.Drawing.Image]::FromFile($srcPath)

function Resize-Image($source, $w, $h, $outPath) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($source, 0, 0, $w, $h)
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Generated: $outPath ($w x $h)"
}

# Iconos estándar y adaptativos (ahora son idénticos porque la base es 100% azul de borde a borde y el escudo está en la safe zone)
Resize-Image $img 512 512 "C:\Users\NUC\Downloads\IA\Tiempo\icons\icon-512.png"
Resize-Image $img 192 192 "C:\Users\NUC\Downloads\IA\Tiempo\icons\icon-192.png"
Resize-Image $img 512 512 "C:\Users\NUC\Downloads\IA\Tiempo\icons\icon-maskable-512.png"
Resize-Image $img 192 192 "C:\Users\NUC\Downloads\IA\Tiempo\icons\icon-maskable-192.png"

# Copias para paquete de empaquetado si existe
$pkgDir = "C:\Users\NUC\Downloads\MeteoAstur - Google Play package"
if (Test-Path $pkgDir) {
    Resize-Image $img 512 512 "$pkgDir\icon-maskable-512.png"
    Resize-Image $img 512 512 "$pkgDir\icon-512.png"
    Resize-Image $img 512 512 "$pkgDir\icon-512-v2.png"
}

$img.Dispose()
Write-Output "All icons exported successfully!"
