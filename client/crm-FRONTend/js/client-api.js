import {Client} from './Client.js';

// get data from server and convert JSON to arr of classes
export async function getClientsData() {
  const response = await fetch('http://localhost:3000/api/clients');
  const result = await response.json();
  //using map and destructuring assignment we create array of classes instead of array of objects
  let clientsData = result.map((clientData) => {
    const {id, name, surname, lastName, createdAt, updatedAt, contacts} = clientData;
    return new Client(
      id,
      name,
      surname,
      lastName,
      createdAt,
      updatedAt,
      contacts
    );
  });
  return clientsData;
};

//post client to server
export async function createClient(client) {
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    body: JSON.stringify(client),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const result = await response.json();

  return result;
}

//delete client from server
export async function deleteClientItem(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
  });
}

//change client in server
export async function editClient(client, id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(client),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

