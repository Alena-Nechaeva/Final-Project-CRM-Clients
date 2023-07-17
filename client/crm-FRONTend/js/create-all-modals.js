import {createModalBaseForm} from './create-modal-base-form.js';
import {createContactItem, checkContacts} from './create-contact-item.js';
import {editClient, deleteClientItem, createClient} from './client-api.js';
import {render} from './main.js'

//                                   function for ADD new client to the table
export function addClientModal() {
  const createForm = createModalBaseForm(),
    modal = document.createElement('div'),
    modalConntent = document.createElement('div');

  // add classess
  modal.classList.add('modal', 'site-modal', 'modal-animation');
  modalConntent.classList.add(
    'modal__content',
    'site-modal__content',
    'modal-animation'
  );

  // nesting of elements
  modal.append(modalConntent);
  modalConntent.append(
    createForm.modalCloseBtn,
    createForm.modalTitle,
    createForm.form,
  );

  // submit form
  createForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const contactTypes = document.querySelectorAll('.contact__type-btn');
    const contactValues = document.querySelectorAll('.contact__input');
    let contactsArr = [];
    let clientObj = {};

    // create obj-contact structure
    for (let i = 0; i < contactTypes.length; i++) {
      if (!checkContacts(contactTypes[i], contactValues[i])) return;
      contactsArr.push({
        type: contactTypes[i].textContent,
        value: contactValues[i].value,
      });
    }

    // obj structure
    clientObj.name = createForm.inputName.value;
    clientObj.surname = createForm.inputSurname.value;
    clientObj.lastName = createForm.inputLastName.value;
    clientObj.contacts = contactsArr;

    await createClient(clientObj);

    // spinner
    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'block';
    setTimeout(() => {
      document.querySelector('.modal').remove();
      render();
    }, 1000)
  });

  // action for close btn
  createForm.modalCloseBtn.addEventListener('click', () => {
    modal.remove();
  });

  // action for cancel btn
  createForm.cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.remove();
  })

  return modal;
}

//                                            function for EDIT client in the table
export function editClientModal(client) {
  const editModal = document.createElement('div'),
    editModalContent = document.createElement('div'),
    editModalTitle = document.createElement('h2'),
    titleIdSpan = document.createElement('span'),
    createForm = createModalBaseForm(),
    deleteSpinner = deleteClientModal(client);

  // add clasess
  editModal.classList.add('modal-edit', 'site-modal', 'modal-animation');
  editModalContent.classList.add('modal__content', 'edit-modal__content', 'site-modal__content', 'modal-animation');
  editModalTitle.classList.add('title');
  titleIdSpan.classList.add('title-id');
  createForm.cancelBtn.classList.add('delete-edit-btn');

  //add content
  editModalTitle.textContent = 'Change data';
  createForm.cancelBtn.textContent = 'Delete client';
  titleIdSpan.textContent = `ID: ${client.idNumber}`;
  createForm.inputName.value = client.finalName;
  createForm.inputSurname.value = client.finalSurname;
  createForm.inputLastName.value = client.finalLastName;

  // recreate all contacts in modal window from arr
  for (const contact of client.contactsArr) {
    const createContact = createContactItem();
    createContact.contactTypeBtn.textContent = contact.type;
    createContact.contactInput.value = contact.value;
    createForm.contactsBlock.prepend(createContact.contactBlock);
  }

  // action for close btn
  createForm.modalCloseBtn.addEventListener('click', () => {
    editModal.remove();
  })

  // action for delete btn
  createForm.cancelBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await deleteClientItem(client.idNumber);

    // spinner for delete btn
    deleteSpinner.deleteSpinner.style.display = 'block';
    setTimeout(() => {
      editModal.remove()
      render();
    }, 1000)
  })

  //submit form
  createForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const contactTypes = document.querySelectorAll('.contact__type-btn');
    const contactValues = document.querySelectorAll('.contact__input');
    let contactsArr = [];
    let clientObj = {};

    //create obj-contact structure
    for (let i = 0; i < contactTypes.length; i++) {
      if (!checkContacts(contactTypes[i], contactValues[i])) return;
      contactsArr.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value
      })
    }

    // obj structure
    clientObj.name = createForm.inputName.value;
    clientObj.surname = createForm.inputSurname.value;
    clientObj.lastName = createForm.inputLastName.value;
    clientObj.contacts = contactsArr;

    await editClient(clientObj, client.idNumber);

    // spinner for btn save data
    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'block'
    setTimeout(() => {
      editModal.remove();
      render();
    }, 1000)
  })

  // nesting of elements
  createForm.cancelBtn.append(deleteSpinner.deleteSpinner)
  editModalTitle.append(titleIdSpan);
  editModalContent.append(createForm.modalCloseBtn, editModalTitle, createForm.form);
  editModal.append(editModalContent);

  return {
    editModal,
    editModalContent,
  }
}

