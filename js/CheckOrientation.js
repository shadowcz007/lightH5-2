var CheckOrientation = (function(){
    var win = $( window ),
        get_orientation,
        last_orientation,
        initial_orientation_is_landscape,
        initial_orientation_is_default,
        portrait_map = { "0": true, "180": true },
        ww, wh, landscape_threshold;

    if(window.orientation !== undefined){
        ww = window.innerWidth || win.width();
        wh = window.innerHeight || win.height();
        landscape_threshold = 50;

        initial_orientation_is_landscape = ww > wh && ( ww - wh ) > landscape_threshold;
        initial_orientation_is_default = portrait_map[ window.orientation ];

        // (初始是横屏，方向是0或者180), *OR*
        // 初始是竖屏，方向是90或者-90, we
        //需要调整portrait_map
        if ( ( initial_orientation_is_landscape && initial_orientation_is_default ) || ( !initial_orientation_is_landscape && !initial_orientation_is_default ) ) {
          portrait_map = { "-90": true, "90": true };
        }

    }
      /**
       * 判断是横竖屏
       * @return {[type]} [description]
       */
    function get_orientation(){
        var isPortrait = true, elem = document.documentElement;

        if ( window.orientation !== undefined ) {
           
            isPortrait = portrait_map[ window.orientation ];
        } else {
            isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
        }

        return isPortrait ? "portrait" : "landscape";
    }

    last_orientation = get_orientation();

    function handler() {
        var orientation = get_orientation();
        if ( orientation !== last_orientation ) {
            last_orientation = orientation;
            win.trigger('orientation:change',[last_orientation]);//借用zepto的trigger事件
        }
    }
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", handler, false); 
    
    return {
        get_orientation : get_orientation

    };
})();

if (CheckOrientation.get_orientation()=='landscape') {

    console.log('landscape');

};
 
    $(window).on('orientation:change',function(e,type){
        if (type=='landscape') {
          $('#loading').html('<img src=img/shuping.png style="width:100%;height:auto;">');
          $('#loading').show();
          console.log('landscape');};
        if (type=='portrait') {
           $('#loading').html('');
          $('#loading').hide(); 
          console.log('portrait');};  
    });