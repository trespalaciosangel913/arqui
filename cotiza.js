
function formatCOP(value){
  return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

document.addEventListener('DOMContentLoaded', () => {
  const terreno = document.getElementById('terreno');
  const metros = document.getElementById('metros');
  const complejidad = document.getElementById('complejidad');
  const jardin = document.getElementById('jardin');
  const piscina = document.getElementById('piscina');
  const premium = document.getElementById('premium');
  const btn = document.getElementById('btn-calcular');
  const bloque = document.getElementById('resultado');
  const precioEl = document.getElementById('precio');
  const resumenEl = document.getElementById('resumen');

  function basePorM2(t){
    if(t === 'urbano') return 800000;
    if(t === 'rural') return 600000;
    if(t === 'comercial') return 1000000;
    return 800000;
  }
  function factorComplejidad(c){
    if(c === 'baja') return 1.00;
    if(c === 'media') return 1.10;
    if(c === 'alta') return 1.20;
    return 1.10;
  }
  function extrasTotal(){
    let total = 0;
    if(jardin.checked) total += 5000000;
    if(piscina.checked) total += 25000000;
    if(premium.checked) total += 15000000;
    return total;
  }

  btn.addEventListener('click', () => {
    const m2 = Math.max(10, parseInt(metros.value || "0", 10));
    const base = basePorM2(terreno.value) * m2;
    const total = Math.round(base * factorComplejidad(complejidad.value) + extrasTotal());

    // resumen
    const detalles = [
      `Terreno: ${terreno.options[terreno.selectedIndex].text}`,
      `Metros²: ${m2}`,
      `Complejidad: ${complejidad.options[complejidad.selectedIndex].text}`,
      `Extras: ${
        [jardin.checked ? 'Jardín' : null,
         piscina.checked ? 'Piscina' : null,
         premium.checked ? 'Premium' : null].filter(Boolean).join(', ') || 'Ninguno'
      }`
    ];
    resumenEl.textContent = detalles.join(' · ');
    precioEl.textContent = formatCOP(total);
    bloque.style.display = 'block';
    bloque.scrollIntoView({ behavior: 'smooth' });
  });
});
