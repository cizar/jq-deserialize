;(function(root, undefined) {

  'use strict';

  var $ = root.jQuery;
  if ('undefined' === typeof $) {
    if ('undefined' === typeof require) {
      throw new Error('The plugin "' + pluginName + '" requires jQuery');
    }
    $ = require('jquery');
  }

  var qs = root.querystring;
  if ('undefined' === typeof $) {
    if ('undefined' === typeof require) {
      throw new Error('The plugin "' + pluginName + '" requires querystring');
    }
    $ = require('querystring');
  }

  var pluginName = 'deserialize';

  $.fn[pluginName] = function(data, reset) {
    if ('string' === typeof data) {
      data = qs.parse(data);
    }
    return this.each(function() {
      var form = this;
      if (reset) form.reset();
      $.each(data, function(name, value) {
        $('[name="' + name + '"]', form).each(function() {
          var $field = $(this);
          if ($field.is(':checkbox')) {
            $field.prop('checked', function() {
              return $.isArray(value) ? $.inArray(this.value, value) > -1 : 'on' === value || this.value === value;
            });
          } else if ($field.is(':radio')) {
            $field.prop('checked', function() {
              return this.value === value;
            });
          } else {
            $field.val(value);
          }
          $field.trigger('change');
        });
      });
    });
  };

}(this));
