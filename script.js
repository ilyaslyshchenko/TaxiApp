// === Firebase Config ===
const firebaseConfig = {
  apiKey: "AIzaSyBNChRYyaOiscpRfJ4bvPj3qkt-3R8n0DQ",
  authDomain: "taxiapp-32640.firebaseapp.com",
  databaseURL: "https://taxiapp-32640-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "taxiapp-32640",
  storageBucket: "taxiapp-32640.firebasestorage.app",
  messagingSenderId: "449989866847",
  appId: "1:449989866847:web:619ae1a64dea86e378b2ea"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// === Навигация ===
function goTo(page) {
  window.location.href = page;
}


// === Клиент: отправка заказа ===
function sendOrder() {
  const from = document.getElementById('from').value.trim();
  const to = document.getElementById('to').value.trim();
  const status = document.getElementById('status');

  if (!from || !to) {
    status.textContent = "⚠️ Укажите оба адреса!";
    return;
  }

  const order = {
    from,
    to,
    time: new Date().toLocaleString(),
    status: "new"
  };

  db.ref("orders").push(order)
    .then(() => {
      status.textContent = "✅ Заказ отправлен!";
      console.log("Заказ отправлен в Firebase:", order);
      document.getElementById('from').value = "";
      document.getElementById('to').value = "";
    })
    .catch((err) => {
      status.textContent = "❌ Ошибка: " + err.message;
      console.error(err);
    });
}


// === Водитель: просмотр заказов ===
if (document.getElementById('orders')) {
  const ordersDiv = document.getElementById('orders');
  const ordersRef = db.ref("orders");

  ordersRef.on("value", (snapshot) => {
    ordersDiv.innerHTML = "";
    const data = snapshot.val();

    if (!data) {
      ordersDiv.innerHTML = "<p>Заказов нет 💤</p>";
      return;
    }

    Object.keys(data).forEach((key) => {
      const o = data[key];
      const div = document.createElement('div');
      div.className = 'order';
      div.innerHTML = `
        <p><b>${o.from}</b> → ${o.to}</p>
        <small>${o.time}</small><br>
        <button class="btn driver" onclick="acceptOrder('${key}')">Принять</button>
      `;
      if (o.status === "accepted") {
        div.style.background = "#d4edda"; // зелёный для принятых заказов
      }
      ordersDiv.appendChild(div);
    });
  });
}


// === Принятие заказа ===
function acceptOrder(id) {
  db.ref("orders/" + id + "/status").set("accepted");
  alert("Вы приняли заказ!");
}