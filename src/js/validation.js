$(document).ready(function () {
    $('.contact__form input').on('keyup paste autocomplete change', function (e) {
        const $this = $(e.currentTarget);
        const text = $this.val();
        checkData($this, text);
    });

    $('#contact-submit').on('click', function (e) {
        e.preventDefault();
        console.log("Kliknales przycisk");
        const $form = $(".contact__form")[0];

        if ($form.checkValidity() && $('.contact__form input[type="tel"]').hasClass("valid")) {
            console.log("POPRAWNE");
            const name = $('.contact__form input[name="name"]').val();
            const surname = $('.contact__form input[name="surname"]').val();
            const telephone = $('.contact__form input[name="telephone"]').val();
            const email = $('.contact__form input[name="email"]').val();
            console.log(email);
            $.post("send.php", {
                name: name,
                surname: surname,
                telephone: telephone,
                email: email
            }, function (data) {
                $('#contact-form').reset();
            });

        } else {
            console.log("niepoprawne");
            $("#contact-form input").each(function () {
                const thisInput = $(this);
                checkData(thisInput, thisInput.val());
                if (thisInput.hasClass("invalid")) {
                    showInputInvalidMessage(thisInput);
                }
            });
        }
    });
});

function checkData(thisInput, text){
    if (thisInput.attr("type") === "text") {
        if (text === '') {
            addInvalidClass(thisInput);
        } else {
            addValidClass(thisInput);
            hideInputInvalidMessage(thisInput);
        }
    } else if (thisInput.attr("type") === "email") {
        const mailRegExp = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i;
        if (!mailRegExp.test(text)) {
            addInvalidClass(thisInput);
        } else {
            addValidClass(thisInput);
            hideInputInvalidMessage(thisInput);
        }
    } else if (thisInput.attr("type") === "tel") {
        const phoneRegExp = /^\+?[0-9]{3}-?[0-9]{6,12}$/;
        if (!phoneRegExp.test(text)) {
            addInvalidClass(thisInput);
        } else {
            addValidClass(thisInput);
            hideInputInvalidMessage(thisInput);
        }
    } else if(thisInput.attr("type") === "checkbox"){
        if(thisInput.is(':checked')) {
            $(".form__input-invalid--checkbox").css("display", "none");
        } else{
            $(".form__input-invalid--checkbox").css("display", "block");
        }
    }
}

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
