var menuClickDisabled = false;

function showLevelMenu (callback) {

    if (currentChallenge) {
        currentChallenge.pauseTimer();
    }
    
    positionLevelMenu();
    
    $('.blur_on_menu').addClass('blurry');
    
    
    $('#mask').fadeIn(250);
    
    $('#levels').delay(250).fadeIn(500, callback);

}

function closeLevelMenu (callback) {
    $('#mask').fadeOut(100, function () {
        $('.blur_on_menu').removeClass('blurry');
    });
    
    $('#levels').fadeOut(300, function () {
        if (currentChallenge) {
            currentChallenge.unPauseTimer();
            currentChallenge.focus();
        } 
        if (callback) {
            callback();
        }
    });
}

function updateLevelMenu (callback) {
    $('.level').removeClass('current_level');
    $('#level_' + levelID).addClass('done');
    setTimeout(function () {
        $('#level_' + levelID).css('visibility', 'visible').hide().fadeIn(500, callback);
        $('#level_' + levelID).addClass('current_level');
    }, 500);
}


function showAndUpdateMenu (callback, displayMailForm) {
    menuClickDisabled = true;
    showLevelMenu(function () {
        updateLevelMenu();
        
        setTimeout(function () {
            if (displayMailForm) {
                showMailForm(function () {
                    closeLevelMenu(callback);
                    menuClickDisabled = false;
                });
            } else {
                closeLevelMenu(callback);
                menuClickDisabled = false;
            }
        }, 1900);
        
    });
}


function initLevelMenu () {
    
    $('#show_menu').click(function () {
        showLevelMenu();
    });
    
    
    $('#levels, #mask').click(function () {
        if (!mailFormDisplayed) {
            closeLevelMenu();
        }
    });
    
    
    var levelMenu = $('#levels');
    for (var i=0; i <= steps.length; i++) {
        levelMenu.append('<div class="level ' + (i <= maxLevelID ? 'done' : '') + '" id="level_' + i + '" data-level="' + i + '"><div>');
    };
    
    $('#level_' + levelID).addClass('current_level');
    
    $('#level_' + steps.length).addClass('end_status');
    
    
    $('.level').not('.end_status').click(function (e) {
        e.stopImmediatePropagation();
        if (menuClickDisabled) {
            return;
        }
        currentChallenge.destroy();
        $('#main').html('');
        goToLevel(parseInt($(this).data('level'), 10));
        updateLevelMenu(closeLevelMenu);
    });
}


function positionLevelMenu () {
    
    var screenWidth  = $(window).width();
    var screenHeight = $(window).height();
    
    $('#levels').css({
        width:  screenWidth + 'px',
        height: screenHeight + 'px'
    });
    
    
    var stepsCount = steps.length;
    
    var centerX = 0.5 * screenWidth;
    var centerY = 0.5 * (screenHeight - (gameEnded ? 80 : 0));
    
    var maxRadius = Math.min(centerX, centerY) * 0.95;
    var minRadius = maxRadius * 0.2;
    var radiusMultiplier = 1 / Math.pow(maxRadius / minRadius, 1 / stepsCount);

    var radius = maxRadius / Math.min(0.4 + (maxLevelID / stepsCount), 1);
    
    for (var i = stepsCount; i >=0 ; i--) {
        radius *= radiusMultiplier;
        var levelRadius = radius * 0.18;
        var angle = i * 0.65;
        $('#level_' + i).css({
            top:    (centerY - levelRadius - Math.cos(angle) * (radius - levelRadius)) + 'px',
            left:   (centerX - levelRadius + Math.sin(angle) * (radius - levelRadius)) + 'px',
            width:  levelRadius * 2,
            height: levelRadius * 2
        });
    };
}
