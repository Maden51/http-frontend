import getAllTickets, { formPOST, getTicketByID, POSTTicketId } from './request';
import modalClose from './util';

export default class Ticket {
  constructor(ticket) {
    this.id = ticket.id;
    this.name = ticket.name;
    this.description = ticket.description;
    this.status = ticket.status;
    this.created = ticket.created;

    this.element = null;
  }

  addTicket() {
    const ticketContainer = document.querySelector('.tickets-container');
    const ticketEl = document.createElement('div');
    ticketEl.className = 'ticketEl';
    ticketEl.dataset.idTicket = this.id;

    const ticketStatus = document.createElement('div');
    ticketStatus.className = 'ticketStatus';
    if (this.status === false) {
      ticketStatus.classList.add('ticket__status-false');
    } else {
      ticketStatus.classList.add('ticket__status-true');
    }

    const ticketName = document.createElement('div');
    ticketName.className = 'ticketName';
    ticketName.textContent = this.name;

    const controlBox = document.createElement('div');
    controlBox.className = 'controlBox';
    const ticketDate = document.createElement('div');
    ticketDate.className = 'ticketDate';
    ticketDate.textContent = this.created;
    const ticketEdit = document.createElement('div');
    ticketEdit.className = 'ticketEdit';
    const ticketDelete = document.createElement('div');
    ticketDelete.className = 'ticketDelete';
    controlBox.appendChild(ticketDate);
    controlBox.appendChild(ticketEdit);
    controlBox.appendChild(ticketDelete);

    ticketEl.appendChild(ticketStatus);
    ticketEl.appendChild(ticketName);
    ticketEl.appendChild(controlBox);

    ticketContainer.appendChild(ticketEl);

    ticketStatus.addEventListener('click', this.changeStatus);
    ticketName.addEventListener('click', this.ShowFullDescription);
    ticketEdit.addEventListener('click', this.editTicket);
    ticketDelete.addEventListener('click', this.deleteTicket);
  }

  changeStatus(event) {
    this.element = event.currentTarget;
    this.element.classList.toggle('ticket__status-false');
    this.element.classList.toggle('ticket__status-true');
    const ticketId = this.element.closest('.ticketEl').dataset.idTicket;
    const options = { ticketId };
    function callback() {
      Ticket.redrawTickets();
    }
    POSTTicketId(options, 'changeTicketStatus', callback);
  }

  ShowFullDescription(event) {
    this.element = event.currentTarget;
    const ticketEl = this.element.closest('.ticketEl');
    const fullDescription = ticketEl.querySelector('.fullDescription');
    if (fullDescription) {
      fullDescription.remove();
    } else {
      const callback = (data) => {
        const descriptionEl = document.createElement('div');
        descriptionEl.className = 'fullDescription';
        descriptionEl.textContent = data.description;
        ticketEl.append(descriptionEl);
      };
      getTicketByID(event, callback);
    }
  }

  editTicket(event) {
    this.element = event.currentTarget;
    const modal = document.querySelector('.editTicket');
    modal.classList.add('active');
    const shortDescription = modal.querySelector('.editTicket__shortDescription');
    const fullDescription = modal.querySelector('.editTicket__fullDescription');

    function callback(data) {
      shortDescription.value = data.name;
      fullDescription.value = data.description;
    }
    getTicketByID(event, callback);

    const cancelButton = modal.querySelector('.cancel');
    cancelButton.addEventListener('click', modalClose);
    const form = modal.querySelector('.modal__content-editTicketForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const options = {
        name: shortDescription.value,
        description: fullDescription.value,
      };
      function callbackClose() {
        modalClose();
        Ticket.redrawTickets();
      }
      formPOST(options, 'editTicket', callbackClose);
    });
  }

  deleteTicket(event) {
    this.element = event.currentTarget;
    const ticketId = this.element.closest('.ticketEl').dataset.idTicket;
    const modal = document.querySelector('.deleteTicket');
    modal.classList.add('active');
    const cancelButton = document.querySelector('.cancel');
    cancelButton.addEventListener('click', modalClose);
    const confirmButton = document.querySelector('.confirm');
    confirmButton.addEventListener('click', () => {
      const options = { ticketId };
      function callback() {
        modalClose();
        Ticket.redrawTickets();
      }
      POSTTicketId(options, 'deleteTicketById', callback);
    });
  }

  static redrawTickets() {
    const callback = (data) => {
      const ticketsContainer = document.querySelector('.tickets-container');
      ticketsContainer.innerHTML = '';
      data.forEach((elem) => {
        const ticket = new Ticket(elem);
        ticket.addTicket();
      });
    };
    getAllTickets(callback);
  }
}
