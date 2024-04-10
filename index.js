document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taxForm");
  const modal = document.getElementById("modal");
  const taxResult = document.getElementById("taxResult");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const grossIncome = parseFloat(
      document.getElementById("grossIncome").value
    );
    const extraIncome = parseFloat(
      document.getElementById("extraIncome").value
    );
    const ageGroup = document.getElementById("ageGroup").value;
    const deductions = parseFloat(document.getElementById("deductions").value);

    const errorIcons = document.querySelectorAll(".error-icon");
    errorIcons.forEach((icon) => (icon.style.display = "none"));

    // Validate inputs
    let isValid = true;
    if (isNaN(grossIncome)) {
      document.getElementById("grossIncome").nextElementSibling.style.display =
        "inline-block";
      isValid = false;
    }
    if (isNaN(extraIncome)) {
      document.getElementById("extraIncome").nextElementSibling.style.display =
        "inline-block";
      isValid = false;
    }
    if (ageGroup === "") {
      document.getElementById("ageGroup").nextElementSibling.style.display =
        "inline-block";
      isValid = false;
    }
    if (isNaN(deductions)) {
      document.getElementById("deductions").nextElementSibling.style.display =
        "inline-block";
      isValid = false;
    }

    if (isValid) {
      const overallIncome = grossIncome + extraIncome - deductions;
      let tax = 0;
      if (overallIncome > 800000) {
        switch (ageGroup) {
          case "<40":
            tax = 0.3 * (overallIncome - 800000);
            break;
          case "≥40 & <60":
            tax = 0.4 * (overallIncome - 800000);
            break;
          case "≥60":
            tax = 0.1 * (overallIncome - 800000);
            break;
        }
      }

      taxResult.innerHTML = `
          <p>${overallIncome - tax}</p>
          
        `;
      modal.style.display = "block";
    }
  });

  modal
    .getElementsByClassName("close")[0]
    .addEventListener("click", function () {
      modal.style.display = "none";
    });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
