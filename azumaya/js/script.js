// mainスライドショー
// $(function(){
//   $('.main').vegas({ //背景画像でスライドショーしたい場所の設定
//     slides: [
//     { src: 'img/oyakobenntou.jpg' }, //スライドする画像を配列で設定
//     { src: 'img/tukigawari.jpg' },
//     { src: 'img/minikaiseki.jpg' },
//     { src: 'img/hirekatubentou.jpg' },
//     { src: 'img/sute-kibanntou.jpg' },
//     { src: 'img/sashimibentou.jpg' },
//     { src: 'img/ranchideza-to.jpg' },
//     { src: 'img/sashimimoriawase.jpg' },
//     { src: 'img/tanpinsute-ki.jpg' },
//     { src: 'img/tennpuramoriawase.jpg' }
//     ],
//      delay: 5000, //スライドまでの時間ををミリ秒単位で設定
//      animation: 'random', //スライドのアニメーションを設定
//      transition: 'blur', //スライド間のエフェクトを設定
//      transitionDuration: 3000 //エフェクト時間をミリ秒単位で設定
//   });
// });

// navmenu
$(function() {
  // ページtop戻る
  $('.home').click(function(){
      $('html, body').animate({
      'scrollTop':0
      },800);
      $('.frame').slideDown(2000);
      $('.main22').hide();
      $('.commitment-f').hide();
      $('.info').show();
    $('.contact').show();
    $('.souvenir').show();
    });
  // お料理・お飲み物表示,他ページ非表示
  $('.food').click(function() {
    $('.frame').hide();
    $('.commitment-f').hide();
    $('.info').hide();
    $('.contact').hide();
    $('.souvenir').hide();
    $('.main22').fadeIn(2000);
  });
  // 店舗案内(photosection1までスクロール)
  $('.info').click(function() {
    var id = $(this).attr('href');
    var position = $(id).offset().top;
    $('html, body').animate({
        'scrollTop':position
      },800);
  });
  // こだわり表示,他非表示
  $('.commitment').click(function() {
    $('.frame').hide();
    $('.main22').hide();
    $('.info').hide();
    $('.contact').hide();
    $('.souvenir').hide();
    $('.commitment-f').fadeIn(2000);
  });
  // ご予約
  // $('#login-show').click(function() {
  //   $('#login-modal').fadeIn();
  // });
  // $('#close-modal').click(function() {
  //   $('#login-modal').hide();
  // });   
  // お問い合わせ
  $('.contact').click(function() {
    var id = $(this).attr('href');
    var position = $(id).offset().top;
    $('html, body').animate({
        'scrollTop':position
      },800);
  });
  // お土産プリンまでスクロール(photosection4までスクロール)
  $('.souvenir').click(function() {
    var id = $(this).attr('href');
    var position = $(id).offset().top;
    $('html, body').animate({
        'scrollTop':position
      },800);
    $('.frame').slideDown(2000);
    $('.main22').hide();
    $('.commitment-f').hide();
  });
});

// mainランチメニュー切り替え
$(function() {
  function toggleChangeBtn() {
    var slideIndex = $('.slide').index($('.active'));
    $('.change-btn').show();
    if (slideIndex == 0) {
      $('.prev-btn').hide();
    } else if (slideIndex == $('.slide').length-1) {
      $('.next-btn').hide();
    }
  }
  $('.index-btn').click(function() {
    $('.active').removeClass('active');
    var clickedIndex = $('.index-btn').index($(this));
    $('.slide').eq(clickedIndex).addClass('active');
    toggleChangeBtn();
  });  
  $('.change-btn').click(function() {
    var $displaySlide = $('.active');
    $displaySlide.removeClass('active');
    if ($(this).hasClass('next-btn')) {
      $displaySlide.next().addClass('active');
    } else {
      $displaySlide.prev().addClass('active');
    }
    toggleChangeBtn();
  });
});

