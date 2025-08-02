// Datos de departamentos y municipios principales de Colombia
const departamentosMunicipios = {
  amazonas: ['Leticia', 'Puerto Nariño'],
  antioquia: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Rionegro', 'Apartadó', 'Turbo', 'Caucasia'],
  arauca: ['Arauca', 'Arauquita', 'Saravena', 'Tame'],
  atlantico: ['Barranquilla', 'Soledad', 'Malambo', 'Galapa', 'Puerto Colombia'],
  bolivar: ['Cartagena', 'Magangué', 'Arjona', 'Turbaco', 'Clemencia'],
  boyaca: ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá', 'Paipa'],
  caldas: ['Manizales', 'La Dorada', 'Chinchiná', 'Villamaría'],
  caqueta: ['Florencia', 'Morelia', 'Solano', 'San Vicente del Caguán'],
  casanare: ['Yopal', 'Aguazul', 'Paz de Ariporo'],
  cauca: ['Popayán', 'Santander de Quilichao', 'Puerto Tejada'],
  cesar: ['Valledupar', 'Aguachica', 'Codazzi'],
  choco: ['Quibdó', 'Istmina', 'Condoto'],
  cordoba: ['Montería', 'Cereté', 'Sahagún'],
  cundinamarca: ['Fusagasugá', 'Girardot', 'Zipaquirá', 'Soacha'],
  guainia: ['Inírida'],
  guaviare: ['San José del Guaviare', 'Calamar'],
  huila: ['Neiva', 'Pitalito', 'Garzón'],
  la_guajira: ['Riohacha', 'Maicao', 'Uribia'],
  magdalena: ['Santa Marta', 'Ciénaga', 'Fundación'],
  meta: ['Villavicencio', 'Acacías', 'Granada'],
  narino: ['Pasto', 'Tumaco', 'Ipiales'],
  norte_santander: ['Cúcuta', 'Ocaña', 'Pamplona'],
  putumayo: ['Mocoa', 'Puerto Asís', 'Orito'],
  quindio: ['Armenia', 'Calarcá', 'Montenegro'],
  risaralda: ['Pereira', 'Dosquebradas', 'La Virginia'],
  san_andres: ['San Andrés', 'Providencia'],
  santander: ['Bucaramanga', 'Floridablanca', 'Girón'],
  sucre: ['Sincelejo', 'Corozal', 'Sampués'],
  tolima: ['Ibagué', 'Espinal', 'Melgar'],
  valle_cauca: ['Cali', 'Palmira', 'Buenaventura'],
  vaupes: ['Mitú'],
  vichada: ['Puerto Carreño'],
  bogota_dc: ['Bogotá D.C.']
};

let formData = {};

document.addEventListener('DOMContentLoaded', () => {
  showConsentModal();
  setupEventListeners();
  setupRealTimeValidation();
});

function setupEventListeners() {
  document.getElementById('acceptBtn').addEventListener('click', handleAccept);
  document.getElementById('rejectBtn').addEventListener('click', handleReject);
  document.getElementById('registrationForm').addEventListener('submit', handleFormSubmit);
  document.getElementById('cancelBtn').addEventListener('click', showCancelModal);
  document.getElementById('departamento').addEventListener('change', updateMunicipios);
  document.getElementById('plan').addEventListener('change', updatePlanPrice);
  document.getElementById('estrato').addEventListener('change', updatePlanOptions);
  document.getElementById('confirmBtn').addEventListener('click', handleConfirm);
  document.getElementById('correctBtn').addEventListener('click', hideSummaryModal);
  document.getElementById('submitCancelBtn').addEventListener('click', handleCancelSubmit);
  document.getElementById('closeCancelBtn').addEventListener('click', hideCancelModal);
  document.getElementById('closeErrorBtn').addEventListener('click', hideErrorModal);
}

function setupRealTimeValidation() {
  document.getElementById('nombreCompleto').addEventListener('blur', validateFullName);
  document.getElementById('correoElectronico').addEventListener('blur', validateEmail);
  document.getElementById('celular').addEventListener('input', validatePhone);
  document.getElementById('numeroDocumento').addEventListener('input', validateDocument);
}

function showConsentModal() {
  document.getElementById('consentModal').style.display = 'flex';
}

function hideConsentModal() {
  document.getElementById('consentModal').style.display = 'none';
}

function handleAccept() {
  hideConsentModal();
  document.getElementById('mainForm').style.display = 'block';
  setTimeout(() => {
    document.getElementById('mainForm').style.opacity = '1';
  }, 100);
}

