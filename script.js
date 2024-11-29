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
});   