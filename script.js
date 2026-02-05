const farmForm = document.getElementById('farmForm');
const cardContainer = document.getElementById('cardContainer');
const totalModalDisplay = document.getElementById('totalModal');

document.addEventListener('DOMContentLoaded', renderCards);

function cekTipeCabai() {
    const tanaman = document.getElementById('jenisTanaman').value;
    const boxCabai = document.getElementById('opsiCabai');
    if (boxCabai) {
        boxCabai.style.display = (tanaman === 'Cabai') ? 'block' : 'none';
    }
}

// Fungsi untuk mengisi template teks otomatis berdasarkan kategori
function setTemplateTeks() {
    const kategori = document.getElementById('kategori').value;
    const inputFungsi = document.getElementById('fungsi');
    const inputManfaat = document.getElementById('manfaat');

    if (kategori === "Bibit") {
        inputFungsi.placeholder = "Contoh: Umur panen 100 hari, tahan wereng, nasi pulen...";
        inputManfaat.placeholder = "Contoh: Potensi hasil 10 ton/ha, cocok untuk lahan kering...";
    } else {
        inputFungsi.placeholder = "Contoh: Kandungan Nitrogen tinggi untuk fase vegetatif...";
        inputManfaat.placeholder = "Contoh: Daun lebih hijau dalam 3 hari, mempercepat tinggi batang...";
    }
}


function updateFilterBawah() {
    const fTanaman = document.getElementById('filterTanaman').value;
    const fTipeBox = document.getElementById('filterTipeCabai');
    if (fTanaman === 'Cabai') {
        fTipeBox.style.display = 'block';
    } else {
        fTipeBox.style.display = 'none';
        if(fTipeBox) fTipeBox.value = 'Semua';
    }
    searchData();
}

farmForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tanamanUtama = document.getElementById('jenisTanaman').value;
    const tipeCabai = document.getElementById('tipeCabai').value;
    const tanamanFinal = (tanamanUtama === 'Cabai' && tipeCabai) ? `${tanamanUtama} (${tipeCabai})` : tanamanUtama;

    const newData = {
        id: Date.now(),
        kategori: document.getElementById('kategori').value,
        varietas: document.getElementById('varietas').value,
        tanaman: tanamanFinal,
        nama: document.getElementById('nama').value,
        qty: document.getElementById('qty').value,
        dosis: document.getElementById('dosis').value,
        harga: document.getElementById('harga').value,
        fungsi: document.getElementById('fungsi').value,
        manfaat: document.getElementById('manfaat').value
    };

    let db = JSON.parse(localStorage.getItem('farmDB')) || [];
    db.push(newData);
    localStorage.setItem('farmDB', JSON.stringify(db));
    
    if(document.getElementById('opsiCabai')) document.getElementById('opsiCabai').style.display = 'none';
    farmForm.reset();
    renderCards();
});

function renderCards() {
    let db = JSON.parse(localStorage.getItem('farmDB')) || [];
    renderToUI(db);
}

function searchData() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const fTanaman = document.getElementById('filterTanaman').value;
    const fTipe = document.getElementById('filterTipeCabai') ? document.getElementById('filterTipeCabai').value : 'Semua';
    
    let db = JSON.parse(localStorage.getItem('farmDB')) || [];
    const filteredData = db.filter(item => {
        const matchKeyword = item.nama.toLowerCase().includes(keyword);
        const matchTanaman = (fTanaman === "Semua") || (item.tanaman.startsWith(fTanaman));
        let matchTipe = true;
        if (fTanaman === 'Cabai' && fTipe !== 'Semua') {
            matchTipe = item.tanaman.includes(`(${fTipe})`);
        }
        return matchKeyword && matchTanaman && matchTipe;
    });
    renderToUI(filteredData);
}

function renderToUI(data) {
    cardContainer.innerHTML = '';
    const total = data.reduce((sum, item) => sum + Number(item.harga || 0), 0);
    if(totalModalDisplay) totalModalDisplay.innerText = `Rp ${total.toLocaleString()}`;

    data.forEach(item => {
        const katColor = item.kategori === 'Bibit' ? '#8338ec' : '#2d6a4f';
        cardContainer.innerHTML += `
            <div class="agri-card" style="border-left: 8px solid ${katColor}; margin-bottom: 15px; background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 8px;">
                    <span style="background: ${katColor}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold;">${item.kategori}</span>
                    <span style="background: #0077b6; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold;">${item.tanaman}</span>
                </div>
                <h3 style="margin: 5px 0;">${item.nama}</h3>
                <p style="font-size: 0.85rem; color: #666;">Varietas: ${item.varietas || '-'}</p>
                <div style="font-size: 0.8rem; border-top: 1px solid #eee; padding-top: 10px; display: grid; grid-template-columns: 1fr 1fr;">
                    <div><strong>Stok:</strong> ${item.qty}</div>
                    <div><strong>Dosis:</strong> ${item.dosis}</div>
                </div>
                <div style="color: #2d6a4f; font-weight: bold; margin: 10px 0;">Harga: Rp ${Number(item.harga).toLocaleString()}</div>
                
                <div style="background: #f9f9f9; padding: 10px; border-radius: 5px; font-size: 0.8rem; border: 1px solid #eee;">
                    <strong>Fungsi Utama:</strong><br>${item.fungsi || '-'}<br>
                    <hr style="margin: 5px 0; border: 0.1px solid #ddd;">
                    <strong>Manfaat:</strong><br>${item.manfaat || '-'}
                </div>

                <button onclick="hapusData(${item.id})" style="background:#ff4d4d; color:white; border:none; padding:8px; border-radius:5px; width:100%; margin-top:15px; cursor:pointer;">Hapus</button>
            </div>
        `;
    });
}

function hapusData(id) {
    if(confirm('Hapus data ini?')) {
        let db = JSON.parse(localStorage.getItem('farmDB'));
        db = db.filter(item => item.id !== id);
        localStorage.setItem('farmDB', JSON.stringify(db));
        renderCards();
    }
}

function hapusSemuaData() {
    if (confirm("Hapus SEMUA riwayat?")) {
        localStorage.removeItem('farmDB');
        renderCards();
    }
}

function cetakLaporan() { window.print(); }
