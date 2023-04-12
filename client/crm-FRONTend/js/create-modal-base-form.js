import { createContactItem } from "./create-contact-item.js";

export function createModaBaselForm() {
  const modalTitle = document.createElement('h2'),
    modalCloseBtn = document.createElement('button'),
    form = document.createElement('form'),
    inputName = document.createElement('input'),
    labelName = document.createElement('label'),
    inputSurname = document.createElement('input'),
    labelSurname = document.createElement('label'),
    inputLastName = document.createElement('input'),
    labelLastName = document.createElement('label'),
    requiredName = document.createElement('span'),
    requiredSurname = document.createElement('span'),
    addContactBtn = document.createElement('button'),
    saveBtn = document.createElement('button'),
    cancelBtn = document.createElement('button'),
    contactsBlock = document.createElement('div'),
    formFloatingName = document.createElement('div'),
    formFloatingSurname = document.createElement('div'),
    formFloatingLastName = document.createElement('div');

  const spinnerSVG = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
    </svg>`;
  const spinner = document.createElement('span'); // create savespinner (small)

  // add classes
  modalTitle.classList.add('modal__title');
  modalCloseBtn.classList.add('btn-reset', 'modal__close');
  form.classList.add('modal__form');
  formFloatingName.classList.add('form-floating');
  formFloatingSurname.classList.add('form-floating');
  formFloatingLastName.classList.add('form-floating');
  inputName.classList.add('modal__input');
  inputSurname.classList.add('modal__input');
  inputLastName.classList.add('modal__input');
  labelName.classList.add('modal__label');
  labelSurname.classList.add('modal__label');
  labelLastName.classList.add('modal__label');
  requiredName.classList.add('modal__label');
  requiredSurname.classList.add('modal__label');
  addContactBtn.classList.add('btn-reset', 'modal__btn-contact', 'modal__btn-contact--active');
  saveBtn.classList.add('btn-reset', 'modal__btn-save', 'site-btn');
  cancelBtn.classList.add('btn-reset', 'modal__btn-back');
  contactsBlock.classList.add('modal__contact');
  spinner.classList.add('spinner');

  // add attributes
  labelName.for = 'floatingName';
  labelSurname.for = 'floatingSurname';
  labelLastName.for = 'floatingLastName';
  inputName.id = 'floatingName';
  inputSurname.id = 'floatingSurname';
  inputLastName.id = 'floatingLastName';
  inputName.type = 'text';
  inputSurname.type = 'text';
  inputLastName.type = 'text';
  inputName.placeholder = 'First Name';
  inputSurname.placeholder = 'First surname';
  inputLastName.placeholder = 'Second surname';

  // add content
  modalTitle.textContent = 'New client';
  labelName.textContent = 'First name';
  labelSurname.textContent = 'First surname';
  labelLastName.textContent = 'Second surname';
  addContactBtn.textContent = 'Add contact';
  saveBtn.textContent = 'Save';
  cancelBtn.textContent = 'Cancel';
  requiredName.textContent = '*';
  requiredSurname.textContent = '*';
  spinner.innerHTML = spinnerSVG;


  //validation text fields
  const arrOfInputs = [inputName, inputSurname, inputLastName];
  for (const inp of arrOfInputs) {
    inp.required = true;
    inp.type = 'text';
    inp.pattern = '^[a-zA-z]+$'; // checking input.value for latin letters/ white space/ numbers and other symbols
    inp.title = 'Latin letters only. No white space, numbers, symbols are allowed';
  }
  inputLastName.required = false;

  // nesting of elements
  labelName.append(requiredName);
  saveBtn.prepend(spinner)
  labelSurname.append(requiredSurname);
  formFloatingName.append(inputName, labelName);
  formFloatingSurname.append(inputSurname, labelSurname);
  formFloatingLastName.append(inputLastName, labelLastName);
  contactsBlock.append(addContactBtn);
  form.append(
    formFloatingName,
    formFloatingSurname,
    formFloatingLastName,
    contactsBlock,
    saveBtn,
    cancelBtn
  );

  // add action to the contact-Btn
  addContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const contactItem = createContactItem();
    let numberOfContacts = document.querySelectorAll('.contact');
    // add or delete contact-Btn depending on numberOfContacts length
    if (numberOfContacts.length < 9) {
      contactsBlock.append(contactItem.contactBlock);
      addContactBtn.before(contactItem.contactBlock);
      if (numberOfContacts.length > 2) document.querySelector('.modal__content').style.marginTop = '20px';
    } else {
      contactsBlock.prepend(contactItem.contactBlock);
      addContactBtn.classList.remove('modal__btn-contact--active');
    }
  })

  return {
    form,
    modalCloseBtn,
    modalTitle,
    cancelBtn,
    inputName,
    inputSurname,
    inputLastName,
    labelName,
    labelSurname,
    labelLastName,
    contactsBlock,
    addContactBtn
  }
}
