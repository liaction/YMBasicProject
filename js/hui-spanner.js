// 增加是否显示遮罩 2017年11月22日 默认不显示,增加这个是为了做模仿 select使用  by liaciton
hui.spanner = function(fn) { // 展示 收起回调
	hui('.hui-accordion').each(function(cDom) {
		var accordionTitle = hui(cDom).find('.hui-accordion-title');
		accordionTitle.click(function() {
			hui.maskShow("background:rgba(0,0,0,0)"); 
			hui('#hui-mask').click(function() {
				hui.showSpanner(false,fn);
			});
			hui('#hui-mask').touchMove(function (e) {
				hui.showSpanner(false,fn);
			});
			var accordionContent = hui(this).parent().find('.hui-accordion-content');
			var accordionTitleHtml = accordionTitle.html();
			if(accordionContent.isShow()) {
				hui.maskHide();
				accordionContent.hide();
				fn && fn(false);
				accordionTitle.removeClass('hui-accordion-title-up');
			} else {
				accordionContent.css({zIndex: '99',position:'fixed',backgroundColor:'white',width:hui(this).parent().width(true)+'px'});
				accordionContent.show();
				fn && fn(true);
				accordionTitle.addClass('hui-accordion-title-up');
			}
			hui.scrollTop(0);
		});
	});
};

// 收起 暂时只支持一个 2017年11月22日 by liaciton
hui.showSpanner = function(trueOrFalse,fn) {
	if(typeof(trueOrFalse) == 'undefined') {
		return;
	}
	// 只处理 true false 其他不处理
	if(trueOrFalse != true && trueOrFalse != false) {
		return;
	}
	fn && fn(trueOrFalse);
	var accordionTitle = hui('.hui-accordion').eq(0).find('.hui-accordion-title');
	var accordionContent = hui('.hui-accordion').eq(0).find('.hui-accordion-content');
	if(accordionContent.isShow() && trueOrFalse == false) {
		hui.maskHide();
		accordionContent.hide();
		accordionTitle.removeClass('hui-accordion-title-up');
	} else if(!accordionContent.isShow() && trueOrFalse == true) {
		accordionContent.show();
		accordionTitle.addClass('hui-accordion-title-up');
	}
	hui.scrollTop(0);
}