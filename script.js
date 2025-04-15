// Ambil data dari file JSON
const makananDatabase = {
    "nasi putih": {
      "kalori": 129,
      "protein": 2.7,
      "lemak": 0.3,
      "karbohidrat": 28,
      "serat": 0.4
    },
    "ayam goreng": {
      "kalori": 260,
      "protein": 27,
      "lemak": 15,
      "karbohidrat": 0,
      "serat": 0
    },
    "telur rebus": {
      "kalori": 155,
      "protein": 13,
      "lemak": 11,
      "karbohidrat": 1.1,
      "serat": 0
    }
  };
  
  // Variabel untuk menyimpan total nutrisi
  let totalNutrisi = {
    kalori: 0,
    protein: 0,
    lemak: 0,
    karbohidrat: 0,
    serat: 0
  };
  
  // Fungsi untuk menambah baris makanan ke tabel
  function tambahBarisMakanan(namaMakanan, berat) {
    if (!makananDatabase[namaMakanan]) {
      alert("Makanan tidak ditemukan di database!");
      return;
    }
  
    const gizi = makananDatabase[namaMakanan];
    const faktor = berat / 100;
  
    // Hitung nilai nutrisi untuk makanan yang ditambahkan
    const nilaiKalori = (gizi.kalori * faktor).toFixed(1);
    const nilaiProtein = (gizi.protein * faktor).toFixed(1);
    const nilaiLemak = (gizi.lemak * faktor).toFixed(1);
    const nilaiKarbohidrat = (gizi.karbohidrat * faktor).toFixed(1);
    const nilaiSerat = (gizi.serat * faktor).toFixed(1);
  
    // Tambahkan nutrisi ke total nutrisi
    totalNutrisi.kalori += parseFloat(nilaiKalori);
    totalNutrisi.protein += parseFloat(nilaiProtein);
    totalNutrisi.lemak += parseFloat(nilaiLemak);
    totalNutrisi.karbohidrat += parseFloat(nilaiKarbohidrat);
    totalNutrisi.serat += parseFloat(nilaiSerat);
  
    // Tambahkan baris ke tabel
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${namaMakanan}</td>
      <td>${berat} gram</td>
      <td>${nilaiKalori}</td>
      <td>${nilaiProtein}</td>
      <td>${nilaiLemak}</td>
      <td>${nilaiKarbohidrat}</td>
      <td>${nilaiSerat}</td>
      <td><button class="hapus">❌</button></td>
    `;
    document.getElementById("isiTabel").appendChild(tr);
  
    // Tambahkan event untuk menghapus baris
    tr.querySelector(".hapus").addEventListener("click", function() {
      tr.remove();
      
      // Setelah baris dihapus, update total nutrisi
      totalNutrisi.kalori -= parseFloat(nilaiKalori);
      totalNutrisi.protein -= parseFloat(nilaiProtein);
      totalNutrisi.lemak -= parseFloat(nilaiLemak);
      totalNutrisi.karbohidrat -= parseFloat(nilaiKarbohidrat);
      totalNutrisi.serat -= parseFloat(nilaiSerat);
      
      updateTotalNutrisi();
    });
  
    // Update total nutrisi setelah menambah makanan
    updateTotalNutrisi();
  }
  
  // Fungsi untuk update total nutrisi
  function updateTotalNutrisi() {
    const totalNutrisiDiv = document.getElementById("totalNutrisi");
    
    // Update tampilan total nutrisi
    totalNutrisiDiv.innerHTML = `
      <h3>Total Nutrisi</h3>
      <p>Kalori: ${totalNutrisi.kalori.toFixed(1)} Kcal</p>
      <p>Protein: ${totalNutrisi.protein.toFixed(1)} g</p>
      <p>Lemak: ${totalNutrisi.lemak.toFixed(1)} g</p>
      <p>Karbohidrat: ${totalNutrisi.karbohidrat.toFixed(1)} g</p>
      <p>Serat: ${totalNutrisi.serat.toFixed(1)} g</p>
    `;
  }
  
  // Event untuk menambah makanan dari input
  document.getElementById("tambahMakanan").addEventListener("click", function() {
    const namaMakanan = document.getElementById("inputMakanan").value.trim().toLowerCase();
    const berat = parseFloat(document.getElementById("inputBerat").value);
  
    if (!namaMakanan || isNaN(berat) || berat <= 0) {
      alert("Silakan masukkan nama makanan dan berat yang valid!");
      return;
    }
  
    tambahBarisMakanan(namaMakanan, berat);
  
    // Reset input
    document.getElementById("inputMakanan").value = "";
    document.getElementById("inputBerat").value = "";
  });
  