// mainディナーメニュー切り替え
$(function() {
  function toggleChangeBtn() {
    var slideIndex = $('.slide2').index($('.active2'));
    $('.change-btn2').show();
    if (slideIndex == 0) {
      $('.prev-btn2').hide();
    } else if (slideIndex == $('.slide2').length-1) {
      $('.next-btn2').hide();
    }
  }
  $('.index-btn2').click(function() {
    $('.active2').removeClass('active2');
    var clickedIndex = $('.index-btn2').index($(this));
    $('.slide2').eq(clickedIndex).addClass('active2');
    toggleChangeBtn();
  });
  $('.change-btn2').click(function() {
    var $displaySlide = $('.active2');
    $displaySlide.removeClass('active2');
    if ($(this).hasClass('next-btn2')) {
      $displaySlide.next().addClass('active2');
    } else {
      $displaySlide.prev().addClass('active2');
    }
    toggleChangeBtn();
  });
});

// main2
  // ランチメニュー切替え
$(function(){
  $('.action-btn').click(function() {
    $('.show').removeClass('show');
    var clickedIndex = $('.action-btn').index($(this));
    $('.action').eq(clickedIndex).addClass('show');
  });
  // ディナーメニュー切り替え
  $('.action-btn2').click(function() {
    $('.show2').removeClass('show2');
    var clickedIndex = $('.action-btn2').index($(this));
    $('.slide-curce').eq(clickedIndex).addClass('show2');
  });
});
  // 一品料理切り替え 
$(function() {
  function toggleChangeBtn() {
    var slideIndex = $('.slide3').index($('.active3'));
    $('.change-btn3').show();
    if (slideIndex == 0) {
      $('.prev-btn3').hide();
    } else if (slideIndex == $('.slide3').length-1) {
      $('.next-btn3').hide();
    }
  }
  $('.change-btn3').click(function() {
    $('.change-btn3').css({'display':'inline-block'});
    var $displaySlide = $('.active3');
    $displaySlide.removeClass('active3');
    if ($(this).hasClass('next-btn3')) {
      $displaySlide.next().addClass('active3');
    } else {
      $displaySlide.prev().addClass('active3');
    }
    toggleChangeBtn();
  });
 });
  // デザート切り替え 
// $(function() {
//   function toggleChangeBtn() {
//     var slideIndex = $('.slide4').index($('.active4'));
//     $('.change-btn4').show();
//     if (slideIndex == 0) {
//       $('.prev-btn4').hide();
//     } else if (slideIndex == $('.slide4').length-1) {
//       $('.next-btn4').hide();
//     }
//   }
//   $('.change-btn4').click(function() {
//     var $displaySlide = $('.active4');
//     $displaySlide.removeClass('active4');
//     if ($(this).hasClass('next-btn4')) {
//       $displaySlide.next().addClass('active4');
//     } else {
//       $displaySlide.prev().addClass('active4');
//     }
//     toggleChangeBtn();
//   });
// });

  // ドリンクアコーディオン
$(function(){
  $('.faq-list-item').click(function() {
    var $action3 = $(this).find('.action3');
    if($action3.hasClass('open')) { 
      $action3.removeClass('open');
      // $answerを隠す
      $action3.fadeOut(500);
      $(this).find('i').css({'color':'#CC0000'});
    } else {
      $action3.addClass('open'); 
      // $answerを表示
      $action3.fadeIn(1500);
      $(this).find('i').css({'color':'#003399'}); 
    }
  });
});

// maxwidth640px 

$(function(){
  $(".fa-bars").on("click", function(){
      // ハンバーガーメニューの位置を設定
      var topVal = 119;
      if($(this).hasClass("open")) {
          // 位置を移動させメニューを開いた状態にする
          topVal = 0;
          // メニューを開いたら次回クリック時は閉じた状態になるよう設定
          $(this).removeClass("open");
      } else {
          // メニューを開いたら次回クリック時は閉じた状態になるよう設定
          $(this).addClass("open");
      }

      $(".nav").stop().animate({
          top: topVal
      }, 200);

  });
});
/* resonsiveslide */
$(function() {
  function toggleChangeBtn() {
    var slideIndex = $('.photo3').index($('.active5'));
    $('.change-btn5').show();
    if (slideIndex == 0) {
      $('.prev-btn5').hide();
    } else if (slideIndex == $('.photo3').length-1) {
      $('.next-btn5').hide();
    }
  }
  $('.change-btn5').click(function() {
    var $displaySlide = $('.active5');
    $displaySlide.removeClass('active5');
    if ($(this).hasClass('next-btn5')) {
      $displaySlide.next().addClass('active5');
    } else {
      $displaySlide.prev().addClass('active5');
    }
    toggleChangeBtn();
  });
 });







