:root {
    --primary: #2d6a4f;
    --secondary: #40916c;
    --bg: #f8f9fa;
    --text: #1b4332;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg);
    color: var(--text);
    margin: 0;
}

.wrapper {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: 250px;
    background: var(--primary);
    color: white;
    padding: 30px;
    position: fixed;
    height: 100vh;
}

.content {
    margin-left: 310px;
    padding: 40px;
    width: 100%;
}

.form-card {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    margin-bottom: 40px;
}

.input-row {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
}

.input-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

label { font-weight: 600; margin-bottom: 8px; font-size: 0.9rem; }

input, textarea {
    padding: 12px;
    border: 1.5px solid #dee2e6;
    border-radius: 8px;
    outline: none;
    transition: 0.3s;
}

input:focus, textarea:focus { border-color: var(--secondary); }

textarea { height: 100px; resize: none; }

.btn-primary {
    background: var(--primary);
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
}

/* Tampilan Kartu Data */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.agri-card {
    background: white;
    border-left: 5px solid var(--primary);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
}

.agri-card h4 { margin-top: 0; color: var(--primary); border-bottom: 1px solid #eee; padding-bottom: 10px; }

.detail-row { font-size: 0.85rem; margin-bottom: 5px; }

.long-text {
    margin-top: 15px;
    padding: 10px;
    background: #f1f8f5;
    border-radius: 5px;
    font-size: 0.85rem;
    line-height: 1.5;
}

.btn-del {
    background: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.7rem;
    cursor: pointer;
    margin-top: 10px;
}

/* Style untuk Search Bar */
.search-container {
    margin-bottom: 25px;
}

#searchInput {
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    border: 2px solid #2d6a4f;
    font-size: 1rem;
    box-sizing: border-box;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

/* Optimasi Teks Panjang agar tetap rapi */
.long-text {
    margin-top: 15px;
    padding: 12px;
    background: #f1f8f5;
    border-radius: 8px;
    font-size: 0.85rem;
    line-height: 1.6;
    max-height: 150px; /* Batas tinggi maksimal */
    overflow-y: auto;  /* Munculkan scroll jika teks terlalu panjang */
    border: 1px solid #e0e0e0;
}

/* Custom Scrollbar agar terlihat modern */
.long-text::-webkit-scrollbar {
    width: 5px;
}
.long-text::-webkit-scrollbar-thumb {
    background: #40916c;
    border-radius: 10px;
}

.stats-box.financial {
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
    border: 1px dashed rgba(255, 255, 255, 0.3);
}

.stats-box small {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.7rem;
    opacity: 0.8;
}

@media print {
    /* Sembunyikan form, sidebar, dan tombol hapus saat diprint */
    .sidebar, .form-card, .search-container, .btn-del, .btn-print, .filter-wrapper {
        display: none !important;
    }
    
    .content {
        margin-left: 0 !important;
        padding: 0 !important;
    }

    .agri-card {
        page-break-inside: avoid;
        border: 1px solid #ccc !important;
        box-shadow: none !important;
        margin-bottom: 20px;
    }
    
    body {
        background-color: white !important;
    }
}
