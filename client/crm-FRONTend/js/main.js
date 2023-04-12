import { newClientTR, createPreloader } from './create-table-row-&-preloader.js';
import { getClientsData } from './client-api.js';
import { listSearch, createSearchList } from './search.js';
import { addClientModal, clientCard } from './create-all-modals.js'

// sort clients by click(taking data from server)
async function getSortCliets(prop, dir) {
  const clients = await getClientsData();
  const sortedClients = clients.sort((clientA, clientB) => {
    if (!dir === false ? clientA[prop] < clientB[prop] : clientA[prop] > clientB[prop])
      return -1;
  })
  return sortedClients;
}

//get some elements we need to render the beautiful table
const clientsListTHall = document.querySelectorAll('.table th:not(.contacts, .actions)');
let column = 'fullName';
let colDir = true;

clientsListTHall.forEach((elem, index) => {
  const arrows = document.querySelectorAll('.arrow'),
    a_z = document.querySelector('.a-z'),
    z_a = document.querySelector('.z-a');

  // by click change direction and reconstruckt the table
  elem.addEventListener('click', function () {
    column = this.dataset.column;
    colDir = !colDir;
    render();

    //add movments to arrows and А-Z
    if (colDir === true) {
      arrows[index].classList.remove('active-arrow');
    } else arrows[index].classList.add('active-arrow');

    if (colDir === true && column === 'fullName') {
      a_z.style.display = 'inline';
      z_a.style.display = 'none';
    } else {
      if (colDir === false && column === 'fullName') {
        a_z.style.display = 'none';
        z_a.style.display = 'inline';
      }
      if (column !== 'fullName') {
        a_z.style.display = 'none';
        z_a.style.display = 'none';
      }
    }
  });
});

let checkloader = true;// helper for preloader
//this function render the table taking data from sort function
export async function render() {
  let clientsCopy = await getSortCliets(column, colDir);
  const clientsList = document.getElementById('clients-list');
  const preloader = createPreloader();

  clientsList.innerHTML = '';
  document.querySelector('.search-list').innerHTML = '';

  // add preloader
  if (checkloader === true) {
    clientsList.append(preloader);
    checkloader = false;
  }
  if (clientsCopy.length === 0) {
    preloader.style.marginTop = '120px';
  }

  //render the rows using arr of classess
  for (const client of clientsCopy) {
    clientsList.append(newClientTR(client).clientTR);
    checkloader = false;
  }

  //save data in Local Storage
  localStorage.setItem('clientsList', JSON.stringify(clientsCopy));

  //share card of client
  const shearedClient = clientsCopy.find(item => `#${item.idNumber}` === window.location.hash);
  setTimeout(() => {
    if (window.location.hash !== '') document.body.append(clientCard(shearedClient));
  }, 1000);
}
render();

//create modal window for the button 'add client'
document.querySelector('.add').addEventListener('click', () => {
  document.body.append(addClientModal());
});

// remove preloader
window.onload = () => {
  setTimeout(() => {
    document.querySelector('.preloader').remove();
    document.querySelector('.search').disabled = false;
  }, 1000)
}

//search
const inpSearch = document.querySelector('.search');

inpSearch.addEventListener('focus', () => {
  document.querySelector('.search-list').innerHTML = '';
  //searching function create list of all names and ids from Local Storage
  createSearchList();
});

inpSearch.addEventListener('input', async () => {
  let delay;
  clearTimeout(delay);
  delay = setTimeout(listSearch, 300);
});

// inpSearch.addEventListener('focusout', () => {
  // setTimeout(() => {
    // document.querySelector('.search-list').innerHTML = '';
  // }, 500);
// })
