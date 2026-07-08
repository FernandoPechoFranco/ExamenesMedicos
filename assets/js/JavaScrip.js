document.addEventListener("DOMContentLoaded", () => {
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
