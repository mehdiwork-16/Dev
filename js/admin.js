// ─── SUPABASE ──────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://rmayoabnbbcyhkmaorpp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_m7Fev0bGSkzazz600_x48Q_jn5obw8V';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── STATE ────────────────────────────────────────────────────────────────
let allData       = [];          // all contacts from Supabase
let filteredReq   = [];          // current filtered view (requests page)
let filteredCt    = [];          // current filtered view (contacts page)
let reqFilter     = 'all';
let reqSearch     = '';
let ctSearch      = '';
let reqCurPage    = 1;
let ctCurPage     = 1;
const PAGE_SIZE   = 15;

// Chart instances (to destroy before re-render)
let chartMini     = null;
let chartDonut    = null;
let chartTimeline = null;

// ─── PAGE NAVIGATION ──────────────────────────────────────────────────────
const PAGE_TITLES = {
  overview:  'Vue d\'ensemble',
  requests:  'Demandes clients',
  contacts:  'Carnet de contacts',
  analytics: 'Analytiques',
};

function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (btn) btn.classList.add('active');
  document.getElementById('topbar-title').textContent = PAGE_TITLES[id] || '';
  if (id === 'analytics') renderAnalytics();
}

// ─── MAIN LOAD ────────────────────────────────────────────────────────────
async function refreshAll() {
  const { data, error } = await sb
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1000);

  if (error) { console.error('Supabase:', error); return; }

  allData     = data ?? [];
  filteredReq = [...allData];
  filteredCt  = [...allData];

  renderKPIs();
  renderOverview();
  renderRequests();
  renderContacts();

  document.getElementById('nb-req').textContent  = allData.length;
  document.getElementById('req-count').textContent = allData.length;
  document.getElementById('ct-count').textContent  = allData.length;

  // Re-render analytics if visible
  if (document.getElementById('page-analytics').classList.contains('active')) {
    renderAnalytics();
  }
}

// ─── KPIs ─────────────────────────────────────────────────────────────────
function renderKPIs() {
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const week  = new Date(today); week.setDate(week.getDate() - 7);

  const todayCount = allData.filter(r => new Date(r.created_at) >= today).length;
  const weekCount  = allData.filter(r => new Date(r.created_at) >= week).length;

  document.getElementById('kpi-total').textContent = allData.length;
  document.getElementById('kpi-today').textContent = todayCount;
  document.getElementById('kpi-week').textContent  = weekCount;

  // Top service
  const svcMap = buildServiceMap(allData);
  const sorted = Object.entries(svcMap).sort((a, b) => b[1] - a[1]);
  if (sorted.length && allData.length) {
    const [topSvc, topCount] = sorted[0];
    const pct = Math.round(topCount / allData.length * 100);
    document.getElementById('kpi-top').textContent     = topSvc;
    document.getElementById('kpi-top-pct').textContent = `${pct}% des demandes`;
  }
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────
function renderOverview() {
  const recent = allData.slice(0, 6);
  const el = document.getElementById('ov-table');
  if (!recent.length) {
    el.innerHTML = '<div class="empty-st"><div class="eico">📭</div><p>Aucune demande.</p></div>'; return;
  }
  el.innerHTML = `
    <table>
      <thead><tr><th>Contact</th><th>Service demandé</th><th>Date</th></tr></thead>
      <tbody>
        ${recent.map(r => `
          <tr>
            <td>
              <div class="td-av-wrap">
                <div class="td-av">${initials(r.name)}</div>
                <div><div class="td-name">${esc(r.name)}</div><div class="td-sub">${esc(r.email)}</div></div>
              </div>
            </td>
            <td>${svcBadge(r.service)}</td>
            <td class="td-date">${fmtDate(r.created_at)}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;

  // Mini donut chart
  renderMiniChart();
}

function renderMiniChart() {
  const svcMap = buildServiceMap(allData);
  const labels = Object.keys(svcMap);
  const values = Object.values(svcMap);
  if (!labels.length) return;

  if (chartMini) { chartMini.destroy(); chartMini = null; }
  const ctx = document.getElementById('chart-mini');
  if (!ctx) return;

  chartMini = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data: values, backgroundColor: CHART_COLORS, borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
      cutout: '60%',
      plugins: {
        legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans', size: 11 }, boxWidth: 12, padding: 12 } },
        tooltip: { callbacks: {
          label: ctx => ` ${ctx.label}: ${ctx.parsed} (${Math.round(ctx.parsed/allData.length*100)}%)`
        }}
      }
    }
  });
}

