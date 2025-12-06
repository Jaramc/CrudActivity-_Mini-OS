const pantalla = document.querySelector('.pantalla');
const botones = document.querySelectorAll('.btn');

const OPERATORS = ['+', '-', '*', '/'];

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const botonapretado = boton.textContent;
        const id = (boton.id || '').toLowerCase(); // normaliza mayúsculas/minúsculas

        // Limpiar pantalla
        if (id === 'c') {
            pantalla.textContent = '0';
            return;
        }

        // Borrar último carácter
        if (id === 'borrar') {
            if (pantalla.textContent.length === 1 || pantalla.textContent === 'Error') {
                pantalla.textContent = '0';
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        // Evaluar
        if (id === 'igual') {
            try {
                // Evaluación controlada (mejor que eval directo)
                pantalla.textContent = Function('return (' + pantalla.textContent + ')')();
            } catch (e) {
                pantalla.textContent = 'Error';
            }
            return;
        }

        // Manejo de operadores (+ - * /)
        if (OPERATORS.includes(botonapretado)) {
            const lastChar = pantalla.textContent.slice(-1);
            // Si la pantalla está en '0' no permitimos operadores al inicio
            if (pantalla.textContent === '0') return;

            // Evitar dos operadores seguidos: reemplaza el anterior por el nuevo
            if (OPERATORS.includes(lastChar)) {
                pantalla.textContent = pantalla.textContent.slice(0, -1) + botonapretado;
            } else {
                pantalla.textContent += botonapretado;
            }
            return;
        }

        // Manejo del punto decimal: evitar múltiples puntos en el mismo número
        if (botonapretado === '.') {
            const lastOperand = pantalla.textContent.split(/\+|\-|\*|\//).pop();
            if (lastOperand.includes('.')) return; // ya hay un punto en el número actual
            if (pantalla.textContent === '0' || pantalla.textContent === 'Error') {
                pantalla.textContent = '0.';
            } else {
                pantalla.textContent += '.';
            }
            return;
        }

        // Números u otros caracteres: reemplaza 0/Error o concatena
        if (pantalla.textContent === '0' || pantalla.textContent === 'Error') {
            pantalla.textContent = botonapretado;
        } else {
            pantalla.textContent += botonapretado;
        }
    });
});
