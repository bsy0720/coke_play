$(function(){

/**
 * @헤더픽스메뉴
 */

 $(window).scroll(function(){
   curr = $(window).scrollTop();
   if(curr >= 64){
     $('.header').addClass('fixed');
   }else{
     $('.header').removeClass('fixed');
   }
 })


/**
 * @메인슬라이드
 * 
 */
const mainSlide = new Swiper('.sc-slide .swiper',{
  loop:true,
  autoplay:{
    delay:3300,
    disableOnInteraction: true,
  },
  pagination:{
    el:'.fraction',
    type:"fraction"
  },
})

/**
 * @메뉴슬라이드
 * 
 */

  const menuSlide = new Swiper('.sc-menu .swiper',{
    slidesPerView:4, 
    navigation:{
      prevEl:'.swiper-button-prev ',
      nextEl:'.swiper-button-next'
    }
  })





/**
 * @데이터
 */
list(1,"#list1")
list(2,"#list2")
list(3,"#list3")
list(4,"#list4")

function list(sortNum,frame){
  fetch('./assets/data/productData.json')
  .then((response)=> response.json())
  .then((json)=>{
    allData = json.items;
    var result = allData.filter(function (parm) {
        return parm['sort'].indexOf(sortNum) >= 0;
    }); //선별된데이터


    let html='';
    result.forEach(element => {

      discountEl = (element.snippet.price.discount)? `<span class="discount">${element.snippet.price.discount}%</span>`:'';
      pointEl = (element.snippet.point)?`<div class="point"> 최대 +${element.snippet.point} <span class="weight-400">P</span> </div>`:''

      html+=`<li class="store-item">
      <a href="${element.id}">
        <div class="img-box">
          <img src="${element.snippet.thumbnails.small.url}" alt>
        </div>
        <div class="txt-box">
          <strong class="swiper-title">${element.snippet.title}</strong>
          <div class="price">
          ${discountEl}
            <strong>${number(element.snippet.price.curr)}</strong>
            <span class="won">원</span>
            ${point(pointEl)}
          </div>
        </div>
      </a>
    </li>`;
    });
    $(frame).html(html);
  })
}



function number(num){
  const ori = num;
  const result = ori.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}

function point(num) {
  const poin = num;
  const result2 = poin.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return result2;
}


/**
 * @팝업배너
 *  
 * */

$(document).on('click','.sc-store a',function(e){
  e.preventDefault();
  $('.pop, .bg').addClass('on');
  $('body').addClass('hidden');

  if ($('.pop').hasClass('on')) {
    idx = $(this).attr('href');
    
    fetch('./assets/data/productData.json')
    .then((response)=> response.json())
    .then((json)=>{
      var result = json.items.filter(function (parm) {
        return parm.id == idx;
      }); 
  
      let detailList='';
      result[0].snippet.detail.forEach(element => {
        detailList+=`<img src="${element}">`;
      });
  
      html = ` 
    <div class="pop-top">
      <h1>일반상품</h1>
    </div>
    <img src="${result[0].snippet.thumbnails.high.url}" alt="닥터페퍼">
    <div class="container">
      <div class="title-box">
        <p class="title">${result[0].snippet.title}</p>
        <span class="price">
          <strong>${result[0].snippet.price.ori}</strong>
            원
        </span>
        <a href="" class="benefit-box">
          <span class="benefit">혜택</span>
          <strong class="info">
            최대
            <span>60%</span>
            , 등급별 포인트 혜택은?
          </strong>
        </a>
        <div class="delivery-box">
          <span class="benefit">배송비</span>
          <strong class="info">제주, 도서산간 및 일부 지역 추가운임 발생</strong>
        </div>
      </div>
    </div>
    <hr class="gray" />
    <div class="text-box">
      <h2 class="itme-title">상품설명</h2>
    </div>  
    ${detailList}
    <div class="pop-bottom">
      <div>장바구니</div>
      <div class="red">바로구매</div>
    </div>`
  
      $('.pop').html(html);

      $('.bg').click(function(){
        $('.pop').removeClass('on')
        $('body').removeClass('hidden')
      })
    })
  }

})





/**
 * @더보기버튼
 * 
 */

$('.sc-store .btn-more').click(function(){

  if($(this).prev().find('li').length < 3){
    alert('상품이 없습니다.');
    return false;
  }

  if($(this).prev().hasClass('show')){
    $(this).text('더보기')
  }else{
    $(this).text('간략보기')
  }

  $(this).toggleClass('on').prev().toggleClass('show');
  storeSlide.update()
})



/**
 * @스토어
 * 
 */
const storeSlide = new Swiper('.sc-store .swiper',{
  spaceBetween:20,
  autoHeight:true,
  pagination:{
    el:'.sc-store .pagination',
  }
})

/**
 * @슬라이드메뉴
 * 
 */
$('.btn-menu').click(function(e){
  e.preventDefault();
  $('.navigation,.bg').addClass('on');
  $('body').addClass('hidden')
})
$('.bg').click(function(){
  $('.navigation,.bg').removeClass('on');
  $('body').removeClass('hidden')
})


/**
 * @서브메뉴_토클메뉴
 * 
 */
  $('.nav-footer-wrap .btn-toggle').click(function(){
    $(this).siblings('.footer-group').slideToggle();
  })

  


}) // 지우기말기