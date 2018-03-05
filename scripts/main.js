$(function(){
    // flip card;
    function flipCard(){
        const $front = $('.front'),
              $back = $('.back');
        $($front).addClass('flip-front');
        $($back).addClass('flip-back');
        setTimeout(function(){
            $('.card-security-digits').addClass('security-num-background');
        }, 500);
    }
    // show front card or ignore if already visible;
    function showFrontCard(e){
        const $el = $('.card-security-digits');
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
    
    $(window).on('click', showFrontCard);
    // click on CVV security code;
    $("input[name='security-cvv']").on('click', flipCard);
});