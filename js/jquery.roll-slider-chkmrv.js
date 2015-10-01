 // $('#element').rollSliderChkmrv();

(function( $ ) {
    // setInterval(function(){ $('.pop.nx').click() }, 10000);
    var methods = {
        radius     :     265,
        speed      :     1,
        func       :     3.14,
        base       :     0,
        arr        :     [],

        init : function(elem) {
            initialPosition = {
                x: parseInt($(elem).css('left')),
                y: parseInt($(elem).css('top'))
            },
            other_side = {
                side :  Math.sqrt( Math.pow(initialPosition.x-470, 2)+Math.pow(initialPosition.y-235, 2) )
            },
            span_angle = {
                acos :  Math.acos( (2*Math.pow(methods.radius, 2) - Math.pow(other_side.side, 2))/(2*Math.pow(methods.radius, 2)) )
            }

        },
        destroy : function() {
            return this.each(function(){
                if ( options ) {
                    $.extend( methods, options );
                }
            })
        },
        rotateOnce : function () {
            var el = 0;
            $(".nav span").each(function(){
                var i = 0;
                methods.base = 360 /methods.count_span; //Вычислим угол
                angle = (1 * Math.PI / 180); //уменьшить на 2
                
                var thisSpan = $(this);
                methods.init(thisSpan);
                methods.func = methods.arr[el];
                // функция движения 
                // console.log(initialPosition.x,initialPosition.y);
                 methods.arr[el] = methods.func;
                while (i<methods.base) { //methods.base
                    methods.func -= angle; // приращение аргумента
                    var left = 170 + methods.radius * Math.sin(methods.func) + 'px';
                    var top = 170 + methods.radius * Math.cos(methods.func) + 'px';
                    i++;
                    $(this).animate({
                            'left': left,
                            'top': top
                    }, methods.speed);
                };
               
                el++;
            });    
        }
    } //methods

  $.fn.rollSliderChkmrv = function(options) {
    
   
	function sliderJS (obj, sl) {
		var ul = $(sl).find("ul");
        $(sl).find("li").fadeOut("fast");
		var bl = $(sl).find("li.slider"+obj);
        // $(bl).addClass('show');
        $(bl).fadeIn( 3000, function() {
            $(bl).css({
                display: 'block'
            });
        });

		// $(ul).animate({marginLeft: "-"+step*obj}, 500);
	}
	
	var make = function(){
    
		$(this)
		.on("click", ".number p", ".nav span", function() {
            if (!$(this).hasClass('on')) {
    			var sl = $(this).closest(".slider");
                $(".number").animate({opacity: "hide"}, 200);
                $(sl).find("span").removeClass("on");
                $(sl).find("p").removeClass("on pr nx");
                $(this).addClass("on"); 

    			var obj = $(this).attr("rel");

                var next_obj = parseInt(obj)+1;
                var prev_obj = parseInt(obj)-1;
               
                if (prev_obj<0) prev_obj = 3;
                if (next_obj>3) next_obj = 0;

                $('.number p[rel = ' + prev_obj + ']').addClass("pr");
                $('.number p[rel = ' + next_obj + ']').addClass("nx");
                $('.nav span').each(function() {
                    if( $(this).css("left")>'400'){
                        $(this).addClass("on");
                    }
                });
                
                var el = $(this);
                methods.rotateOnce();
                sliderJS(obj, sl);
                
            }
            $(".number").animate({opacity: "show"}, 3000);
			return false;
		})
		.each(function () {
			var obj = $(this);
            $(obj).append("<div class='nav' id='round'></div>");
			$(obj).append("<div class='number'></div>");

			$(obj).find("li").each(function ()
			{
				$(obj).find(".nav").append("<span class='roll' rel='"+$(this).index()+"'></span>");
                $(obj).find(".number").append("<p class='pop num"+$(this).index()+"' rel='"+$(this).index()+"'><i class='line'>&mdash;</i><i>0"+$(this).index()+"</i></p>");
				$(this).addClass("slider"+$(this).index());
			});

            $(obj).find("span").first().addClass("on");
            var start = $(obj).find(".pop")
            start.first().addClass("on");
            start.last().addClass("pr");
            start.eq(1).addClass("nx");
            methods.count_span = $(obj).find("span").length;
          
            var angle;
            methods.base = 360 /methods.count_span; //Вычислим угол
            var el=0;
			$(obj).find("span").each(function (){
                var elem = $(this);
                angle = (methods.base * Math.PI / 180);
                methods.arr[el] = methods.func;
                methods.func -= angle; // приращение аргумента
                var left =  170 + methods.radius * Math.sin(methods.func) + 'px';
                elem.css("left", left);
                var top =   170 + methods.radius * Math.cos(methods.func) + 'px';
                elem.css("top", top);
                el++;

            });
		});
    };
    methods.init();
    return this.each(make); 
  };
})(jQuery);
