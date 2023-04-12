import { editClientModal, deleteClientModal, clientCard } from './create-all-modals.js';

// create row of the table
export function newClientTR(client) {
  const clientTR = document.createElement('tr'),
    idTD = document.createElement('td'),
    fullNameTD = document.createElement('td'),
    cardBtn = document.createElement('button'),
    creationDateTD = document.createElement('td'),
    createdWrap = document.createElement('div'),
    createdDateSpan = document.createElement('span'),
    createdTimeSpan = document.createElement('span'),
    lastChangesDateTD = document.createElement('td'),
    updateWrap = document.createElement('div'),
    updateTimeSpan = document.createElement('span'),
    contactsTD = document.createElement('td'),
    contactsWrap = document.createElement('div'),
    actionsTD = document.createElement('td'),
    actionsWrap = document.createElement('div'),
    editBtn = document.createElement('button'),
    editBtnSpan = document.createElement('span'),
    deleteBtn = document.createElement('button'),
    deleteBtnSpan = document.createElement('span'),
    deleteModalWindow = deleteClientModal(client),
    editModalWindow = editClientModal(client),
    editSpinner = document.createElement('span'),
    deleteSpinner = document.createElement('span');

  // add clases
  idTD.classList.add('grey-text', 'id-text');
  cardBtn.classList.add('btn-reset', 'btn-hash');
  createdWrap.classList.add('first-date');
  createdTimeSpan.classList.add('grey-text', 'time-pdd');
  updateWrap.classList.add('second-date')
  updateTimeSpan.classList.add('grey-text', 'time-pdd');
  contactsWrap.classList.add('contacts-wrap');
  actionsWrap.classList.add('actions-wrap');
  editBtn.classList.add('btn-reset', 'btn-edit');
  deleteBtn.classList.add('btn-reset', 'btn-delete');
  editBtnSpan.classList.add('text-edit');
  deleteBtnSpan.classList.add('text-delete');
  editSpinner.classList.add('spinner-tbtn-animation')
  deleteSpinner.classList.add('spinner-tbtn-animation')

  // add content
  idTD.textContent = client.idNumber.substring(7);
  cardBtn.innerHTML = client.fullName;
  createdDateSpan.textContent = client.createdDate;
  createdTimeSpan.textContent = client.createdTime;
  updateWrap.textContent = client.updateDate;
  updateTimeSpan.textContent = client.updateTime;
  editBtnSpan.textContent = 'Modify';
  deleteBtnSpan.textContent = 'Delete';
  editSpinner.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
  </svg>`

  deleteSpinner.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#F06A4D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
  </svg>`

  tippy(cardBtn, {
    content: 'Open client card',
    animation: 'shift-away'
  });

  // nesting of elements
  clientTR.append(idTD);
  clientTR.append(fullNameTD);
  fullNameTD.append(cardBtn);
  clientTR.append(creationDateTD);
  creationDateTD.append(createdWrap);
  createdWrap.append(createdDateSpan, createdTimeSpan);
  clientTR.append(lastChangesDateTD);
  lastChangesDateTD.append(updateWrap);
  updateWrap.append(updateTimeSpan);
  contactsTD.append(contactsWrap);
  clientTR.append(contactsTD);
  clientTR.append(actionsTD);
  actionsTD.append(actionsWrap);
  actionsWrap.append(editBtn);
  editBtn.append(editBtnSpan, editSpinner);
  actionsWrap.append(deleteBtn);
  deleteBtn.append(deleteBtnSpan, deleteSpinner);

  //action for show client card btn
  cardBtn.addEventListener('click', () => {
    window.location.hash = client.idNumber; //set hash
    document.body.append(clientCard(client));
  })

  //create icons of the contactsArr (every type has background-image)
  function createContactImages() {
    const arr = []; // arr we need to hide elements if contacts amount more than 4
    for (const obj of client.contactsArr) {
      const btnWrap = document.createElement('div');
      const contactBtn = document.createElement('button');
      let linkType = null;

      btnWrap.classList.add('contact-btn__wrap');
      contactBtn.classList.add('contact-btn');

      btnWrap.append(contactBtn);
      contactsWrap.append(btnWrap);
      arr.push(btnWrap);

      switch (obj.type) {
        case 'Phone':
          contactBtn.classList.add('phone');
          linkType = `tel:${obj.value}`;
          obj.value = `+56(9) ${obj.value}`;
          break;

        case 'Email':
          contactBtn.classList.add('email');
          linkType = `mailto:${obj.value}`;
          break;

        case 'VK':
          contactBtn.classList.add('vk');
          linkType = obj.value;
          break;
        case 'FB':
          contactBtn.classList.add('fb');
          linkType = obj.value;
          break;

        case 'Other':
          contactBtn.classList.add('other');
          linkType = obj.value;
          break;

        default:
          break;
      }

      //add tooltip from tippy
      tippy(contactBtn, {
        allowHTML: true,
        content: `${obj.type}: <a class='tippy-link' href=${linkType}>${obj.value}</a>`,
        animation: 'shift-away',
        interactive: true,
      });
    }
    return arr;
  }

  // hide contacts if arr.length more than 4
  function hideContacts() {
    const allContacts = createContactImages();
    const hiddenContacts = allContacts.slice(4); //get contacts after 4th element

    hiddenContacts.forEach(item => item.style.display = 'none') // hide contacts

    if (allContacts.length > 4) { //show button with number of contacts
      const newBtn = document.createElement('button');
      newBtn.classList.add('contact-btn', 'hidden-number')
      contactsWrap.append(newBtn);
      newBtn.textContent = `+${allContacts.length - 4}`;
      // onclick show all conctats
      newBtn.addEventListener('click', () => {
        hiddenContacts.forEach(item => item.style.display = '')
        newBtn.remove()
      })
    }
  }
  hideContacts();

  // action for edit button
  editBtn.addEventListener('click', () => {
    // spinner
    editSpinner.style.display = 'block';
    editBtnSpan.classList.add('spinner-is-active');
    setTimeout(() => {
      editSpinner.style.display = 'none';
      editBtnSpan.classList.remove('spinner-is-active');
    }, 1000);
    // action
    setTimeout(() => document.body.append(editModalWindow.editModal), 500);
  })

  // action for delete button
  deleteBtn.addEventListener('click', () => {
    // spinner
    deleteSpinner.style.display = 'block';
    deleteBtnSpan.classList.add('spinner-is-active');
    setTimeout(() => {
      deleteSpinner.style.display = 'none';
      deleteBtnSpan.classList.remove('spinner-is-active');
    }, 1000);
    // action
    setTimeout(() => document.body.append(deleteModalWindow.deleteModal), 500);
  })

  return {
    clientTR,
    editBtn,
    deleteBtn,
  }
}

export function createPreloader() {
  const preloaderBlock = document.createElement('div');
  const preloaderCircle = document.createElement('span');

  preloaderBlock.classList.add('preloader');
  preloaderCircle.id = 'loader';

  preloaderCircle.innerHTML = ` <svg width="40"height="40"viewBox="0 0 40 40"fill="none"xmlns="http://www.w3.org/2000/svg"><path d="M2 20C2 29.941 10.059 38 20 38C29.941 38 38 29.941 38 20C38 10.059 29.941 2 20 2C17.6755 2 15.454 2.4405 13.414 3.243"stroke="#9873FF"stroke-width="4"stroke-miterlimit="10"stroke-linecap="round"/></svg>`;
  preloaderBlock.append(preloaderCircle);

  return preloaderBlock;
}
