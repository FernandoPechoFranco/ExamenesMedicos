document.addEventListener("DOMContentLoaded", () => {
  const triageForm = document.getElementById("triageForm");
  const reportModal = document.getElementById("reportModal");
  const reportPreview = document.getElementById("reportPreview");
  const exportBtn = document.getElementById("exportBtn");
  const previewBtn = document.getElementById("previewBtn");
  const printBtn = document.getElementById("printBtn");

  if (triageForm && reportModal) {
    const fields = {
      reportDate: document.getElementById("reportDate"),
      reportPatient: document.getElementById("reportPatient"),
      reportAge: document.getElementById("reportAge"),
      reportPriority: document.getElementById("reportPriority"),
      reportReason: document.getElementById("reportReason"),
      reportBody: document.getElementById("reportBody"),
      reportNotes: document.getElementById("reportNotes"),
    };

    const rows = [
      { label: "Frecuencia cardiaca", name: "heartRate", normal: "90 a 100" },
      { label: "Presión arterial", name: "bloodPressure", normal: "120/80" },
      { label: "Temperatura", name: "temperature", normal: "36.5 a 37.5 °C" },
      { label: "Saturación O2", name: "oxygen", normal: "95% a 100%" },
      { label: "Frecuencia respiratoria", name: "respiratoryRate", normal: "12 a 20" },
      { label: "Glucosa", name: "glucose", normal: "70 a 100 mg/dl" },
    ];

    const openModal = () => {
      reportModal.classList.add("is-open");
      reportModal.setAttribute("aria-hidden", "false");
    };

    const closeModal = () => {
      reportModal.classList.remove("is-open");
      reportModal.setAttribute("aria-hidden", "true");
    };

    const formatDate = (value) => {
      if (!value) return "--/--/----";
      const date = new Date(`${value}T12:00:00`);
      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    };

    const buildReport = () => {
      const data = new FormData(triageForm);
      const sample = {
        patientName: "Juan Pérez",
        age: "35",
        priority: "Amarilla",
        reason: "Dolor torácico y mareos",
        notes: "Paciente estable, se sugiere monitoreo y derivación si persiste el dolor.",
        date: new Date().toISOString().slice(0, 10),
        heartRate: "130",
        bloodPressure: "140/90",
        temperature: "38.5 °C",
        oxygen: "92%",
        respiratoryRate: "24",
        glucose: "180 mg/dl",
      };

      const getValue = (name) => data.get(name) || sample[name] || "--";
      const date = getValue("date");

      fields.reportDate.textContent = `Fecha: ${formatDate(date)}`;
      fields.reportPatient.textContent = getValue("patientName");
      fields.reportAge.textContent = getValue("age");
      fields.reportPriority.textContent = getValue("priority");
      fields.reportReason.textContent = getValue("reason");
      fields.reportNotes.textContent = getValue("notes");

      fields.reportBody.innerHTML = rows
        .map((row) => {
          const value = getValue(row.name);
          return `
            <tr>
              <td>${row.label}</td>
              <td>${value}</td>
              <td>${row.normal}</td>
            </tr>
          `;
        })
        .join("");
    };

    const showPreview = () => {
      buildReport();
      openModal();
      reportPreview.scrollTop = 0;
    };

    exportBtn?.addEventListener("click", showPreview);
    previewBtn?.addEventListener("click", showPreview);
    printBtn?.addEventListener("click", () => {
      buildReport();
      window.print();
    });

    reportModal.addEventListener("click", (event) => {
      if (event.target.matches("[data-close-modal]")) {
        closeModal();
      }
    });
  }

  const toggleButtons = document.querySelectorAll(".toggle-password");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const input = document.getElementById(targetId);

      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      button.textContent = isPassword ? "Ocultar" : "Mostrar";
    });
  });

  const authForms = document.querySelectorAll(".auth-form");

  authForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = form.querySelector('input[name="username"]')?.value.trim();
      const password = form.querySelector('input[name="password"]')?.value;
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : "";
      const validUser = username === "admin";
      const validPassword = password === "chamako154";

      if (!validUser || !validPassword) {
        alert("Usuario o contraseña incorrectos. Usa admin / chamako154.");
        return;
      }

      if (submitButton) {
        submitButton.textContent = "Ingresando...";
        submitButton.disabled = true;
      }

      setTimeout(() => {
        if (submitButton) {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }

        alert("Inicio de sesión correcto.");
        window.location.href = "Dashboard.html";
      }, 900);
    });
  });

  const inputs = document.querySelectorAll(".input-wrap input");
  inputs.forEach((input, index) => {
    input.style.animationDelay = `${index * 0.08}s`;
    input.classList.add("field-enter");
  });
});
