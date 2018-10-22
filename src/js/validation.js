$(document).ready(function () {
    $('.contact__form input').on('keyup paste autocomplete change', (e) => {
        const $this = $(e.currentTarget);
        const text = $this.val();

        if ($this.attr("type") === "text") {
            if (text === '') {
                $this.addClass("invalid");
                $this.removeClass("valid");
            } else {
                $this.removeClass("invalid");
                $this.addClass("valid");
            }
        } else if ($this.attr("type") === "email") {
            const mailRegExp = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i;
            if (!mailRegExp.test(text)) {
                $this.addClass("invalid");
                $this.removeClass("valid");
            } else{
                $this.removeClass("invalid");
                $this.addClass("valid");
            }
        } else if ($this.attr("type") === "tel") {
            const phoneRegExp = /^\+?[0-9]{3}-?[0-9]{6,12}$/;
            if (!phoneRegExp.test(text)) {
                $this.addClass("invalid");
                $this.removeClass("valid");
            } else{
                $this.removeClass("invalid");
                $this.addClass("valid");
            }
        }

    });

    $('#contact-submit').on('click', (e) => {
        e.preventDefault();
        console.log("Kliknales przycisk");
        const $form = $(".contact__form")[0];

        if (!$form.checkValidity() ) {
            console.log("niepoprawne");
        } else{
            console.log("POPRAWNE");
            $.post("send.php", {
                // nameV: name,
                // emailV: email,
                // textV: text
            }, function (data) {
                $('#contact-form').reset();
            });
        }
    });

});
