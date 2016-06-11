var like_loading = false;
var like_anim = false;
var like_hide_cb = null;
var first = false;
var next_stats = false;
function saveLike(val) {
  if (like_loading || like_anim) return false;
  like_loading = true;
  counter += val ? 1 : -1;
  if (!counter) {
    window.Rpc.callMethod('hideTooltip', true);
  } else {
    if (val && counter == 1) window.Rpc.callMethod('showTooltip', true);
    else window.Rpc.callMethod('proxy', val ? 'showUser' : 'hideUser');
  }
  if (!val) {
    window.Rpc.callMethod('proxy', 'unpublish');
  }

  Ajax.Send("widget_like.php?act=a_like", {value: val ? 1 : 0, hash: likeHash, app: _aid, pageQuery: _pageQuery}, {
    onSuccess: function(obj, text) {
      like_loading = false;
      var resp = eval('('+text+')');
      updateStats(resp, true);
      window.Rpc.callMethod('proxy', 'update', resp);
      next_stats = extend({}, resp, {stats: resp.next_stats});
      hide('loading');
      if (val) {
        window.Rpc.callMethod('publish', 'widgets.like.liked', resp.num);
      } else {
        window.Rpc.callMethod('publish', 'widgets.like.unliked', resp.num);
      }
      // resizeWidget();
    },
    onFail: function() {
      like_loading = false;
      hide('loading');
    },
    onCaptchaHide: function () {
      hide('loading');
    }
  });
  if (!hasClass(mainDiv, 'like_dived')) return true;
  var rightBorder = geByClass('like_right', checkbox)[0], iconV = geByClass('iconV', checkbox)[0], iconH = geByClass('iconHeart', checkbox)[0];
  if (iconH && iconV) {
    var hideIcon = val ? iconV : iconH, showIcon = val ? iconH : iconV;
    like_anim = true;
    animate(hideIcon, {opacity: 0}, 150, function () {
      hide(hideIcon);
      like_anim = false;
    });
    setStyle(showIcon, {opacity: 0});
    animate(showIcon, {opacity: 1}, 150);
  }
  if (!ge('stats_text')) return true;
  if (like_hide_cb !== null) {
    like_hide_cb = null;
  } else {
    like_hide_cb = function () {
      like_anim = true;
      animate(checkbox, {width: val ? minW : maxW}, {duration: 200, transition: Fx.Transitions.sineInOut, onComplete: function () {
        like_anim = false;
        resizeWidget();
      }});
      like_hide_cb = null;
      if (next_stats) updateStats(next_stats);
      next_stats = false;
    };
  }
  if (!val && like_hide_cb) {
    setTimeout(like_hide_cb, 200);
    like_hide_cb = null;
  }
  return true;
}

function updateStats(stats, noAnim) {
  if (ge('stats_num')) {ge('stats_num').innerHTML = stats.num ? stats.num_text : '+1';}
  counter = stats.num;
  if (ge('stats_text') && stripHTML(ge('stats_text').innerHTML).toLowerCase() != stripHTML(stats.stats).toLowerCase()) {
    var el = ge('stats_text');
    if (noAnim) {
      el.innerHTML = stats.stats;
      resizeWidget();
      return;
    }
    if (!el.innerHTML) {
      setStyle(el, {opacity: 0});
      el.innerHTML = stats.stats;
      animate(el, {opacity: 1}, 100);
    } else {
      animate(el, {opacity: 0}, 100, function () {
        if (!(el.innerHTML = stats.stats)) return;
        animate(el, {opacity: 1}, 100);
      });
    }
    setTimeout(resizeWidget, 150);
  }
}

function resizeWidget() {
  if (!ge('like_table') || !window.Rpc) return;
  var size = getSize(ge('like_table'))[1];
  // if (browser.msie && !browser.msie8 || browser.opera) size += 15;
  window.Rpc.callMethod('resize', size);
}

