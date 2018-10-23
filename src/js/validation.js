$(document).ready(function () {
    $('.contact__form input').on('keyup paste autocomplete change', function (e) {
        const $this = $(e.currentTarget);
        const text = $this.val();
        checkData($this, text);
    });

    $('#contact-submit').on('click', function (e) {
        e.preventDefault();
        const $form = $('#contact-form')[0];

        if ($form.checkValidity() && $('.contact__form input[type="tel"]').hasClass("valid")) {
            console.log("POPRAWNE");
            const name = $('#contact-form input[name="name"]').val();
            const surname = $('#contact-form input[name="surname"]').val();
            const telephone = $('#contact-form input[name="telephone"]').val();
            const email = $('#contact-form input[name="email"]').val();
            console.log(name);
            console.log(surname);
            console.log(telephone);
            console.log(email);
            $.post("send.php", {
                nameV: name,
                surnameV: surname,
                telephoneV: telephone,
                emailV: email
            }, function (data) {
                $('#contact-form')[0].reset();
                $('#contact-form input').each(function () {
                    const thisInput = $(this);
                    thisInput.removeClass("valid");
                });
                $('.form__message').css("display", "block");
                setTimeout(function(){
                    $('.form__message').css("display", "none");
                }, 6000);
            });

        } else {
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
