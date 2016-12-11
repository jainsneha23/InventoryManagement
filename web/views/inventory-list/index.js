/* global $, url */
$(function() {
  Product.init();
});

var Product = {
  init: function() {
    this.bindListeners();
    this.getList();
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
      $('#ajaxLoader').show();
      $.post(url + '/inventory/delete/' + target.attr('data-id'), function() {
        $('#ajaxLoader').hide();
        self.getList();
      });
    });
    $('#productList').on('click', '.edit', function(evt) {
      evt.preventDefault();
      $('#productModal').show();
      $('#productModal').attr('type', 'editProduct');
      $('#productModal .buttongroup button[type=submit]').text('Update');
    });
    $('.buttongroup button').on('click', function(evt) {
      evt.preventDefault();
      var target = $(evt.target);
      if (target.text() === 'Cancel') {
        self.closeModal();
      } else if (target.parents('#productModal').attr('type') === 'addProduct') {
        $('#ajaxLoader').show();
        $.post(url + '/inventory/create/?' + target.parents('form').serialize(), function() {
          $('#ajaxLoader').hide();
          self.closeModal();
          self.getList();
        });
      } else if (target.parents('#productModal').attr('type') === 'editProduct') {
        $('#ajaxLoader').show();
        $.post(url + '/inventory/update/?' + target.parents('form').serialize(), function() {
          $('#ajaxLoader').hide();
          self.closeModal();
          self.getList();
        });
      }
    });
  },
  getList: function() {
    $('#ajaxLoader').show();
    $.get(url + '/inventory', function(data) {
      $('#ajaxLoader').hide();
      $('#productList tr:nth-child(n+2)').remove();
      data.forEach(function(item) {
        var row = '';
        Object.keys(item).forEach(function(key) {
          row += '<td>' + item[key] + '</td>';
        });
        row += '<td><button class="edit">Edit</button><button class="delete" data-id="' + item.item_id + '">Delete</button></td>';
        $('#productList').append('<tr>' + row + '</tr>');
      });
    });
  },
  closeModal: function() {
    $('#productModal').hide();
    $('#productModal').removeAttr('type');
  }
};
