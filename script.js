document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('notepad-textarea');
    const titleText = document.querySelector('.title-bar .title-text');
    const originalTitle = "Bloc de Notas - Sin título";

    textarea.addEventListener('input', () => {
        if (textarea.value.length > 0) {
            titleText.textContent = "Bloc de Notas - Sin título*"; // Simula el indicador de cambio
        } else {
            titleText.textContent = originalTitle;
        }
    });

    // --- Funcionalidad básica para los botones (simulada) ---
    const minimizeButton = document.querySelector('.controls .minimize');
    const maximizeButton = document.querySelector('.controls .maximize');
    const closeButton = document.querySelector('.controls .close');
    const windowFrame = document.querySelector('.window-frame');

    minimizeButton.addEventListener('click', () => {
        alert('Funcionalidad de minimizar no implementada.');
        // En una implementación real, esto ocultaría la ventana o la encogería a la barra de tareas.
    });

    maximizeButton.addEventListener('click', () => {
        alert('Funcionalidad de maximizar no implementada.');
        // En una implementación real, esto cambiaría las clases para hacer la ventana de ancho completo.
    });

    closeButton.addEventListener('click', () => {
        if (confirm('¿Desea cerrar el Bloc de Notas? Se perderán los cambios no guardados.')) {
            windowFrame.style.display = 'none'; // Simplemente la oculta
            alert('Bloc de Notas cerrado.');
        }
    });

    // --- Opcional: Implementar arrastre de ventana ---
    const titleBar = document.querySelector('.title-bar');
    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - windowFrame.getBoundingClientRect().left;
        offsetY = e.clientY - windowFrame.getBoundingClientRect().top;
        windowFrame.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        windowFrame.style.left = `${e.clientX - offsetX}px`;
        windowFrame.style.top = `${e.clientY - offsetY}px`;
        windowFrame.style.position = 'absolute'; // Necesario para moverlo
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        windowFrame.style.cursor = 'default';
    });
});