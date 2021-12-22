/* eslint-disable no-console */
export default function getAllTickets(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://http-backend111.herokuapp.com/?method=allTickets');
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = Array.from(JSON.parse(xhr.responseText));
        console.log(data);
        callback(data);
      } catch (e) {
        console.log(e);
      }
    }
  });
  xhr.send();
}

export function getTicketByID(event, callback) {
  const xhr = new XMLHttpRequest();
  const ticketEl = event.currentTarget.closest('.ticketEl');
  const ticketId = ticketEl.dataset.idTicket;
  xhr.open('GET', `https://http-backend111.herokuapp.com/?method=ticketById&id=${ticketId}`);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText);
        callback(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send();
}

export function formPOST(options, method, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://http-backend111.herokuapp.com/');
  const request = JSON.stringify({ method, object: options });
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = xhr.responseText;
        console.log(data);
        callback();
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send(request);
}

export function POSTTicketId(options, method, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://http-backend111.herokuapp.com/');
  const request = JSON.stringify({ method, object: options });
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = xhr.responseText;
        console.log(data);
        callback();
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send(request);
}
