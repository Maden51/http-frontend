import { formPOST } from './request';
import Ticket from './Ticket';
import modalClose from './util';

Ticket.redrawTickets();

const addButton = document.querySelector('.addButton');
addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const addModal = document.querySelector('.addTicket');
  addModal.classList.add('active');
  const addForm = document.querySelector('.modal__content-addTicketForm');
  const shortDescription = document.querySelector('.addTicket__shortDescription');
  const fullDescription = document.querySelector('.addTicket__fullDescription');
  const cancelButton = document.querySelector('.cancel');
  cancelButton.addEventListener('click', modalClose);
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const options = {
      name: shortDescription.value,
      description: fullDescription.value,
    };
    function callback() {
      modalClose();
      Ticket.redrawTickets();
    }
    formPOST(options, 'createTicket', callback);
  });
});
