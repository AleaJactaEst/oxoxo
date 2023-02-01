$(document).ready(function() {
	$("i.fa").click(function() {
		$("ul.menu").slideToggle("fast");
	});
	var imgHead = [
            'img/me11.jpg',
            'img/me66.jpg',
            'img/me44.jpg',
            'img/me77.jpg',
            'img/me33.jpg',
        ], 
        i=1;
    function csaHead(){
        if(i > (imgHead.length-1)){
            $('.me').animate({'opacity':'0.4'},100,function(){
                i=1;
                $('.me').css({'background':'url('+imgHead[0]+')','background-size':'cover'});
            });
            $('.me').animate({'opacity':'1'},100);
        }else{
            $('.me').animate({'opacity':'0.4'},100,function(){
                $('.me').css({'background':'url('+imgHead[i]+')','background-size':'cover'});
                i++;
            });
            $('.me').animate({'opacity':'1'},100);
        }
         
    }
    var intervalCsaHead = setInterval(csaHead,4000);


  	$(".menu").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});
    setInterval(function(){
        $('.fa-map-marker').toggleClass("animated bounce");
    },2000);
     setInterval(function(){
        $('.fa-mobile').toggleClass("animated tada");
    },1000);
      setInterval(function(){
        $('.fa-envelope').toggleClass("animated wobble");
    },2000);
       $(window).scroll(function() {

        $('.prof-box').each(function(){
            var that=$(this);

          if (that.offset().top < $(window).scrollTop()+400) {
            if(that.hasClass("htm")){
                that.parent().addClass("animated fadeInLeftBig");
            }
            if(that.hasClass("js")){
                that.parent().addClass("animated fadeInUpBig");
            }
            if(that.hasClass("lb")){
                that.parent().addClass("animated fadeInRightBig");
            }
          
          }
        });
          $('#education .container').each(function(){
            var that=$(this);
          if (that.offset().top < $(window).scrollTop()+400) {
            if(that.index()==2){
                that.addClass("animated fadeInRight");
            }else{
                that.addClass("animated fadeInLeft");
                }
            }
          
        });
      });
       $("form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            alert("Thank you, message has been sent");
        });
        return false;
    });

});