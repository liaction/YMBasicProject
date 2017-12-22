/**
 * 未读消息拽动
 * 暂时处理情形:
 * 1.亲父节点横向无滚动
 * 2.亲父节点纵向可以有滚动
 * 3.有效滑动距离为50px
 * 其它情况暂未处理
 * 2017年11月24日
 * By Liaction
 * QQ:984095148
 */

hui.dragMessage = function(data) {

	var maskShow = function(cssText) {
		hui.mask_drag = document.getElementById('mask-drag');
		if(!hui.mask_drag) {
			hui.mask_drag = document.createElement('div');
			hui.mask_drag.setAttribute('id', 'mask-drag');
			if(cssText) {
				hui.mask_drag.style.cssText = cssText;
			}
			document.body.appendChild(hui.mask_drag);
		}
	};
	var maskHide = function() {
		if(hui.mask_drag) {
			document.body.removeChild(hui.mask_drag);
		}
	};

	var bodyOffsetTop;
	var getAbsPosition = function(obj) {
		var sizeObj = obj.getBoundingClientRect(); // 取得元素距离窗口的绝对位置
		// 窗口的滚动偏移（垂直、水平）
		var bodyOffset = {
			top: document.body.scrollTop,
			left: document.body.scrollLeft
		};
		bodyOffsetTop = bodyOffset.top;

		// 浏览器兼容性问题,有点显示sizeObj,有点显示bodyOffset,暂时处理方式为:
		// 当sizeObj存在时,此时,绝对位置显示正确,dragMessageDraging的top不减去bodyOffset.top,此时bodyOffset.top值为0
		// 当bodyOffset存在时,此时绝对位置不正确,多了个scrollTop,所以减去bodyOffset.top,此时 bodyOffset.top有值
		// 所以,统一减去bodyOffset.top
		//		huiJsonLog(sizeObj);
		//		huiJsonLog(bodyOffset);

		// 元素相对于页面的绝对位置 = 窗口滚动偏移 + 元素相对于窗口的绝对位置
		var inputOffsetTop = sizeObj.top + bodyOffset.top; // 距顶部
		var inputOffsetLeft = sizeObj.left + bodyOffset.left; // 距左侧
		return {
			left: inputOffsetLeft,
			top: inputOffsetTop
		};
	};

	//	huiJsonLog('>>>>>>>>>>>>>> ' + JSON.stringify(data) + ' <<<<<<<<<< ' + hui('#' + data.id).length);
	if(typeof(data) == "undefined" || !data.id || hui('#' + data.id).length != 1) {
		return;
	}

	var dragMessage = hui('#' + data.id);

	var dragMessageDraging = dragMessage.clone();
	dragMessageDraging.attr('id', 'drag_message_draging');

	var absPosition = {
		left: 0,
		top: 0
	};

	var scrollTop;
	var slidingDistance = {
		x: 0,
		y: 0
	};

	dragMessage.touchStart(function(e) {

		if(dragMessage.hasClass('drag-hide')) { // 隐藏标志,看到这个标志,不应该继续拖拽逻辑
			return;
		}

		maskShow('position: fixed;z-index: 20;background: rgba(0, 0, 0, 0);width: 100%;left: 0px;top: 0px;height: 100%;');

		document.getElementById('mask-drag').addEventListener('touchmove', function(e) {
			e.preventDefault();
		});

		absPosition = getAbsPosition(dragMessage.dom[0]);
		//		huiLog('left : ' + dragMessage.offset().left + ' , top : ' + dragMessage.offset().top +
		//			', x : ' + e.x + ' , y : ' + e.y +
		//			', windowInfo : ' + JSON.stringify(hui.winInfo()) +
		//			', absPosition : ' + JSON.stringify(absPosition)
		//		);
		scrollTop = hui.winInfo().scrollTop;

		dragMessageDraging.css({
			left: absPosition.left + 'px',
			top: absPosition.top + 'px',
			position: 'absolute',
			zIndex: '23'
		});
		dragMessageDraging.appendTo(hui('#mask-drag'));
		dragMessage.addClass('drag-message');
	});

	dragMessage.touchMove(function(e) {
		if(dragMessage.hasClass('drag-hide')) {
			return;
		}
		slidingDistance.x = e.x;
		slidingDistance.y = e.y - scrollTop;
		//		huiJsonLog(slidingDistance);
		dragMessageDraging.css({
			left: absPosition.left + slidingDistance.x + 'px',
			top: absPosition.top - bodyOffsetTop + slidingDistance.y + 'px',
			position: 'absolute'
		});
	});

	dragMessage.touchEnd(function(e) {
		if(dragMessage.hasClass('drag-hide')) {
			return;
		}
		maskHide();
		if(Math.abs(slidingDistance.x) >= 50 || Math.abs(slidingDistance.y) >= 50) {
			dragMessage.addClass('drag-hide');
			return;
		}
		dragMessage.removeClass('drag-message');
	});
};