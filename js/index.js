(function(){

//配置
var config = {
	'audio':{
		'icon':'audio-record-play',
		'text':true
	},
	'loading': 'loading-ic'
};

//loading
window.onload = function(){
	$('#loading').hide();
}

//分享

$('#js-btn-share').bind('tap',function(){
	$('#js-share').show();
})
$('#js-share').bind('tap',function(){
	$(this).hide();
});


var pageIndex = 1,
	pageTotal = $('.page').length,
	towards = { up:1, right:2, down:3, left:4},
	isAnimating = false;

//禁用手机默认的触屏滚动行为
document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

$(document).swipeUp(function(){
	if (isAnimating) return;
	if (pageIndex < pageTotal) { 
		pageIndex+=1; 
	}else{
		pageIndex=1;
	};
	pageMove(towards.up);
})

$(document).swipeDown(function(){
	if (isAnimating) return;
	if (pageIndex > 1) { 
		pageIndex-=1; 
	}else{
		pageIndex=pageTotal;
	};
	pageMove(towards.down);	
})

function pageMove(tw){
	var lastPage;
	if(tw=='1'){
		if(pageIndex==1){
			lastPage = ".page-"+pageTotal;
		}else{
			lastPage = ".page-"+(pageIndex-1);
		}
		
	}else if(tw=='3'){
		if(pageIndex==pageTotal){
			lastPage = ".page-1";
		}else{
			lastPage = ".page-"+(pageIndex+1);
		}
		
	}

	var nowPage = ".page-"+pageIndex;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
}

})();
$(".ui-frozen-cover").cover({
    callback:function(type,obj){
        switch(type){
            case "show":
            covershow(obj);
            break;
            case "hide":
            coverhide(obj);
            break;
            case "hidden":
            coverhidden(obj);
            break;
            case "shown":
            covershown(obj);
            break;
        };
    }
});

function covershow(cover){
    if(!cover._isShown){
        var title=cover.currentTrigger.find('.Img'),
            index=$(".item").index(cover.currentTrigger),
            info=$('.info');
        title.css({
            '-webkit-transform':'translateY('+(cover.position.screenHeight/2-title.offset().top-30)+'px)'
        });
        info.eq(index).css({
            "-webkit-transition-delay":".5s"
        })
        info.eq(index).addClass('show');        
    	
    	switch(index){
			case 0:
			p1();
			console.log('page1');
			break;
			case 1:
			p2();
			console.log('page2');
			break;
			case 2:
			p3();
			console.log('page3');
			break;
			case 3:
			p4();
			console.log('page4');
			break;
      case 4:
      p5();
      console.log('page5');
      break;
    	};
         
    };     
        
};
function coverhide(cover){
    var title=cover.currentTrigger.find('.Img'),
        index=$(".item").index(cover.currentTrigger),
        info= $('.info');
    title.css({
        '-webkit-transform':'translateY(0px)'
    })
    info.eq(index).css({
            "-webkit-transition-delay":"0s"
        })
    info.eq(index).removeClass('show');
        	console.log('close'); 
        	info.eq(index).html('<div id=p'+index+'></div>');
};
function covershown(cover){
    $('.close').show();
};
function coverhidden(){
    $('.close').hide();
};

