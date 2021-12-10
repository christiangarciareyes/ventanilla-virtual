(function ($) {
  'use strict';

  $(document).ready(function() {
    $('.settings-panel-menu__close').on('click', function () {
      $('.settings-panel-menu').removeClass('is-opened');
    });

    $('.settings-panel-control-menu').on('click', function () {
      $('.settings-panel-menu').addClass('is-opened');
    });

    $(document).on('click', function (e) {
      if (!$(e.target).closest('.settings-panel-menu').length && !$(e.target).closest('.settings-panel-control-menu').length) {
        $('.settings-panel-menu').removeClass('is-opened');
      }
    });

    $('.js-settings-color :radio').on('click', function () {
      var parent = $(this).closest('.js-settings-color');
      var name = $(this).attr('name');

      $('.js-settings-color input[name="' + name + '"]').each(function () {
        $(this).closest('.js-settings-color').removeClass('is-checked');
      });

      parent.addClass('is-checked');

      var style = $(this).data('style');
      $('#stylesheet').attr('href', 'css/' + style + '.min.css');
    });

    $('#collapse-sidebar').on('click', function () {
      if (!$('body').hasClass('sidebar-md')) {
        $(document).trigger('collapse-sidebar');
      }
    });
  });
})(jQuery);