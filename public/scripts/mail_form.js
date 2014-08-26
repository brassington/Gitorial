
function positionMailForm () {
    var screenHeight = $(window).height();
    $('#ask_for_mail').css('top', 0.5 * (screenHeight - 300) + 'px');
}

var mailFormCallback;
var mailFormDisplayed;
var noMailForm = true;

function disableMailForm () {
    noMailForm = true;
}

function isMailFormDisabled () {
    return noMailForm || (localStorage && localStorage.githuborialMailGiven === true);
}

function showMailForm (callback) {
    mailFormCallback = callback;
    $('#ask_for_mail').fadeIn();
    mailFormDisplayed = true;
}


function registerEmail (email) {
    $.post("http://www.toxicode.fr/newsletter", { notifier_email: email , "merge_vars[STEACHER]": true}, function( data ) {
        if (localStorage) {
            localStorage.githuborialMailGiven = true;
        }
    }, "json");
}


$(function () {
    $('#ask_for_mail').click(function (e) {
        e.stopImmediatePropagation();
    });
    
    $('#ask_for_mail .cancel').click(function () {
        $('#ask_for_mail').fadeOut();
        mailFormDisplayed = false;
        if (mailFormCallback) {
            mailFormCallback();
        }
    });
    
    $('#ask_for_mail .submit').click(function () {
        var email = $('#mail_field input').val();
        if (email === '') {
            return;
        }
        $('#ask_for_mail').fadeOut();
        mailFormDisplayed = false;
        
        registerEmail(email);
        disableMailForm();
        if (mailFormCallback) {
            mailFormCallback();
        }
    });
    
});