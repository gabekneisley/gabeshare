(function(e){typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function s(){e(this).closest(".expandingText").find("div").text(this.value.replace(/\r\n/g,"\n")+" "),e(this).trigger("resize.expanding")}e.expandingTextarea=e.extend({autoInitialize:!0,initialSelector:"textarea.expanding",opts:{resize:function(){}}},e.expandingTextarea||{});var t=["lineHeight","textDecoration","letterSpacing","fontSize","fontFamily","fontStyle","fontWeight","textTransform","textAlign","direction","wordSpacing","fontSizeAdjust","wordWrap","word-break","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth","paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","boxSizing","webkitBoxSizing","mozBoxSizing","msBoxSizing"],n={position:"absolute",height:"100%",resize:"none"},r={visibility:"hidden",border:"0 solid"},i={position:"relative"};e.fn.expandingTextarea=function(o){var u=e.extend({},e.expandingTextarea.opts,o);return o==="resize"?this.trigger("input.expanding"):o==="destroy"?(this.filter(".expanding-init").each(function(){var t=e(this).removeClass("expanding-init"),n=t.closest(".expandingText");n.before(t).remove(),t.attr("style",t.data("expanding-styles")||"").removeData("expanding-styles")}),this):(this.filter("textarea").not(".expanding-init").addClass("expanding-init").each(function(){var o=e(this);o.wrap("<div class='expandingText'></div>"),o.after("<pre class='textareaClone'><div></div></pre>");var a=o.parent().css(i),f=a.find("pre").css(r);f.css(o.attr("wrap")==="off"?{overflowX:"scroll"}:{whiteSpace:"pre-wrap"}),o.data("expanding-styles",o.attr("style")),o.css(n),e.each(t,function(e,t){var n=o.css(t);f.css(t)!==n&&f.css(t,n)}),a.css({"min-height":"35px"}),o.bind("input.expanding propertychange.expanding keyup.expanding change.expanding",s),s.apply(this),u.resize&&o.bind("resize.expanding",u.resize)}),this)},e(function(){e.expandingTextarea.autoInitialize&&e(e.expandingTextarea.initialSelector).expandingTextarea()})});