/**
 * --------------------------------------------------------------------
 * jQuery customInput plugin
 * Author: Maggie Costello Wachs maggie@filamentgroup.com, Scott Jehl, scott@filamentgroup.com
 * Updates: Jonathan Wilsson jonathan.wilsson@gmail.com, George Walters II walterg2@gmail.com, Tomek Wytrebowicz tomalecpub@gmail.com
 * Copyright (c) 2009 Filament Group
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */
/*global jQuery, $ */
(function ($) {
	'use strict';

	$.fn.customInput = function () {
		return this.each(function () {
			var $_this = $(this),
				label;

			if ($_this.is('[type=checkbox], [type=radio]') && !$_this.parent().is('[class^=custom]')) {
				label = $('label[for=' + $_this.attr('id') + ']'); // Get the associated label using the input's id

				// Wrap the input + label in a div
				$_this.add(label).wrapAll('<div class="custom-' + $_this.attr('type') + '"></div>');

				// Bind custom event, trigger it, bind click,focus,blur events
				$_this.bind('updateState', function () {
					if ($_this.is(':checked')) {
						label.addClass('checked');
					} else {
						label.removeClass('checked checkedHover checkedFocus');
					}
				}).trigger('updateState').click(function () {
					$('input[name="' + $_this.attr('name') + '"]').trigger('updateState'); // [name] is wrapped in double quotes to work with arrays of inputs where name is "foo[]"
				}).focus(function () {
					label.addClass('focus');

					if ($_this.is(':checked')) {
						$_this.addClass('checkedFocus');
					}
				}).blur(function () {
					label.removeClass('focus checkedFocus');
				});

				// Attach disabled class to disabled input
				label.toggleClass('disabled', this.disabled);
			}
		});
	};
}(jQuery));