// JavaScript funkcije za sajt
// Autori: Andrea Vasilijic AI17-2022, Petko Avram AI25-2022

// Funkcija za izracunavanje ukupne cene proizvoda.
// ulaz: niz kolicina i cena po proizvodu.
// Pravilo: nakon svakih 5 proizvoda (u zbiru kolicina) primeni se popust 20% na ukup.
function calculateTotal() {
  // dohvatimo sve redove proizvoda
  const rows = document.querySelectorAll('.product-row');
  let total = 0;
  let totalItems = 0;

  rows.forEach(row => {
    const price = parseFloat(row.querySelector('.price').textContent) || 0;
    const qty = parseInt(row.querySelector('.qty').value) || 0;
    total += price * qty;
    totalItems += qty;
  });

  // Primeni popust 20% za svaki komplet od 5 proizvoda

  const discountSets = Math.floor(totalItems / 5);
  const discount = discountSets * 0.20 * (total / Math.max(1, Math.ceil(totalItems / 5))); 
  // Napomena: formula računa 20% popusta za svaki 5. proizvod u zbiru
  // Druga opcija: popust od 20% na ceo račun ako ima >=5 proizvoda.

  const final = total - (discountSets * 0.20 * (total)); // pojednostavljena varijanta
  // Ako nema kompleta, final = total
  const applied = discountSets > 0 ? (total * 0.20 * discountSets) : 0;

  document.getElementById('totalAmount').textContent = final.toFixed(2) + ' RSD';
  document.getElementById('totalItems').textContent = totalItems;
  document.getElementById('appliedDiscount').textContent = applied.toFixed(2) + ' RSD';
}



function openLightbox(src, title) {
  const modalImg = document.getElementById('lightboxImage');  // element u modalu gde ide slika
  const modalTitle = document.getElementById('lightboxTitle'); // element gde ide naslov/tekst slike

  modalImg.src = src;               // postavlja uvećanu sliku
  modalTitle.textContent = title || ''; // postavlja naslov slike (ako postoji)

  const myModal = new bootstrap.Modal(document.getElementById('lightboxModal')); // kreira Bootstrap modal
  myModal.show();                   // prikazuje modal na ekranu
}


// Dodavanje event listenera kada se DOM ucita
document.addEventListener('DOMContentLoaded', function() {
  // Ako smo na strani proizvoda - dodaj event listener na inpute
  const qtyInputs = document.querySelectorAll('.qty');
  if (qtyInputs.length) {
    qtyInputs.forEach(i => i.addEventListener('input', calculateTotal));
    // Izracunaj inicijalno
    calculateTotal();
  }

  // Dodavanje click handlera za thumbs u galeriji
  const thumbs = document.querySelectorAll('.gallery-thumb');
  thumbs.forEach(t => {
    t.addEventListener('click', function() {
      const img = this.querySelector('img');
      openLightbox(img.dataset.large || img.src, img.alt || 'Slika');
    });
  });
});
