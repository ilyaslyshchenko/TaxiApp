const tg = window.Telegram.WebApp;

const mainScreen = document.getElementById('main-screen');
const formScreen = document.getElementById('form-screen');
const doneScreen = document.getElementById('done-screen');

document.getElementById('call-taxi').addEventListener('click', () => {
  mainScreen.classList.add('hidden');
  formScreen.classList.remove('hidden');
});

document.getElementById('confirm').addEventListener('click', () => {
  const from = document.getElementById('from').value.trim();
  const to = document.getElementById('to').value.trim();

  if (!from || !to) {
    alert('Пожалуйста, заполните оба поля.');
    return;
  }

  // Отправляем данные в Telegram-бота
  tg.sendData(JSON.stringify({ from, to }));

  formScreen.classList.add('hidden');
  doneScreen.classList.remove('hidden');
});