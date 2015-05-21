clickAnimation = function(){
				var canvas = $('#clicklogo');
				var ctx = canvas[0].getContext("2d");	
				var width = canvas[0].width;
				var height = canvas[0].height;
				//Init seed
				var x = width * 0.3;
				var y = height / 2;
				var point = new Point(x, y);
				var color = '#FF0000';
				var scale = 3;

				var seed = new Seed(ctx, point, scale, color);	
				canvas.click(function(e) {
					var offset = canvas.offset(), x, y;
					x = e.pageX - offset.left;
					y = e.pageY - offset.top;
					if (seed.hover(x, y)) {
						hold = 0;
						canvas.unbind("click");
						canvas.unbind("mousemove");
						canvas.removeClass('hand');
						canvas.fadeOut(2500, startAnimation);
					}
				}).mousemove(function(e) {
					var offset = canvas.offset(), x, y;
					x = e.pageX - offset.left;
					y = e.pageY - offset.top;
					canvas.toggleClass('hand', seed.hover(x,y));
				});
	
				seed.draw();
};
