export class Client {
  constructor(id, name, surname, lastName, createdAt, updatedAt, contacts) {
    this.id = id;
    this.name = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    this.surname = surname.substring(0, 1).toUpperCase() + surname.substring(1).toLowerCase();
    this.lastName = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
    this.contacts = contacts;
  }

  get idNumber() {
    return this.id;
  }

  get finalName() {
    return this.name;
  }

  get finalSurname() {
    return this.surname;
  }

  get finalLastName() {
    return this.lastName;
  }

  get fullName() {
    return this.name + ' ' + this.surname + ' ' + this.lastName;
  }

  get createdDate() {
    let yyyy = this.createdAt.getFullYear();
    let mm = this.createdAt.getMonth() + 1;
    let dd = this.createdAt.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
  }

  get createdTime() {
    let hh = this.createdAt.getHours();
    let mints = this.createdAt.getMinutes();
    if (hh < 12) hh = '0' + hh;
    if (mints < 10) mints = '0' + mints;

    return hh + ':' + mints;
  }

  get updateDate() {
    let yyyy = this.updatedAt.getFullYear();
    let mm = this.updatedAt.getMonth() + 1;
    let dd = this.updatedAt.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
  }

  get updateTime() {
    let hh = this.updatedAt.getHours();
    let mints = this.updatedAt.getMinutes();
    if (hh < 12) hh = '0' + hh;
    if (mints < 10) mints = '0' + mints;

    return hh + ':' + mints;
  }

  get contactsArr() {
    return this.contacts;
  }
}