// ─── REQUESTS PAGE ────────────────────────────────────────────────────────
function filterRequests(btn) {
  document.querySelectorAll('.fpill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  reqFilter   = btn.dataset.f;
  reqCurPage  = 1;
  applyReqFilters();
}

function searchRequests(val) {
  reqSearch  = val.toLowerCase();
  reqCurPage = 1;
  applyReqFilters();
}

function applyReqFilters() {
  let d = [...allData];
  if (reqFilter !== 'all') d = d.filter(r => svcCategory(r.service) === reqFilter);
  if (reqSearch) {
    d = d.filter(r =>
      (r.name||'').toLowerCase().includes(reqSearch) ||
      (r.email||'').toLowerCase().includes(reqSearch) ||
      (r.service||'').toLowerCase().includes(reqSearch) ||
      (r.message||'').toLowerCase().includes(reqSearch)
    );
  }
  filteredReq = d;
  renderRequests();
}

function renderRequests() {
  const total = filteredReq.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const from  = (reqCurPage - 1) * PAGE_SIZE;
  const slice = filteredReq.slice(from, from + PAGE_SIZE);
  const el    = document.getElementById('req-table');

  if (!slice.length) {
    el.innerHTML = '<div class="empty-st"><div class="eico">📭</div><p>Aucune demande trouvée.</p></div>';
    document.getElementById('req-pag').style.display = 'none'; return;
  }

  el.innerHTML = `
    <table>
      <thead><tr>
        <th>Contact</th><th>Téléphone</th><th>Service / Pack</th><th>Budget</th><th>Message</th><th>Date</th>
      </tr></thead>
      <tbody>
        ${slice.map(r => `
          <tr>
            <td>
              <div class="td-av-wrap">
                <div class="td-av">${initials(r.name)}</div>
                <div>
                  <div class="td-name">${esc(r.name)}</div>
                  <div class="td-sub">${esc(r.email)}</div>
                </div>
              </div>
            </td>
            <td><span style="font-size:0.82rem">${r.phone ? esc(r.phone) : '<span style="color:var(--muted)">—</span>'}</span></td>
            <td>${svcBadge(r.service)}</td>
            <td><span style="font-size:0.8rem;color:var(--muted)">${r.budget ? esc(r.budget) : '—'}</span></td>
            <td><div class="td-msg">${esc(r.message)}</div></td>
            <td class="td-date">${fmtDate(r.created_at)}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;

  const pag = document.getElementById('req-pag');
  if (pages <= 1) { pag.style.display = 'none'; return; }
  pag.style.display = 'flex';
  document.getElementById('req-pg-info').textContent = `Page ${reqCurPage} / ${pages} — ${total} résultats`;
  document.getElementById('req-prev').disabled = reqCurPage <= 1;
  document.getElementById('req-next').disabled = reqCurPage >= pages;
}

function reqPage(dir) {
  reqCurPage = Math.max(1, Math.min(reqCurPage + dir, Math.ceil(filteredReq.length / PAGE_SIZE)));
  renderRequests();
}

// ─── CONTACTS PAGE ────────────────────────────────────────────────────────
function searchContacts(val) {
  ctSearch  = val.toLowerCase();
  ctCurPage = 1;
  applyCtFilters();
}

function applyCtFilters() {
  let d = [...allData];
  if (ctSearch) {
    d = d.filter(r =>
      (r.name||'').toLowerCase().includes(ctSearch) ||
      (r.email||'').toLowerCase().includes(ctSearch) ||
      (r.phone||'').toLowerCase().includes(ctSearch)
    );
  }
  filteredCt = d;
  renderContacts();
}

function renderContacts() {
  const total = filteredCt.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const from  = (ctCurPage - 1) * PAGE_SIZE;
  const slice = filteredCt.slice(from, from + PAGE_SIZE);
  const el    = document.getElementById('ct-table');

  document.getElementById('ct-count').textContent = total;

  if (!slice.length) {
    el.innerHTML = '<div class="empty-st"><div class="eico">👥</div><p>Aucun contact trouvé.</p></div>';
    document.getElementById('ct-pag').style.display = 'none'; return;
  }

  el.innerHTML = `
    <table>
      <thead><tr>
        <th>Nom</th><th>Email</th><th>Téléphone</th><th>Service</th><th>Date</th>
      </tr></thead>
      <tbody>
        ${slice.map(r => `
          <tr>
            <td>
              <div class="td-av-wrap">
                <div class="td-av">${initials(r.name)}</div>
                <div class="td-name">${esc(r.name)}</div>
              </div>
            </td>
            <td>
              <span style="font-size:0.82rem">${esc(r.email)}</span>
              <button class="copy-btn" onclick="copyText('${esc(r.email)}',this)">Copier</button>
              <a class="wa-btn" href="mailto:${esc(r.email)}" target="_blank">✉</a>
            </td>
            <td>
              ${r.phone
                ? `<span style="font-size:0.82rem">${esc(r.phone)}</span>
                   <button class="copy-btn" onclick="copyText('${esc(r.phone)}',this)">Copier</button>
                   <a class="wa-btn" href="https://wa.me/${waNumber(r.phone)}" target="_blank" rel="noopener">WA</a>`
                : '<span style="color:var(--muted);font-size:0.8rem">—</span>'
              }
            </td>
            <td>${svcBadge(r.service)}</td>
            <td class="td-date">${fmtDate(r.created_at)}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;

  const pag = document.getElementById('ct-pag');
  if (pages <= 1) { pag.style.display = 'none'; return; }
  pag.style.display = 'flex';
  document.getElementById('ct-pg-info').textContent = `Page ${ctCurPage} / ${pages} — ${total} contacts`;
  document.getElementById('ct-prev').disabled = ctCurPage <= 1;
  document.getElementById('ct-next').disabled = ctCurPage >= pages;
}

function ctPage(dir) {
  ctCurPage = Math.max(1, Math.min(ctCurPage + dir, Math.ceil(filteredCt.length / PAGE_SIZE)));
  renderContacts();
}

// ─── ANALYTICS ────────────────────────────────────────────────────────────
function renderAnalytics() {
  renderDonut();
  renderTimeline();
  renderBars();
}

function renderDonut() {
  const svcMap = buildServiceMap(allData);
  const labels = Object.keys(svcMap);
  const values = Object.values(svcMap);
  if (!labels.length) return;

  if (chartDonut) { chartDonut.destroy(); chartDonut = null; }
  const ctx = document.getElementById('chart-donut');
  if (!ctx) return;

  chartDonut = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data: values, backgroundColor: CHART_COLORS, borderWidth: 3, borderColor: '#fff', hoverOffset: 8 }]
    },
    options: {
      cutout: '58%',
      plugins: {
        legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans', size: 11 }, boxWidth: 12, padding: 14 } },
        tooltip: { callbacks: {
          label: c => ` ${c.label}: ${c.parsed} demande${c.parsed>1?'s':''} (${Math.round(c.parsed/allData.length*100)}%)`
        }}
      }
    }
  });
}