function handleReject() {
  alert('Si no acepta el tratamiento de datos no es posible enviarle el servicio.');
}

function updateMunicipios() {
  const departamentoSelect = document.getElementById('departamento');
  const municipioSelect = document.getElementById('municipio');
  const selectedDepartamento = departamentoSelect.value;

  municipioSelect.innerHTML = '<option value="">Seleccionar municipio...</option>';

  if (selectedDepartamento && departamentosMunicipios[selectedDepartamento]) {
    municipioSelect.disabled = false;
    departamentosMunicipios[selectedDepartamento].forEach(municipio => {
      const option = document.createElement('option');
      option.value = municipio.toLowerCase().replace(/\s+/g, '_');
      option.textContent = municipio;
      municipioSelect.appendChild(option);
    });
  } else {
    municipioSelect.disabled = true;
  }
}

function updatePlanPrice() {
  const planSelect = document.getElementById('plan');
  const valorPlanInput = document.getElementById('valorPlan');
  const selectedOption = planSelect.options[planSelect.selectedIndex];

  if (selectedOption && selectedOption.dataset.price) {
    const price = parseInt(selectedOption.dataset.price);
    valorPlanInput.value = `$${price.toLocaleString('es-CO')}`;
  } else {
    valorPlanInput.value = '';
  }
}

function updatePlanOptions() {
  const estratoSelect = document.getElementById('estrato');
  const planSelect = document.getElementById('plan');
  const estrato = estratoSelect.value;

  const allOptions = planSelect.querySelectorAll('option');

  allOptions.forEach(option => {
    if (option.dataset.estrato === '6') {
      if (estrato === '6') {
        option.disabled = false;
        option.style.display = 'block';
      } else {
        option.disabled = true;
        option.style.display = 'none';
        if (option.selected) {
          planSelect.value = '';
          document.getElementById('valorPlan').value = '';
        }
      }
    }
  });
}

function validateFullName() {
  const nameInput = document.getElementById('nombreCompleto');
  const name = nameInput.value.trim();
  const words = name.split(/\s+/).filter(word => word.length > 0);

  if (words.length < 2) {
    showFieldError(nameInput, 'El nombre debe contener al menos nombre y apellido');
    return false;
  }

  clearFieldError(nameInput);
  return true;
}

function validateEmail() {
  const emailInput = document.getElementById('correoElectronico');
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    showFieldError(emailInput, 'Ingrese un correo electrónico válido');
    return false;
  }

  clearFieldError(emailInput);
  return true;
}

function validatePhone() {
  const phoneInput = document.getElementById('celular');
  const phone = phoneInput.value.replace(/\D/g, '');

  if (phone.length !== 10) {
    showFieldError(phoneInput, 'El celular debe tener 10 dígitos');
    return false;
  }

  clearFieldError(phoneInput);
  return true;
}

function validateDocument() {
  const docInput = document.getElementById('numeroDocumento');
  const doc = docInput.value.replace(/\D/g, '');

  if (doc.length < 6 || doc.length > 12) {
    showFieldError(docInput, 'El número de documento debe tener entre 6 y 12 dígitos');
    return false;
  }

  clearFieldError(docInput);
  return true;
}

function showFieldError(input, message) {
  input.style.borderColor = '#dc3545';
  input.style.boxShadow = '0 0 10px rgba(220, 53, 69, 0.5)';

  const existingError = input.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }

  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.style.color = '#dc3545';
  errorDiv.style.fontSize = '0.9rem';
  errorDiv.style.marginTop = '0.25rem';
  errorDiv.textContent = message;
  input.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
  input.style.borderColor = 'rgba(147, 51, 234, 0.3)';
  input.style.boxShadow = 'none';

  const existingError = input.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (validateForm()) {
    collectFormData();
    showSummaryModal();
  }
}

