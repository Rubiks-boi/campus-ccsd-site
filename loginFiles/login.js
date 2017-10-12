function reloadCaptcha() {
    var obj = document.getElementById('captcha');
    var src = obj.src;
    var pos = src.indexOf('?');
    if (pos >= 0) {
        src = src.substr(0, pos);
    }
    var date = new Date();
    obj.src = 'jcaptcha.jpg?t=sis&v=' + date.getTime();
    return false;
}
function toggle(type) {
    switch (type) {
        case 'username':

            var t = $('.userNameToggle').html();
            if (t === "Forgot your username?") {
                $('#usernamebox').show();
                $('.userNameToggle').html("Hide");
                $('#helpbox').hide();
                $('.helpToggle').html("Problems logging in?");
                $('#passwordbox').hide();
                $('.passwordToggle').html("Forgot your password?");

            } else if (t === "Hide") {
                $('#usernamebox').hide();
                $('.userNameToggle').html("Forgot your username?");
            }
            break;

        case 'password':

            var t = $('.passwordToggle').html();
            if (t === "Forgot your password?") {
                $('#passwordbox').show();
                $('.passwordToggle').html("Hide");
                $('#usernamebox').hide();
                $('#helpbox').hide();
                $('.helpToggle').html("Problems logging in?");
                $('.userNameToggle').html("Forgot your username?");
            } else if (t === "Hide") {
                $('#passwordbox').hide();
                $('.passwordToggle').html("Forgot your password?");
            }
            break;

        case 'problems':

            var t = $('.helpToggle').html();
            if (t === "Problems logging in?") {
                $('#helpbox').show();
                $('.helpToggle').html("Hide");
                $('#help').html();
                $('#passwordbox').hide();
                $('.passwordToggle').html("Forgot your password?");
                $('#usernamebox').hide();
                $('.userNameToggle').html("Forgot your username?");
            } else if (t === "Hide") {
                $('#helpbox').hide();
                $('.helpToggle').html("Problems logging in?");
            }
            break;

        default:
            break;
    }
}