//                                              function for DELETE client from the table
export function deleteClientModal(client) {
  const deleteModal = document.createElement('div'),
    deleteModalContent = document.createElement('div'),
    deleteModalTitle = document.createElement('h2'),
    modalCloseBtn = document.createElement('button'),
    deleteModalText = document.createElement('p'),
    deleteModalBtn = document.createElement('button'),
    cancelBtn = document.createElement('button'),
    deleteSpinner = document.createElement('span');

  // add clasess
  deleteModal.classList.add('delete-modal', 'site-modal', 'modal-animation');
  deleteModalContent.classList.add('delete-modal__content', 'site-modal__content', 'modal-animation');
  deleteModalText.classList.add('delete-modal__text');
  deleteModalTitle.classList.add('delete-modal__title', 'modal__title');
  deleteModalBtn.classList.add('btn-reset', 'delete-modal__delete', 'site-btn');
  cancelBtn.classList.add('btn-reset', 'delete-modal__back');
  modalCloseBtn.classList.add('btn-reset', 'modal__close');
  deleteSpinner.classList.add('spinner');

  // add content
  deleteModalTitle.textContent = 'Delete client';
  deleteModalText.innerHTML = `Do you really want to remove <span class="delete-client__name">${client.fullName}</span> from the list?`;
  deleteModalBtn.textContent = 'Delete';
  cancelBtn.textContent = 'Cancel';
  deleteSpinner.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
  </svg>`;

  // nesting of elements
  deleteModalBtn.append(deleteSpinner);
  deleteModalContent.append(modalCloseBtn,
    deleteModalTitle,
    deleteModalText,
    deleteModalBtn,
    cancelBtn);
  deleteModal.append(deleteModalContent);

  // actions in modal-window-delete
  modalCloseBtn.addEventListener('click', () => deleteModal.remove());
  cancelBtn.addEventListener('click', () => deleteModal.remove());

  deleteModalBtn.addEventListener('click', async () => {
    await deleteClientItem(client.idNumber);

    // spinner
    deleteSpinner.style.display = 'block';
    setTimeout(() => {
      deleteModal.remove();
      render();
    }, 1000)
  });

  return {
    deleteModal,
    deleteModalContent,
    deleteModalBtn,
    deleteSpinner
  }
}

//                                                         create CLIENT CARD
export function clientCard(client) {
  const cardModal = document.createElement('div'),
    cardModalContent = document.createElement('div'),
    cardModalTitle = document.createElement('h2'),
    contactsTitle = document.createElement('h3'),
    titleIdSpan = document.createElement('span'),
    wrapper = document.createElement('div'),
    fullName = document.createElement('div'),
    photo = document.createElement('div'),
    contactsList = document.createElement('ul'),
    closeBtn = document.createElement('button');

  // add clasess
  cardModal.classList.add('modal-card', 'site-modal', 'modal-animation');
  cardModalContent.classList.add('modal__content', 'edit-modal__content', 'site-modal__content', 'modal-animation')
  cardModalTitle.classList.add('title');
  titleIdSpan.classList.add('title-id');
  wrapper.classList.add('flex', 'wrapper')
  fullName.classList.add('cadr__name');
  photo.classList.add('card__photo');
  contactsList.classList.add('list-reset', 'card__contacts-list');
  closeBtn.classList.add('btn-reset', 'modal__close');

  //add content
  cardModalTitle.textContent = 'Client';
  contactsTitle.textContent = 'Contacts';
  titleIdSpan.textContent = `ID: ${client.idNumber}`;
  fullName.textContent = client.fullName;

  // recreate all contacts in modal window from arr
  for (const contact of client.contactsArr) {
    const li = document.createElement('li');
    contactsList.append(li);
    li.classList.add('card__contacts-item')
    li.innerHTML = `${contact.type}: <span class="card__cont-val">${contact.value}</span>`;
  }

  // action for close btn
  closeBtn.addEventListener('click', () => {
    cardModal.remove();
    history.replaceState(null, null, ' ');
  })

  // nesting of elements
  cardModalTitle.append(titleIdSpan);
  cardModalContent.append(closeBtn, cardModalTitle, wrapper, contactsTitle, contactsList);
  wrapper.append(photo, fullName)
  cardModal.append(cardModalContent);

  return cardModal;
}



