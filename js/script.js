// ─── SUPABASE ──────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://rmayoabnbbcyhkmaorpp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_m7Fev0bGSkzazz600_x48Q_jn5obw8V';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── EMAILJS — remplace avec tes clés (voir README ci-dessous) ────────────
const EJS_SERVICE  = 'service_emhh5lt';
const EJS_TEMPLATE = 'template_v5f61wc';
const EJS_KEY      = 'tIjEFu_YDuyQsi6-9';

// ─── FORM ──────────────────────────────────────────────────────────────────
async function handleForm(e) {
  e.preventDefault();

  const btn  = document.getElementById('f-btn');
  const orig = btn.innerHTML;

  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const phone   = document.getElementById('f-phone').value.trim();
  const service = document.getElementById('f-service').value;
  const budget  = document.getElementById('f-budget').value;
  const message = document.getElementById('f-message').value.trim();

  // Validation
  if (!name || !email || !message)
    return showAlert('error', '⚠ Veuillez remplir les champs obligatoires (*).');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return showAlert('error', '⚠ Adresse email invalide.');

  btn.innerHTML = '<span style="opacity:.65">Envoi en cours…</span>';
  btn.disabled  = true;
  hideAlert();

  // 1 — Sauvegarde Supabase
  const { error } = await sb.from('contacts').insert([{
    name, email,
    phone:   phone   || null,
    service: service || null,
    budget:  budget  || null,
    message,
  }]);

  if (error) {
    console.error('Supabase:', error);
    showAlert('error', '⚠ Erreur lors de l\'envoi. Réessayez dans un instant.');
    btn.innerHTML = orig;
    btn.disabled  = false;
    return;
  }

  // 2 — Notification email (EmailJS)
  if (EJS_SERVICE !== 'YOUR_SERVICE_ID') {
    emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
      from_name:  name,
      from_email: email,
      phone:      phone   || 'Non renseigné',
      service:    service || 'Non renseigné',
      budget:     budget  || 'Non renseigné',
      message,
    }, EJS_KEY).catch(err => console.warn('EmailJS:', err));
  }

  showAlert('success', '✓ Message envoyé ! On vous contacte sous 24h.');
  e.target.reset();
  btn.innerHTML = orig;
  btn.disabled  = false;
}

// ─── HELPERS ───────────────────────────────────────────────────────────────
function showAlert(type, msg) {
  const el = document.getElementById('form-alert');
  el.style.cssText = type === 'success'
    ? 'display:flex;align-items:center;gap:.5rem;background:rgba(16,185,129,.1);color:#059669;border:1px solid rgba(16,185,129,.25);padding:.75rem 1rem;border-radius:10px;font-size:.84rem;font-weight:600;'
    : 'display:flex;align-items:center;gap:.5rem;background:rgba(239,68,68,.08);color:#DC2626;border:1px solid rgba(239,68,68,.2);padding:.75rem 1rem;border-radius:10px;font-size:.84rem;font-weight:600;';
  el.innerHTML = msg;
}

function hideAlert() {
  document.getElementById('form-alert').style.display = 'none';
}
