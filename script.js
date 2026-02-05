const farmForm = document.getElementById('farmForm');
const cardContainer = document.getElementById('cardContainer');
const totalModalDisplay = document.getElementById('totalModal');

document.addEventListener('DOMContentLoaded', renderCards);

// FUNGSI OTOMATIS MUNCULKAN TIPE CABAI
    function cekTipeCabai() {
    // 1. Ambil nilai dari dropdown tanaman
    const tanaman = document.getElementById('jenisTanaman').value;
    
    // 2. Ambil elemen box Cabai yang ingin dimunculkan
    const boxCabai = document.getElementById('opsiCabai');

    // 3. Logika: Jika pilihannya 'Cabai', maka tampilkan. Jika tidak, sembunyikan.
    if (tanaman === 'Cabai') {
        boxCabai.style.display = 'block';
    } else {
        boxCabai.style.display = 'none';
        document.getElementById('tipeCabai').value = ''; // Reset pilihan tipe
    }
}


// FUNGSI SIMPAN DATA
farmForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const tanamanUtama = document.getElementById('jenisTanaman').value;
    const tipeCabai = document.getElementById('tipeCabai').value;
    
    // Gabungkan nama tanaman jika ada tipe cabai
    const tanamanFinal = tipeCabai ? `${tanamanUtama} (${tipeCabai})` : tanamanUtama;

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
    
    // Reset tampilan
    document.getElementById('opsiCabai').style.display = 'none';
    farmForm.reset();
    renderCards();
});

// FUNGSI TAMPILKAN KARTU
function renderCards() {
    let db = JSON.parse(localStorage.getItem('farmDB')) || [];
    cardContainer.innerHTML = '';
    
    // Update Total Modal di Sidebar
    const total = db.reduce((sum, item) => sum + Number(item.harga), 0);
    if(totalModalDisplay) totalModalDisplay.innerText = `Rp ${total.toLocaleString()}`;

    db.forEach(item => {
        const katColor = item.kategori === 'Bibit' ? '#8338ec' : '#2d6a4f';
        cardContainer.innerHTML += `
            <div class="agri-card" style="border-left: 8px solid ${katColor}; margin-bottom: 15px; background: white; padding: 15px; border-radius: 10px;">
                <div style="margin-bottom: 5px;">
                    <span style="background: ${katColor}; color: white; padding: 2px 7px; border-radius: 4px; font-size: 0.7rem;">${item.kategori}</span>
                    <span style="background: #0077b6; color: white; padding: 2px 7px; border-radius: 4px; font-size: 0.7rem;">${item.tanaman}</span>
                </div>
                <h4 style="margin: 5px 0;">${item.nama}</h4>
                <p style="font-size: 0.8rem; color: #666;">Varietas: ${item.varietas || '-'}</p>
                <div style="font-size: 0.85rem; margin: 10px 0;">
                    <strong>Dosis/Jarak:</strong> ${item.dosis} | <strong>Harga:</strong> Rp ${Number(item.harga).toLocaleString()}
                </div>
                <button onclick="hapusData(${item.id})" style="background:#ff4d4d; color:white; border:none; padding:5px; border-radius:4px; width:100%; cursor:pointer;">Hapus</button>
            </div>
        `;
    });
}

function hapusData(id) {
    if(confirm('Hapus data?')) {
        let db = JSON.parse(localStorage.getItem('farmDB'));
        db = db.filter(item => item.id !== id);
        localStorage.setItem('farmDB', JSON.stringify(db));
        renderCards();
    }
}

// Fungsi agar dropdown tipe muncul di bagian riwayat bawah
function updateFilterBawah() {
    const filterTanaman = document.getElementById('filterTanaman').value;
    const filterTipe = document.getElementById('filterTipeCabai');
    
    if (filterTanaman === 'Cabai') {
        filterTipe.style.display = 'block';
    } else {
        filterTipe.style.display = 'none';
        filterTipe.value = 'Semua';
    }
    searchData(); // Langsung jalankan pencarian
}

// Fungsi pencarian yang lebih pintar
function searchData() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const fTanaman = document.getElementById('filterTanaman').value;
    const fTipe = document.getElementById('filterTipeCabai').value;
    
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

    renderFilteredUI(filteredData);
}

// Fungsi pembantu untuk menampilkan hasil filter
function renderFilteredUI(data) {
    // Kamu bisa panggil isi fungsi renderCards() kamu di sini 
    // atau buat logika tampilan yang sama agar kartu muncul.
    renderToUI(data); 
}

function hapusSemuaData() {
    // Berikan konfirmasi agar tidak terhapus tidak sengaja
    const konfirmasi = confirm("Apakah kamu yakin ingin menghapus SELURUH catatan? Data yang sudah dihapus tidak bisa dikembalikan.");
    
    if (konfirmasi) {
        localStorage.removeItem('farmDB'); // Menghapus kunci farmDB di Local Storage
        renderCards(); // Memperbarui tampilan agar kosong
        alert("Semua riwayat telah dibersihkan.");
    }
}