function shareThisPage(val, hash) {
  if (hash != shareData.wall_hash) return;
  var params = {
    hash: shareData.wall_hash,
    description: shareData.description,
    title: shareData.title,
    url: likeURL,
    val: val ? 1 : 0,
    app: _aid,
    pageQuery: _pageQuery
  };
  Ajax.Send("/widget_like.php?act=a_recommend", params, {
    onSuccess: function (o, text) {
      var resp = eval('('+text+')');
      updateStats(resp);
      window.Rpc.callMethod('proxy', 'update', resp);
    }
  });
  if (val && !hasClass(checkbox, 'checked')) {
    addClass(checkbox, 'checked');
    counter++;
  }
}

onDomReady(function() {
  if (!window.fastXDM) { return; }
  window.checkbox = ge('checkbox');
  window.mainDiv = ge('main');
  if (window.leftTd = ge('like_table_left')) {
    var prevDisplay = [getStyle(ge('like_left'), 'display'), getStyle(ge('like_right'), 'display')];
    show('like_left');
    show('like_right');
    window.minW = getSize(ge('like_left'))[0];
    window.maxW = minW + getSize(ge('like_right'))[0];
    setStyle(ge('like_left'), {'display': prevDisplay[0]});
    setStyle(ge('like_right'), {'display': prevDisplay[1], width: maxW - minW});
    setStyle(checkbox, 'width', hasClass(checkbox, 'checked') ? minW : maxW);
    removeClass(ge('like_right_border'), 'fl_l');
  }
  addEvent(mainDiv, 'mouseover', function (e) {
    if (noAuthVal || !Rpc) return;
    if (!window.tooltipInited) {
      window.tooltipInited = true;
      Rpc.callMethod('initTooltip', counter);
    } else if (counter) {
      Rpc.callMethod('showTooltip', true);
    }
  });
  addEvent(checkbox, 'mouseup mousedown mouseover mouseout click', function (e) {
    if (e.type == 'mouseup' || e.type == 'mousedown') {
      window[e.type == 'mousedown' ? 'addClass' : 'removeClass'](checkbox, 'checkbox_pressed');
      return;
    }
    if (e.type == 'mouseover' || e.type == 'mouseout') {
      var isOver = e.type == 'mouseover';
      window[isOver ? 'addClass' : 'removeClass'](this, 'checkbox_over');
      if (!isOver) removeClass(checkbox, 'checkbox_pressed');
      return
    }
    if (window.noAuthVal) return widgetAuth();
    val = !hasClass(checkbox, 'checked');
    if (!saveLike(val)) return;
    if (val) {
      addClass(checkbox, 'checked');
      window.Rpc.callMethod('showTooltip', true);
    } else {
      removeClass(checkbox, 'checked');
      window.Rpc.callMethod('hideTooltip');
    }
    return cancelEvent(e);
  });
  setInterval(resizeWidget, 1000);

  window.Rpc = new fastXDM.Client({
    onInit: function() {
    },
    captcha: function(sid, value) {
      window.onCaptcha(sid, value);
    },
    captchaHide: function () {
      window.onCaptchaHide();
    },
    share: shareThisPage,
    hide: function () {
      if (like_hide_cb) like_hide_cb();
    }
  });
});

function goAway(url) {return true}

function widgetAuth () {
  var
    screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
    screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
    outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
    outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
    features = 'width=554,height=207,left=' + parseInt(screenX + ((outerWidth - 554) / 2), 10) + ',top=' + parseInt(screenY + ((outerHeight - 207) / 2.5), 10);
    this.active = window.open('http://vkontakte.ru/login.php?app=-1&layout=widgets', 'vk_openapi', features);
}

function gotSession (session_data) {
  setTimeout(function () {
    location.reload();
  }, 1000);
  location.href = location.href + '&1';
}

function showCaptcha(sid, img, onClick, onShow, onHide) {
  Rpc.callMethod('showBox', 'captcha.php?' + ajx2q({act: 'show_captcha_box', sid: sid, src: img, need_mobile: window.need_mobile_act == 1 ? 1 : 0, widget: 1, addCss: 'profile.css'}), {height: 201, width: 322});
  window.onCaptcha = onClick;
  window.onCaptchaHide = onHide;
  return false;
}
