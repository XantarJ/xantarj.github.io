function drawSpacer(id, startColor, endColor) {
  var canvas = document.getElementById(id);
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var bgc = ctx.createLinearGradient(0, 0, 0, 150);
    bgc.addColorStop(0, startColor);
    bgc.addColorStop(1, endColor);
    ctx.fillStyle = bgc;
    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.quadraticCurveTo(250, -50, 500, 150);
    ctx.closePath();
    ctx.fill();
  }
}

function setScrolled() {
  if (document.scrollingElement.scrollTop > 20) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", setScrolled);

function countdown(endDate) {
  var days, hours, minutes, seconds;
  
  endDate = new Date(endDate).getTime();
  
  if (isNaN(endDate)) {
    console.error("Invalid countdown date");
	  return;
  }
  
  setInterval(calculate, 1000);
  
  function calculate() {
    var startDate = new Date();
    startDate = startDate.getTime();
    
    var timeRemaining = parseInt((endDate - startDate) / 1000);
    
    if (timeRemaining > 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = (timeRemaining % 86400);
      
      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);
      
      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);
      
      seconds = parseInt(timeRemaining);
      
      document.getElementById("site-countdown").classList.remove('hidden');
      document.getElementById("days").innerHTML = parseInt(days, 10);
      document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
      document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
      document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
    } else {
      document.getElementById("site-countdown").classList.add('hidden');
      return;
    }
  }
  calculate();
}

function scrollLinks() {
  document.querySelectorAll(".scrolling-link").forEach(function(el) {
    var elementId = el.href.split("#")[1];
    el.addEventListener("click", function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var target = document.getElementById(elementId);
      var rect = target.getBoundingClientRect();
      var scrollTop = window.pageYOffset || document.scrollingElement.scrollTop;
      var scrollTo = scrollTop + rect.y - 100;
      var diff = scrollTo - scrollTop;
      var currentTime = 0;
      var increment = 20;
      var duration = 800;
      var animateScroll = function(){        
        currentTime += increment;
        var val = easeInOutQuad(currentTime, scrollTop, diff, duration);
        window.scrollTo(0, val);
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
      }
      animateScroll();
    });
  });
}

function easeInOutQuad (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

(function () { 
  drawSpacer("site-hero-bottom-spacer", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)");
  drawSpacer("site-footer-spacer", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)");
  scrollLinks();
  setScrolled();
  countdown('11/29/2019 10:00:00'); 
}());