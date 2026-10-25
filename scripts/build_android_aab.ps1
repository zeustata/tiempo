# Script para compilar el paquete de producción Android App Bundle (.aab) para Google Play Store
$env:JAVA_HOME = "C:\Users\NUC\.bubblewrap\jdk\jdk-17.0.11+9"
$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH
$env:GRADLE_OPTS = "-Xmx1024m"

Set-Location "C:\Users\NUC\Downloads\MeteoAstur_Android_Widget"
Write-Output "Compilando paquete oficial .aab v3.0.23 con Gradle..."
& .\gradlew.bat bundleRelease --no-daemon

if ($LASTEXITCODE -eq 0) {
    $aabSource = "app\build\outputs\bundle\release\app-release.aab"
    $aabDest = "C:\Users\NUC\Downloads\MeteoAstur_Lode_v3.0.23_PlayStore.aab"
    Copy-Item $aabSource $aabDest -Force
    Write-Output "=========================================================="
    Write-Output "PAQUETE OFICIAL PLAY STORE (.AAB) GENERADO CON ÉXITO:"
    Write-Output "  $aabDest"
    Write-Output "Tamaño: $((Get-Item $aabDest).Length) bytes"
    Write-Output "Fecha: $((Get-Item $aabDest).LastWriteTime)"
    Write-Output "=========================================================="
} else {
    Write-Output "ERROR: Falló la compilación de bundleRelease con código $LASTEXITCODE"
}
