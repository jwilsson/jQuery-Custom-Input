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
		return $(this).each(function () {
			if ($(this).is('[type="checkbox"],[type="radio"]') && !$(this).parent().is('[class^="custom"]')) {
				var input = $(this),
					label = $('label[for="' + input.attr("id") + '"]'); // Get the associated label using the input's id

				// Wrap the input + label in a div
				input.add(label).wrapAll('<div class="custom-' + input.attr("type") + '"></div>');

				// Bind custom event, trigger it, bind click,focus,blur events
				input.bind("updateState", function () {
					if (input.is(":checked")) {
						label.addClass("checked");
					} else {
						label.removeClass("checked checkedHover checkedFocus");
					}
				}).trigger("updateState").click(function () {
					$('input[name="' + $(this).attr('name') + '"]').trigger("updateState");
				}).focus(function () {
					label.addClass("focus");
					if (input.is(":checked")) {
						$(this).addClass("checkedFocus");
					}
				}).blur(function () {
					label.removeClass("focus checkedFocus");
				});

				// Attach disabled class to disabled input
				label.toggleClass("disabled", this.disabled);
			}
		});
	};
}(jQuery));