//page 动态载入
function p1(){
	var contents='<div id=p0><img src=img/bg.jpg class=bg><img src=img/L1.png id=L1 class=LG><img src=img/L2.png id=L2 class=LG><img src=img/L3.png id=L3 class=LG><img src=img/L2_2.png class="bg hidden" id="LK2"><img src="img/L3_2.png" class="bg hidden" id="LK3"><img src="img/L1_2.png" class="bg hidden" id="LK1"><img src="img/bg_2.jpg" class="bg hidden" id="LK4"><img src="img/DS1.png" id="DS1" class="DS hidden pt-page-scaleUpCenter"><img src="img/DS2.png" id="DS2" class="DS hidden pt-page-scaleUpCenter"><div class="TX pt-page-scaleUpCenter pt-page-delay1000"></div><p class="tipsText pt-page-flipInRight pt-page-delay500">宝妹，天黑了，把灯打开，再继续玩吧！</p></div>';
	$('.show').html(contents);
  $('.TX').css('background-image','url(img/baoma.png)');
			//控制灯具
      $('.LG').tap(function(){        
        var LNum=this.id.substr(1,2);        
          if ($('#LK'+LNum).css('display')=='none' ) {
            $('#LK'+LNum).show(); 
            console.log('开灯');           
          }else{
            $('#LK'+LNum).hide();
            console.log('关灯'); 
          };
          if ($('#LK1').css('display')=='inline' & $('#LK2').css('display')=='inline' & $('#LK3').css('display')=='inline') {
            $('#LK4').show(); 
            $('.DS').show();
          } else{
            $('#LK4').hide();
            $('.DS').hide();            
          };      
      });
   //商品导购
      $('.DS').tap(function(){        
        var index=this.id.substr(2,1); 
              
        if (index==1) {
        		$('.tipsText').html('时间不早了，宝妹该睡啦。&nbsp<a href=#>购</a>');

        } else{
				$('.tipsText').html('明天妈妈带你出去玩车车！&nbsp<a href=#>购</a>');


        }; 
      
      });
};
function p2(){
	var contents='<div id="p1"><div class="Lconstrol"><img src="img/LFe.png" id="LC1"class="LC"alt=""><img src="img/LZn.png" id="LC2"class="LC"alt=""><img src="img/LWu.png" id="LC3"class="LC"alt=""><div class="LC BottomFixed">通电</div></div><div id="Lightanimation"><h3>宝妹，</h3><p>☚左手边有三种灯丝材料，<br>我们来选择一种，然后试试通电吧！</p><blockquote><p>注意电阻率不能太小，不然一通电就短路啦；熔点也不能太低，不然一烧就断啦</p></blockquote></div></div>';
	$('.show').html(contents);
  $('#p1').css('background-image','url(img/LR.jpg)');
  var Textlight=$('#Lightanimation'),p1S=$('#p1'),LC1=$('#LC1'),LC2=$('#LC2'),LC3=$('#LC3');
	//控制灯丝材料
      $('.LC').tap(function(){        
        var LCNum=this.id.substr(2,1);
        
        if (LCNum==1) {
          p1S.css('background-image','url(img/LFeR.jpg)');
          Textlight.html('<h3>铁Fe</h3><p>纯铁是白色或银白色的金属<br>常温下,电阻率:0.97×10-7Ω*m<br>熔点：1535℃</p><blockquote>铁在生活中分布较广，占地壳含量的4.75%，仅次于氧、硅、铝，位居地壳含量第四。纯铁用于制发电机和电动机的铁芯，铁及其化合物还用于制磁铁、药物、墨水、颜料、磨料等。另外人体中也含有铁元素，亚铁是血红蛋白的重要组成成分，帮助氧气运输。</blockquote>');
          LC1.addClass('LCSelcted');
          LC2.removeClass('LCSelcted');
          LC3.removeClass('LCSelcted')};
        if (LCNum==2) {
        	Textlight.html('<h3>锌Zn</h3><p>一种浅灰色的过渡金属<br>常温下,电阻率:20 ×10<sup>-3</sup>Ω*m<br>熔点：419.5℃</p><blockquote>是第四"常见"的金属，仅次于铁、铝及铜，外观呈现银白色，在现代工业中对于电池制造上有不可磨灭的地位，为一相当重要的金属。另外，锌是人体必需的微量元素之一,在人体生长发育、生殖遗传、免疫、内分泌等重要生理过程中起着极其重要的作用。</blockquote>');
        	p1S.css('background-image','url(img/LZnR.jpg)');
        	LC2.addClass('LCSelcted');
        	LC1.removeClass('LCSelcted');
        	LC3.removeClass('LCSelcted')};
        if (LCNum==3) {
			    Textlight.html('<h3>钨Wu</h3><p>钢灰色或银白色的金属<br>常温下,电阻率:0.0532Ω*m<br>熔点：3410℃</p><blockquote>主要用途为制造灯丝和高速切削合金钢、超硬模具,也用于光学仪器，化学仪器。中国是世界上最大的钨储藏国。经过冶炼后的钨是银白色有光泽的金属，熔点极高，硬度很大，蒸气压很低，蒸发速度也较小，化学性质也比较稳定。</blockquote>');
        	p1S.css('background-image','url(img/LWuR.jpg)');
        	LC3.addClass('LCSelcted');
        	LC1.removeClass('LCSelcted');
        	LC2.removeClass('LCSelcted')};              
      });
	//点亮
      $('.BottomFixed').tap(function(){        
        var index=$('.LCSelcted').attr('id');
        console.log(index);
        
        if (index=='LC1') {
          p1S.css('background-image','url(img/LFe.gif)');
          };          
        if (index=='LC2') {
        	p1S.css('background-image','url(img/LZn.gif)');
        };
        	
        if (index=='LC3') {
        	p1S.css('background-image','url(img/LWu.gif)');
        };
			              
      });

};

