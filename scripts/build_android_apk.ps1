Add-Type -AssemblyName System.Drawing

$tiempoDir = "C:\Users\NUC\Downloads\IA\Tiempo"
$widgetDir = "C:\Users\NUC\Downloads\MeteoAstur_Android_Widget"
$newBlueSrc = "$tiempoDir\icons\source_icon_blue.jpg"

Write-Output "==> 1. Actualizando iconos en mipmaps de Android con nuevo diseño azul puro..."
$blueImg = [System.Drawing.Image]::FromFile($newBlueSrc)

function Resize-Mipmap($source, $dim, $outPath) {
    $bmp = New-Object System.Drawing.Bitmap($dim, $dim)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($source, 0, 0, $dim, $dim)
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

$densities = @(
    @{ name = "mdpi"; size = 48 },
    @{ name = "hdpi"; size = 72 },
    @{ name = "xhdpi"; size = 96 },
    @{ name = "xxhdpi"; size = 144 },
    @{ name = "xxxhdpi"; size = 192 }
)

foreach ($d in $densities) {
    $folder = "$widgetDir\app\src\main\res\mipmap-$($d.name)"
    if (Test-Path $folder) {
        Resize-Mipmap $blueImg $d.size "$folder\ic_maskable.png"
        Resize-Mipmap $blueImg $d.size "$folder\ic_launcher.png"
        Write-Output "  Actualizado mipmap-$($d.name): $($d.size)x$($d.size)"
    }
}

Resize-Mipmap $blueImg 512 "$widgetDir\store_icon.png"

# Ajustar ic_launcher.xml para eliminar el fondo blanco
$icLauncherXml = @"
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_maskable" />
    <foreground android:drawable="@android:color/transparent" />
</adaptive-icon>
"@
[System.IO.File]::WriteAllText("$widgetDir\app\src\main\res\mipmap-anydpi-v26\ic_launcher.xml", $icLauncherXml.Trim())
Write-Output "  ic_launcher.xml actualizado: fondo azul puro directo sin capa blanca"

$blueImg.Dispose()

Write-Output "==> 2. Ajustando navegación transparente/azul noche en build.gradle y twa-manifest..."
$gradlePath = "$widgetDir\app\build.gradle"
$gradleContent = [System.IO.File]::ReadAllText($gradlePath)
$gradleContent = $gradleContent.Replace("navigationColorDark: '#000000'", "navigationColorDark: '#070D17'")
$gradleContent = $gradleContent.Replace("navigationDividerColor: '#000000'", "navigationDividerColor: '#070D17'")
$gradleContent = $gradleContent.Replace("navigationDividerColorDark: '#000000'", "navigationDividerColorDark: '#070D17'")
[System.IO.File]::WriteAllText($gradlePath, $gradleContent)

$twaPath = "$widgetDir\twa-manifest.json"
if (Test-Path $twaPath) {
    $twaContent = [System.IO.File]::ReadAllText($twaPath)
    $twaContent = $twaContent.Replace('"navigationColorDark": "#000000"', '"navigationColorDark": "#070D17"')
    $twaContent = $twaContent.Replace('"navigationDividerColor": "#000000"', '"navigationDividerColor": "#070D17"')
    $twaContent = $twaContent.Replace('"navigationDividerColorDark": "#000000"', '"navigationDividerColorDark": "#070D17"')
    [System.IO.File]::WriteAllText($twaPath, $twaContent)
}

Write-Output "==> 3. Configurando transparencia de navegación en LauncherActivity.java..."
$launcherJavaPath = "$widgetDir\app\src\main\java\com\zeustata\meteoasturlode\LauncherActivity.java"
$launcherJava = [System.IO.File]::ReadAllText($launcherJavaPath)
if ($launcherJava -notmatch 'setNavigationBarColor') {
    $insertCode = @"
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
            getWindow().setNavigationBarContrastEnforced(false);
        }
        getWindow().setNavigationBarColor(android.graphics.Color.parseColor("#070D17"));
"@
    $launcherJava = $launcherJava.Replace("super.onCreate(savedInstanceState);", "super.onCreate(savedInstanceState);`n$insertCode")
    [System.IO.File]::WriteAllText($launcherJavaPath, $launcherJava)
    Write-Output "  LauncherActivity.java configurado con barra de navegación integrada #070D17"
}

Write-Output "==> 4. Compilando APK con Gradle..."
$env:JAVA_HOME = "C:\Users\NUC\.bubblewrap\jdk\jdk-17.0.11+9"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

Push-Location $widgetDir
try {
    $buildOutput = cmd.exe /c "gradlew.bat assembleRelease --no-daemon --console=plain" 2>&1
    Write-Output ($buildOutput -join "`n")
} finally {
    Pop-Location
}

# Buscar APK generado
$candidateApk = "$widgetDir\app\build\outputs\apk\release\app-release.apk"
$targetApk = "C:\Users\NUC\Downloads\MeteoAstur_Lode_v3.0.22_TEST.apk"

if (Test-Path $candidateApk) {
    Copy-Item $candidateApk $targetApk -Force
    Write-Output "=========================================================="
    Write-Output "EXITO TOTAL: APK generado y firmado correctamente en:"
    Write-Output "  $targetApk"
    Write-Output "Tamaño: $((Get-Item $targetApk).Length) bytes"
    Write-Output "Fecha: $((Get-Item $targetApk).LastWriteTime)"
    Write-Output "=========================================================="
} else {
    Write-Output "ADVERTENCIA: No se encontró $candidateApk"
}
