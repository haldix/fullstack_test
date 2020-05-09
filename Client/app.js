const list = document.getElementById('names-list');
const btn = document.getElementById('btn-fetch');

btn.addEventListener('click', async () => {
  try {
    const res = await fetch('http://127.0.0.1:3000/names');
    const data = await res.json();
    console.log('Data', data);
    const names = data
      .map(
        (el) =>
          `<li>${el.name}<br><small>AGE: ${el.age}&nbsp;&nbsp;</small><small>EMAIL: ${el.email}</small></li>`
      )
      .join('');
    console.log('Names', names);
    list.insertAdjacentHTML('afterbegin', names);
  } catch (e) {
    console.error(e);
  }
});
