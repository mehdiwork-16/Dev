// ─── SUPABASE ──────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://rmayoabnbbcyhkmaorpp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_m7Fev0bGSkzazz600_x48Q_jn5obw8V';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── WEB3FORMS — clé d'accès ───────────────────────────────────────────────
const W3F_KEY = '90ec5463-89c0-4c20-8adb-3f412a4c4132';

// ─── FORM ──────────────────────────────────────────────────────────────────
async function handleForm(e) {
  e.preventDefault();

  const btn  = document.getElementById('f-btn');
  const orig = btn.innerHTML;

  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const phone   = document.getElementById('f-phone').value.trim();
  const service = document.getElementById('f-service').value;
  const budget  = document.getElementById('f-budget')?.value ?? null;
  const message = document.getElementById('f-message').value.trim();

  // Validation
  if (!name || !email || !message)
    return showAlert('error', '⚠ Veuillez remplir les champs obligatoires (*).');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return showAlert('error', '⚠ Adresse email invalide.');

  btn.innerHTML = '<span class="btn-label" style="opacity:.65;margin-right:0">Envoi en cours…</span>';
  btn.disabled  = true;
  hideAlert();

  // 1 — Sauvegarde Supabase
  const { error: sbError } = await sb.from('contacts').insert([{
    name, email,
    phone:   phone   || null,
    service: service || null,
    budget:  budget  || null,
    message,
  }]);

  if (sbError) {
    console.error('Supabase:', sbError);
    showAlert('error', '⚠ Erreur lors de l\'envoi. Réessayez.');
    btn.innerHTML = orig;
    btn.disabled  = false;
    return;
  }

  // 2 — Notification email via Web3Forms
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: W3F_KEY,
      subject:   `🔔 Nouvelle demande — ${name} | DevelopMe`,
      name,
      email,
      phone:   phone   || 'Non renseigné',
      service: service || 'Non renseigné',
      budget:  budget  || 'Non renseigné',
      message,
    }),
  })
  .then(r => r.json())
  .then(d => console.log('Web3Forms:', d.message))
  .catch(err => console.error('Web3Forms:', err));

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
