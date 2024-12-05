document.getElementById('calculate').addEventListener('click', function() {
    
    // Valores de los campos de entrada
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;

    // Valida que los números estén en el rango de 1 a 99
    if (isNaN(num1) || isNaN(num2) || num1 < 1 || num1 > 99 || num2 < 1 || num2 > 99) {
        document.getElementById('resultValue').textContent = 'Error: Ingrese números del 1 al 99';
        return; // Salir de la función si hay un error
    }

    let result;

    // Realiza la operación según el operador seleccionado
    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Error: División por cero';
            break;
        default:
            result = 'Operación no válida';
    }

    // Mostrar el resultado
    document.getElementById('resultValue').textContent = result;

    // Dibuja la mandala con el resultado
    drawMandala(result, operation);
});

function drawMandala(result, operation) {
    const canvas = document.getElementById('mandalaCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Obtener la cantidad de vectores del primer número ingresado
    const numVectors = Math.max(1, Math.min(99, parseInt(document.getElementById('num1').value))) || 6;
    const length = 300; // Longitud de cada vector
    const radius = length; // Radio del círculo 

            // Dibuja el círculo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dibuja vectores según la operación
    switch (operation) {
        case '+':
            // Dibuja un patrón de estrellas
            for (let i = 0; i < numVectors; i++) {
                const angle = (i * Math.PI * 2) / numVectors;
                const x = centerX + Math.cos(angle) * length;
                const y = centerY + Math.sin(angle) * length;

                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Dibuja líneas adicionales para crear un patrón
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(centerX + Math.cos(angle + Math.PI / 4) * length, centerY + Math.sin(angle + Math.PI / 4) * length);
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
            break;

        case '-':
            // Dibuja un patrón de espirales
            for (let i = 0; i < numVectors; i++) {
                const angle = (i * Math.PI * 2) / numVectors;
                const x = centerX + Math.cos(angle) * length;
                const y = centerY + Math.sin(angle) * length;

                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Dibuja una espiral
                for (let j = 0; j < 5; j++) {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, length * (j + 1) / 5, angle, angle + Math.PI / 10);
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
            break;

        case '*':
            // Dibuja un patrón de rayos
            for (let i = 0; i < numVectors; i++) {
                const angle = (i * Math.PI * 2) / numVectors;
                const x = centerX + Math.cos(angle) * length;
                const y = centerY + Math.sin(angle) * length;
        
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = 1;
                ctx.stroke();
        
                // Dibuja líneas adicionales para crear un patrón
                for (let j = 0; j < num2; j++) { // num2 es el segundo número ingresado
                    const randomAngle = angle + (Math.random() * Math.PI / 10) - (Math.PI / 20); // Ángulo aleatorio
                    const lineLength = Math.random() * (length / 2); // Longitud aleatoria de la línea
                    const lineX = x + Math.cos(randomAngle) * lineLength;
                    const lineY = y + Math.sin(randomAngle) * lineLength;
        
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(lineX, lineY);
                    ctx.strokeStyle = 'blue';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
            break;

        case '/':
            // Dibuja un patrón de círculos concéntricos
            for (let i = 1; i <= numVectors; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (length / numVectors) * i, 0, Math.PI * 2);
                ctx.strokeStyle = 'purple';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            break;

        default:
            console.log('Operación no válida');
    }
    }
