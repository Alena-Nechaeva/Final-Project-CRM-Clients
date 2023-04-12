// create list of all elements by taking data from Local storage. We use this function in main.js.
// In search inpit you can enter any number of ID or any letter of name

import { Client } from "./class-client.js";

//this function create search-list of Names and Ids
export function createSearchList() {
  const searchList = document.querySelector('.search-list');

  const localData = localStorage.getItem('clientsList'); // get data from localStorage
  const clientsArrLS = JSON.parse(localData).map((clientData) => {
    const { id, name, surname, lastName, createdAt, updatedAt, contacts } = clientData;
    return new Client(id, name, surname, lastName, createdAt, updatedAt, contacts);
  })


  for (const client of clientsArrLS) {
    const li = document.createElement('li'),
      divName = document.createElement('div'), //create divs with name
      divId = document.createElement('div');  //create divs with ID number

    li.classList.add('search__item');
    divName.classList.add('div-name');
    divId.classList.add('div-id');

    divName.textContent = client.fullName;
    divId.textContent = client.idNumber.substring(7); //cut ID number to show only last 6 symbols

    divName.setAttribute('tabindex', '0');
    divId.setAttribute('tabindex', '0');

    searchList.append(li);
    li.append(divId, divName);
  }
}

// this function does search in the list of elements (using regExp) not in the table.
// To find element in the table you have to click element in the list
export function listSearch() {
  const inpSearch = document.querySelector('.search'),
    searchList = document.querySelector('.search-list'),
    allTRs = [...document.querySelectorAll('tr:not(.table__header)')],
    allDivNames = [...document.querySelectorAll('.div-name')],
    allDivIds = [...document.querySelectorAll('.div-id')],
    searchingVal = new RegExp(`${inpSearch.value}`, 'i'),
    onlyLetters = /^[a-zA-z]+$/;

  //show elements depends on input value
  if (onlyLetters.test(inpSearch.value)) {
    allDivNames.forEach(item => item.style.display = '')
    allDivIds.forEach(item => item.style.display = 'none')
  } else {
    allDivNames.forEach(item => item.style.display = 'none');
    allDivIds.forEach(item => item.style.display = '')
  }

  // search in the list
  if (inpSearch.value !== '') {
    searchList.style.display = 'block';
    // searching inside Names
    allDivNames.filter(function (el) {
      if (el.innerText.search(searchingVal) < 0) {
        el.style.display = 'none';
        return false;
      } else {
        el.addEventListener('click', () => { // find element in the table by click using function tableSearch
          inpSearch.value = el.innerText.trim();
          tableSearch();
        })
        el.addEventListener('keyup', event => { // find element in the table by enter using function tableSearch
          if (event.code === 'Enter') {
            el.click();
          }
        })
        el.style.display = ''; // if there is matched symbol - show elements and light up matched symbol
        let str = el.innerText;
        el.innerHTML = insrtMark(str, el.innerText.search(searchingVal), inpSearch.value.length);
        return true;
      }
    })

    // searching inside Ids
    allDivIds.filter(function (el) {
      if (el.innerText.search(searchingVal) < 0) {
        el.style.display = 'none';
        return false;
      } else {
        el.addEventListener('click', () => { // find element in the table by click using function tableSearch
          inpSearch.value = el.innerText.trim();
          tableSearch();
        })
        el.addEventListener('keyup', event => { // find element in the table by event 'enter' using function tableSearch
          if (event.code === 'Enter') {
            el.click();
          }
        })
        el.style.display = ''; // if there is matched symbol - show elements and light up matched symbol
        let str = el.innerText;
        el.innerHTML = insrtMark(str, el.innerText.search(searchingVal), inpSearch.value.length);
        return true;
      }
    })

  } else { //when input-search is empty
    searchList.style.display = 'none';
    allTRs.forEach(item => item.style.display = '');
  }

  //close list if click outside
  window.addEventListener('click', (e) => {
    if (e.target !== searchList) searchList.style.display = 'none';
  })
}

// find row in table using regExp
function tableSearch() {
  const allTRs = [...document.querySelectorAll('tr:not(.table__header)')];
  const inpSearch = document.querySelector('.search');

  allTRs.filter(function (el) {
    if (el.children[1].textContent.search(new RegExp(`${inpSearch.value}`, 'i')) < 0 &&
      el.children[0].textContent.search(new RegExp(`${inpSearch.value}`, 'i')) < 0
    ) {
      el.style.display = 'none';
      return false;
    } else {
      el.style.display = '';
      return true;
    }
  })
}

//light up symbols
function insrtMark(str, pos, len) {
  return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark>' + str.slice(pos + len)
}
