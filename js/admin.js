// ─── CONFIG — même clés que script.js ─────────────────────────────────────
const SUPABASE_URL = 'https://rmayoabnbbcyhkmaorpp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_m7Fev0bGSkzazz600_x48Q_jn5obw8V';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const PAGE_SIZE = 20;
let   page      = 1;
let   total     = 0;

// ─── INIT ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', loadData);

// ─── LOAD ──────────────────────────────────────────────────────────────────
async function loadData() {
  setLoading();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const from = (page - 1) * PAGE_SIZE;
  const to   = from + PAGE_SIZE - 1;

  const [
    { data: contacts, count, error },
    { count: todayCount },
    { data: lastRow },
  ] = await Promise.all([
    sb.from('contacts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to),

    sb.from('contacts')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart.toISOString()),

    sb.from('contacts')
      .select('name, created_at')
      .order('created_at', { ascending: false })
      .limit(1),
  ]);

  if (error) { setError('Erreur Supabase : ' + error.message); return; }

  total = count ?? 0;

  // KPIs
  document.getElementById('kpi-total').textContent     = total;
  document.getElementById('kpi-today').textContent     = todayCount ?? 0;
  document.getElementById('badge-count').textContent   = total;

  const last = lastRow?.[0];
  if (last) {
    document.getElementById('kpi-last-name').textContent = last.name;
    document.getElementById('kpi-last-time').textContent = fmtDate(last.created_at);
  }

  renderTable(contacts ?? []);
  renderPagination();
}

// ─── TABLE ─────────────────────────────────────────────────────────────────
function renderTable(rows) {
  const body = document.getElementById('table-body');

  if (!rows.length) {
    body.innerHTML = `<div class="table-state"><div class="icon">📭</div><p>Aucun message reçu.</p></div>`;
    return;
  }

  body.innerHTML = `
    <table>
      <thead><tr>
        <th>Contact</th><th>Service</th><th>Message</th><th>Date</th>
      </tr></thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <td>
              <div class="td-name">${esc(r.name)}</div>
              <div class="td-email">${esc(r.email)}</div>
              ${r.phone ? `<div class="td-email">${esc(r.phone)}</div>` : ''}
            </td>
            <td>${r.service ? `<span class="td-badge">${esc(r.service)}</span>` : '<span class="td-muted">—</span>'}</td>
            <td><div class="td-msg">${esc(r.message)}</div></td>
            <td class="td-date">${fmtDate(r.created_at)}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

// ─── PAGINATION ────────────────────────────────────────────────────────────
function renderPagination() {
  const pages = Math.ceil(total / PAGE_SIZE);
  const el    = document.getElementById('pagination');

  if (pages <= 1) { el.style.display = 'none'; return; }
  el.style.display = 'flex';

  document.getElementById('pg-info').textContent = `Page ${page} / ${pages}`;
  document.getElementById('pg-prev').disabled    = page <= 1;
  document.getElementById('pg-next').disabled    = page >= pages;
}

function changePage(dir) {
  const pages = Math.ceil(total / PAGE_SIZE);
  page = Math.max(1, Math.min(page + dir, pages));
  loadData();
}

// ─── UI HELPERS ────────────────────────────────────────────────────────────
function setLoading() {
  document.getElementById('table-body').innerHTML =
    `<div class="table-state"><div class="spinner"></div><p>Chargement…</p></div>`;
  document.getElementById('pagination').style.display = 'none';
}

function setError(msg) {
  document.getElementById('table-body').innerHTML =
    `<div class="table-state"><div class="icon">⚠️</div><p>${msg}</p></div>`;
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s ?? '';
  return d.innerHTML;
}

function fmtDate(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleDateString('fr-DZ', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}
