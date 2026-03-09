// Dot grid
  const dg = document.getElementById('dotGrid');
  for (let i = 0; i < 25; i++) dg.appendChild(document.createElement('span'));

  // Validation rules
  const rules = {
    name:    v => v.trim().length >= 2,
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    subject: v => v !== '',
    message: v => v.trim().length >= 20
  };

  function setField(id, state) {
    const el = document.getElementById(`f-${id}`);
    el.classList.remove('valid', 'invalid');
    if (state) el.classList.add(state);
    if (id === 'message') {
      const err = document.getElementById('msg-err');
      err.style.visibility = state === 'invalid' ? 'visible' : 'hidden';
    }
  }

  function validate(id) {
    const inp = document.getElementById(`inp-${id}`);
    const val = id === 'subject' ? inp.value : inp.value;
    const ok = rules[id](val);
    setField(id, ok ? 'valid' : 'invalid');
    return ok;
  }

  // Blur + live correction
  ['name','email','subject','message'].forEach(id => {
    const el = document.getElementById(`inp-${id}`);
    el.addEventListener('blur', () => { if (el.value) validate(id); });
    el.addEventListener('input', () => {
      if (document.getElementById(`f-${id}`).classList.contains('invalid')) validate(id);
    });
  });

  // Char counter
  const msgEl = document.getElementById('inp-message');
  const counter = document.getElementById('charCount');
  msgEl.addEventListener('input', () => {
    const n = msgEl.value.length;
    counter.textContent = `${n} / 500`;
    counter.classList.toggle('warn', n > 450);
  });

  // Submit
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('submitBtn');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const ids = ['name','email','subject','message'];
    const ok = ids.map(validate).every(Boolean);
    if (!ok) {
      btn.style.animation = '';
      requestAnimationFrame(() => { btn.style.animation = 'shake 0.35s ease'; });
      return;
    }
    // Loading
    btn.disabled = true;
    document.getElementById('btnText').style.display = 'none';
    btn.querySelector('.btn-arrow').style.display = 'none';
    document.getElementById('spinner').style.display = 'block';

    setTimeout(() => {
      document.getElementById('formWrap').style.display = 'none';
      const s = document.getElementById('successOverlay');
      s.style.display = 'flex';
    }, 1500);
  });

  // Reset
  document.getElementById('resetBtn').addEventListener('click', () => {
    form.reset();
    ['name','email','subject','message'].forEach(id => setField(id, null));
    counter.textContent = '0 / 500';
    counter.classList.remove('warn');
    btn.disabled = false;
    document.getElementById('btnText').style.display = '';
    btn.querySelector('.btn-arrow').style.display = '';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('successOverlay').style.display = 'none';
    document.getElementById('formWrap').style.display = '';
  });