function validateForm() {
  const requiredFields = [
    { id: 'nombreCompleto', name: 'Nombre Completo', validator: validateFullName },
    { id: 'tipoDocumento', name: 'Tipo de Documento' },
    { id: 'numeroDocumento', name: 'Número de Documento', validator: validateDocument },
    { id: 'fechaExpedicion', name: 'Fecha de Expedición' },
    { id: 'fechaNacimiento', name: 'Fecha de Nacimiento' },
    { id: 'correoElectronico', name: 'Correo Electrónico', validator: validateEmail },
    { id: 'direccionCompleta', name: 'Dirección Completa' },
    { id: 'departamento', name: 'Departamento' },
    { id: 'municipio', name: 'Municipio' },
    { id: 'barrio', name: 'Barrio' },
    { id: 'estrato', name: 'Estrato' },
    { id: 'celular', name: 'Celular', validator: validatePhone },
    { id: 'plan', name: 'Plan' }
  ];

  for (const field of requiredFields) {
    const input = document.getElementById(field.id);
    const value = input.value.trim();

    if (!value) {
      showErrorModal(`El campo "${field.name}" es obligatorio.`);
      input.focus();
      return false;
    }

    if (field.validator && !field.validator()) {
      input.focus();
      return false;
    }
  }

  if (!validateDates()) {
    return false;
  }

  return true;
}

function validateDates() {
  const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
  const fechaExpedicion = new Date(document.getElementById('fechaExpedicion').value);
  const today = new Date();

  if (fechaNacimiento > today) {
    showErrorModal('La fecha de nacimiento no puede ser futura.');
    return false;
  }

  if (fechaExpedicion > today) {
    showErrorModal('La fecha de expedición no puede ser futura.');
    return false;
  }

  if (fechaExpedicion < fechaNacimiento) {
    showErrorModal('La fecha de expedición debe ser posterior a la fecha de nacimiento.');
    return false;
  }

  const age = today.getFullYear() - fechaNacimiento.getFullYear();
  const monthDiff = today.getMonth() - fechaNacimiento.getMonth();

  if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && today.getDate() < fechaNacimiento.getDate())) {
    showErrorModal('Debe ser mayor de 18 años para registrarse.');
    return false;
  }

  return true;
}

