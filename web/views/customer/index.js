/* global $ */
$(function() {
  customer.init();
});

var customer = {
  init: function() {
    this.bindListeners();
    this.getList();
    $.ajaxSetup({
      beforeSend: function() {
        $('#ajaxLoader').show();
      },
      complete: function() {
        $('#ajaxLoader').hide();
      }
    });
  },
  bindListeners: function() {
    var self = this;
    $('#addProduct').on('click', function() {
      $('#customerModal').show();
      $('#customerModal').attr('type', 'addProduct');
      $('#customerModal .buttongroup button[type=submit]').text('Add');
    });
    $('#customerList').on('click', '.delete', function(evt) {
      evt.preventDefault();
      var target = $(evt.target);
      $.post('/customer/delete/' + target.attr('data-id'), function() {
        self.getList();
      });
    });
    $('#customerList').on('click', '.edit', function(evt) {
      evt.preventDefault();
      var target = $(evt.target);
      var row = target.parents('tr');
      $('#customerModal').show();
      $('#customerModal').attr('type', 'editProduct');
      $('#customerModal input').val(row.find('td:eq(1)').text());
      $('#customerModal select:eq(0)').val(row.find('td:eq(2)').text().toLowerCase());
      $('#customerModal select:eq(1)').val(row.find('td:eq(3)').text().toLowerCase());
      $('#customerModal textarea').val(row.find('td:eq(4)').text());
      $('#customerModal').attr('data-id', row.find('td:eq(0)').text());
      $('#customerModal .buttongroup button[type=submit]').text('Update');
    });
    $('.buttongroup button').on('click', function(evt) {
      evt.preventDefault();
      var target = $(evt.target);
      if (target.text() === 'Cancel') {
        self.closeModal();
      } else if (target.parents('#customerModal').attr('type') === 'addProduct') {
        $.post('/customer/create/' , target.parents('form').serialize(), function() {
          self.closeModal();
          self.getList();
        });
      } else if (target.parents('#customerModal').attr('type') === 'editProduct') {
        $.post('/customer/update/' + target.parents('#customerModal').attr('data-id'), target.parents('form').serialize(), function() {
          self.closeModal();
          self.getList();
        });
      }
    });
  },
  getList: function() {
    $.get('/customer', function(data) {
      $('#customerList tr:nth-child(n+2)').remove();
      data.forEach(function(item) {
        var row = '';
        row += '<td>' + item.customer_id + '</td>';
        row += '<td>' + item.name + '</td>';
        row += '<td>' + item.phone + '</td>';
        row += '<td>' + item.email + '</td>';
        row += '<td>' + item.company + '</td>';
        row += '<td>' + item.pan + '</td>';
        row += '<td>' + item.city + '</td>';
        row += '<td>' + item.address + '</td>';
        row += '<td>' + item.description + '</td>';
        row += '<td class="center"><button class="edit"></button><button class="delete" data-id="' + item.customer_id + '"></button></td>';
        $('#customerList').append('<tr>' + row + '</tr>');
      });
    });
  },
  closeModal: function() {
    $('#customerModal').hide();
    $('#customerModal').removeAttr('type');
    $('#customerModal').removeAttr('data-id');
    $('#customerModal form input').val('');
    $('#customerModal form textarea').val('');
  }
};
