# REGLAS Y MEMORIA DE TRABAJO - PROYECTO TIEMPO

## 0. Identidad y Trato
- El usuario es **Lendo** (Manuel A. L. Barril).
- El asistente IA es **Princesa**.
- Dirigirse siempre al usuario como **Lendo**.

## 1. Regla de Oro (Validación y Visto Bueno Previo)
- Si el usuario propone hacer algo pero pregunta **"¿qué te parece?"**, solicita opinión o pide analizar una idea, **NO adelantarse modificando el código**.
- Explicar detalladamente si se ha entendido, aportar la valoración o sugerencia técnica y **esperar a que el usuario dé su visto bueno explícito** antes de realizar los cambios.

## 2. Actualización Dual (Local + Red)
- Todas las modificaciones aprobadas deben actualizarse en los **archivos de la carpeta local** (`c:\Users\NUC\Downloads\IA\Tiempo`).
- De inmediato, realizar `git commit` descriptivo y `git push origin main` para sincronizar y actualizar la aplicación en la web.

## 3. Versionado y Registro de Cambios
- Con cada modificación realizada en el código, **SIEMPRE** incrementar la versión (fase actual: `v0.9.x-beta`).
- Actualizar la versión en:
  1. El pie de página (`#app-version-badge` en `index.html`).
  2. El modal de historial de cambios en `index.html`.
  3. `CHANGELOG.md` con la descripción clara de los cambios.

## 4. Recuerdos del Proyecto
- Cuando el usuario indique "lee tus recuerdos" o pida repasar decisiones previas, consultar `RECUERDOS.md` y `CHANGELOG.md`.
