var isMobile = false,
    scrollTop;
function getBrowser() {
    var ua = navigator.userAgent;
    var bName = function () {
        if (ua.search(/Edge/) > -1) return "edge";
        if (ua.search(/MSIE/) > -1) return "ie";
        if (ua.search(/Trident/) > -1) return "ie11";
        if (ua.search(/Firefox/) > -1) return "firefox";
        if (ua.search(/Opera/) > -1) return "opera";
        if (ua.search(/OPR/) > -1) return "operaWebkit";
        if (ua.search(/YaBrowser/) > -1) return "yabrowser";
        if (ua.search(/Chrome/) > -1) return "chrome";
        if (ua.search(/Safari/) > -1) return "safari";
        if (ua.search(/Maxthon/) > -1) return "maxthon";
    }();
    var version;
    switch (bName) {
        case "edge":
            version = (ua.split("Edge")[1]).split("/")[1];
            break;
        case "ie":
            version = (ua.split("MSIE ")[1]).split(";")[0];
            break;
        case "ie11":
            bName = "ie";
            version = (ua.split("; rv:")[1]).split(")")[0];
            break;
        case "firefox":
            version = ua.split("Firefox/")[1];
            break;
        case "opera":
            version = ua.split("Version/")[1];
            break;
        case "operaWebkit":
            bName = "opera";
            version = ua.split("OPR/")[1];
            break;
        case "yabrowser":
            version = (ua.split("YaBrowser/")[1]).split(" ")[0];
            break;
        case "chrome":
            version = (ua.split("Chrome/")[1]).split(" ")[0];
            break;
        case "safari":
            version = (ua.split("Version/")[1]).split(" ")[0];
            break;
        case "maxthon":
            version = ua.split("Maxthon/")[1];
            break;
    }
    var platform = 'desktop';
    if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
    var browsrObj;
    try {
        browsrObj = {
            platform: platform,
            browser: bName,
            versionFull: version,
            versionShort: version.split(".")[0]
        };
    } catch (err) {
        browsrObj = {
            platform: platform,
            browser: 'unknown',
            versionFull: 'unknown',
            versionShort: 'unknown'
        };
    }
    return browsrObj;
};
var browserYou = getBrowser();
if (browserYou.platform == 'mobile') { isMobile = true; $('.wrapper').addClass('mobile'); }
if ((browserYou.browser == 'ie' &&  browserYou.versionShort < +'9') || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < +'18') || (browserYou.browser == 'firefox' &&  browserYou.versionShort < +'30')) {
    alert('Обновите браузер','')
};
window.onload = function() {
  // PRELOADER
  var body = document.querySelector('body');
  body.classList.remove('noscroll')
  body.classList.add('loading')
  if (isMobile == true) {body.parentNode.classList.add('mobile'); }
  setTimeout(function(){body.classList.add('loaded')},1000)
  setTimeout(function(){document.querySelector('.preloader').style.display = 'none';},1800)
  // //PRELOADER
  // range
    if(document.querySelector('.range') != undefined) {
      var slider1Value = document.getElementById('range1Value'),
          sliderButtMin1 = document.querySelector('.range-min-1'),
          sliderButtPl1 = document.querySelector('.range-plus-1');
      var slider1 = document.getElementById('range1');
        noUiSlider.create(slider1, {
            start: 5000,
            animate: false,
            step:100,
            range: {
                min: 100,
                max: 10000
            },
            format: wNumb({
                decimals: 0
            })
        });
        slider1.noUiSlider.on('update', function( values, handle ){
            slider1Value.value = values[handle];
        });
        slider1Value.addEventListener('blur', function(){
            slider1.noUiSlider.set(this.value);
        });
        sliderButtMin1.addEventListener('click',function(){
            var newVal = + slider1Value.value - 100;
            slider1.noUiSlider.set(newVal);
        });
        sliderButtPl1.addEventListener('click',function(){
            var newVal = + slider1Value.value + 100;
            slider1.noUiSlider.set(newVal);
        });

        var slider2Value = document.getElementById('range2Value'),
            sliderButtMin2 = document.querySelector('.range-min-2'),
            sliderButtPl2 = document.querySelector('.range-plus-2');
        var slider2 = document.getElementById('range2');
          noUiSlider.create(slider2, {
              start: 15,
              animate: false,
              step:1,
              range: {
                  min: 1,
                  max: 30
              },
              format: wNumb({
                  decimals: 0
              })
          });
          slider2.noUiSlider.on('update', function( values, handle ){
              slider2Value.innerHTML = values[handle];
          });
          sliderButtMin2.addEventListener('click',function(){
              var newVal = + slider2Value.innerHTML - 1;
              slider2.noUiSlider.set(newVal);
          });
          sliderButtPl2.addEventListener('click',function(){
              var newVal = + slider2Value.innerHTML + 1;
              slider2.noUiSlider.set(newVal);
          });
    }
    // range
    // edit fields
    if (document.querySelector('.js_change') != undefined) {
        document.querySelector('.js_change').onclick = function() {
            var args = {};
            if (this.parentNode.classList.contains('edit-form')) {
                return validate($(this).parent(".js_validate"));
            }else {
                this.parentNode.classList.add('edit-form');
                var fieldArea = document.querySelectorAll('[disabled]');
                for (var i = 0; i < fieldArea.length; i++) {
                    console.log(fieldArea[i])
                    fieldArea[i].removeAttribute('disabled')
                    console.log(fieldArea[i])
                    fieldArea[0].focus();
                }
                return false;
             }
        }
    }
    // edit fields
    // cards
    if (document.querySelector('.bank-card') != undefined) {
        document.body.addEventListener('keydown',function(event){
            if(event.keyCode == 9) {
                event.preventDefault();
            }
        })
        // document.querySelector('.js_add_card').addEventListener('click',function(){
        //     var cloneCard = document.querySelector('.bank-card').cloneNode(true);
        //         cloneCard.classList.add('clone-card');
        //     this.parentNode.parentNode.insertBefore(cloneCard, this.parentNode);
        //     return false;
        // });
        document.querySelector('.bank-cards .block-cont').onclick = function(event) {
          if (document.querySelector('.mobile') == undefined || document.querySelector('.mobile') == null) {
              var target = event.target,
                  classField = target.classList.value,
                  cardBlock = target.closest('.bank-card'),
                  cardBlockLeft = cardBlock.firstChild.nextElementSibling;
              switch(classField) {
                    case 'n_card' :
                        numbEdit();
                        break;
                    case 'm_card' :
                        mounthEdit();
                        break;
                    case 'y_card' :
                        yearEdit();
                        break;
                    case 'cv_card' :
                        codeEdit();
                        break;
                    case 'cv_card' :
                        codeEdit();
                        break;
                    case 'visa' :
                        cardBlock.className = 'bank-card  visa-card';
                        target.className = 'visa active';
                        target.parentNode.nextElementSibling.lastElementChild.className = 'mastercard';
                        break;
                    case 'mastercard' :
                        cardBlock.className = 'bank-card  mastercard-card';
                        target.className = 'mastercard active';
                        target.parentNode.previousElementSibling.firstElementChild.className = 'visa';
                        break;

              }
              function numbEdit () {
                target.addEventListener('keyup',function(){
                    if(this.value.length == 4) {
                        this.value = this.value + '\u2003'
                    }
                    if(this.value.length == 9) {
                        this.value = this.value + '\u2003'
                    }
                    if(this.value.length == 14) {
                        this.value = this.value + '\u2003'
                    }
                    var thisArea = cardBlockLeft.children[0].children[0];
                    thisArea.innerHTML = this.value;
                });
              }
              function mounthEdit () {
                target.addEventListener('keyup',function(){
                    var thisArea = cardBlockLeft.children[0].children[1].children[0];
                    thisArea.innerText = this.value;
                });
              }
              function yearEdit () {
                target.addEventListener('keyup',function(){
                    var thisArea = cardBlockLeft.children[0].children[1].children[2];
                    thisArea.innerText = this.value;
                });
              }
              function codeEdit () {
                target.addEventListener('keyup',function(){
                    var thisArea = cardBlockLeft.children[1].lastElementChild;
                    thisArea.innerText = this.value;
                });
              }
          } 
        }
    }
    if (document.querySelector('.mobile') != undefined) {
        $('.bank-card').each(function(){
            $(this).find('.card-area:first').find('input').attr('maxlength','16');
        });
    }
    // cards
    // mobile menu
    if (document.querySelector('.mobile-menu ') != undefined) {
       document.querySelector('.hamburger--collapse').onclick = function() {
        this.classList.toggle('active');
        document.querySelector('.mobile-menu').classList.toggle('active');
        document.querySelector('body').classList.toggle('open-nav');
       } 
       document.querySelector('.close-menu').onclick = function(){
        document.querySelector('.hamburger--collapse').classList.remove('active');
        document.querySelector('.mobile-menu').classList.remove('active');
        document.querySelector('body').classList.remove('open-nav');
       }
    }
    // mobile menu

}
window.onresize = function() {

}
window.onscroll = function() {
  scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
}
$(document).ready(function() {
    $('.js_validate button[type="submit"], .js_code').on("click", function(){
      return validate($(this).parent(".js_validate"));
    }); 
    $('.js_add_card').on('click',function(){
        var cloneCard = $('.bank-card:first').clone(true);
        $(cloneCard).find('input').val('');
        $(this).parent().before(cloneCard);
        $(cloneCard).find('.bank-card__right').after('<span class="remove-card">X</span>');
        $(cloneCard).find('.bank-card__right').after('<div class="align-center clearfix"><span class="form-butt waves-effect waves-light">Сохранить карту</span></div>');
        return false;
    });
    if(isMobile == true) {
        $('.radio span').on('click',function(){
            $(this).parents('.card-area').find('span').removeClass('active');
            $(this).addClass('active');
        });
    }
    $(document).on('click','.remove-card',function(){
        $(this).parent('.bank-card').fadeOut(400);
    });
    $('select').material_select();
    $('.modal-trigger').leanModal({
        dismissible: true,
        opacity: .5, 
        starting_top: '4%', // Starting top style attribute
        ending_top: '10%', // Ending top style attribute
        ready: function() {
          $('body').addClass('open-modal');
        },
        complete: function() {
          $('body').removeClass('open-modal');
        }
    });
});
// validate form
function validate(form){
    var error_class = "error";
    var norma_class = "pass";
    var item        = form.find("[required]");
    var e           = 0;
    var reg         = undefined;
    var pass        = form.find('.password').val();
    var pass_1      = form.find('.password_1').val();
    var email       = false;
    var password    = false;
    var phone       = false;
    function mark (object, expression) {
        if (expression) {
            object.parent('div').addClass(error_class).removeClass(norma_class).find('.error_text').show();
            e++;
        } else
            object.parent('div').addClass(norma_class).removeClass(error_class).find('.error_text').hide();
    }
    form.find("[required]").each(function(){
        switch($(this).attr("data-validate")) {
            case undefined:
                mark ($(this), $.trim($(this).val()).length === 0);
            break;
            case "email":
                email = true;
                reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                mark ($(this), !reg.test($.trim($(this).val())));
                email = false;
            break;
            case "phone":
                phone = true;
                reg = /[0-9 -()+]{10}$/;
                mark ($(this), !reg.test($.trim($(this).val())));
                phone = false;
            break;
            case "pass":
                password = true;
                reg = /^[a-zA-Z0-9_-]{6,}$/;
                mark ($(this), !reg.test($.trim($(this).val())));
                password = false;
            break;
            case "pass1":
                mark ($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
            break;
            default:
                reg = new RegExp($(this).attr("data-validate"), "g");
                mark ($(this), !reg.test($.trim($(this).val())));
            break
        }
    })
    $('.js_valid_radio').each(function(){
        var inp = $(this).find('input.required');
        var rezalt = 0;
        for (var i = 0; i < inp.length; i++) {
            if ($(inp[i]).is(':checked') === true) {
                rezalt = 1;
                break;
            } else {
                rezalt = 0;
            }
        }
        if (rezalt === 0) {
           $(this).addClass(error_class).removeClass(norma_class);
            e=1;
        } else {
            $(this).addClass(norma_class).removeClass(error_class);
        }
    })
    if (e == 0) {
     return true;
    }
    else {
        form.find("."+error_class+" input:first").focus();
        return false;
    }
}
// validate form 


