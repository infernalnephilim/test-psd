$(document).ready(function () {
    $('.contact__form input').on('keyup paste autocomplete change', function (e) {
        const $this = $(e.currentTarget);
        const text = $this.val();

        if ($this.attr("type") === "text") {
            if (text === '') {
                addInvalidClass($this);
            } else {
                addValidClass($this);
                hideInputInvalidMessage($this);
            }
        } else if ($this.attr("type") === "email") {
            const mailRegExp = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i;
            if (!mailRegExp.test(text)) {
                addInvalidClass($this);
            } else {
                addValidClass($this);
                hideInputInvalidMessage($this);
            }
        } else if ($this.attr("type") === "tel") {
            const phoneRegExp = /^\+?[0-9]{3}-?[0-9]{6,12}$/;
            if (!phoneRegExp.test(text)) {
                addInvalidClass($this);
            } else {
                addValidClass($this);
                hideInputInvalidMessage($this);
            }
        }

    });

    $('#contact-submit').on('click', function (e) {
        e.preventDefault();
        console.log("Kliknales przycisk");
        const $form = $(".contact__form")[0];

        if ($form.checkValidity()) {
            console.log("POPRAWNE");
            $.post("send.php", {
                // nameV: name,
                // emailV: email,
                // textV: text
            }, function (data) {
                $('#contact-form').reset();
            });

        } else {
            console.log("niepoprawne");
            $("#contact-form input").each(function () {
                const thisInput = $(this);
                if (thisInput.hasClass("invalid")) {
                    showInputInvalidMessage(thisInput);
                }
            });

        }
    });

});

function addInvalidClass(obj) {
    obj.addClass("invalid");
    obj.removeClass("valid");
}

function addValidClass(obj) {
    obj.addClass("valid");
    obj.removeClass("invalid");
}

function showInputInvalidMessage(obj) {
    obj.next(".form__input-invalid").css("display", "block");
}

function hideInputInvalidMessage(obj) {
    obj.next(".form__input-invalid").css("display", "none");
}