function renderTimeline() {
  const days = 14;
  const labels = [];
  const counts = [];
  for (let i = days - 1; i >= 0; i--) {
    const d   = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    labels.push(d.toLocaleDateString('fr-DZ', { day: 'numeric', month: 'short' }));
    counts.push(allData.filter(r => r.created_at.startsWith(key)).length);
  }

  if (chartTimeline) { chartTimeline.destroy(); chartTimeline = null; }
  const ctx = document.getElementById('chart-timeline');
  if (!ctx) return;

  chartTimeline = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Demandes',
        data: counts,
        backgroundColor: 'rgba(67,56,202,0.75)',
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { title: i => i[0].label, label: i => ` ${i.parsed.y} demande${i.parsed.y>1?'s':''}` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Plus Jakarta Sans', size: 10 } } },
        y: { beginAtZero: true, ticks: { precision: 0, font: { family: 'Plus Jakarta Sans', size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
      }
    }
  });
}

function renderBars() {
  const svcMap = buildServiceMap(allData);
  const sorted = Object.entries(svcMap).sort((a, b) => b[1] - a[1]);
  const total  = allData.length || 1;
  const el     = document.getElementById('svc-bars');
  if (!sorted.length) {
    el.innerHTML = '<div class="empty-st"><div class="eico">📊</div><p>Pas encore de données.</p></div>'; return;
  }

  const colors = CHART_COLORS;
  el.innerHTML = sorted.map(([name, count], i) => {
    const pct = Math.round(count / total * 100);
    return `
      <div class="svc-bar">
        <div class="svc-bar-lbl">
          <span>${esc(name)}</span>
          <span class="svc-bar-pct">${count} demande${count>1?'s':''} · <strong>${pct}%</strong></span>
        </div>
        <div class="svc-bar-track">
          <div class="svc-bar-fill" style="width:${pct}%;background:${colors[i % colors.length]}"></div>
        </div>
      </div>`;
  }).join('');

  // Animate bars
  requestAnimationFrame(() => {
    document.querySelectorAll('.svc-bar-fill').forEach(b => {
      const w = b.style.width; b.style.width = '0';
      requestAnimationFrame(() => { b.style.width = w; });
    });
  });
}

