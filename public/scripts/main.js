SyntaxHighlighter.defaults['gutter']   = false;
SyntaxHighlighter.defaults['toolbar']  = false;
SyntaxHighlighter.defaults['tab-size'] = 4;


var challengeInputWidth = 0;
function onResize () {
    var height = $(window).height();
    challengeInputWidth = $('.challenge.current').innerWidth() - 133;
    $('.challenge input').css('width', challengeInputWidth + 'px');
    
    var teacherHeight = height < 760 ? height * 0.9 : 712;
    
    $('#teacher').css('height', teacherHeight + 'px');
    
    $('#teacher').css('margin-top', 0.5 * (height - teacherHeight) + 'px');
    positionLevelMenu();
    positionMailForm();
}


function addEndMessage () {
    $('#levels .end').fadeIn(800);
    $('#levels .end .errors_count').html(errorsCount);
}

function end () {
    gameEnded = true;
    levelID = steps.length;
    showLevelMenu(function () {
        updateLevelMenu(addEndMessage);
    });
}


function goToLevel (newLevelID) {    
    levelID       = newLevelID;
    subLevelID    = 0;
    tmpSubLevelID = 0;
    
    if (localStorage) {
        localStorage.githuborialLevel = levelID;
    }
    
    setCurrentSubLevels();
    nextChallenge();
}


function nextLevel () {
    
    newLevelID = levelID + 1;
    
    if (newLevelID > maxLevelID && localStorage) {
        maxLevelID = newLevelID;
        localStorage.githuborialMaxLevel = maxLevelID;
        localStorage.githuborialLevel    = maxLevelID;
    }
    
    if (newLevelID >= steps.length) {
        end();
    } else {
        var askMail = (newLevelID === 6 || newLevelID === steps.length - 1) && !isMailFormDisabled();
        setTimeout(function () {
            levelID = newLevelID;
            showAndUpdateMenu(function () {
                setTimeout(function () {
                    goToLevel(newLevelID);
                    if (newLevelID > 4 || newLevelID === steps.length - 1) {
                        $('#show_menu').show();
                    }
                }, 1000);
            }, askMail);
        }, 800);
    }
    
}


function chooseNextChallengeAfterWin () {
    if (tmpSubLevelID === subLevelID) {
        if (currentSubLevel.times > 1) {
            currentSubLevel.times -= 1;
        } else {
            subLevelID += 1;
            tmpSubLevelID = subLevelID;
        }
    } else {
        tmpSubLevelID = subLevelID;
    }
}

function chooseNextChallengeAfterLose () {
    if (currentTmpSubLevel.errorExpected) {
        currentTmpSubLevel.errorExpected = false;
    } else {
        currentTmpSubLevel.errors += 1;
        currentTmpSubLevel.times = Math.min(3, currentSubLevel.times + 1);
        if (tmpSubLevelID > 0 && currentTmpSubLevel.errors > 1) {
            tmpSubLevelID = Math.floor(Math.random() * (tmpSubLevelID - 1));
        }
    }
}


var currentSubLevel;
var currentTmpSubLevel;

function setCurrentSubLevels () {
    currentTmpSubLevel  = steps[levelID][tmpSubLevelID];
    currentSubLevel     = steps[levelID][subLevelID];
}

function recordError () {
    errorsCount += 1;
    if (localStorage) {
        localStorage.githuborialErrors = errorsCount;
    }
}

var tooLateCounter = 0;

function nextChallenge (result) {
    var bottomSpace = $('body').outerHeight() - $(window).scrollTop() - $(window).height();
    
    if (currentChallenge && currentChallenge.wasTooLate) {
        tooLateCounter += 1;
    } else {
        tooLateCounter = 0;
    }
    
    currentTmpSubLevel.times  = currentTmpSubLevel.times  || 1;
    currentTmpSubLevel.errors = currentTmpSubLevel.errors || 0;
    
    if (result) {
        chooseNextChallengeAfterWin();
    } else if (result === false) {
        recordError();
        chooseNextChallengeAfterLose();
    }
    
    $('.current').removeClass('current');
    
    if (subLevelID >= steps[levelID].length) {
        nextLevel();
        return;
    }
    
    setCurrentSubLevels();
    
    var code   = currentTmpSubLevel.f();
    var answer = eval(code);
    
    currentChallenge = new Challenge({
        code:           code,
        answer:         answer,
        callback:       nextChallenge,
        noTimer:        (tooLateCounter >= 1), 
        timeoutTime:    currentTmpSubLevel.timeoutTime
    });
    
    $(window).scrollTop($('body').outerHeight() - bottomSpace - $(window).height());
}


function reset () {
    if (!localStorage) {
        return;
    }
    delete localStorage.githuborialMaxLevel;
    delete localStorage.githuborialLevel;
    delete localStorage.githuborialErrors;
}


var currentChallenge;

var levelID;
var maxLevelID  = 0;
var errorsCount = 0;
var gameEnded   = false;

if (localStorage && typeof localStorage.githuborialErrors !== 'undefined') {
    errorsCount = parseInt(localStorage.githuborialErrors, 10);
}

if (localStorage && typeof localStorage.githuborialMaxLevel !== 'undefined') {
    maxLevelID = parseInt(localStorage.githuborialMaxLevel, 10);
}

if (localStorage && typeof localStorage.githuborialLevel !== 'undefined') {
    levelID = parseInt(localStorage.githuborialLevel, 10);
} else {
    levelID = maxLevelID;
}


maxLevelID = Math.min(maxLevelID, steps.length - 1);
levelID    = Math.min(maxLevelID, levelID);


var subLevelID;
var tmpSubLevelID;

$(function() {
    initLevelMenu();
    
    if (maxLevelID > 4 || maxLevelID === steps.length - 1) {
        $('#show_menu').show();
    }
    
    if (levelID === steps.length - 1) {
        $('.end_status').addClass('done');
        gameEnded = true;
        addEndMessage();
    }
    
    onResize();
    $(window).on('resize', onResize);
    
    $('#teacher').on('mousedown', function (e) {
        e.preventDefault();
    });
    
    $('#welcome').click(function () {
        $(this).fadeOut(500);
        
        goToLevel(levelID);
        onResize();
    });
});