function p3(){
  var contents3='<div id="p2"><div class="Lconstrol"><img src="img/LYFr.jpg" id="LC1"class="LC"alt=""><img src="img/LYFg.jpg" id="LC2"class="LC"alt=""><img src="img/LYFb.jpg" id="LC3"class="LC"alt=""></div><div id="Lightanimation"><h3>宝妹，</h3><p>我们需要白色的光<br>☚左手边有三种荧光粉，<br>我们来组合一下吧！</p><blockquote><p>1974年，荷兰飞利浦研制成功了能够发出人眼敏感的红、绿、蓝三色光的荧光粉。通过三者的搭配，获得了白色的光。</p></blockquote></div></div>';
  $('.show').html(contents3);
  $('#p2').css('background-image','url(img/LYR.gif)');
  var Textlight=$('#Lightanimation'),p2S=$('#p2'),LC1=$('#LC1'),LC2=$('#LC2'),LC3=$('#LC3');

  //控制荧光粉材料
      $('.LC').tap(function(){        
        var LCNum=this.id.substr(2,1);        
        if (LCNum==1) {    
          if (LC1.attr('class').length>5) {LC1.removeClass('LCSelcted');
          }else{
            p2S.css('background-image','url(img/LYr.jpg)');
            Textlight.html('<h3>荧光粉|发展简史 </h3><p>20世纪初，人们在研究放电发光现象的过程中开发了荧光灯和荧光粉。当时的荧光灯使用硅酸锌铍荧光粉，发光效率低,并有毒性。</p>');
            LC1.addClass('LCSelcted');  
          };
        };         
        if (LCNum==2) {
          if (LC2.attr('class').length>5) {LC2.removeClass('LCSelcted');
          }else{
          Textlight.html('<h3>荧光粉|发展简史</h3><p>1942年,A.H.麦基格发明卤磷酸钙荧光粉并用在荧光灯内，在照明领域引起了一次革命。这种粉发光效率高、无毒、价格便宜，一直使用到现在。</p>');
          p2S.css('background-image','url(img/LYg.jpg)');
          LC2.addClass('LCSelcted');           
          };
        } ;           
        if (LCNum==3) {
          if (LC3.attr('class').length>5) {LC3.removeClass('LCSelcted');
          }else{
          Textlight.html('<h3>荧光粉|发展简史</h3><p>70年代初，荷兰科学家从理论上计算出荧光粉的发射光谱,发现荧光粉如由450nm、550nm和610nm三条窄峰组成(三基色)，则显色指数和发光效率能同时提高。</p><p>1974年，荷兰的范尔斯泰亨等人先后合成了发射峰值分别在上述范围内的三种稀土荧光粉，使灯的发光效率达到85lm/W,显色指数为85,使荧光灯有了新的突破。</p>');
          p2S.css('background-image','url(img/LYb.jpg)');
          LC3.addClass('LCSelcted');          
          };
        } ;  

 
  //组合颜色
          
          var SelN=$('.LCSelcted').length;
          if (SelN==3) {
              p2S.css('background-image','url(img/LYrgb.jpg)'); 
              Textlight.html('<h3>发白光啦！</h3><p>红、绿、蓝三种颜色加一起就能产生白光哦～</p>');
            
          };
           if (SelN==2) {
              if (LC1.attr('class').length<5) {
                  p2S.css('background-image','url(img/LYgb.jpg)');
              };
              if (LC2.attr('class').length<5) {
                  p2S.css('background-image','url(img/LYrb.jpg)');
              };
              if (LC3.attr('class').length<5) {
                  p2S.css('background-image','url(img/LYrg.jpg)');
              };
              console.log(LC1.attr('class').length);              
          };     
      });
};
function p4(){
  var contents4='<div id=p3><img id=led1><img src=img/light4F.png id=led2><div id="dragEle">通电</div></div>';
  $('.show').html(contents4);
var src=$('#led1');
  $('#dragEle').tap(function(){    
      if (src.attr('src')=='img/light4.gif') {
        src.attr('src','img/light4.png');
        $('#dragEle').css('background-color','gray'); 
      } else{
      src.attr('src','img/light4.gif');
      $('#dragEle').css('background-color','rgb(255, 223, 0)');
      };
  });
};
function p5(){
var contents5='<div id=p4><img src=img/qrcode.gif style="width:60%;margin-left:30%;margin-top:40%;"></div>';
  $('.show').html(contents5);



};
//调节字体大小及动图版面 
  var widowWidth=$(window).width();
  var widowHeight=$(window).height();
  var h=-1*widowHeight;
  var info= $('.info');   
  info.css('width',widowWidth);
  info.css('height',widowHeight);
  $('#p1').css({'margin-top':h,'width':widowWidth,'height':'100%'});
  $('#p2').css('margin-top',2*h);
  $('#p3').css('margin-top',3*h);
  $('#p4').css('margin-top',4*h);
  $('#p5').css('margin-top',5*h);
var scaleH=widowHeight-$('.col-2').height();
$('.col-2').css('font-size',0.0243*scaleH);
console.log('fontriht');