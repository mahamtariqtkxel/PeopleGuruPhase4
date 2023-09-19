$.datepicker._attachments = function(input, inst) {
	var showOn, buttonText, buttonImage,
		appendText = this._get(inst, "appendText"),
		isRTL = this._get(inst, "isRTL");

	if (inst.append) {
		inst.append.remove();
	}
	if (appendText) {
		inst.append = $("<span>")
			.addClass(this._appendClass)
			.text(appendText);
		input[isRTL ? "before" : "after"](inst.append);
	}

	input.off("focus", this._showDatepicker);

	if (inst.trigger) {
		inst.trigger.remove();
	}

	showOn = this._get(inst, "showOn");
	if (showOn === "focus" || showOn === "both") { // pop-up date picker when in the marked field
		input.on("focus", this._showDatepicker);
	}
	if (showOn === "button" || showOn === "both") { // pop-up date picker when button clicked
		buttonText = this._get(inst, "buttonText");
		buttonImage = this._get(inst, "buttonImage");

		if (this._get(inst, "buttonImageOnly")) {
			inst.trigger = $("<img>")
				.addClass(this._triggerClass)
				.attr({
					src: buttonImage,
					alt: buttonText,
					title: buttonText
				});
		} else {
			inst.trigger = $("<button type='button'>")
				.addClass(this._triggerClass);
			if (buttonImage) {
				inst.trigger.html(
					$("<img>")
						.attr({
							src: buttonImage,
							alt: buttonText,
							title: buttonText
						})
				);
			} else {
				inst.trigger.html(buttonText);
			}
		}

		input[isRTL ? "before" : "after"](inst.trigger);
		inst.trigger.on("click", function () {
			if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
				$.datepicker._hideDatepicker();
			} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
				$.datepicker._hideDatepicker();
				$.datepicker._showDatepicker(input[0]);
			} else {
				$.datepicker._showDatepicker(input[0]);
			}
			return false;
		});
	}
}