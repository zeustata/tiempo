# Script para compilar el paquete de producción Android App Bundle (.aab) para Google Play Store
$env:JAVA_HOME = "C:\Users\NUC\.bubblewrap\jdk\jdk-17.0.11+9"
$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH

Set-Location "C:\Users\NUC\Downloads\MeteoAstur_Android_Widget"
Write-Output "Compilando paquete oficial .aab con Gradle..."
& .\gradlew.bat bundleRelease

if ($LASTEXITCODE -eq 0) {
    $aabSource = "app\build\outputs\bundle\release\app-release.aab"
    $aabDest = "C:\Users\NUC\Downloads\MeteoAstur_Lode_v3.0.22_PlayStore.aab"
    Copy-Item $aabSource $aabDest -Force
    Write-Output "PAQUETE OFICIAL GENERADO CON ÉXITO:"
    Get-Item $aabDest | Select-Object Name, Length, LastWriteTime
} else {
    Write-Output "ERROR: Falló la compilación de bundleRelease con código $LASTEXITCODE"
}
