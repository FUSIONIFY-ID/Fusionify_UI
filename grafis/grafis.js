// FUSIONIFY UI · grafis.js · isi template grafis dari data, tanpa mengedit HTML.
// Sumber data (yang belakangan menang):
//   1. window.__ISI = { judul: "…", … }   (dipasang scripts/build-grafis.mjs dari --isi berkas.json)
//   2. parameter URL: grafis/post.html?judul=Halo&status=beta
// Elemen yang diisi:
//   data-isi="kunci"        → textContent
//   data-isi-src="kunci"    → atribut src (gambar maskot/logo)
//   data-isi-status         → chip status: go | beta | wip | plan | eos (label bawaan ikut berganti)
// Data bisa per kanvas: { "post-pengumuman": { "judul": "…" } } menimpa data umum untuk kanvas ber-id itu.
(function () {
  const LABEL = { go: "Aktif", beta: "Beta", wip: "Dalam pengembangan", plan: "Direncanakan", eos: "Layanan berakhir" };
  function terapkan(root, d) {
    root.querySelectorAll("[data-isi]").forEach((el) => { if (d[el.dataset.isi] != null) el.textContent = d[el.dataset.isi]; });
    root.querySelectorAll("[data-isi-src]").forEach((el) => { if (d[el.dataset.isiSrc]) el.setAttribute("src", d[el.dataset.isiSrc]); });
    root.querySelectorAll("[data-isi-status]").forEach((el) => {
      const s = d.status;
      if (!LABEL[s]) return;
      el.classList.remove(...Object.keys(LABEL));
      el.classList.add(s);
      if (d.statusLabel == null) el.textContent = LABEL[s];
      else el.textContent = d.statusLabel;
    });
  }
  function jalan() {
    const url = Object.fromEntries(new URLSearchParams(location.search));
    if ("panduan" in url) document.body.classList.add("panduan");
    const umum = Object.assign({}, window.__ISI || {}, url);
    terapkan(document, umum);
    document.querySelectorAll(".kanvas[id]").forEach((k) => {
      const khusus = (window.__ISI || {})[k.id];
      if (khusus && typeof khusus === "object") terapkan(k, khusus);
    });
    document.documentElement.dataset.grafisSiap = "1";
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", jalan);
  else jalan();
})();
