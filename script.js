function mostrarLogin() {
  document.getElementById("loginBox").classList.remove("oculto");
  document.getElementById("registroBox").classList.add("oculto");
}

function mostrarRegistro() {
  document.getElementById("registroBox").classList.remove("oculto");
  document.getElementById("loginBox").classList.add("oculto");
}

function cerrar() {
  document.getElementById("loginBox").classList.add("oculto");
  document.getElementById("registroBox").classList.add("oculto");
}



function calcular() {

  let nombre = document.getElementById("nombrePaciente").value;
  let peso = parseFloat(document.getElementById("peso").value);
  let altura = parseFloat(document.getElementById("altura").value);
  let edad = parseInt(document.getElementById("edad").value);
  let sexo = document.getElementById("sexo").value;

  if (!nombre || !peso || !altura || !edad) {
    alert("Completa todos los campos");
    return;
  }

  let usuario = localStorage.getItem("usuarioActivo");

  // ✅ Convertir altura a metros
  let alturaM = altura / 100;

  // ✅ BMR
  let bmr = sexo === "hombre"
    ? 10 * peso + 6.25 * altura - 5 * edad + 5
    : 10 * peso + 6.25 * altura - 5 * edad - 161;

  let tdee = bmr * 1.55;

  // ✅ IMC
  let imc = peso / (alturaM * alturaM);

  let estado;
  if (imc < 18.5) {
    estado = "Bajo peso";
  } else if (imc < 25) {
    estado = "Peso normal (saludable)";
  } else if (imc < 30) {
    estado = "Sobrepeso";
  } else {
    estado = "Obesidad";
  }

  // ✅ Macronutrientes
  let proteinas = peso * 2; // g por kg
  let grasas = (tdee * 0.25) / 9;
  let carbs = (tdee - (proteinas * 4 + grasas * 9)) / 4;

  let resultado = {
    paciente: nombre,
    calorias: tdee.toFixed(2),
    imc: imc.toFixed(2),
    estado: estado,
    proteinas: proteinas.toFixed(2),
    grasas: grasas.toFixed(2),
    carbs: carbs.toFixed(2),
    fecha: new Date().toLocaleString()
  };

  let datos = JSON.parse(localStorage.getItem(usuario)) || [];
  datos.push(resultado);

  localStorage.setItem(usuario, JSON.stringify(datos));

  // ✅ Mostrar resultados completos
  document.getElementById("resultado").innerHTML = `
    <b>Paciente:</b> ${nombre}<br><br>

    🔥 <b>Calorías:</b> ${tdee.toFixed(2)} kcal<br>
    
    ⚖️ <b>IMC:</b> ${imc.toFixed(2)}<br>
    📊 <b>Estado:</b> ${estado}<br><br>

    🥩 <b>Proteínas recomendadas:</b> ${proteinas.toFixed(2)} g<br>
    🧈 <b>Grasas recomendadas:</b> ${grasas.toFixed(2)} g<br>
    🍞 <b>Carbohidratos recomendados:</b> ${carbs.toFixed(2)} g
  `;
}