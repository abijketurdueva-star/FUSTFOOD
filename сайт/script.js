
  const foods = [
    {
      id: 1,
      name: "Классик бургер",
      price: 220,
      desc: "Ширелүү котлет, жашылча жана соус.",
      image: "photo-1568901346375-23c9450c58cd"
    },
    {
      id: 2,
      name: "Чизбургер",
      price: 250,
      desc: "Эритилген сыр жана даамдуу котлет.",
      image: "photo-157 burger"
    },
    {
      id: 3,
      name: "Чикен бургер",
      price: 190,
      desc: "Тоок эти, жаңы жашылча жана соус.",
      image: "photo-1606755962773-d324e0a13086"
    },
    {
      id: 4,
      name: "Фри картошка",
      price: 100,
      desc: "Кытырак картошка.",
      image: "photo-1573080496219-bb080dd4f877"
    },
    {
      id: 5,
      name: "Пицца",
      price: 280,
      desc: "Сыр, соус жана даамдуу кошулмалар.",
      image: "photo- pizza"
    },
    {
      id: 6,
      name: "Наггетс",
      price: 160,
      desc: "Кытырак тоок эти.",
      image: "photo-1562967914-608f82629710"
    },
    {
      id: 7,
      name: "Хот-дог",
      price: 150,
      desc: "Колбаса, жумшак нан жана соус.",
      image: "photo-1612392062798-2dbaa7f8c6b7"
    },
    {
      id: 8,
      name: "Суусундук",
      price: 80,
      desc: "Муздак сергитүүчү суусундук.",
      image: "photo-1513558161293-cdab36da6c7e"
    }
  ];

  const cart = {};

  function imageUrl(id) {
    // Сүрөттөр интернеттен жүктөлөт.
    // Кийин каалаган сүрөт URL'ин алмаштырса болот.
    const urls = {
      1: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
      2: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=700&q=80",
      3: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=80",
      4: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80",
      5: "https://images.unsplash.com/photo- pizza",
      6: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80",
      7: "https://images.unsplash.com/photo-1612392062798-2dbaa7f8c6b7?auto=format&fit=crop&w=700&q=80",
      8: "https://images.unsplash.com/photo-1513558161293-cdab36da6c7e?auto=format&fit=crop&w=700&q=80"
    };
    return urls[id];
  }

  function renderMenu() {
    const grid = document.getElementById("menuGrid");

    grid.innerHTML = foods.map(food => `
      <article class="food-card">
        <img
          src="${imageUrl(food.id)}"
          alt="${food.name}"
          loading="lazy"
          onerror="this.src='https://placehold.co/600x400?text=FASTFOOD'"
        >
        <div class="food-info">
          <h3>${food.name}</h3>
          <p>${food.desc}</p>
          <div class="food-bottom">
            <span class="price">${food.price} сом</span>
            <button class="add-btn"
              onclick="addToCart(${food.id})">
              + Себетке
            </button>
          </div>
        </div>
      </article>
    `).join("");
  }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    renderCart();
  }

  function removeFromCart(id) {
    if (!cart[id]) return;
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
    renderCart();
  }

  function renderCart() {
    const container = document.getElementById("cartItems");
    const ids = Object.keys(cart);

    if (ids.length === 0) {
      container.textContent = "Себет азырынча бош.";
    } else {
      container.innerHTML = ids.map(id => {
        const food = foods.find(item => item.id === Number(id));
        return `
          <div class="cart-item">
            <span>${food.name} × ${cart[id]}</span>
            <span>
              ${food.price * cart[id]} сом
              <button class="remove-btn"
                onclick="removeFromCart(${id})">−</button>
            </span>
          </div>
        `;
      }).join("");
    }

    const sum = foods.reduce(
      (total, food) => total + food.price * (cart[food.id] || 0),
      0
    );

    document.getElementById("total").textContent = sum;
  }

  function clearCart() {
    Object.keys(cart).forEach(id => delete cart[id]);
    renderCart();
  }

  document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (Object.keys(cart).length === 0) {
      document.getElementById("orderMessage").textContent =
        "Адегенде менюдан тамак танда.";
      return;
    }

    const form = new FormData(this);
    const items = foods
      .filter(food => cart[food.id])
      .map(food => `${food.name} × ${cart[food.id]}`)
      .join(", ");

    const message =
      `FASTFOOD ЗАКАЗЫ\n` +
      `Аты: ${form.get("customer")}\n` +
      `Телефон: ${form.get("phone")}\n` +
      `Дарек: ${form.get("address")}\n` +
      `Төлөө: ${form.get("payment")}\n` +
      `Тамактар: ${items}\n` +
      `Жалпы: ${document.getElementById("total").textContent} сом`;

    document.getElementById("orderMessage").textContent =
      "Заказ маалыматы даярдалды. Азырынча сайт аны ресторанга жөнөтпөйт.";

    // Реалдуу заказ кабыл алуу үчүн сервер же WhatsApp интеграциясы керек.
    console.log(message);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  renderMenu();
  renderCart();
