export function createContactItem() {
  const contactBlock = document.createElement('div'),
    contactsType = document.createElement('div'),
    contactTypeBtn = document.createElement('button'),
    contactList = document.createElement('ul'),
    contactPhone = document.createElement('li'),
    contactVK = document.createElement('li'),
    contactFB = document.createElement('li'),
    contactEmail = document.createElement('li'),
    contactOther = document.createElement('li'),
    contactInput = document.createElement('input'),
    contactDeleteBtn = document.createElement('button');

  // add classes
  contactBlock.classList.add('contact', 'flex');
  contactsType.classList.add('contact__type');
  contactTypeBtn.classList.add('btn-reset', 'contact__type-btn');
  contactList.classList.add('list-reset', 'contact__list');
  contactPhone.classList.add('contact__item');
  contactVK.classList.add('contact__item');
  contactFB.classList.add('contact__item');
  contactEmail.classList.add('contact__item');
  contactOther.classList.add('contact__item');
  contactInput.classList.add('contact__input');
  contactDeleteBtn.classList.add('btn-reset', 'contact__delete');

  // add content
  contactTypeBtn.textContent = 'Phone';
  contactPhone.textContent = 'Phone';
  contactVK.textContent = 'VK';
  contactFB.textContent = 'FB';
  contactOther.textContent = 'Other';
  contactEmail.textContent = 'Email';
  contactInput.placeholder = 'Enter contact data';
  contactInput.type = 'tel';
  contactDeleteBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z"/>
  </svg>`;

  // input validation
  contactInput.required = true;

  // create Arr of contact types
  const typesArr = [contactPhone, contactEmail, contactVK, contactFB, contactOther];

  // action for delete-btn
  contactDeleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    contactBlock.remove();
    document.querySelector('.modal__btn-contact').classList.add('modal__btn-contact--active');
  })

  //add toltipe for delete btn
  tippy(contactDeleteBtn, {
    content: 'Delete contact',
    animation: 'shift-away',
  });

  // types list disappear if mouse leave
  contactsType.addEventListener('mouseleave', () => {
    contactList.classList.remove('contact__list--active');
    contactTypeBtn.classList.remove('contact__list--active');
  })

  // list of contacts appears if click the btn
  contactTypeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    contactList.classList.toggle('contact__list--active');
    contactTypeBtn.classList.toggle('contact__list--active');

    // hide contact-type if same type already exist inside the btn
    for (const item of typesArr) {
      item.style.display = 'block';
      if (contactTypeBtn.textContent === item.textContent) {
        item.style.display = 'none';
      }
    }
  })

  contactInput.addEventListener('input', () => {
    contactBlock.classList.remove('message');
  })

  //function to choose contact type
  function setType(type) {
    type.addEventListener('click', () => {
      contactTypeBtn.textContent = type.textContent;
      contactList.classList.remove('contact__list--active');
      contactTypeBtn.classList.remove('contact__list--active');

      // set type for input
      switch (type) {
        case contactPhone:
          contactInput.type = 'tel';
          break;
        case contactEmail:
          contactInput.type = 'email';
          break;
        case contactVK:
          contactInput.type = 'url';
          break;
        case contactFB:
          contactInput.type = 'url';
          break;
        case contactOther:
          contactInput.type = 'text';
          break;
        default:
          contactInput.type = 'tel';
      }
    })
  }

  //use function for each type of contact
  for (const type of typesArr) {
    setType(type);
  }

  // nesting of elements
  contactBlock.append(contactsType, contactInput, contactDeleteBtn);
  contactsType.append(contactTypeBtn, contactList);
  contactList.append(contactPhone, contactEmail, contactVK, contactFB, contactOther);

  return {
    contactBlock,
    contactTypeBtn,
    contactInput,
    contactDeleteBtn
  }
}

//validation for phone-number
export function checkContacts(type, inp) {
  const onlyNumbers = /[^0-9]+$/g;
  const contacts = [...document.querySelectorAll('.contact')];

  if (type.innerHTML === 'Phone') { //choose type phone
    if (onlyNumbers.test(inp.value) || inp.value.length !== 8) { //check if value ok with RegExp
      for (const item of contacts) {
        if (inp === item.children[1]) //find contact-blok we need inside all contcts-block
          item.classList.add('message');//add error-message
      }
      return false;
    } else {
      contacts.forEach(item => item.classList.remove('message'));
      return true;
    }
  }
  return true;
}
