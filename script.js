// 1. Inisialisasi Elemen UI
const farmForm = document.getElementById('farmForm');
const cardContainer = document.getElementById('cardContainer');
const totalItemDisplay = document.getElementById('totalItem');
const totalModalDisplay = document.getElementById('totalModal');

// 2. Jalankan Fungsi Render saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', renderCards);

// 3. Fungsi Tambah Data (Submit Form)
farmForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newData = {
        id: Date.now(),
        tanaman: document.getElementById('jenisTanaman').value,
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
    
    farmForm.reset(); // Kosongkan form setelah simpan
    renderCards();    // Perbarui tampilan
});

// 4. Fungsi Utama untuk Menampilkan Data
function renderCards() {
    let db = JSON.parse(localStorage.getItem('farmDB')) || [];
    renderToUI(db);
}

// 5. Fungsi Pencarian & Filter Tanaman
function searchData() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filterTanaman = document.getElementById('filterTanaman').value;
    let db = JSON.parse(localStorage.getItem('farmDB')) || [];
    
    const filteredData = db.filter(item => {
        const matchKeyword = item.nama.toLowerCase().includes(keyword) || 
                             item.fungsi.toLowerCase().includes(keyword);
        const matchTanaman = (filterTanaman === "Semua") || (item.tanaman === filterTanaman);
        
        return matchKeyword && matchTanaman;
    });

    renderToUI(filteredData);
}

// 6. Fungsi Helper untuk Merender Data ke Layar
function renderToUI(data) {
    cardContainer.innerHTML = '';
    totalItemDisplay.innerText = `${data.length} Item Ditampilkan`;
    
    // Hitung Total Modal dari data yang tampil
    const total = data.reduce((sum, item) => sum + Number(item.harga), 0);
    totalModalDisplay.innerText = `Rp ${total.toLocaleString()}`;

    if(data.length === 0) {
        cardContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 20px;">Belum ada catatan untuk kategori ini.</p>`;
        return;
    }

    data.forEach(item => {
        // Warna label otomatis berdasarkan jenis tanaman
        const tagColor = item.tanaman === 'Jagung' ? '#fb8500' : (item.tanaman === 'Padi' ? '#219ebc' : '#2d6a4f');

        cardContainer.innerHTML += `
            <div class="agri-card">
                <span style="background: ${tagColor}; color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: bold;">
                    ${item.tanaman.toUpperCase()}
                </span>
                <h4 style="margin: 10px 0 5px 0; color: #1b4332;">${item.nama}</h4>
                <div class="detail-row" style="font-size: 0.85rem; color: #555;">
                    <div><strong>Stok:</strong> ${item.qty}</div>
                    <div><strong>Dosis:</strong> ${item.dosis}</div>
                    <div style="color: #2d6a4f; font-weight: bold; margin-top: 5px;">Rp ${Number(item.harga).toLocaleString()}</div>
                </div>
                
                <div class="long-text">
                    <strong>Fungsi:</strong><br>${item.fungsi}
                </div>
                <div class="long-text">
                    <strong>Manfaat:</strong><br>${item.manfaat}
                </div>
                
                <button class="btn-del" onclick="hapusData(${item.id})" style="margin-top: 15px; width: 100%;">Hapus Catatan</button>
            </div>
        `;
    });
}

// 7. Fungsi Hapus Data
function hapusData(id) {
    if(confirm('Apakah kamu yakin ingin menghapus catatan ini?')) {
        let db = JSON.parse(localStorage.getItem('farmDB'));
        db = db.filter(item => item.id !== id);
        localStorage.setItem('farmDB', JSON.stringify(db));
        renderCards();
    }
}

function cetakLaporan() {
    // Memberikan judul otomatis pada halaman print
    const filter = document.getElementById('filterTanaman').value;
    const judulAsli = document.title;
    
    document.title = `Laporan_Nutrisi_Tanaman_${filter}_${new Date().toLocaleDateString()}`;
    
    // Membuka jendela print browser
    window.print();
    
    // Kembalikan judul asli setelah selesai print
    document.title = judulAsli;
}
