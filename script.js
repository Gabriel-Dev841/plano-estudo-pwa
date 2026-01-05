const inputs = document.querySelectorAll("input, textarea");

inputs.forEach((el, i) => {
  if (el.type === "checkbox") el.checked = localStorage.getItem(i) === "true";
  else el.value = localStorage.getItem(i) || "";

  el.addEventListener("input", salvar);
  el.addEventListener("change", salvar);
});

function salvar() {
  inputs.forEach((el, i) => {
    localStorage.setItem(i, el.type === "checkbox" ? el.checked : el.value);
  });
  atualizar();
}

function atualizar() {
  const checks = [...document.querySelectorAll("input[type=checkbox]")];
  const done = checks.filter(c => c.checked).length;
  const pct = Math.round((done / checks.length) * 100) || 0;
  document.getElementById("progGeral").style.width = pct + "%";
  document.getElementById("txtGeral").innerText = pct + "% concluído";
}

function resetar() {
  if (confirm("Resetar tudo?")) {
    localStorage.clear();
    location.reload();
  }
}

function exportar() {
  let txt = "Plano de Estudo - Engenharia de Software\n\n";
  inputs.forEach(el => {
    if (el.type !== "checkbox" && el.value) txt += el.value + "\n\n";
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([txt]));
  a.download = "plano-estudo.txt";
  a.click();
}

function openTab(id, btn) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

atualizar();