// ─── SERVICE HELPERS ──────────────────────────────────────────────────────
function buildServiceMap(data) {
  const map = {};
  data.forEach(r => {
    const name = svcShortName(r.service);
    map[name] = (map[name] || 0) + 1;
  });
  return map;
}

function svcShortName(s) {
  if (!s) return 'Non spécifié';
  if (s.includes('Starter'))        return 'Starter (Site)';
  if (s.includes('Professionnel'))  return 'Pro (Site)';
  if (s.includes('Premium'))        return 'Premium (Site)';
  if (s.includes('Essentiel'))      return 'Essentiel (Mkt)';
  if (s.includes('Croissance'))     return 'Croissance (Mkt)';
  if (s.includes('Accélération'))   return 'Accélération (Mkt)';
  if (s.includes('Identité'))       return 'Identité Visuelle';
  if (s.includes('Pack'))           return 'Pack complet';
  if (s.includes('Autre'))          return 'Autre';
  return s.length > 22 ? s.slice(0, 22) + '…' : s;
}

function svcCategory(s) {
  if (!s) return 'other';
  if (s.includes('Starter') || s.includes('Professionnel') || s.includes('Premium')) return 'web';
  if (s.includes('Essentiel') || s.includes('Croissance') || s.includes('Accélération')) return 'mkt';
  if (s.includes('Identité')) return 'brand';
  if (s.includes('Pack'))     return 'pack';
  return 'other';
}

function svcBadge(s) {
  if (!s) return '<span style="color:var(--muted);font-size:0.78rem">—</span>';
  const cat = svcCategory(s);
  const cls = { web:'b-web', mkt:'b-mkt', brand:'b-brand', pack:'b-pack', other:'b-other' }[cat];
  return `<span class="badge-svc ${cls}">${esc(svcShortName(s))}</span>`;
}

// ─── EXPORT CSV ───────────────────────────────────────────────────────────
function exportCSV() {
  const rows = [['Nom','Email','Téléphone','Service','Budget','Message','Date']];
  filteredReq.forEach(r => {
    rows.push([
      r.name||'', r.email||'', r.phone||'',
      r.service||'', r.budget||'', (r.message||'').replace(/\n/g,' '),
      fmtDate(r.created_at)
    ]);
  });
  dlCSV(rows, 'demandes-developme');
}

function exportContactsCSV() {
  const rows = [['Nom','Email','Téléphone','Service','Date']];
  filteredCt.forEach(r => {
    rows.push([r.name||'', r.email||'', r.phone||'', r.service||'', fmtDate(r.created_at)]);
  });
  dlCSV(rows, 'contacts-developme');
}

function dlCSV(rows, name) {
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const a   = document.createElement('a');
  a.href    = 'data:text/csv;charset=utf-8,' + encodeURIComponent('﻿' + csv);
  a.download = `${name}-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}

// ─── UTILS ────────────────────────────────────────────────────────────────
function esc(s) {
  const d = document.createElement('div'); d.textContent = s ?? ''; return d.innerHTML;
}

function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}

function fmtDate(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleDateString('fr-DZ',{
    day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'
  });
}

function waNumber(phone) {
  return (phone || '').replace(/\D/g, '');
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ Copié'; btn.classList.add('ok');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('ok'); }, 1800);
  });
}

// ─── CHART COLORS ─────────────────────────────────────────────────────────
const CHART_COLORS = [
  '#4338CA','#0EA5E9','#10B981','#F59E0B','#EF4444',
  '#7C3AED','#EC4899','#14B8A6','#F97316','#6366F1',
];
