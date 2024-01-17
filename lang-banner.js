  var fallBackLocale = document.querySelector('[lang-banner-role=fall-back-locale]').textContent;
  var browserLanguage = navigator.language.slice(0, 2);
  var currentLocale = document.querySelector('[lang-banner-role=current-locale]').textContent;
  var currentLocalePathName = document.querySelector('[lang-banner-role=current-locale]').pathname;
  var localeList = Array.prototype.slice.call(document.querySelectorAll('[lang-banner-role=existing-locale]')).map(a => a.innerText);
  var fallBackLocalePathName = Array.prototype.slice.call(document.querySelectorAll('[lang-banner-role=existing-locale]')).find(obj => {return obj.innerText === fallBackLocale}).pathname;

  if (!sessionStorage.langBannerDismiss) {
    if (browserLanguage != currentLocale) {
      if (localeList.includes(browserLanguage) == true) {
        var goToBrowserLangBannerAttr = "[lang-banner=" + browserLanguage +"]";
        var goToBrowserLangBanner = document.querySelector(goToBrowserLangBannerAttr);
        goToBrowserLangBanner.style.display = "block";

        if (currentLocalePathName == "/") {
          var destination = "/" + browserLanguage + window.location.pathname;
        } else {
          var destination = "/" + browserLanguage + "/" + window.location.pathname.slice((currentLocalePathName.length + 1));
        }

        var goToBrowserLangButtonAttr = "[lang-button=" + browserLanguage +"]";
        var goToBrowserLangButton = document.querySelector(goToBrowserLangButtonAttr);
        goToBrowserLangButton.href = destination;
      } else {
        if (currentLocale != fallBackLocale) {
          var goToFallBackBannerAttr = "[lang-banner=" + fallBackLocale +"]";
          var goToFallBackBanner = document.querySelector(goToFallBackBannerAttr);
          goToFallBackBanner.style.display = "block";
          if (currentLocalePathName == "/") {
            var destination = fallBackLocalePathName + window.location.pathname;
          } else {
            var destination = fallBackLocalePathName + window.location.pathname.slice((currentLocalePathName.length + 1));
          }
          var goToFallBackButtonAttr = "[lang-button=" + fallBackLocale +"]";
          var goToFallBackButton = document.querySelector(goToFallBackButtonAttr);
          goToFallBackButton.href = destination;
        }
      }
    }
    var dismissButtons = document.querySelectorAll('[lang-banner-role=dismiss]');
    for(var i=0;i<dismissButtons.length;i++){
      dismissButtons[i].addEventListener("click", function(){
      	sessionStorage.langBannerDismiss = 1;
      }, false);
    }
  }   
