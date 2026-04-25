// ─── CONFIG — remplace par tes vraies clés Supabase ───────────────────────
const SUPABASE_URL = 'https://rmayoabnbbcyhkmaorpp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_m7Fev0bGSkzazz600_x48Q_jn5obw8V';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── FORM ──────────────────────────────────────────────────────────────────
async function handleForm(e) {
  e.preventDefault();

  const btn  = document.getElementById('f-btn');
  const orig = btn.innerHTML;

  // Lecture des champs
  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const phone   = document.getElementById('f-phone').value.trim();
  const service = document.getElementById('f-service').value;
  const budget  = document.getElementById('f-budget').value;
  const message = document.getElementById('f-message').value.trim();

  // Validation locale
  if (!name || !email || !message)
    return showAlert('error', '⚠ Veuillez remplir tous les champs obligatoires (*).');

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return showAlert('error', '⚠ Adresse email invalide.');

  // Loading
  btn.innerHTML = '<span style="opacity:.65">Envoi en cours…</span>';
  btn.disabled  = true;
  hideAlert();

  // Insert Supabase
  const { error } = await sb.from('contacts').insert([{
    name, email, phone: phone || null,
    service: service || null,
    budget:  budget  || null,
    message,
  }]);

  if (error) {
    showAlert('error', '⚠ Erreur lors de l\'envoi. Réessayez dans un instant.');
    console.error(error);
  } else {
    showAlert('success', '✓ Message envoyé ! On vous contacte sous 24h.');
    e.target.reset();
  }

  btn.innerHTML = orig;
  btn.disabled  = false;
}

// ─── UI HELPERS ────────────────────────────────────────────────────────────
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
