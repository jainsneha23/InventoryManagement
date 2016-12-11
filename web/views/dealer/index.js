/* global $, url */
$(function() {
  Dealer.init();
});

var Dealer = {
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
      $('#dealerModal').show();
      $('#dealerModal').attr('type', 'addProduct');
      $('#dealerModal .buttongroup button[type=submit]').text('Add');
    });
    $('#dealerList').on('click', '.delete', function(evt) {
      evt.preventDefault();
      var target = $(evt.target);
      $.post('/dealer/delete/' + target.attr('data-id'), function() {
        self.getList();
      });
    });
    $('#dealerList').on('click', '.edit', function(evt) {
      evt.preventDefault();
      var target = $(evt.target);
      var row = target.parents('tr');
      $('#dealerModal').show();
      $('#dealerModal').attr('type', 'editProduct');
      $('#dealerModal input').val(row.find('td:eq(1)').text());
      $('#dealerModal select:eq(0)').val(row.find('td:eq(2)').text().toLowerCase());
      $('#dealerModal select:eq(1)').val(row.find('td:eq(3)').text().toLowerCase());
      $('#dealerModal textarea').val(row.find('td:eq(4)').text());
      $('#dealerModal').attr('data-id', row.find('td:eq(0)').text());
      $('#dealerModal .buttongroup button[type=submit]').text('Update');
    });
    $('.buttongroup button').on('click', function(evt) {
      evt.preventDefault();
      var target = $(evt.target);
      if (target.text() === 'Cancel') {
        self.closeModal();
      } else if (target.parents('#dealerModal').attr('type') === 'addProduct') {
        $.post('/dealer/create/' , target.parents('form').serialize(), function() {
          self.closeModal();
          self.getList();
        });
      } else if (target.parents('#dealerModal').attr('type') === 'editProduct') {
        $.post('/dealer/update/' + target.parents('#dealerModal').attr('data-id'), target.parents('form').serialize(), function() {
          self.closeModal();
          self.getList();
        });
      }
    });
  },
  getList: function() {
    $.get('/dealer', function(data) {
      $('#dealerList tr:nth-child(n+2)').remove();
      data.forEach(function(item) {
        var row = '';
        row += '<td>' + item.dealer_id + '</td>';
        row += '<td>' + item.name + '</td>';
        row += '<td>' + item.phone + '</td>';
        row += '<td>' + item.email + '</td>';
        row += '<td>' + item.city + '</td>';
        row += '<td>' + item.address + '</td>';
        row += '<td><button class="edit">Edit</button><button class="delete" data-id="' + item.dealer_id + '">Delete</button></td>';
        $('#dealerList').append('<tr>' + row + '</tr>');
      });
    });
  },
  closeModal: function() {
    $('#dealerModal').hide();
    $('#dealerModal').removeAttr('type');
    $('#dealerModal').removeAttr('data-id');
    $('#dealerModal form input').val('');
    $('#dealerModal form textarea').val('');
  }
};
