const materias = document.querySelectorAll('.materia');
let progreso = JSON.parse(localStorage.getItem('progreso-nutricion')) || {};

function actualizarEstado() {
  materias.forEach(m => {
    const id = m.dataset.id;
    const corre = m.dataset.correlativas.split(',').filter(Boolean);
    const habilitada = corre.every(c => progreso[c]);
    m.classList.toggle('aprobada', progreso[id]);
    m.classList.toggle('bloqueada', !habilitada && !progreso[id]);
  });
}

materias.forEach(m => {
  m.addEventListener('click', () => {
    if (m.classList.contains('bloqueada')) return;
    const id = m.dataset.id;
    progreso[id] = !progreso[id];
    localStorage.setItem('progreso-nutricion', JSON.stringify(progreso));
    actualizarEstado();
  });
});

actualizarEstado();
