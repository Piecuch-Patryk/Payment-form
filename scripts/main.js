$(function(){
    // *** flip card ***
    function showBackCard(e){
        const $front = $('.front'),
              $back = $('.back');
        $($front).addClass('flip-front');
        $($back).addClass('flip-back');
        setTimeout(function(){
            $('.security-cvv').addClass('security-num-background');
        }, 500);
    }
    // show front card or ignore if already visible;
    function showFrontCard(e){
        const $el = $('.security-cvv');
        if ($($el).hasClass('security-num-background')){
            $($el).removeClass('security-num-background');
            $('.front').removeClass('flip-front');
            $('.back').removeClass('flip-back');
            return;
        }else {
            e.preventDefault();
            return;
        }
    }
    /*
    *   change html content every time after keydown event;
    */
    function changeHtml(e){
        const $currentName = $(e.target).attr('name');
        $('.' + $currentName).html($(e.target).val());
    }
    // *** indicate active input element ***
    function indicateEl(e){
        const $currentName = $(e.target).attr('name');
        // get current name attribute use it to find el by class;
        $('.' + $currentName).addClass('indicated-el-background');
        // listen for key press event;
        $(this).on('keyup', replaceContent);
        setTimeout(function(){
            $('.' + $currentName).removeClass('indicated-el-background');
        }, 1000);
    }
    // fix card number input;
    function fixCardNumber(){
        const $el = ("input[name='card-num']"),
              $elToChange = $('.card-num'),
              digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let $str = $($el).val();
        let $newStr = [];
        
        $str = $str.split('');
        // do not allow more than 16 digits;
        if ($str.length >= 16){
            // remove last digit from input;
            $str.splice(-1, 1);
            $str = $str.join('');
            // update input value;
            $($el).val($str);
        }else {
            // only digits allowed;
            for (let i = 0; i < $str.length; i++){
                for (let j = 0; j < digits.length; j++){
                    if ($str[i] == digits[j]){
                        $newStr.push($str[i]);
                    }
                }
            }
            $newStr = $newStr.join('');
            // upload card content and input value only with digits;
            $($elToChange).html($newStr);
            $($el).val($newStr);
        }
    }
    // *** get expiry date ***
    function getExpiryDay(){
        const $currentVal = $(this).val();
        console.log();
    }
    function getExpiryMonth(e){
        console.log(this.value);
    }
    
    // Change content in chosen section;
    function replaceContent(e){
        const $currentName = $(e.target).attr('name'),
              key = e.which;
        // card number;
        if ($currentName === 'card-num'){
            if ($currentName === 'card-num'){
                if ((key > 47 && key < 57) || key == 8 || key == 127 || key == 37 || key == 39){
                    // fixed issue with keyup event; prevent default does not work;
                    fixCardNumber();
                }else {
                    fixCardNumber();
                }
            }
        }
    }
    
    $(window).on('click', showFrontCard);
    // click on any input, except security code input;
    $(".card-inputs input:not([name='security-cvv'])").on('click', indicateEl);
    // click on expiry date inputs;
    $(".expiry-day").on('click', getExpiryDay);
    $(".expiry-month").on('click', getExpiryMonth);
    // click on CVV security code;
    $("input[name='security-cvv']").on('click', showBackCard);
});