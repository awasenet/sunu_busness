// ---- Numéro WhatsApp de la boutique (à remplacer par le vôtre, format international sans le +) ----
  const WHATSAPP_NUMBER = "221772416784";

  // NOTE : chaque produit a un tableau "images" (jusqu'à 8 photos).
  // Pour l'instant une seule photo réelle par produit — dupliquée pour que la galerie
  // fonctionne dès maintenant. Remplacez/complétez ce tableau au fur et à mesure que
  // vous recevez plus de photos (ex: images: ["images/sac-1.jpeg","images/sac-2.jpeg", ...]).
  const PRODUCTS = [
    { id:1, name:"Set sac à dos bordeaux Rose Language", cat:"sacs", price:18000, stock:19, tag:"Nouveau", sizes:["Taille unique"], images:["images/sac-bordeaux-set.jpeg"] },
    { id:2, name:"Set sac à dos bleu Cute", cat:"sacs", price:16000, stock:20, sizes:["Taille unique"], images:["images/sac-bleu-cute.jpeg"] },
    { id:3, name:"Sac à dos blanc", cat:"sacs", price:3500, stock:10, sizes:["Taille unique"], images:["images/sac-a-dos-blanc.jpeg"] },
    { id:4, name:"Set sac à dos rose Cute", cat:"sacs", price:16000, stock:30, tag:"Populaire", sizes:["Taille unique"], images:["images/sac-rose-cute.jpeg"] },
    { id:5, name:"Sac à dos carreaux (gris ou jaune)", cat:"sacs", price:3500, stock:25, sizes:["Taille unique"], images:["images/sac-a-dos-carreaux.jpeg"] },
    { id:6, name:"Sac à dos gris", cat:"sacs", price:4000, stock:8, sizes:["Taille unique"], images:["images/sac-a-dos-gris.jpeg"] },
    { id:7, name:"Sandales grises motif tissé", cat:"chaussures", price:12000, stock:7, tag:"Populaire", sizes:["37","38","39","40","41"], images:["images/sandales-grises.jpeg"] },
    { id:8, name:"Sandales vertes motif tissé", cat:"chaussures", price:12000, stock:10, sizes:["37","38","39","40","41"], images:["images/sandales-vertes.jpeg"] },
    { id:9, name:"Nike Shox blanches", cat:"chaussures", price:25000, stock:6, tag:"Nouveau", sizes:["39","40","41","42","43","44"], images:["images/nike-shox-blanches.jpeg"] },
    { id:10, name:"Nike Shox bleu et noir", cat:"chaussures", price:25000, stock:17, sizes:["39","40","41","42","43","44"], images:["images/nike-shox-bleu.jpeg"] },
    { id:11, name:"Nike Shox rouge et noir", cat:"chaussures", price:25000, stock:20, sizes:["39","40","41","42","43","44"], images:["images/nike-shox-rouge.jpeg"] },
    { id:12, name:"Robe jaune fluo manches bouffantes", cat:"vetements", price:20000, stock:20, tag:"Nouveau", sizes:["S","M","L","XL"], images:["images/robe-jaune-fluo.jpeg"] },
    { id:13, name:"Robe orange longue sans manches", cat:"vetements", price:18000, stock:30, sizes:["S","M","L","XL"], images:["images/robe-orange.jpeg"] },
    { id:14, name:"Robe bleue bicolore", cat:"vetements", price:19000, stock:20, sizes:["S","M","L","XL"], images:["images/robe-bleue.jpeg"] },
    { id:15, name:"Ensemble jogging jaune", cat:"vetements", price:15000, stock:15, sizes:["S","M","L","XL"], images:["images/jogging-jaune.jpeg"] },
    { id:16, name:"Ensemble jogging rose", cat:"vetements", price:15000, stock:25, tag:"Populaire", sizes:["S","M","L","XL"], images:["images/jogging-rose.jpeg"] },
    { id:17, name:"Blouse jaune et jupe plissée orange", cat:"vetements", price:14000, stock:5, sizes:["S","M","L","XL"], images:["images/blouse-jaune-jupe-orange.jpeg"] },
    { id:18, name:"Jupe blanche et blouse rose froufrou", cat:"vetements", price:14000, stock:5, sizes:["S","M","L","XL"], images:["images/jupe-blanche-blouse-rose.jpeg"] },
    { id:19, name:"Haut noir froufrou et jupe orange", cat:"vetements", price:14000, stock:15, sizes:["S","M","L","XL"], images:["images/haut-noir-jupe-orange.jpeg"] },
    { id:20, name:"Set cartable enfant licorne et fleur", cat:"sacs", price:15000, stock:16, tag:"Nouveau", sizes:["Taille unique"], images:["images/cartable-licorne-fleur.jpeg"] },
    { id:21, name:"Set cartable enfant papillons", cat:"sacs", price:15000, stock:25, tag:"Nouveau", sizes:["Taille unique"], images:["images/cartable-papillons.jpeg"] },
    { id:22, name:"Sandales Melissa plateforme", cat:"chaussures", price:20000, stock:26, tag:"Nouveau", sizes:["36","37","38","39","40"], images:["images/sandales-melissa.jpeg"] },
    { id:23, name:"Sandales à boucles multicolores", cat:"chaussures", price:15000, stock:16, tag:"Nouveau", sizes:["37","38","39","40","41"], images:["images/sandales-boucles.jpeg"] },
    { id:24, name:"Mules plateforme bleues à strass", cat:"chaussures", price:20000, stock:15, tag:"Nouveau", sizes:["36","37","38","39","40"], images:["images/mules-bleues-strass.jpeg"] },
  ];


  let cart = []; // {id, name, price, size, qty, img, stock}
  let currentFilter = "all";

  function fmt(n){ return n.toLocaleString('fr-FR') + " FCFA"; }

  function catLabel(cat){
    if(cat === 'vetements') return 'Vêtement';
    if(cat === 'chaussures') return 'Chaussure';
    if(cat === 'sacs') return 'Sac';
    return cat;
  }

  function getAvailableStock(productId){
    const p = PRODUCTS.find(x => x.id === productId);
    const qtyInCart = cart
      .filter(c => c.id === productId)
      .reduce((s,c) => s + c.qty, 0);
    return p.stock - qtyInCart;
  }

  function renderGrid(){
    const grid = document.getElementById('product-grid');
    grid.innerHTML = "";
    const items = PRODUCTS.filter(p => currentFilter === "all" || p.cat === currentFilter);
    items.forEach(p => {
      const card = document.createElement('div');
      card.className = "card";
      const available = getAvailableStock(p.id);
      const outOfStock = available <= 0;
      const hasMultiple = p.images.length > 1;
      card.innerHTML = `
        <div class="card-img">
          ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
          <img src="${p.images[0]}" alt="${p.name}" id="img-${p.id}" data-index="0">
          ${hasMultiple ? `
            <button class="gallery-arrow gallery-prev" onclick="shiftGalleryImage(event, ${p.id}, -1)" aria-label="Photo précédente">‹</button>
            <button class="gallery-arrow gallery-next" onclick="shiftGalleryImage(event, ${p.id}, 1)" aria-label="Photo suivante">›</button>
            <div class="gallery-dots" id="dots-${p.id}">
              ${p.images.map((_,i) => `<span class="gallery-dot ${i===0 ? 'active' : ''}"></span>`).join("")}
            </div>
          ` : ""}
        </div>
        <h3>${p.name}</h3>
        <div class="cat">${catLabel(p.cat)}</div>
        <div class="price-row">
          <span class="price">${fmt(p.price)}</span>
          <select class="size-select" id="size-${p.id}" ${outOfStock ? "disabled" : ""}>
            ${p.sizes.map(s => `<option value="${s}">${s}</option>`).join("")}
          </select>
        </div>
        ${outOfStock
          ? `<div class="stock-warning">Rupture de stock</div>`
          : `<div class="stock-info ${available <= 3 ? 'stock-low' : ''}">${available} en stock</div>`
        }
        <button class="add-btn" onclick="addToCart(${p.id}, this)" ${outOfStock ? "disabled" : ""}>
          ${outOfStock ? "Indisponible" : "Ajouter au panier"}
        </button>
      `;
      grid.appendChild(card);
    });
  }

  function shiftGalleryImage(event, id, delta){
    event.preventDefault();
    event.stopPropagation();
    const p = PRODUCTS.find(x => x.id === id);
    const imgEl = document.getElementById(`img-${id}`);
    let index = parseInt(imgEl.dataset.index, 10);
    index = (index + delta + p.images.length) % p.images.length;
    imgEl.src = p.images[index];
    imgEl.dataset.index = index;
    const dots = document.querySelectorAll(`#dots-${id} .gallery-dot`);
    dots.forEach((d,i) => d.classList.toggle('active', i === index));
  }

  function addToCart(id, btn){
    const p = PRODUCTS.find(x => x.id === id);
    const size = document.getElementById(`size-${id}`).value;
    const available = getAvailableStock(id);

    if(available <= 0){
      btn.textContent = "Stock épuisé";
      btn.classList.add("added");
      setTimeout(() => { btn.textContent = "Ajouter au panier"; btn.classList.remove("added"); }, 1200);
      return;
    }

    const existing = cart.find(c => c.id === id && c.size === size);
    if(existing){ existing.qty += 1; }
    else{ cart.push({ id:p.id, name:p.name, price:p.price, size, qty:1, img:p.images[0], stock:p.stock }); }
    renderCart();
    renderGrid();
    btn.textContent = "Ajouté ✓";
    btn.classList.add("added");
    setTimeout(() => { btn.textContent = "Ajouter au panier"; btn.classList.remove("added"); }, 1200);
  }

  function changeQty(index, delta){
    const item = cart[index];
    if(delta > 0 && getAvailableStock(item.id) <= 0){
      return; // stock max atteint, on ne fait rien
    }
    item.qty += delta;
    if(item.qty <= 0){ cart.splice(index,1); }
    renderCart();
    renderGrid();
  }

  function removeItem(index){
    cart.splice(index,1);
    renderCart();
    renderGrid();
  }

  function renderCart(){
    const wrap = document.getElementById('drawer-items');
    const count = cart.reduce((s,c) => s + c.qty, 0);
    document.getElementById('cart-count').textContent = count;

    if(cart.length === 0){
      wrap.innerHTML = `<p class="empty-cart">Votre panier est vide pour l'instant.</p>`;
      document.getElementById('checkout-btn').disabled = true;
    } else {
      wrap.innerHTML = cart.map((c,i) => `
        <div class="drawer-item">
          <img src="${c.img}" alt="${c.name}">
          <div class="di-info">
            <h4>${c.name}</h4>
            <div class="meta">Taille ${c.size} • ${fmt(c.price)}</div>
            <div class="qty-row">
              <button onclick="changeQty(${i},-1)">−</button>
              <span>${c.qty}</span>
              <button onclick="changeQty(${i},1)" ${getAvailableStock(c.id) <= 0 ? "disabled" : ""}>+</button>
            </div>
            <div class="remove-btn" onclick="removeItem(${i})" style="cursor:pointer;">Retirer</div>
          </div>
        </div>
      `).join("");
      document.getElementById('checkout-btn').disabled = false;
    }

    const total = cart.reduce((s,c) => s + c.price * c.qty, 0);
    document.getElementById('cart-total').textContent = fmt(total);
  }

  function openCart(){
    document.getElementById('drawer').classList.add('open');
    document.getElementById('overlay').classList.add('open');
  }
  function closeCart(){
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
  }

  let currentOrderNumber = null;
  let currentCustomerName = "";
  let currentCustomerAddress = "";
  let currentCustomerPhone = "";

  function generateOrderNumber(){
    return 'SS-' + Date.now().toString().slice(-6);
  }

  function checkoutWhatsApp(){
    if(cart.length === 0) return;

    const nameInput = document.getElementById('customer-name');
    const addressInput = document.getElementById('customer-address');
    const phoneInput = document.getElementById('customer-phone');

    const name = nameInput.value.trim();
    const address = addressInput.value.trim();
    const phone = phoneInput.value.trim();

    [nameInput, addressInput, phoneInput].forEach(el => el.classList.remove('input-error'));

    if(name === ""){
      nameInput.classList.add('input-error');
      nameInput.focus();
      return;
    }
    if(address === ""){
      addressInput.classList.add('input-error');
      addressInput.focus();
      return;
    }
    if(phone === ""){
      phoneInput.classList.add('input-error');
      phoneInput.focus();
      return;
    }

    currentCustomerName = name;
    currentCustomerAddress = address;
    currentCustomerPhone = phone;
    openReceipt();
  }

  function openReceipt(){
    currentOrderNumber = generateOrderNumber();
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric' });
    const timeStr = now.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
    const total = cart.reduce((s,c) => s + c.price * c.qty, 0);

    document.getElementById('receipt-customer').textContent = currentCustomerName;
    document.getElementById('receipt-address').textContent = currentCustomerAddress;
    document.getElementById('receipt-phone').textContent = currentCustomerPhone;
    document.getElementById('receipt-order-number').textContent = currentOrderNumber;
    document.getElementById('receipt-date').textContent = `${dateStr} à ${timeStr}`;

    document.getElementById('receipt-items').innerHTML = cart.map(c => `
      <tr>
        <td>${c.name}<br><span class="ri-meta">Taille ${c.size}</span></td>
        <td>${fmt(c.price)}</td>
        <td>${c.qty}</td>
        <td>${fmt(c.price * c.qty)}</td>
      </tr>
    `).join("");

    document.getElementById('receipt-total').textContent = fmt(total);

    document.getElementById('receiptOverlay').classList.add('open');
    document.getElementById('receiptModal').classList.add('open');
  }

  function closeReceipt(){
    document.getElementById('receiptOverlay').classList.remove('open');
    document.getElementById('receiptModal').classList.remove('open');
  }

  function sendReceiptWhatsApp(){
    let msg = `Bonjour Sunu Style, je m'appelle ${currentCustomerName} et je souhaite confirmer ma commande n°${currentOrderNumber} :%0A%0A`;
    msg += `Adresse : ${currentCustomerAddress}%0ATéléphone : ${currentCustomerPhone}%0A%0A`;
    cart.forEach(c => {
      msg += `• ${c.name} (taille ${c.size}) x${c.qty} — ${fmt(c.price * c.qty)}%0A`;
    });
    const total = cart.reduce((s,c) => s + c.price * c.qty, 0);
    msg += `%0ATotal : ${fmt(total)}%0A%0AMerci de me confirmer la disponibilité et les modalités de livraison.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  }

  // Filtres (nav + boutons)
  document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      currentFilter = el.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(x => x.classList.remove('active'));
      document.querySelectorAll(`[data-filter="${currentFilter}"]`).forEach(x => x.classList.add('active'));
      renderGrid();
    });
  });

  // Ces fonctions ne s'exécutent que si les éléments existent sur la page courante
  if (document.getElementById('product-grid')) renderGrid();
  if (document.getElementById('drawer-items')) renderCart();