function collectFormData() {
  formData = {
    nombreCompleto: document.getElementById('nombreCompleto').value.trim(),
    tipoDocumento: document.getElementById('tipoDocumento').options[document.getElementById('tipoDocumento').selectedIndex].text,
    numeroDocumento: document.getElementById('numeroDocumento').value.trim(),
    fechaExpedicion: formatDate(document.getElementById('fechaExpedicion').value),
    fechaNacimiento: formatDate(document.getElementById('fechaNacimiento').value),
    correoElectronico: document.getElementById('correoElectronico').value.trim(),
    direccionCompleta: document.getElementById('direccionCompleta').value.trim(),
    departamento: document.getElementById('departamento').options[document.getElementById('departamento').selectedIndex].text,
    municipio: document.getElementById('municipio').options[document.getElementById('municipio').selectedIndex].text,
    barrio: document.getElementById('barrio').value.trim(),
    estrato: document.getElementById('estrato').value,
    celular: document.getElementById('celular').value.trim(),
    plan: document.getElementById('plan').options[document.getElementById('plan').selectedIndex].text,
    valorPlan: document.getElementById('valorPlan').value
  };
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function showSummaryModal() {
  const summaryContent = document.getElementById('summaryContent');
  summaryContent.innerHTML = generateSummaryHTML();
  document.getElementById('summaryModal').style.display = 'flex';
}

function hideSummaryModal() {
  document.getElementById('summaryModal').style.display = 'none';
}

function generateSummaryHTML() {
  return `
    <div class="summary-item">
      <span class="summary-label">👤 Nombre Completo:</span>
      <span class="summary-value">${formData.nombreCompleto}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">📄 Tipo de Documento:</span>
      <span class="summary-value">${formData.tipoDocumento}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">🔢 Número de Documento:</span>
      <span class="summary-value">${formData.numeroDocumento}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">📅 Fecha de Expedición:</span>
      <span class="summary-value">${formData.fechaExpedicion}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">🎂 Fecha de Nacimiento:</span>
      <span class="summary-value">${formData.fechaNacimiento}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">📧 Correo Electrónico:</span>
      <span class="summary-value">${formData.correoElectronico}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">🏠 Dirección:</span>
      <span class="summary-value">${formData.direccionCompleta}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">🏢 Departamento:</span>
      <span class="summary-value">${formData.departamento}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">🏘️ Municipio:</span>
      <span class="summary-value">${formData.municipio}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">🏡 Barrio:</span>
      <span class="summary-value">${formData.barrio}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">⚡ Estrato:</span>
      <span class="summary-value">${formData.estrato}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">📱 Celular:</span>
      <span class="summary-value">${formData.celular}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">📺 Plan:</span>
      <span class="summary-value">${formData.plan}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">💰 Valor del Plan:</span>
      <span class="summary-value">${formData.valorPlan}</span>
    </div>
  `;
}

function handleConfirm() {
  const whatsappMessage = generateWhatsAppMessage();
  const whatsappURL = `https://wa.me/573102689105?text=${encodeURIComponent(whatsappMessage)}`;

  showCustomAlert('✅ ÉXITO', 'Sus datos han sido procesados correctamente. Se abrirá WhatsApp para enviar la información.', 'success');

  setTimeout(() => {
    window.open(whatsappURL, '_blank');
    hideSummaryModal();
    resetForm();
  }, 2000);
}

function generateWhatsAppMessage() {
  return `🌟 *NUEVA SOLICITUD DE SERVICIO* 🌟

👤 *Datos Personales:*
• Nombre: ${formData.nombreCompleto}
• ${formData.tipoDocumento}: ${formData.numeroDocumento}
• Expedición: ${formData.fechaExpedicion}
• Nacimiento: ${formData.fechaNacimiento}

📧 *Contacto:*
• Email: ${formData.correoElectronico}
• Celular: ${formData.celular}

🏠 *Ubicación:*
• Dirección: ${formData.direccionCompleta}
• Departamento: ${formData.departamento}
• Municipio: ${formData.municipio}
• Barrio: ${formData.barrio}
• Estrato: ${formData.estrato}

📺 *Servicio Solicitado:*
• Plan: ${formData.plan}
• Valor: ${formData.valorPlan}

✅ *El cliente acepta el tratamiento de datos según la Ley 1581 de 2012*

🚀 ¡Listo para activar el servicio!`;
}

function showCancelModal() {
  document.getElementById('cancelModal').style.display = 'flex';
}

function hideCancelModal() {
  document.getElementById('cancelModal').style.display = 'none';
  document.getElementById('cancelReason').value = '';
}

function handleCancelSubmit() {
  const reason = document.getElementById('cancelReason').value.trim();

  if (!reason) {
    showCustomAlert('⚠️ ATENCIÓN', 'Por favor, ingrese el motivo de cancelación.', 'warning');
    return;
  }

  showCustomAlert('📝 CANCELACIÓN REGISTRADA', `Motivo: ${reason}\n\nGracias por su tiempo. La página se cerrará en 3 segundos.`, 'info');

  setTimeout(() => {
    window.close();
  }, 3000);
}

function showErrorModal(message) {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('errorModal').style.display = 'flex';
}

function hideErrorModal() {
  document.getElementById('errorModal').style.display = 'none';
}

function showCustomAlert(title, message, type) {
  const alertModal = document.createElement('div');
  alertModal.className = 'modal-overlay';
  alertModal.style.zIndex = '10000';

  const alertContainer = document.createElement('div');
  alertContainer.className = 'error-container gamer-card';

  if (type === 'success') {
    alertContainer.style.borderColor = '#10b981';
    alertContainer.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
  } else if (type === 'warning') {
    alertContainer.style.borderColor = '#f59e0b';
    alertContainer.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.3)';
  }

  alertContainer.innerHTML = `
    <div class="error-header">
      <h2 class="gamer-title">${title}</h2>
    </div>
    <div class="error-content">
      <p class="gamer-text" style="white-space: pre-line;">${message}</p>
    </div>
    <div class="error-buttons">
      <button class="btn-close-error gamer-button" onclick="this.closest('.modal-overlay').remove()">ENTENDIDO</button>
    </div>
  `;

  alertModal.appendChild(alertContainer);
  document.body.appendChild(alertModal);

  setTimeout(() => {
    if (alertModal.parentNode) {
      alertModal.remove();
    }
  }, 5000);
}

function resetForm() {
  document.getElementById('registrationForm').reset();
  document.getElementById('valorPlan').value = '';
  document.getElementById('municipio').innerHTML = '<option value="">Seleccionar municipio...</option>';
  document.getElementById('municipio').disabled = true;
  formData = {};
}

window.addEventListener('error', function(e) {
  console.error('Error en la aplicación:', e.error);
  showCustomAlert('⚠️ ERROR', 'Ha ocurrido un error inesperado. Por favor, recargue la página.', 'error');
});

window.addEventListener('beforeunload', function(e) {
  const formInputs = document.querySelectorAll('#registrationForm input, #registrationForm select');
  let hasData = false;

  formInputs.forEach(input => {
    if (input.value.trim() !== '') {
      hasData = true;
    }
  });

  if (hasData && !confirm('¿Está seguro de que desea salir? Se perderán los datos ingresados.')) {
    e.preventDefault();
    e.returnValue = '';
  }
});
