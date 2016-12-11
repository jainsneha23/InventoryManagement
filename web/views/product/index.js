/* global $, url */
$(function() {
  Product.init();
});

var Product = {
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
      $('#productModal').show();
      $('#productModal').attr('type', 'addProduct');
      $('#productModal .buttongroup button[type=submit]').text('Add');
    });
    $('#productList').on('click', '.delete', function(evt) {
      evt.preventDefault();
      var target = $(evt.target);
      $.post('product/delete/' + target.attr('data-id'), function() {
        self.getList();
      });
    });
    $('#productList').on('click', '.edit', function(evt) {
      evt.preventDefault();
      var target = $(evt.target);
      var row = target.parents('tr');
      $('#productModal').show();
      $('#productModal').attr('type', 'editProduct');
      $('#productModal input').val(row.find('td:eq(1)').text());
      $('#productModal select:eq(0)').val(row.find('td:eq(2)').text().toLowerCase());
      $('#productModal select:eq(1)').val(row.find('td:eq(3)').text().toLowerCase());
      $('#productModal textarea').val(row.find('td:eq(4)').text());
      $('#productModal').attr('data-id', row.find('td:eq(0)').text());
      $('#productModal .buttongroup button[type=submit]').text('Update');
    });
    $('.buttongroup button').on('click', function(evt) {
      evt.preventDefault();
      var target = $(evt.target);
      if (target.text() === 'Cancel') {
        self.closeModal();
      } else if (target.parents('#productModal').attr('type') === 'addProduct') {
        $.post('product/create/?' + target.parents('form').serialize(), function() {
          self.closeModal();
          self.getList();
        });
      } else if (target.parents('#productModal').attr('type') === 'editProduct') {
        $.post('product/update/' + target.parents('#productModal').attr('data-id'), target.parents('form').serialize(), function() {
          self.closeModal();
          self.getList();
        });
      }
    });
  },
  getList: function() {
    $.get('product', function(data) {
      $('#productList tr:nth-child(n+2)').remove();
      data.forEach(function(item) {
        var row = '';
        row += '<td>' + item.item_id + '</td>';
        row += '<td>' + item.name + '</td>';
        row += '<td>' + item.quality + '</td>';
        row += '<td>' + item.unit + '</td>';
        row += '<td>' + item.description + '</td>';
        row += '<td><button class="edit">Edit</button><button class="delete" data-id="' + item.item_id + '">Delete</button></td>';
        $('#productList').append('<tr>' + row + '</tr>');
      });
    });
  },
  closeModal: function() {
    $('#productModal').hide();
    $('#productModal').removeAttr('type');
    $('#productModal').removeAttr('data-id');
    $('#productModal form input').val('');
    $('#productModal form select').val('');
    $('#productModal form textarea').val('');
  }
};
