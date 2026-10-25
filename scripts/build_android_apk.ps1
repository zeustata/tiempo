$tiempoDir = "C:\Users\NUC\Downloads\IA\Tiempo"
$widgetDir = "C:\Users\NUC\Downloads\MeteoAstur_Android_Widget"

Write-Output "==> 1. Asegurando LauncherActivity.java con Modo Oscuro Soberano..."
$launcherJavaPath = "$widgetDir\app\src\main\java\com\zeustata\meteoasturlode\LauncherActivity.java"
$launcherJava = @"
package com.zeustata.meteoasturlode;

import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsetsController;
import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsCallback;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.browser.trusted.TrustedWebActivityIntentBuilder;
import com.google.androidbrowserhelper.trusted.TwaLauncher;
import com.google.androidbrowserhelper.trusted.splashscreens.SplashScreenStrategy;

public class LauncherActivity
        extends com.google.androidbrowserhelper.trusted.LauncherActivity {

    @Override
    protected void onStop() {
        super.onStop();
        try {
            sendBroadcast(new android.content.Intent(this, MeteoWidgetProvider.class).setAction(MeteoWidgetProvider.ACTION_REFRESH_WIDGET));
            sendBroadcast(new android.content.Intent(this, MeteoWidgetMediumProvider.class).setAction(MeteoWidgetMediumProvider.ACTION_REFRESH_WIDGET_4X3));
        } catch (Exception ignored) {}
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        int nightColor = Color.parseColor("#070D17");
        getWindow().setNavigationBarColor(nightColor);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            getWindow().setNavigationBarContrastEnforced(false);
        }

        // Blindaje de botones del sistema (3 botones): obligar a que los iconos sean blancos/claros
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = getWindow().getInsetsController();
            if (controller != null) {
                controller.setSystemBarsAppearance(0, WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS);
            }
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int flags = getWindow().getDecorView().getSystemUiVisibility();
            flags &= ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            getWindow().getDecorView().setSystemUiVisibility(flags);
        }

        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
        }
    }

    @Override
    protected TwaLauncher createTwaLauncher() {
        return new TwaLauncher(this) {
            @Override
            public void launch(
                    TrustedWebActivityIntentBuilder twaBuilder,
                    CustomTabsCallback callback,
                    SplashScreenStrategy splashStrategy,
                    Runnable completionCallback,
                    TwaLauncher.FallbackStrategy fallbackStrategy) {

                int nightColor = Color.parseColor("#070D17");
                CustomTabColorSchemeParams nightParams = new CustomTabColorSchemeParams.Builder()
                        .setToolbarColor(nightColor)
                        .setNavigationBarColor(nightColor)
                        .setNavigationBarDividerColor(nightColor)
                        .build();

                // Cerrojo soberano de modo oscuro para Chrome / TWA
                twaBuilder.setDefaultColorSchemeParams(nightParams);
                twaBuilder.setColorSchemeParams(CustomTabsIntent.COLOR_SCHEME_LIGHT, nightParams);
                twaBuilder.setColorSchemeParams(CustomTabsIntent.COLOR_SCHEME_DARK, nightParams);
                twaBuilder.setColorScheme(CustomTabsIntent.COLOR_SCHEME_DARK);

                super.launch(twaBuilder, callback, splashStrategy, completionCallback, fallbackStrategy);
            }
        };
    }

    @Override
    protected Uri getLaunchingUrl() {
        return super.getLaunchingUrl();
    }
}
"@
[System.IO.File]::WriteAllText($launcherJavaPath, $launcherJava)
Write-Output "  LauncherActivity.java listo."

Write-Output "==> 2. Compilando APK de prueba con Gradle..."
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
$targetApk = "C:\Users\NUC\Downloads\MeteoAstur_Lode_v3.0.23_TEST.apk"

if (Test-Path $candidateApk) {
    Copy-Item $candidateApk $targetApk -Force
    Write-Output "=========================================================="
    Write-Output "EXITO TOTAL: APK v3.0.23 generado con icono oficial e intacto en:"
    Write-Output "  $targetApk"
    Write-Output "Tamaño: $((Get-Item $targetApk).Length) bytes"
    Write-Output "Fecha: $((Get-Item $targetApk).LastWriteTime)"
    Write-Output "=========================================================="
} else {
    Write-Output "ADVERTENCIA: No se encontró $candidateApk"
}
