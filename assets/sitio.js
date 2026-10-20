// La Birriaza: comportamiento de la página
(() => {
  // Número de WhatsApp al que llegan los pedidos (con 52 de México, sin espacios).
  // Cuando el bot tenga su número definitivo, solo cambia este valor.
  const WHATSAPP = '527971066269';
  const MENSAJE = 'Hola, me gustaría hacer un pedido.';
  const ligaWhatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAJE)}`;
  document.querySelectorAll('.js-whatsapp').forEach((a) => {
    a.href = ligaWhatsapp;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Barra superior: se vuelve sólida al bajar
  const barra = document.getElementById('barra');
  const marca = document.getElementById('marca');
  const cinta = document.getElementById('cinta');
  const contenido = document.querySelector('.portada-contenido');

  // Menú en celular
  const menuBoton = document.getElementById('menu-boton');
  function cerrarMenu() { barra.classList.remove('abierta'); menuBoton.setAttribute('aria-expanded', 'false'); menuBoton.setAttribute('aria-label', 'Abrir menú'); }
  menuBoton.addEventListener('click', () => {
    const abierto = barra.classList.toggle('abierta');
    menuBoton.setAttribute('aria-expanded', String(abierto));
    menuBoton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });
  document.querySelectorAll('#navegacion a').forEach((a) => a.addEventListener('click', cerrarMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 720) cerrarMenu(); });
  let pendiente = false;
  function alDesplazar() {
    const y = window.scrollY;
    barra.classList.toggle('solida', y > 40);
    if (!reducido) {
      // El nombre se aleja un poco al bajar y la cinta corre con el scroll
      // Toda la portada se hunde y se desvanece junta, así nada se encima
      const p = Math.min(y / window.innerHeight, 1);
      contenido.style.transform = `translateY(${p * 120}px)`;
      contenido.style.opacity = String(1 - p * 0.9);
      marca.style.transform = `rotate(${-4 - p * 3}deg)`;
      cinta.style.transform = `translateX(${-(y * 0.35) % (cinta.scrollWidth / 2)}px)`;
    }
    pendiente = false;
  }
  window.addEventListener('scroll', () => {
    if (!pendiente) { pendiente = true; requestAnimationFrame(alDesplazar); }
  }, { passive: true });
  alDesplazar();

  // Cómo pedir: el teléfono cambia de pantalla según el paso que estás leyendo
  const pasos = [...document.querySelectorAll('.paso')];
  const pantallas = [...document.querySelectorAll('#pantalla img')];
  const puntos = [...document.querySelectorAll('#progreso span')];
  function mostrarPaso(i) {
    pasos.forEach((el, j) => el.classList.toggle('activo', j === i));
    pantallas.forEach((el, j) => el.classList.toggle('activa', j === i));
    puntos.forEach((el, j) => el.classList.toggle('activo', j === i));
  }
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => { if (e.isIntersecting) mostrarPaso(+e.target.dataset.paso); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    pasos.forEach((p) => obs.observe(p));

    // La comanda "se imprime" cuando la impresora aparece en pantalla
    const impresora = document.getElementById('impresora');
    const obsImp = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) { impresora.classList.add('imprimiendo'); obsImp.disconnect(); }
      });
    }, { threshold: 0.35 });
    obsImp.observe(impresora);
  } else {
    pasos.forEach((p) => p.classList.add('activo'));
    document.getElementById('impresora').classList.add('imprimiendo');
  }
  mostrarPaso(0);
})();
