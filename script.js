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
    ctx.lineWidth = 1;
    ctx.stroke();

    const points = [];

    // Dibuja vectores según la operación
    switch (operation) {
        case '+':
            const total = numVectors1 + numVectors2; // Suma de los vectores
            const angleIncrement = (Math.PI * 2) / total; // Incremento del ángulo para las líneas
        
            // Dibuja líneas radiales
            for (let i = 0; i < total; i++) {
                const angle = i * angleIncrement; // Ángulo para cada línea
                const xEnd = centerX + Math.cos(angle) * length; // Posición X del extremo
                const yEnd = centerY + Math.sin(angle) * length; // Posición Y del extremo
        
                // Dibuja la línea
                ctx.beginPath();
                ctx.moveTo(centerX, centerY); // Desde el centro
                ctx.lineTo(xEnd, yEnd); // Hasta el extremo
                ctx.strokeStyle = `black)`; // Color de las líneas
                ctx.lineWidth = 0.5; // Grosor de las líneas
                ctx.stroke();
            }
        
            // Dibuja un círculo en el centro
            ctx.beginPath();
            ctx.arc(centerX, centerY, 10, 0, Math.PI * 2); // Círculo en el centro
            ctx.fillStyle = 'black'; // Color del círculo
            ctx.fill();
            ctx.stroke();
            break;

        case '-':
            // Obtener la cantidad de vectores curveados del primer número (numVectors1)
            const numCurvedVectors = Math.max(1, Math.min(99, numVectors1)); // Asegurarse de que numVectors1 se use aquí
            const waveLength = 20; // Longitud de la onda
            const waveHeight = 10; // Altura de la onda
        
            // Almacenar los extremos de las líneas curveadas
            const allCurvedPoints = []; // Almacenar los extremos de las líneas curveadas
        
            // Dibuja líneas curveadas
            for (let i = 0; i < numCurvedVectors; i++) {
                const angle = (i * Math.PI * 2) / numCurvedVectors; // Ángulo para cada línea
                ctx.beginPath();
                for (let t = 0; t <= length; t += 5) {
                    const x = centerX + Math.cos(angle) * t; // Posición X
                    const y = centerY + Math.sin(angle) * t + Math.sin(t / waveLength) * waveHeight; // Posición Y con ondulación
                    ctx.lineTo(x, y);
                }
                ctx.strokeStyle = 'blanck'; // Color de las líneas curveadas
                ctx.lineWidth = 0.5;
                ctx.stroke();
        
                // Almacenar el extremo de la línea curveada
                const endX = centerX + Math.cos(angle) * length;
                const endY = centerY + Math.sin(angle) * length + Math.sin(length / waveLength) * waveHeight; // Extremo de la línea curveada
                allCurvedPoints.push({ x: endX, y: endY });
            }
        
            // Dibuja el efecto de telaraña usando el segundo número (numVectors2)
            ctx.strokeStyle = 'blanck'; // Color para las conexiones
            ctx.lineWidth = 0.5;
        
            // Usar numVectors2 para determinar cuántas conexiones se dibujan
            const numConnections = Math.max(1, Math.min(99, numVectors2)); // Asegurarse de que numVectors2 se use aquí
        
            // Conectar los extremos de las líneas curveadas para crear el efecto de telaraña
            for (let i = 0; i < allCurvedPoints.length; i++) {
                const currentPoint = allCurvedPoints[i];
        
                // Conectar a otros puntos dentro de la distancia especificada
                for (let j = 1; j <= numConnections; j++) {
                    const otherIndex = (i + j) % allCurvedPoints.length; // Conectar a puntos en el arreglo
                    const otherPoint = allCurvedPoints[otherIndex];
        
                    ctx.beginPath();
                    ctx.moveTo(currentPoint.x, currentPoint.y);
                    ctx.lineTo(otherPoint.x, otherPoint.y);
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
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 0.1;
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
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'; // Color para las conexiones
            ctx.lineWidth = 0.1;
        
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
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 0.5;
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
                    ctx.strokeStyle = 'black'; // Color de las espirales
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
                break;
            console.log('Operación no válida');
    }   
}
