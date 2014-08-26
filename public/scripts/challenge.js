function Challenge (params) {
    
    this.container = $('<div class="challenge current"><div class="left_arrow"></div></div>');
    $('#main').append(this.container);
    
    this.code           = params.code;
    this.answer         = params.answer;
    this.callback       = params.callback;
    
    this.addCode();
    this.addInput();
    this.addInputListeners();
     
    this.initTimer(params);
}


Challenge.prototype.addCode = function () {
    this.container.append('<div class="challenge_code"><pre class="brush: js">' + this.code + '</pre></div>');
    SyntaxHighlighter.highlight();
};


Challenge.prototype.addInput = function (code) {
    this.answerContainer = $('<div class="answer"><div class="interro">?</div><input type="text" style="width: ' + challengeInputWidth + 'px" /><div class="button"></div><div class="clearfix"></div></div>');
    this.container.append(this.answerContainer);
    this.input = this.container.find('input');
    this.focus();
};


Challenge.prototype.addInputListeners = function () {
    var challenge = this;
    this.input.keydown(function(event) {
        challenge.updateTimer();
        if (event.keyCode === 13) {
           challenge.submitAnswer();
        }
    });
    
    this.container.find('.button').click(function() {
        challenge.submitAnswer();
    });
};



Challenge.prototype.focus = function () {
    this.input.focus();
};



function now () {
    return (new Date()).getTime();
}



//************************** TIMER **************************

Challenge.prototype.initTimer = function (params) {
    this.noTimer = params.noTimer;
    
    this.startTime = now();
    this.pauseTime = 0;
    
    if (!this.noTimer) {
        this.timeoutTime    = params.timeoutTime || 30000;
        this.keyBonusDelay  = this.timeoutTime * 0.3;
    }
    
    if (this.noTimer && (this.timerStop - now()) < this.keyBonusDelay) {
        this.launchTimer(this.keyBonusDelay);
    }
    
    if (!this.noTimer) {
        this.launchTimer();
    }
};


Challenge.prototype.launchTimer = function (delay) {
    if (this.noTimer) {
        return;
    }
    
    this.clearTimer();
    
    delay           = delay || this.timeoutTime;
    this.paused     = false;
    
    this.timerStop  = now() + delay;
    this.timerDelay = delay;
    this.running    = true;
    
    var challenge   = this;
    this.timer      = setTimeout(function () {
        challenge.tooLate();
    }, this.timerDelay);
};


Challenge.prototype.updateTimer = function () {
    if (this.noTimer && (this.timerStop - now()) < this.keyBonusDelay) {
        this.launchTimer(this.keyBonusDelay);
    }
};


Challenge.prototype.pauseTimer = function () {
    if (!this.noTimer && this.running) {
        this.clearTimer();
        this.paused         = true;
        this.pausedAt       = now();
        this.remainingTime  = this.timerStop - now();
    }
};


Challenge.prototype.unPauseTimer = function () {
    if (this.paused) {
        this.launchTimer(this.remainingTime);
        this.pauseTime += now() - this.pausedAt;
    }
};


Challenge.prototype.clearTimer = function () {
    clearTimeout(this.timer);
    this.running = false;
};






//************************** ANSWERING AND END **************************


Challenge.prototype.tooLate = function () {
    
    this.container.addClass('too_late');
    this.wasTooLate = true;
    this.afterAnswer(null, null);
};


Challenge.prototype.submitAnswer = function () {

    this.clearTimer();
    
    var userAnswer = this.input.val().replace(/^\s+|\s+$/g, '').replace(/^\'+|\'+$/g, '').replace(/^\"+|\"+$/g, '');

    var win = (userAnswer === this.answer + '');

    if (isNaN(parseInt(userAnswer, 10)) && userAnswer !== 'false' && userAnswer !== 'true') {
        userAnswer = "'" + userAnswer + "'";
    }

    if (typeof this.answer === 'string' && win) {
        userAnswer = "'" + this.answer + "'";
    }

    this.container.addClass(win ? 'win' : 'lose');
    this.afterAnswer(userAnswer, win);
};


Challenge.prototype.afterAnswer = function (userAnswer, win) {
    
    this.totalTime = now() - this.startTime - this.pauseTime;
    
    this.input.remove();
    this.container.find('.interro').remove();
    
    if (!userAnswer) {
        userAnswer = '<img src="/icons/late_gray.png" />';
    }
    
    if (typeof this.answer === 'string') {
        this.answer = "'" + this.answer + "'";
    }
    
    this.answerContainer.append('<div class="user_answer"><span>' + userAnswer + '</span>' + (win ? '' : '<img class="arrow" src="/icons/arrowfalse.png"><span class="correction">' + this.answer + '</span>') + '</div>');
    
    this.answerContainer.find('.correction').fadeIn(750);
    
    var challenge = this;
    
    setTimeout(function () {        
        challenge.answerContainer.addClass('after');
        challenge.callback(win);
    }, win ? 1000 : 1500);
};


Challenge.prototype.destroy = function () {
    this.clearTimer();
    this.container.remove();
};