module.exports = class HelpDesk {
  constructor() {
    this.tickets = [
      {
        id: 1,
        title: 'Поменять краску в принтере, ком. 404',
        description: 'Чёрно-белый принтер Canon,  инвентарный номер - 564652134686100',
        status: false,
        created: 1624896752320,
      },
      {
        id: 2,
        title: 'Переустановить Windows, ПК-Hall24',
        description: '',
        status: false,
        created: 1624896753345,
      },
      {
        id: 3,
        title: 'Установить обновление КВ-XXX',
        description: 'Вышло критическое обновление, нужно поставить обновления в следующем приоритете: 1) сервера, 2) рабочие станции',
        status: true,
        created: 1624896765577,
      },
    ];
  }

  allTickets() {
    return this.tickets.map(({
      id, title, status, created,
    }) => ({
      id, title, status, created,
    }));
  }

  ticketById(id) {
    return this.tickets.find((el) => el.id === +id);
  }

  createTicket(title, description) {
    const ticketId = this.tickets.length ? this.tickets[this.tickets.length - 1].id + 1 : 1;

    this.tickets.push({
      id: ticketId,
      title,
      description,
      status: false,
      created: Date.now(),
    });
  }

  removeTicket(id) {
    const index = this.tickets.findIndex((el) => el.id === id);
    this.tickets.splice(index, 1);
  }

  changeStatus(id) {
    const ticket = this.tickets.find((el) => el.id === id);
    ticket.status = !ticket.status;
  }

  editTicket(id, title, description) {
    const ticket = this.tickets.find((el) => el.id === id);
    ticket.title = title;
    ticket.description = description;
  }
};
