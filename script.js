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
    const numVectors1 = Math.max(1, Math.min(99, parseInt(document.getElementById('num1').value))) || 6;
    const numVectors2 = Math.max(1, Math.min(99, parseInt(document.getElementById('num2').value))) || 6;
    const length = 300; // Longitud de cada vector
    const radius = length; // Radio del círculo 

            // Dibuja el círculo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    const points = [];

    // Dibuja vectores según la operación
    switch (operation) {
        case '+':
            // Dibuja un patrón de estrellas
            for (let i = 0; i < numVectors1; i++) {
                const angle = (i * Math.PI * 2) / numVectors1;
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
            for (let i = 0; i < numVectors1; i++) {
                const angle = (i * Math.PI * 2) / numVectors1;
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
                // Dibuja vectores según el primer número (num1)
                const points = []; // Almacenar las posiciones de los extremos de los vectores
                for (let i = 0; i < numVectors1; i++) {
                    const angle = (i * Math.PI * 2) / numVectors1;
                    const xEnd = centerX + Math.cos(angle) * length;
                    const yEnd = centerY + Math.sin(angle) * length;
            
                    // Almacenar la posición del extremo
                    points.push({ x: xEnd, y: yEnd });
            
                    // Dibuja el vector
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(xEnd, yEnd);
                    ctx.strokeStyle = 'blue';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            
                // Generar puntos a lo largo de cada vector
                const allPoints = [];
                for (let i = 0; i < numVectors1; i++) {
                    const angle = (i * Math.PI * 2) / numVectors1;
            
                    for (let j = 0; j < numVectors2; j++) {
                        const ratio = j / (numVectors2 - 1); // Proporción a lo largo del vector (ajustado para incluir el extremo)
                        const randomX = centerX + Math.cos(angle) * length * ratio;
                        const randomY = centerY + Math.sin(angle) * length * ratio;
            
                        allPoints.push({ x: randomX, y: randomY });
                    }
                }
            
                // Conectar los puntos generados con los más cercanos dentro de un rango
                ctx.strokeStyle = 'red'; // Color para las conexiones
                ctx.lineWidth = 1;
            
                const connectionDistance = 100; // Distancia máxima para conectar puntos
            
                for (let i = 0; i < allPoints.length; i++) {
                    const currentPoint = allPoints[i];
            
                    // Conectar a otros puntos dentro de la distancia especificada
                    for (let j = 0; j < allPoints.length; j++) {
                        if (i !== j) {
                            const otherPoint = allPoints[j];
                            const distance = Math.sqrt(Math.pow(currentPoint.x - otherPoint.x, 2) + Math.pow(currentPoint.y - otherPoint.y, 2));
            
                            // Conectar si la distancia está dentro del rango especificado
                            if (distance <= connectionDistance) {
                                ctx.beginPath();
                                ctx.moveTo(currentPoint.x, currentPoint.y);
                                ctx.lineTo(otherPoint.x, otherPoint.y);
                                ctx.stroke();
                            }
                        }
                    }
                }
                break;
                case '/':
                    // Dibuja un patrón de círculos concéntricos
                    for (let i = 1; i <= numVectors1; i++) {
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, (length / numVectors1) * i, 0, Math.PI * 2);
                        ctx.strokeStyle = 'purple';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                
                    // Dibuja espirales dentro del círculo más grande
                    const maxRadius = length; // Radio del círculo más grande
                    for (let i = 0; i < numVectors2; i++) { // numVectors2 representa la cantidad de espirales
                        ctx.beginPath();
                        for (let t = 0; t < 10; t += 0.1) { // Controla la densidad de la espiral
                            const angle = i * (Math.PI * 2 / numVectors2) + t; // Ángulo para la espiral
                            const radius = (t * maxRadius) / 10; // Aumenta el radio, asegurando que no exceda el máximo
                            const x = centerX + Math.cos(angle) * radius;
                            const y = centerY + Math.sin(angle) * radius;
                            ctx.lineTo(x, y);
                        }
                        ctx.strokeStyle = 'purple'; // Color de las espirales
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                    break;
            console.log('Operación no válida');
    }   
}
