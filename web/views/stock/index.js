/* global $ */
$(function() {
  stock.init();
});

var stock = {
  init: function() {
    $.ajaxSetup({
      beforeSend: function() {
        $('#ajaxLoader').show();
      },
      complete: function() {
        $('#ajaxLoader').hide();
      }
    });
    this.getList();
  },
  getList: function() {
    $.get('/stock', function(data) {
      $('#stockList tr:nth-child(n+2)').remove();
      data.forEach(function(item) {
        var row = '';
        row += '<td>' + item.item_name + '</td>';
        row += '<td>' + item.quantity + '</td>';
        $('#stockList').append('<tr>' + row + '</tr>');
      });
    });
  }
};
