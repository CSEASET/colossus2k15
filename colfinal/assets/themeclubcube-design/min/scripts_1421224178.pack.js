
if(typeof jQuery==='undefined'){throw new Error('Bootstrap\'s JavaScript requires jQuery')}
+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return false}
$.fn.emulateTransitionEnd=function(duration){var called=false
var $el=this
$(this).one('bsTransitionEnd',function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);+function($){'use strict';var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.VERSION='3.2.0'
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.hasClass('alert')?$this:$this.parent()}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(150):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.alert
$.fn.alert=Plugin
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQuery);+function($){'use strict';var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)
this.isLoading=false}
Button.VERSION='3.2.0'
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state=state+'Text'
if(data.resetText==null)$el.data('resetText',$el[val]())
$el[val](data[state]==null?this.options[state]:data[state])
setTimeout($.proxy(function(){if(state=='loadingText'){this.isLoading=true
$el.addClass(d).attr(d,d)}else if(this.isLoading){this.isLoading=false
$el.removeClass(d).removeAttr(d)}},this),0)}
Button.prototype.toggle=function(){var changed=true
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input')
if($input.prop('type')=='radio'){if($input.prop('checked')&&this.$element.hasClass('active'))changed=false
else $parent.find('.active').removeClass('active')}
if(changed)$input.prop('checked',!this.$element.hasClass('active')).trigger('change')}
if(changed)this.$element.toggleClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
Plugin.call($btn,'toggle')
e.preventDefault()})}(jQuery);+function($){'use strict';var Carousel=function(element,options){this.$element=$(element).on('keydown.bs.carousel',$.proxy(this.keydown,this))
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=this.sliding=this.interval=this.$active=this.$items=null
this.options.pause=='hover'&&this.$element.on('mouseenter.bs.carousel',$.proxy(this.pause,this)).on('mouseleave.bs.carousel',$.proxy(this.cycle,this))}
Carousel.VERSION='3.2.0'
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:true}
Carousel.prototype.keydown=function(e){switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
Carousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.item')
return this.$items.index(item||this.$active)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.bs.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',$(this.$items[pos]))}
Carousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||$active[type]()
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var fallback=type=='next'?'first':'last'
var that=this
if(!$next.length){if(!this.options.wrap)return
$next=this.$element.find('.item')[fallback]()}
if($next.hasClass('active'))return(this.sliding=false)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=true
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('slide')){$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd($active.css('transition-duration').slice(0,-1)*1000)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.carousel
$.fn.carousel=Plugin
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
$(document).on('click.bs.carousel.data-api','[data-slide], [data-slide-to]',function(e){var href
var $this=$(this)
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
if(!$target.hasClass('carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=false
Plugin.call($target,options)
if(slideIndex){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()})
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.transitioning=null
if(this.options.parent)this.$parent=$(this.options.parent)
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.2.0'
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var actives=this.$parent&&this.$parent.find('> .panel > .in')
if(actives&&actives.length){var hasData=actives.data('bs.collapse')
if(hasData&&hasData.transitioning)return
Plugin.call(actives,'hide')
hasData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0)
$('.tile').addClass('active')
if($(window).width()<1025){$('header').addClass('header-top muted-header');$('body').addClass('muted-scroll');$('#navbar-collapse-1').css('max-height',$(window).height())
$('.loader-container').css({'z-index':'20'}).fadeIn();$('.loader-container .backstage').addClass('white');};this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse').removeClass('in')
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.trigger('hidden.bs.collapse').removeClass('collapsing').addClass('collapse')
$('.tile').removeClass('active')
if($(window).width()<1025){$('header').removeClass('muted-header');$('#navbar-collapse-1').css('max-height','none')
if(($(window).scrollTop()<$('#fullHeghtSlider').height())||($(window).scrollTop()<$('#slider').height())||($(window).scrollTop()<$('.slider-default').height())){$('header').removeClass('header-top muted-header');}else{$('header').removeClass('muted-header');};$('body').removeClass('muted-scroll');$('.loader-container').css({'z-index':'9999'}).fadeOut();$('.loader-container .backstage').removeClass('white');};}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(350)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&option=='show')option=!option
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var href
var $this=$(this)
var target=$this.attr('data-target')||e.preventDefault()||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
var $target=$(target)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
var parent=$this.attr('data-parent')
var $parent=parent&&$(parent)
if(!data||!data.transitioning){if($parent)$parent.find('[data-toggle="collapse"][data-parent="'+parent+'"]').not($this).addClass('collapsed')
$this[$target.hasClass('in')?'addClass':'removeClass']('collapsed')}
Plugin.call($target,option)})}(jQuery);+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle="dropdown"]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.2.0'
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus')
$parent.toggleClass('open').trigger('shown.bs.dropdown',relatedTarget)}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27)/.test(e.keyCode))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if(!isActive||(isActive&&e.keyCode==27)){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.divider):visible a'
var $items=$parent.find('[role="menu"]'+desc+', [role="listbox"]'+desc)
if(!$items.length)return
var index=$items.index($items.filter(':focus'))
if(e.keyCode==38&&index>0)index--
if(e.keyCode==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $parent=getParent($(this))
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$parent.removeClass('open').trigger('hidden.bs.dropdown',relatedTarget)})}
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle+', [role="menu"], [role="listbox"]',Dropdown.prototype.keydown)}(jQuery);+function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$backdrop=this.isShown=null
this.scrollbarWidth=0
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.2.0'
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.checkScrollbar()
this.$body.addClass('modal-open')
this.setScrollbar()
this.escape()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in').attr('aria-hidden',false)
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$element.find('.modal-dialog').one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(300):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.$body.removeClass('modal-open')
this.resetScrollbar()
this.escape()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').attr('aria-hidden',true).off('click.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keyup.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keyup.dismiss.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus.call(this.$element[0]):this.hide.call(this)},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(150):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(150):callbackRemove()}else if(callback){callback()}}
Modal.prototype.checkScrollbar=function(){if(document.body.clientWidth>=window.innerWidth)return
this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
if(this.scrollbarWidth)this.$body.css('padding-right',bodyPad+this.scrollbarWidth)}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right','')}
Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})}(jQuery);+function($){'use strict';var Tooltip=function(element,options){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null
this.init('tooltip',element,options)}
Tooltip.VERSION='3.2.0'
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false,viewport:{selector:'body',padding:0}}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$(this.options.viewport.selector||this.options.viewport)
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(document.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('bs.'+this.type,this)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var $parent=this.$element.parent()
var parentDim=this.getPosition($parent)
placement=placement=='bottom'&&pos.top+pos.height+actualHeight-parentDim.scroll>parentDim.height?'top':placement=='top'&&pos.top-parentDim.scroll-actualHeight<0?'bottom':placement=='right'&&pos.right+actualWidth>parentDim.width?'left':placement=='left'&&pos.left-actualWidth<parentDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){that.$element.trigger('shown.bs.'+that.type)
that.hoverState=null}
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(150):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top=offset.top+marginTop-20
offset.left=offset.left+marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var arrowDelta=delta.left?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowPosition=delta.left?'left':'top'
var arrowOffsetPosition=delta.left?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],arrowPosition)}
Tooltip.prototype.replaceArrow=function(delta,dimension,position){this.arrow().css(position,delta?(50*(1-delta/dimension)+'%'):'')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(){var that=this
var $tip=this.tip()
var e=$.Event('hide.bs.'+this.type)
this.$element.removeAttr('aria-describedby')
function complete(){if(that.hoverState!='in')$tip.detach()
that.$element.trigger('hidden.bs.'+that.type)}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(150):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
return $.extend({},(typeof el.getBoundingClientRect=='function')?el.getBoundingClientRect():null,{scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop(),width:isBody?$(window).width():$element.outerWidth(),height:isBody?$(window).height():$element.outerHeight()},isBody?{top:0,left:0}:$element.offset())}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.width){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip=function(){return(this.$tip=this.$tip||$(this.options.template))}
Tooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.validate=function(){if(!this.$element[0].parentNode){this.hide()
this.$element=null
this.options=null}}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('bs.'+this.type,self)}}
self.tip().hasClass('in')?self.leave(self):self.enter(self)}
Tooltip.prototype.destroy=function(){clearTimeout(this.timeout)
this.hide().$element.off('.'+this.type).removeData('bs.'+this.type)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data&&option=='destroy')return
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tooltip
$.fn.tooltip=Plugin
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);+function($){'use strict';var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.VERSION='3.2.0'
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content').empty()[this.options.html?(typeof content=='string'?'html':'append'):'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
Popover.prototype.tip=function(){if(!this.$tip)this.$tip=$(this.options.template)
return this.$tip}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data&&option=='destroy')return
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.popover
$.fn.popover=Plugin
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQuery);+function($){'use strict';function ScrollSpy(element,options){var process=$.proxy(this.process,this)
this.$body=$('body')
this.$scrollElement=$(element).is('body')?$(window):$(element)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||'')+' .nav li > a'
this.offsets=[]
this.targets=[]
this.activeTarget=null
this.scrollHeight=0
this.$scrollElement.on('scroll.bs.scrollspy',process)
this.refresh()
this.process()}
ScrollSpy.VERSION='3.2.0'
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh=function(){var offsetMethod='offset'
var offsetBase=0
if(!$.isWindow(this.$scrollElement[0])){offsetMethod='position'
offsetBase=this.$scrollElement.scrollTop()}
this.offsets=[]
this.targets=[]
this.scrollHeight=this.getScrollHeight()
var self=this
this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#./.test(href)&&$(href)
return($href&&$href.length&&$href.is(':visible')&&[[$href[offsetMethod]().top+offsetBase,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){self.offsets.push(this[0])
self.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.getScrollHeight()
var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(this.scrollHeight!=scrollHeight){this.refresh()}
if(scrollTop>=maxScroll){return activeTarget!=(i=targets[targets.length-1])&&this.activate(i)}
if(activeTarget&&scrollTop<=offsets[0]){return activeTarget!=(i=targets[0])&&this.activate(i)}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(!offsets[i+1]||scrollTop<=offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
$(this.selector).parentsUntil(this.options.target,'.active').removeClass('active')
var selector=this.selector+'[data-target="'+target+'"],'+
this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate.bs.scrollspy')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.scrollspy
$.fn.scrollspy=Plugin
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load.bs.scrollspy.data-api',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
Plugin.call($spy,$spy.data())})})}(jQuery);+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.2.0'
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var previous=$ul.find('.active:last a')[0]
var e=$.Event('show.bs.tab',{relatedTarget:previous})
$this.trigger(e)
if(e.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$this.trigger({type:'shown.bs.tab',relatedTarget:previous})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&$active.hasClass('fade')
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')
element.addClass('active')
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu')){element.closest('li.dropdown').addClass('active')}
callback&&callback()}
transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(150):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault()
Plugin.call($(this),'show')})}(jQuery);+function($){'use strict';var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$target=$(this.options.target).on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=this.unpin=this.pinnedOffset=null
this.checkPosition()}
Affix.VERSION='3.2.0'
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0,target:window}
Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
return(this.pinnedOffset=position.top-scrollTop)}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var scrollHeight=$(document).height()
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top(this.$element)
if(typeof offsetBottom=='function')offsetBottom=offset.bottom(this.$element)
var affix=this.unpin!=null&&(scrollTop+this.unpin<=position.top)?false:offsetBottom!=null&&(position.top+this.$element.height()>=scrollHeight-offsetBottom)?'bottom':offsetTop!=null&&(scrollTop<=offsetTop)?'top':false
if(this.affixed===affix)return
if(this.unpin!=null)this.$element.css('top','')
var affixType='affix'+(affix?'-'+affix:'')
var e=$.Event(affixType+'.bs.affix')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
this.affixed=affix
this.unpin=affix=='bottom'?this.getPinnedOffset():null
this.$element.removeClass(Affix.RESET).addClass(affixType).trigger($.Event(affixType.replace('affix','affixed')))
if(affix=='bottom'){this.$element.offset({top:scrollHeight-this.$element.height()-offsetBottom})}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.affix
$.fn.affix=Plugin
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom)data.offset.bottom=data.offsetBottom
if(data.offsetTop)data.offset.top=data.offsetTop
Plugin.call($spy,data)})})}(jQuery);if('undefined'!=typeof jQuery)
{(function($){$.imgpreload=function(imgs,settings)
{settings=$.extend({},$.fn.imgpreload.defaults,(settings instanceof Function)?{all:settings}:settings);if('string'==typeof imgs){imgs=new Array(imgs);}
var loaded=new Array();$.each(imgs,function(i,elem)
{var img=new Image();var url=elem;var img_obj=img;if('string'!=typeof elem)
{url=$(elem).attr('src')||$(elem).css('background-image').replace(/^url\((?:"|')?(.*)(?:'|")?\)$/mg,"$1");img_obj=elem;}
$(img).bind('load error',function(e)
{loaded.push(img_obj);$.data(img_obj,'loaded',('error'==e.type)?false:true);if(settings.each instanceof Function){settings.each.call(img_obj);}
if(loaded.length>=imgs.length&&settings.all instanceof Function){settings.all.call(loaded);}
$(this).unbind('load error');});img.src=url;});};$.fn.imgpreload=function(settings)
{$.imgpreload(this,settings);return this;};$.fn.imgpreload.defaults={each:null,all:null};})(jQuery);}
(function(factory){"use strict";if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else{factory((typeof(jQuery)!='undefined')?jQuery:window.Zepto);}}
(function($){"use strict";var feature={};feature.fileapi=$("<input type='file'/>").get(0).files!==undefined;feature.formdata=window.FormData!==undefined;var hasProp=!!$.fn.prop;$.fn.attr2=function(){if(!hasProp){return this.attr.apply(this,arguments);}
var val=this.prop.apply(this,arguments);if((val&&val.jquery)||typeof val==='string'){return val;}
return this.attr.apply(this,arguments);};$.fn.ajaxSubmit=function(options){if(!this.length){log('ajaxSubmit: skipping submit process - no element selected');return this;}
var method,action,url,$form=this;if(typeof options=='function'){options={success:options};}
else if(options===undefined){options={};}
method=options.type||this.attr2('method');action=options.url||this.attr2('action');url=(typeof action==='string')?$.trim(action):'';url=url||window.location.href||'';if(url){url=(url.match(/^([^#]+)/)||[])[1];}
options=$.extend(true,{url:url,success:$.ajaxSettings.success,type:method||$.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank'},options);var veto={};this.trigger('form-pre-serialize',[this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;}
if(options.beforeSerialize&&options.beforeSerialize(this,options)===false){log('ajaxSubmit: submit aborted via beforeSerialize callback');return this;}
var traditional=options.traditional;if(traditional===undefined){traditional=$.ajaxSettings.traditional;}
var elements=[];var qx,a=this.formToArray(options.semantic,elements);if(options.data){options.extraData=options.data;qx=$.param(options.data,traditional);}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){log('ajaxSubmit: submit aborted via beforeSubmit callback');return this;}
this.trigger('form-submit-validate',[a,this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;}
var q=$.param(a,traditional);if(qx){q=(q?(q+'&'+qx):qx);}
if(options.type.toUpperCase()=='GET'){options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;options.data=null;}
else{options.data=q;}
var callbacks=[];if(options.resetForm){callbacks.push(function(){$form.resetForm();});}
if(options.clearForm){callbacks.push(function(){$form.clearForm(options.includeHidden);});}
if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){var fn=options.replaceTarget?'replaceWith':'html';$(options.target)[fn](data).each(oldSuccess,arguments);});}
else if(options.success){callbacks.push(options.success);}
options.success=function(data,status,xhr){var context=options.context||this;for(var i=0,max=callbacks.length;i<max;i++){callbacks[i].apply(context,[data,status,xhr||$form,$form]);}};if(options.error){var oldError=options.error;options.error=function(xhr,status,error){var context=options.context||this;oldError.apply(context,[xhr,status,error,$form]);};}
if(options.complete){var oldComplete=options.complete;options.complete=function(xhr,status){var context=options.context||this;oldComplete.apply(context,[xhr,status,$form]);};}
var fileInputs=$('input[type=file]:enabled',this).filter(function(){return $(this).val()!=='';});var hasFileInputs=fileInputs.length>0;var mp='multipart/form-data';var multipart=($form.attr('enctype')==mp||$form.attr('encoding')==mp);var fileAPI=feature.fileapi&&feature.formdata;log("fileAPI :"+fileAPI);var shouldUseFrame=(hasFileInputs||multipart)&&!fileAPI;var jqxhr;if(options.iframe!==false&&(options.iframe||shouldUseFrame)){if(options.closeKeepAlive){$.get(options.closeKeepAlive,function(){jqxhr=fileUploadIframe(a);});}
else{jqxhr=fileUploadIframe(a);}}
else if((hasFileInputs||multipart)&&fileAPI){jqxhr=fileUploadXhr(a);}
else{jqxhr=$.ajax(options);}
$form.removeData('jqxhr').data('jqxhr',jqxhr);for(var k=0;k<elements.length;k++){elements[k]=null;}
this.trigger('form-submit-notify',[this,options]);return this;function deepSerialize(extraData){var serialized=$.param(extraData,options.traditional).split('&');var len=serialized.length;var result=[];var i,part;for(i=0;i<len;i++){serialized[i]=serialized[i].replace(/\+/g,' ');part=serialized[i].split('=');result.push([decodeURIComponent(part[0]),decodeURIComponent(part[1])]);}
return result;}
function fileUploadXhr(a){var formdata=new FormData();for(var i=0;i<a.length;i++){formdata.append(a[i].name,a[i].value);}
if(options.extraData){var serializedData=deepSerialize(options.extraData);for(i=0;i<serializedData.length;i++){if(serializedData[i]){formdata.append(serializedData[i][0],serializedData[i][1]);}}}
options.data=null;var s=$.extend(true,{},$.ajaxSettings,options,{contentType:false,processData:false,cache:false,type:method||'POST'});if(options.uploadProgress){s.xhr=function(){var xhr=$.ajaxSettings.xhr();if(xhr.upload){xhr.upload.addEventListener('progress',function(event){var percent=0;var position=event.loaded||event.position;var total=event.total;if(event.lengthComputable){percent=Math.ceil(position/total*100);}
options.uploadProgress(event,position,total,percent);},false);}
return xhr;};}
s.data=null;var beforeSend=s.beforeSend;s.beforeSend=function(xhr,o){if(options.formData){o.data=options.formData;}
else{o.data=formdata;}
if(beforeSend){beforeSend.call(this,xhr,o);}};return $.ajax(s);}
function fileUploadIframe(a){var form=$form[0],el,i,s,g,id,$io,io,xhr,sub,n,timedOut,timeoutHandle;var deferred=$.Deferred();deferred.abort=function(status){xhr.abort(status);};if(a){for(i=0;i<elements.length;i++){el=$(elements[i]);if(hasProp){el.prop('disabled',false);}
else{el.removeAttr('disabled');}}}
s=$.extend(true,{},$.ajaxSettings,options);s.context=s.context||s;id='jqFormIO'+(new Date().getTime());if(s.iframeTarget){$io=$(s.iframeTarget);n=$io.attr2('name');if(!n){$io.attr2('name',id);}
else{id=n;}}
else{$io=$('<iframe name="'+id+'" src="'+s.iframeSrc+'" />');$io.css({position:'absolute',top:'-1000px',left:'-1000px'});}
io=$io[0];xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(status){var e=(status==='timeout'?'timeout':'aborted');log('aborting upload... '+e);this.aborted=1;try{if(io.contentWindow.document.execCommand){io.contentWindow.document.execCommand('Stop');}}
catch(ignore){}
$io.attr('src',s.iframeSrc);xhr.error=e;if(s.error){s.error.call(s.context,xhr,e,status);}
if(g){$.event.trigger("ajaxError",[xhr,s,e]);}
if(s.complete){s.complete.call(s.context,xhr,e);}}};g=s.global;if(g&&0===$.active++){$.event.trigger("ajaxStart");}
if(g){$.event.trigger("ajaxSend",[xhr,s]);}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){if(s.global){$.active--;}
deferred.reject();return deferred;}
if(xhr.aborted){deferred.reject();return deferred;}
sub=form.clk;if(sub){n=sub.name;if(n&&!sub.disabled){s.extraData=s.extraData||{};s.extraData[n]=sub.value;if(sub.type=="image"){s.extraData[n+'.x']=form.clk_x;s.extraData[n+'.y']=form.clk_y;}}}
var CLIENT_TIMEOUT_ABORT=1;var SERVER_ABORT=2;function getDoc(frame){var doc=null;try{if(frame.contentWindow){doc=frame.contentWindow.document;}}catch(err){log('cannot get iframe.contentWindow document: '+err);}
if(doc){return doc;}
try{doc=frame.contentDocument?frame.contentDocument:frame.document;}catch(err){log('cannot get iframe.contentDocument: '+err);doc=frame.document;}
return doc;}
var csrf_token=$('meta[name=csrf-token]').attr('content');var csrf_param=$('meta[name=csrf-param]').attr('content');if(csrf_param&&csrf_token){s.extraData=s.extraData||{};s.extraData[csrf_param]=csrf_token;}
function doSubmit(){var t=$form.attr2('target'),a=$form.attr2('action'),mp='multipart/form-data',et=$form.attr('enctype')||$form.attr('encoding')||mp;form.setAttribute('target',id);if(!method||/post/i.test(method)){form.setAttribute('method','POST');}
if(a!=s.url){form.setAttribute('action',s.url);}
if(!s.skipEncodingOverride&&(!method||/post/i.test(method))){$form.attr({encoding:'multipart/form-data',enctype:'multipart/form-data'});}
if(s.timeout){timeoutHandle=setTimeout(function(){timedOut=true;cb(CLIENT_TIMEOUT_ABORT);},s.timeout);}
function checkState(){try{var state=getDoc(io).readyState;log('state = '+state);if(state&&state.toLowerCase()=='uninitialized'){setTimeout(checkState,50);}}
catch(e){log('Server abort: ',e,' (',e.name,')');cb(SERVER_ABORT);if(timeoutHandle){clearTimeout(timeoutHandle);}
timeoutHandle=undefined;}}
var extraInputs=[];try{if(s.extraData){for(var n in s.extraData){if(s.extraData.hasOwnProperty(n)){if($.isPlainObject(s.extraData[n])&&s.extraData[n].hasOwnProperty('name')&&s.extraData[n].hasOwnProperty('value')){extraInputs.push($('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value).appendTo(form)[0]);}else{extraInputs.push($('<input type="hidden" name="'+n+'">').val(s.extraData[n]).appendTo(form)[0]);}}}}
if(!s.iframeTarget){$io.appendTo('body');}
if(io.attachEvent){io.attachEvent('onload',cb);}
else{io.addEventListener('load',cb,false);}
setTimeout(checkState,15);try{form.submit();}catch(err){var submitFn=document.createElement('form').submit;submitFn.apply(form);}}
finally{form.setAttribute('action',a);form.setAttribute('enctype',et);if(t){form.setAttribute('target',t);}else{$form.removeAttr('target');}
$(extraInputs).remove();}}
if(s.forceSync){doSubmit();}
else{setTimeout(doSubmit,10);}
var data,doc,domCheckCount=50,callbackProcessed;function cb(e){if(xhr.aborted||callbackProcessed){return;}
doc=getDoc(io);if(!doc){log('cannot access response document');e=SERVER_ABORT;}
if(e===CLIENT_TIMEOUT_ABORT&&xhr){xhr.abort('timeout');deferred.reject(xhr,'timeout');return;}
else if(e==SERVER_ABORT&&xhr){xhr.abort('server abort');deferred.reject(xhr,'error','server abort');return;}
if(!doc||doc.location.href==s.iframeSrc){if(!timedOut){return;}}
if(io.detachEvent){io.detachEvent('onload',cb);}
else{io.removeEventListener('load',cb,false);}
var status='success',errMsg;try{if(timedOut){throw'timeout';}
var isXml=s.dataType=='xml'||doc.XMLDocument||$.isXMLDoc(doc);log('isXml='+isXml);if(!isXml&&window.opera&&(doc.body===null||!doc.body.innerHTML)){if(--domCheckCount){log('requeing onLoad callback, DOM not available');setTimeout(cb,250);return;}}
var docRoot=doc.body?doc.body:doc.documentElement;xhr.responseText=docRoot?docRoot.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(isXml){s.dataType='xml';}
xhr.getResponseHeader=function(header){var headers={'content-type':s.dataType};return headers[header.toLowerCase()];};if(docRoot){xhr.status=Number(docRoot.getAttribute('status'))||xhr.status;xhr.statusText=docRoot.getAttribute('statusText')||xhr.statusText;}
var dt=(s.dataType||'').toLowerCase();var scr=/(json|script|text)/.test(dt);if(scr||s.textarea){var ta=doc.getElementsByTagName('textarea')[0];if(ta){xhr.responseText=ta.value;xhr.status=Number(ta.getAttribute('status'))||xhr.status;xhr.statusText=ta.getAttribute('statusText')||xhr.statusText;}
else if(scr){var pre=doc.getElementsByTagName('pre')[0];var b=doc.getElementsByTagName('body')[0];if(pre){xhr.responseText=pre.textContent?pre.textContent:pre.innerText;}
else if(b){xhr.responseText=b.textContent?b.textContent:b.innerText;}}}
else if(dt=='xml'&&!xhr.responseXML&&xhr.responseText){xhr.responseXML=toXml(xhr.responseText);}
try{data=httpData(xhr,dt,s);}
catch(err){status='parsererror';xhr.error=errMsg=(err||status);}}
catch(err){log('error caught: ',err);status='error';xhr.error=errMsg=(err||status);}
if(xhr.aborted){log('upload aborted');status=null;}
if(xhr.status){status=(xhr.status>=200&&xhr.status<300||xhr.status===304)?'success':'error';}
if(status==='success'){if(s.success){s.success.call(s.context,data,'success',xhr);}
deferred.resolve(xhr.responseText,'success',xhr);if(g){$.event.trigger("ajaxSuccess",[xhr,s]);}}
else if(status){if(errMsg===undefined){errMsg=xhr.statusText;}
if(s.error){s.error.call(s.context,xhr,status,errMsg);}
deferred.reject(xhr,'error',errMsg);if(g){$.event.trigger("ajaxError",[xhr,s,errMsg]);}}
if(g){$.event.trigger("ajaxComplete",[xhr,s]);}
if(g&&!--$.active){$.event.trigger("ajaxStop");}
if(s.complete){s.complete.call(s.context,xhr,status);}
callbackProcessed=true;if(s.timeout){clearTimeout(timeoutHandle);}
setTimeout(function(){if(!s.iframeTarget){$io.remove();}
else{$io.attr('src',s.iframeSrc);}
xhr.responseXML=null;},100);}
var toXml=$.parseXML||function(s,doc){if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else{doc=(new DOMParser()).parseFromString(s,'text/xml');}
return(doc&&doc.documentElement&&doc.documentElement.nodeName!='parsererror')?doc:null;};var parseJSON=$.parseJSON||function(s){return window['eval']('('+s+')');};var httpData=function(xhr,type,s){var ct=xhr.getResponseHeader('content-type')||'',xml=type==='xml'||!type&&ct.indexOf('xml')>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.nodeName==='parsererror'){if($.error){$.error('parsererror');}}
if(s&&s.dataFilter){data=s.dataFilter(data,type);}
if(typeof data==='string'){if(type==='json'||!type&&ct.indexOf('json')>=0){data=parseJSON(data);}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){$.globalEval(data);}}
return data;};return deferred;}};$.fn.ajaxForm=function(options){options=options||{};options.delegation=options.delegation&&$.isFunction($.fn.on);if(!options.delegation&&this.length===0){var o={s:this.selector,c:this.context};if(!$.isReady&&o.s){log('DOM not ready, queuing ajaxForm');$(function(){$(o.s,o.c).ajaxForm(options);});return this;}
log('terminating; zero elements found by selector'+($.isReady?'':' (DOM not ready)'));return this;}
if(options.delegation){$(document).off('submit.form-plugin',this.selector,doAjaxSubmit).off('click.form-plugin',this.selector,captureSubmittingElement).on('submit.form-plugin',this.selector,options,doAjaxSubmit).on('click.form-plugin',this.selector,options,captureSubmittingElement);return this;}
return this.ajaxFormUnbind().bind('submit.form-plugin',options,doAjaxSubmit).bind('click.form-plugin',options,captureSubmittingElement);};function doAjaxSubmit(e){var options=e.data;if(!e.isDefaultPrevented()){e.preventDefault();$(e.target).ajaxSubmit(options);}}
function captureSubmittingElement(e){var target=e.target;var $el=$(target);if(!($el.is("[type=submit],[type=image]"))){var t=$el.closest('[type=submit]');if(t.length===0){return;}
target=t[0];}
var form=this;form.clk=target;if(target.type=='image'){if(e.offsetX!==undefined){form.clk_x=e.offsetX;form.clk_y=e.offsetY;}else if(typeof $.fn.offset=='function'){var offset=$el.offset();form.clk_x=e.pageX-offset.left;form.clk_y=e.pageY-offset.top;}else{form.clk_x=e.pageX-target.offsetLeft;form.clk_y=e.pageY-target.offsetTop;}}
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null;},100);}
$.fn.ajaxFormUnbind=function(){return this.unbind('submit.form-plugin click.form-plugin');};$.fn.formToArray=function(semantic,elements){var a=[];if(this.length===0){return a;}
var form=this[0];var formId=this.attr('id');var els=semantic?form.getElementsByTagName('*'):form.elements;var els2;if(els&&!/MSIE [678]/.test(navigator.userAgent)){els=$(els).get();}
if(formId){els2=$(':input[form="'+formId+'"]').get();if(els2.length){els=(els||[]).concat(els2);}}
if(!els||!els.length){return a;}
var i,j,n,v,el,max,jmax;for(i=0,max=els.length;i<max;i++){el=els[i];n=el.name;if(!n||el.disabled){continue;}
if(semantic&&form.clk&&el.type=="image"){if(form.clk==el){a.push({name:n,value:$(el).val(),type:el.type});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
continue;}
v=$.fieldValue(el,true);if(v&&v.constructor==Array){if(elements){elements.push(el);}
for(j=0,jmax=v.length;j<jmax;j++){a.push({name:n,value:v[j]});}}
else if(feature.fileapi&&el.type=='file'){if(elements){elements.push(el);}
var files=el.files;if(files.length){for(j=0;j<files.length;j++){a.push({name:n,value:files[j],type:el.type});}}
else{a.push({name:n,value:'',type:el.type});}}
else if(v!==null&&typeof v!='undefined'){if(elements){elements.push(el);}
a.push({name:n,value:v,type:el.type,required:el.required});}}
if(!semantic&&form.clk){var $input=$(form.clk),input=$input[0];n=input.name;if(n&&!input.disabled&&input.type=='image'){a.push({name:n,value:$input.val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}}
return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n){return;}
var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++){a.push({name:n,value:v[i]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:this.name,value:v});}});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length)){continue;}
if(v.constructor==Array){$.merge(val,v);}
else{val.push(v);}}
return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(successful===undefined){successful=true;}
if(successful&&(!n||el.disabled||t=='reset'||t=='button'||(t=='checkbox'||t=='radio')&&!el.checked||(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||tag=='select'&&el.selectedIndex==-1)){return null;}
if(tag=='select'){var index=el.selectedIndex;if(index<0){return null;}
var a=[],ops=el.options;var one=(t=='select-one');var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=op.value;if(!v){v=(op.attributes&&op.attributes.value&&!(op.attributes.value.specified))?op.text:op.value;}
if(one){return v;}
a.push(v);}}
return a;}
return $(el).val();};$.fn.clearForm=function(includeHidden){return this.each(function(){$('input,select,textarea',this).clearFields(includeHidden);});};$.fn.clearFields=$.fn.clearInputs=function(includeHidden){var re=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(re.test(t)||tag=='textarea'){this.value='';}
else if(t=='checkbox'||t=='radio'){this.checked=false;}
else if(tag=='select'){this.selectedIndex=-1;}
else if(t=="file"){if(/MSIE/.test(navigator.userAgent)){$(this).replaceWith($(this).clone(true));}else{$(this).val('');}}
else if(includeHidden){if((includeHidden===true&&/hidden/.test(t))||(typeof includeHidden=='string'&&$(this).is(includeHidden))){this.value='';}}});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType)){this.reset();}});};$.fn.enable=function(b){if(b===undefined){b=true;}
return this.each(function(){this.disabled=!b;});};$.fn.selected=function(select){if(select===undefined){select=true;}
return this.each(function(){var t=this.type;if(t=='checkbox'||t=='radio'){this.checked=select;}
else if(this.tagName.toLowerCase()=='option'){var $sel=$(this).parent('select');if(select&&$sel[0]&&$sel[0].type=='select-one'){$sel.find('option').selected(false);}
this.selected=select;}});};$.fn.ajaxSubmit.debug=false;function log(){if(!$.fn.ajaxSubmit.debug){return;}
var msg='[jquery.form] '+Array.prototype.join.call(arguments,'');if(window.console&&window.console.log){window.console.log(msg);}
else if(window.opera&&window.opera.postError){window.opera.postError(msg);}}}));(function($){$.extend($.fn,{validate:function(options){if(!this.length){if(options&&options.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.");}
return;}
var validator=$.data(this[0],"validator");if(validator){return validator;}
this.attr("novalidate","novalidate");validator=new $.validator(options,this[0]);$.data(this[0],"validator",validator);if(validator.settings.onsubmit){this.validateDelegate(":submit","click",function(event){if(validator.settings.submitHandler){validator.submitButton=event.target;}
if($(event.target).hasClass("cancel")){validator.cancelSubmit=true;}
if($(event.target).attr("formnovalidate")!==undefined){validator.cancelSubmit=true;}});this.submit(function(event){if(validator.settings.debug){event.preventDefault();}
function handle(){var hidden;if(validator.settings.submitHandler){if(validator.submitButton){hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm);}
validator.settings.submitHandler.call(validator,validator.currentForm,event);if(validator.submitButton){hidden.remove();}
return false;}
return true;}
if(validator.cancelSubmit){validator.cancelSubmit=false;return handle();}
if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false;}
return handle();}else{validator.focusInvalid();return false;}});}
return validator;},valid:function(){var valid,validator;if($(this[0]).is("form")){valid=this.validate().form();}else{valid=true;validator=$(this[0].form).validate();this.each(function(){valid=validator.element(this)&&valid;});}
return valid;},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value);});return result;},rules:function(command,argument){var element=this[0],settings,staticRules,existingRules,data,param,filtered;if(command){settings=$.data(element.form,"validator").settings;staticRules=settings.rules;existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));delete existingRules.messages;staticRules[element.name]=existingRules;if(argument.messages){settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages);}
break;case"remove":if(!argument){delete staticRules[element.name];return existingRules;}
filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];if(method==="required"){$(element).removeAttr("aria-required");}});return filtered;}}
data=$.validator.normalizeRules($.extend({},$.validator.classRules(element),$.validator.attributeRules(element),$.validator.dataRules(element),$.validator.staticRules(element)),element);if(data.required){param=data.required;delete data.required;data=$.extend({required:param},data);$(element).attr("aria-required","true");}
if(data.remote){param=data.remote;delete data.remote;data=$.extend(data,{remote:param});}
return data;}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+$(a).val());},filled:function(a){return!!$.trim(""+$(a).val());},unchecked:function(a){return!$(a).prop("checked");}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init();};$.validator.format=function(source,params){if(arguments.length===1){return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args);};}
if(arguments.length>2&&params.constructor!==Array){params=$.makeArray(arguments).slice(1);}
if(params.constructor!==Array){params=[params];}
$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),function(){return n;});});return source;};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(element){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass);}
this.addWrapper(this.errorsFor(element)).hide();}},onfocusout:function(element){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element);}},onkeyup:function(element,event){if(event.which===9&&this.elementValue(element)===""){return;}else if(element.name in this.submitted||element===this.lastElement){this.element(element);}},onclick:function(element){if(element.name in this.submitted){this.element(element);}else if(element.parentNode.name in this.submitted){this.element(element.parentNode);}},highlight:function(element,errorClass,validClass){if(element.type==="radio"){this.findByName(element.name).addClass(errorClass).removeClass(validClass);}else{$(element).addClass(errorClass).removeClass(validClass);}},unhighlight:function(element,errorClass,validClass){if(element.type==="radio"){this.findByName(element.name).removeClass(errorClass).addClass(validClass);}else{$(element).removeClass(errorClass).addClass(validClass);}}},setDefaults:function(settings){$.extend($.validator.defaults,settings);},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=(this.groups={}),rules;$.each(this.settings.groups,function(key,value){if(typeof value==="string"){value=value.split(/\s/);}
$.each(value,function(index,name){groups[name]=key;});});rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value);});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,""),settings=validator.settings;if(settings[eventType]&&!this.is(settings.ignore)){settings[eventType].call(validator,this[0],event);}}
$(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, "+"[type='number'], [type='search'] ,[type='tel'], [type='url'], "+"[type='email'], [type='datetime'], [type='date'], [type='month'], "+"[type='week'], [type='time'], [type='datetime-local'], "+"[type='range'], [type='color'] ","focusin focusout keyup",delegate).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",delegate);if(this.settings.invalidHandler){$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);}
$(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true");},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid()){$(this.currentForm).triggerHandler("invalid-form",[this]);}
this.showErrors();return this.valid();},checkForm:function(){this.prepareForm();for(var i=0,elements=(this.currentElements=this.elements());elements[i];i++){this.check(elements[i]);}
return this.valid();},element:function(element){var cleanElement=this.clean(element),checkElement=this.validationTargetFor(cleanElement),result=true;this.lastElement=checkElement;if(checkElement===undefined){delete this.invalid[cleanElement.name];}else{this.prepareElement(checkElement);this.currentElements=$(checkElement);result=this.check(checkElement)!==false;if(result){delete this.invalid[checkElement.name];}else{this.invalid[checkElement.name]=true;}}
$(element).attr("aria-invalid",!result);if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers);}
this.showErrors();return result;},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]});}
this.successList=$.grep(this.successList,function(element){return!(element.name in errors);});}
if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList);}else{this.defaultShowErrors();}},resetForm:function(){if($.fn.resetForm){$(this.currentForm).resetForm();}
this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid");},numberOfInvalids:function(){return this.objectLength(this.invalid);},objectLength:function(obj){var count=0,i;for(i in obj){count++;}
return count;},hideErrors:function(){this.addWrapper(this.toHide).hide();},valid:function(){return this.size()===0;},size:function(){return this.errorList.length;},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name===lastActive.name;}).length===1&&lastActive;},elements:function(){var validator=this,rulesCache={};return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){if(!this.name&&validator.settings.debug&&window.console){console.error("%o has no name assigned",this);}
if(this.name in rulesCache||!validator.objectLength($(this).rules())){return false;}
rulesCache[this.name]=true;return true;});},clean:function(selector){return $(selector)[0];},errors:function(){var errorClass=this.settings.errorClass.split(" ").join(".");return $(this.settings.errorElement+"."+errorClass,this.errorContext);},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([]);},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers);},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element);},elementValue:function(element){var val,$element=$(element),type=$element.attr("type");if(type==="radio"||type==="checkbox"){return $("input[name='"+$element.attr("name")+"']:checked").val();}
val=$element.val();if(typeof val==="string"){return val.replace(/\r/g,"");}
return val;},check:function(element){element=this.validationTargetFor(this.clean(element));var rules=$(element).rules(),rulesCount=$.map(rules,function(n,i){return i;}).length,dependencyMismatch=false,val=this.elementValue(element),result,method,rule;for(method in rules){rule={method:method,parameters:rules[method]};try{result=$.validator.methods[method].call(this,val,element,rule.parameters);if(result==="dependency-mismatch"&&rulesCount===1){dependencyMismatch=true;continue;}
dependencyMismatch=false;if(result==="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return;}
if(!result){this.formatAndAdd(element,rule);return false;}}catch(e){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+element.id+", check the '"+rule.method+"' method.",e);}
throw e;}}
if(dependencyMismatch){return;}
if(this.objectLength(rules)){this.successList.push(element);}
return true;},customDataMessage:function(element,method){return $(element).data("msg"+method[0].toUpperCase()+
method.substring(1).toLowerCase())||$(element).data("msg");},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor===String?m:m[method]);},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined){return arguments[i];}}
return undefined;},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customDataMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>");},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message==="function"){message=message.call(this,rule.parameters,element);}else if(theregex.test(message)){message=$.validator.format(message.replace(theregex,"{$1}"),rule.parameters);}
this.errorList.push({message:message,element:element,method:rule.method});this.errorMap[element.name]=message;this.submitted[element.name]=message;},addWrapper:function(toToggle){if(this.settings.wrapper){toToggle=toToggle.add(toToggle.parent(this.settings.wrapper));}
return toToggle;},defaultShowErrors:function(){var i,elements,error;for(i=0;this.errorList[i];i++){error=this.errorList[i];if(this.settings.highlight){this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass);}
this.showLabel(error.element,error.message);}
if(this.errorList.length){this.toShow=this.toShow.add(this.containers);}
if(this.settings.success){for(i=0;this.successList[i];i++){this.showLabel(this.successList[i]);}}
if(this.settings.unhighlight){for(i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass);}}
this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show();},validElements:function(){return this.currentElements.not(this.invalidElements());},invalidElements:function(){return $(this.errorList).map(function(){return this.element;});},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);label.html(message);}else{label=$("<"+this.settings.errorElement+">").attr("for",this.idOrName(element)).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();}
if(!this.labelContainer.append(label).length){if(this.settings.errorPlacement){this.settings.errorPlacement(label,$(element));}else{label.insertAfter(element);}}}
if(!message&&this.settings.success){label.text("");if(typeof this.settings.success==="string"){label.addClass(this.settings.success);}else{this.settings.success(label,element);}}
this.toShow=this.toShow.add(label);},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr("for")===name;});},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name);},validationTargetFor:function(element){if(this.checkable(element)){element=this.findByName(element.name).not(this.settings.ignore)[0];}
return element;},checkable:function(element){return(/radio|checkbox/i).test(element.type);},findByName:function(name){return $(this.currentForm).find("[name='"+name+"']");},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case"select":return $("option:selected",element).length;case"input":if(this.checkable(element)){return this.findByName(element.name).filter(":checked").length;}}
return value.length;},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true;},dependTypes:{"boolean":function(param){return param;},"string":function(param,element){return!!$(param,element.form).length;},"function":function(param,element){return param(element);}},optional:function(element){var val=this.elementValue(element);return!$.validator.methods.required.call(this,val,element)&&"dependency-mismatch";},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true;}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0;}
delete this.pending[element.name];if(valid&&this.pendingRequest===0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false;}else if(!valid&&this.pendingRequest===0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false;}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")});}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){if(className.constructor===String){this.classRuleSettings[className]=rules;}else{$.extend(this.classRuleSettings,className);}},classRules:function(element){var rules={},classes=$(element).attr("class");if(classes){$.each(classes.split(" "),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this]);}});}
return rules;},attributeRules:function(element){var rules={},$element=$(element),type=element.getAttribute("type"),method,value;for(method in $.validator.methods){if(method==="required"){value=element.getAttribute(method);if(value===""){value=true;}
value=!!value;}else{value=$element.attr(method);}
if(/min|max/.test(method)&&(type===null||/number|range|text/.test(type))){value=Number(value);}
if(value||value===0){rules[method]=value;}else if(type===method&&type!=="range"){rules[method]=true;}}
if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength;}
return rules;},dataRules:function(element){var method,value,rules={},$element=$(element);for(method in $.validator.methods){value=$element.data("rule"+method[0].toUpperCase()+method.substring(1).toLowerCase());if(value!==undefined){rules[method]=value;}}
return rules;},staticRules:function(element){var rules={},validator=$.data(element.form,"validator");if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{};}
return rules;},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return;}
if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break;}
if(keepRule){rules[prop]=val.param!==undefined?val.param:true;}else{delete rules[prop];}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter;});$.each(["minlength","maxlength"],function(){if(rules[this]){rules[this]=Number(rules[this]);}});$.each(["rangelength","range"],function(){var parts;if(rules[this]){if($.isArray(rules[this])){rules[this]=[Number(rules[this][0]),Number(rules[this][1])];}else if(typeof rules[this]==="string"){parts=rules[this].split(/[\s,]+/);rules[this]=[Number(parts[0]),Number(parts[1])];}}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max;}
if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength;}}
return rules;},normalizeRule:function(data){if(typeof data==="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true;});data=transformed;}
return data;},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!==undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name));}},methods:{required:function(value,element,param){if(!this.depend(param,element)){return"dependency-mismatch";}
if(element.nodeName.toLowerCase()==="select"){var val=$(element).val();return val&&val.length>0;}
if(this.checkable(element)){return this.getLength(value,element)>0;}
return $.trim(value).length>0;},email:function(value,element){return this.optional(element)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);},url:function(value,element){return this.optional(element)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value).toString());},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value);},creditcard:function(value,element){if(this.optional(element)){return"dependency-mismatch";}
if(/[^0-9 \-]+/.test(value)){return false;}
var nCheck=0,nDigit=0,bEven=false,n,cDigit;value=value.replace(/\D/g,"");if(value.length<13||value.length>19){return false;}
for(n=value.length-1;n>=0;n--){cDigit=value.charAt(n);nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9){nDigit-=9;}}
nCheck+=nDigit;bEven=!bEven;}
return(nCheck%10)===0;},minlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length>=param;},maxlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length<=param;},rangelength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||(length>=param[0]&&length<=param[1]);},min:function(value,element,param){return this.optional(element)||value>=param;},max:function(value,element,param){return this.optional(element)||value<=param;},range:function(value,element,param){return this.optional(element)||(value>=param[0]&&value<=param[1]);},equalTo:function(value,element,param){var target=$(param);if(this.settings.onfocusout){target.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid();});}
return value===target.val();},remote:function(value,element,param){if(this.optional(element)){return"dependency-mismatch";}
var previous=this.previousValue(element),validator,data;if(!this.settings.messages[element.name]){this.settings.messages[element.name]={};}
previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param==="string"&&{url:param}||param;if(previous.old===value){return previous.valid;}
previous.old=value;validator=this;this.startRequest(element);data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,context:validator.currentForm,success:function(response){var valid=response===true||response==="true",errors,message,submitted;validator.settings.messages[element.name].remote=previous.originalMessage;if(valid){submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);delete validator.invalid[element.name];validator.showErrors();}else{errors={};message=response||validator.defaultMessage(element,"remote");errors[element.name]=previous.message=$.isFunction(message)?message(value):message;validator.invalid[element.name]=true;validator.showErrors(errors);}
previous.valid=valid;validator.stopRequest(element,valid);}},param));return"pending";}}});$.format=function deprecated(){throw"$.format has been deprecated. Please use $.validator.format instead.";};}(jQuery));(function($){var pendingRequests={},ajax;if($.ajaxPrefilter){$.ajaxPrefilter(function(settings,_,xhr){var port=settings.port;if(settings.mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}
pendingRequests[port]=xhr;}});}else{ajax=$.ajax;$.ajax=function(settings){var mode=("mode"in settings?settings:$.ajaxSettings).mode,port=("port"in settings?settings:$.ajaxSettings).port;if(mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}
pendingRequests[port]=ajax.apply(this,arguments);return pendingRequests[port];}
return ajax.apply(this,arguments);};}}(jQuery));(function($){$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments);}});}});}(jQuery));!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,g,e=this;if(e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",onBeforeChange:null,onAfterChange:null,onInit:null,onReInit:null,pauseOnHover:!0,pauseOnDotsHover:!1,responsive:null,rtl:!1,slide:"div",slidesToShow:1,slidesToScroll:1,speed:300,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,waitForAnimate:!0},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.paused=!1,e.positionProp=null,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.windowWidth=0,e.windowTimer=null,e.options=a.extend({},e.defaults,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,f=e.options.responsive||null,f&&f.length>-1){for(g in f)f.hasOwnProperty(g)&&(e.breakpoints.push(f[g].breakpoint),e.breakpointSettings[f[g].breakpoint]=f[g].settings);e.breakpoints.sort(function(a,b){return b-a})}e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.init()}var b=0;return c}(),b.prototype.addSlide=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateSlide=function(b,c){var d={},e=this;if(1===e.options.slidesToShow&&e.options.adaptiveHeight===!0&&e.options.vertical===!1){var f=e.$slides.eq(e.currentSlide).outerHeight(!0);e.$list.animate({height:f},e.options.speed)}e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}}):(e.applyTransition(),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=null!=c.options.asNavFor?a(c.options.asNavFor).getSlick():null;null!=d&&d.slideHandler(b,!0)},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow=a(b.options.prevArrow),b.$nextArrow=a(b.options.nextArrow),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.appendTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled"))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("index",b)}),b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),b.options.centerMode===!0&&(b.options.slidesToScroll=1,b.options.slidesToShow=3),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.options.accessibility===!0&&b.$list.prop("tabIndex",0),b.setSlideClasses("number"==typeof this.currentSlide?this.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.checkResponsive=function(){var c,d,b=this;if(b.originalSettings.responsive&&b.originalSettings.responsive.length>-1&&null!==b.originalSettings.responsive){d=null;for(c in b.breakpoints)b.breakpoints.hasOwnProperty(c)&&a(window).width()<b.breakpoints[c]&&(d=b.breakpoints[c]);null!==d?null!==b.activeBreakpoint?d!==b.activeBreakpoint&&(b.activeBreakpoint=d,b.options=a.extend({},b.originalSettings,b.breakpointSettings[d]),b.refresh()):(b.activeBreakpoint=d,b.options=a.extend({},b.originalSettings,b.breakpointSettings[d]),b.refresh()):null!==b.activeBreakpoint&&(b.activeBreakpoint=null,b.options=b.originalSettings,b.refresh())}},b.prototype.changeSlide=function(b){var e,f,g,c=this,d=a(b.target);switch(d.is("a")&&b.preventDefault(),g=0!==c.slideCount%c.options.slidesToScroll,e=g?0:(c.slideCount-c.currentSlide)%c.options.slidesToScroll,b.data.message){case"previous":f=0===e?c.options.slidesToScroll:c.options.slidesToShow-e,c.slideCount>c.options.slidesToShow&&c.slideHandler(c.currentSlide-f);break;case"next":f=0===e?c.options.slidesToScroll:e,c.slideCount>c.options.slidesToShow&&c.slideHandler(c.currentSlide+f);break;case"index":var h=0===b.data.index?0:b.data.index||a(b.target).parent().index()*c.options.slidesToScroll;c.slideHandler(h);default:return!1}},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(){var b=this;b.autoPlayClear(),b.touchObject={},a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&"object"!=typeof b.options.prevArrow&&b.$prevArrow.remove(),b.$nextArrow&&"object"!=typeof b.options.nextArrow&&b.$nextArrow.remove(),b.$slides.parent().hasClass("slick-track")&&b.$slides.unwrap().unwrap(),b.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("index").css({position:"",left:"",top:"",zIndex:"",opacity:"",width:""}),b.$slider.removeClass("slick-slider"),b.$slider.removeClass("slick-initialized"),b.$list.off(".slick"),a(window).off(".slick-"+b.instanceUid),a(document).off(".slick-"+b.instanceUid)},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b,c){var d=this;d.cssTransitions===!1?(d.$slides.eq(b).css({zIndex:1e3}),d.$slides.eq(b).animate({opacity:1},d.options.speed,d.options.easing,c),d.$slides.eq(a).animate({opacity:0},d.options.speed,d.options.easing)):(d.applyTransition(b),d.applyTransition(a),d.$slides.eq(b).css({opacity:1,zIndex:1e3}),d.$slides.eq(a).css({opacity:0}),c&&setTimeout(function(){d.disableTransition(b),d.disableTransition(a),c.call()},d.options.speed))},b.prototype.filterSlides=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this;return Math.ceil(a.slideCount/a.options.slidesToScroll)-1},b.prototype.getLeft=function(a){var c,d,g,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideCount%b.options.slidesToShow*b.slideWidth,e=-1*b.slideCount%b.options.slidesToShow*d)):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e,b.options.variableWidth===!0&&(g=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=g[0]?-1*g[0].offsetLeft:0,b.options.centerMode===!0&&(g=b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=g[0]?-1*g[0].offsetLeft:0,c+=(b.$list.width()-g.outerWidth())/2)),c},b.prototype.getSlideCount=function(){var c,b=this;if(b.options.swipeToSlide===!0){var d=null;return b.$slideTrack.find(".slick-slide").each(function(c,e){return e.offsetLeft+a(e).outerWidth()/2>-1*b.swipeLeft?(d=e,!1):void 0}),c=Math.abs(a(d).attr("index")-b.currentSlide)}return b.options.slidesToScroll},b.prototype.init=function(){var b=this;a(b.$slider).hasClass("slick-initialized")||(a(b.$slider).addClass("slick-initialized"),b.buildOut(),b.setProps(),b.startLoad(),b.loadSlider(),b.initializeEvents(),b.checkResponsive()),null!==b.options.onInit&&b.options.onInit.call(this,b)},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",function(){b.paused=!0,b.autoPlayClear()}).on("mouseleave.slick",function(){b.paused=!1,b.autoPlay()})},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler.bind(this)),b.options.pauseOnHover===!0&&b.options.autoplay===!0&&(b.$list.on("mouseenter.slick",function(){b.paused=!0,b.autoPlayClear()}),b.$list.on("mouseleave.slick",function(){b.paused=!1,b.autoPlay()})),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.options.slide,b.$slideTrack).on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,function(){b.checkResponsive(),b.setPosition()}),a(window).on("resize.slick.slick-"+b.instanceUid,function(){a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.setPosition()},50))}),a("*[draggable!=true]",b.$slideTrack).on("dragstart",function(a){a.preventDefault()}),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;37===a.keyCode?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.changeSlide({data:{message:"next"}})},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy");b.load(function(){b.animate({opacity:1},200)}).css({opacity:0}).attr("src",c).removeAttr("data-lazy").removeClass("slick-loading")})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.postSlide=function(a){var b=this;null!==b.options.onAfterChange&&b.options.onAfterChange.call(this,b,a),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]").length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(){var b=this,c=b.currentSlide;b.destroy(),a.extend(b,b.initials),b.currentSlide=c,b.init()},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.options.focusOnSelect===!0&&a(b.options.slide,b.$slideTrack).on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),null!==b.options.onReInit&&b.options.onReInit.call(this,b)},b.prototype.removeSlide=function(a,b){var c=this;return"boolean"==typeof a?(b=a,a=b===!0?0:c.slideCount-1):a=b===!0?--a:a,c.slideCount<1||0>a||a>c.slideCount-1?!1:(c.unload(),c.$slideTrack.children(this.options.slide).eq(a).remove(),c.$slides=c.$slideTrack.children(this.options.slide),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.append(c.$slides),c.$slidesCache=c.$slides,c.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?a+"px":"0px",e="top"==b.positionProp?a+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var b=this;if(b.options.vertical===!1?b.options.centerMode===!0&&b.$list.css({padding:"0px "+b.options.centerPadding}):(b.$list.height(b.$slides.first().outerHeight(!0)*b.options.slidesToShow),b.options.centerMode===!0&&b.$list.css({padding:b.options.centerPadding+" 0px"})),b.listWidth=b.$list.width(),b.listHeight=b.$list.height(),b.options.vertical===!1&&b.options.variableWidth===!1)b.slideWidth=Math.ceil(b.listWidth/b.options.slidesToShow),b.$slideTrack.width(Math.ceil(b.slideWidth*b.$slideTrack.children(".slick-slide").length));else if(b.options.variableWidth===!0){var c=0;b.slideWidth=Math.ceil(b.listWidth/b.options.slidesToShow),b.$slideTrack.children(".slick-slide").each(function(){c+=Math.ceil(a(this).outerWidth(!0))}),b.$slideTrack.width(Math.ceil(c)+1)}else b.slideWidth=Math.ceil(b.listWidth),b.$slideTrack.height(Math.ceil(b.$slides.first().outerHeight(!0)*b.$slideTrack.children(".slick-slide").length));var d=b.$slides.first().outerWidth(!0)-b.$slides.first().width();b.options.variableWidth===!1&&b.$slideTrack.children(".slick-slide").width(b.slideWidth-d)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:800,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:800,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:900,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade()},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;b.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"),d=b.$slider.find(".slick-slide"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active"):d.length<=b.options.slidesToShow?d.addClass("slick-active"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.selectHandler=function(b){var c=this,d=parseInt(a(b.target).parents(".slick-slide").attr("index"));return d||(d=0),c.slideCount<=c.options.slidesToShow?(c.$slider.find(".slick-slide").removeClass("slick-active"),c.$slides.eq(d).addClass("slick-active"),c.options.centerMode===!0&&(c.$slider.find(".slick-slide").removeClass("slick-center"),c.$slides.eq(d).addClass("slick-center")),c.asNavFor(d),void 0):(c.slideHandler(d),void 0)},b.prototype.slideHandler=function(a,b){var c,d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),c=a,h=i.getLeft(c),f=i.getLeft(i.currentSlide),g=1===i.options.slidesToScroll?0:i.options.slidesToShow-Math.round(i.slideCount/i.options.slidesToScroll),i.currentLeft=null===i.swipeLeft?f:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.slideCount-i.options.slidesToShow+g)?(i.options.fade===!1&&(c=i.currentSlide,i.animateSlide(f,function(){i.postSlide(c)})),void 0):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?(i.options.fade===!1&&(c=i.currentSlide,i.animateSlide(f,function(){i.postSlide(c)})),void 0):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),d=0>c?0!==i.slideCount%i.options.slidesToScroll?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+c:c>=i.slideCount?0!==i.slideCount%i.options.slidesToScroll?0:c-i.slideCount:c,i.animating=!0,null!==i.options.onBeforeChange&&a!==i.currentSlide&&i.options.onBeforeChange.call(this,i,i.currentSlide,d),e=i.currentSlide,i.currentSlide=d,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(i.fadeSlide(e,d,function(){i.postSlide(d)}),void 0):(i.animateSlide(h,function(){i.postSlide(d)}),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?"left":360>=d&&d>=315?"left":d>=135&&225>=d?"right":"vertical"},b.prototype.swipeEnd=function(){var b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":b.slideHandler(b.currentSlide+b.getSlideCount()),b.currentDirection=0,b.touchObject={};break;case"right":b.slideHandler(b.currentSlide-b.getSlideCount()),b.currentDirection=1,b.touchObject={}}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var c,d,e,f,b=this;return f=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||f&&1!==f.length?!1:(c=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==f?f[0].pageX:a.clientX,b.touchObject.curY=void 0!==f?f[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),d=b.swipeDirection(),"vertical"!==d?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),e=b.touchObject.curX>b.touchObject.startX?1:-1,b.swipeLeft=b.options.vertical===!1?c+b.touchObject.swipeLength*e:c+b.touchObject.swipeLength*(b.$list.height()/b.listWidth)*e,b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&"object"!=typeof b.options.prevArrow&&b.$prevArrow.remove(),b.$nextArrow&&"object"!=typeof b.options.nextArrow&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible").css("width","")},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.options.infinite!==!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.removeClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")):a.currentSlide>a.slideCount-a.options.slidesToShow+b&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active"))},a.fn.slick=function(a){var c=this;return c.each(function(c,d){d.slick=new b(d,a)})},a.fn.slickAdd=function(a,b,c){var d=this;return d.each(function(d,e){e.slick.addSlide(a,b,c)})},a.fn.slickCurrentSlide=function(){var a=this;return a.get(0).slick.getCurrent()},a.fn.slickFilter=function(a){var b=this;return b.each(function(b,c){c.slick.filterSlides(a)})},a.fn.slickGoTo=function(a){var b=this;return b.each(function(b,c){c.slick.changeSlide({data:{message:"index",index:parseInt(a)}})})},a.fn.slickNext=function(){var a=this;return a.each(function(a,b){b.slick.changeSlide({data:{message:"next"}})})},a.fn.slickPause=function(){var a=this;return a.each(function(a,b){b.slick.autoPlayClear(),b.slick.paused=!0})},a.fn.slickPlay=function(){var a=this;return a.each(function(a,b){b.slick.paused=!1,b.slick.autoPlay()})},a.fn.slickPrev=function(){var a=this;return a.each(function(a,b){b.slick.changeSlide({data:{message:"previous"}})})},a.fn.slickRemove=function(a,b){var c=this;return c.each(function(c,d){d.slick.removeSlide(a,b)})},a.fn.slickGetOption=function(a){var b=this;return b.get(0).slick.options[a]},a.fn.slickSetOption=function(a,b,c){var d=this;return d.each(function(d,e){e.slick.options[a]=b,c===!0&&(e.slick.unload(),e.slick.reinit())})},a.fn.slickUnfilter=function(){var a=this;return a.each(function(a,b){b.slick.unfilterSlides()})},a.fn.unslick=function(){var a=this;return a.each(function(a,b){b.slick&&b.slick.destroy()})},a.fn.getSlick=function(){var a=null,b=this;return b.each(function(b,c){a=c.slick}),a}});(function($){'use strict';function TileSlide(node,options){this.node=node;this.pause=false;this.tiles=4;this.timing=null;this.current=1;this.isClicked=false;this.panels=[].slice.call(document.querySelectorAll('.s-panel'));this.slides=[].slice.call(document.querySelectorAll('.container-fluidss'));this.panelsCount=this.panels.length;this.options={dots:false,interval:5000};this.options=$.extend({},this.options,options);this.init();};TileSlide.prototype.addDots=function(){this.dots='<ul class="tileslide-dots"></ul>';$(this.node).append(this.dots);this.dots=$(this.node).find('.tileslide-dots');var $sliderUl=$('.tileslide-dots');var self=this;for(var i=0;i<this.slides.length;i++){$sliderUl.append('<li><button class="button-slider"></button></li>');};var firstDot=$sliderUl.find('.button-slider')[0];$(firstDot).addClass('pressed');function dotClick(node){for(var i=0;i<self.slides.length;i++){if(node===$dots[i]){self.navigation(i);}};};var $dots=$('.tileslide-dots li button');$dots.on('click touchend',function(){self.isClicked=true;dotClick(this);});};TileSlide.prototype.init=function(){var self=this;this.isAnimating=false;this.transforms={'effect-1':['translate3d(-'+(window.innerWidth/2+10)+'px, 0, 0)','translate3d('+(window.innerWidth/2+10)+'px, 0, 0)','translate3d(-'+(window.innerWidth/2+10)+'px, 0, 0)','translate3d('+(window.innerWidth/2+10)+'px, 0, 0)']};this.panels.forEach(function(panel){var img=panel.querySelector('img'),imgInsertion='';for(var i=0;i<self.tiles;i++){imgInsertion+='<div class="bg-tile"><div class="bg-img"><img src="'+$(img).attr('src')+'" /></div></div>';}
if($(panel).children('img').length>0){panel.removeChild(img);}
panel.innerHTML=imgInsertion+panel.innerHTML;});this.prev=document.createElement('div');this.next=document.createElement('div');this.prev.className='slick-prev';this.next.className='slick-next';this.node.appendChild(this.prev);this.node.appendChild(this.next);if(this.options.dots===true){this.addDots();};this.slides[0].className='container-fluidss current';this.events();};TileSlide.prototype.navigation=function(direction){var self=this;if(self.isAnimating===true){return false};self.isAnimating=true;var currentPanel;var nextPanel;var $dots=this.dots;if(direction==='prev'){currentPanel=this.slides[this.current-1];this.current=this.current===1?this.panelsCount:this.current-1;var nextPanel=this.slides[this.current-1];}else if(direction==='next'){currentPanel=this.slides[this.current-1];this.current=this.current===this.panelsCount?1:this.current+1;var nextPanel=this.slides[this.current-1];}else{currentPanel=this.slides[this.current-1];this.current=direction+1;var nextPanel=this.slides[direction];};nextPanel.className='container-fluidss active';self.applyTransforms(currentPanel);if(self.options.dots===true){var currentDot=$dots.find('button')[this.current-1];var $dotButtons=$dots.find('button');for(var j=0;j<$dotButtons.length;j++){if(j===(this.current-1)){$($dotButtons[j]).addClass('pressed');}else{$($dotButtons[j]).removeClass('pressed');};};};currentPanel.querySelector('.rowss').style.visibility='hidden';if(currentPanel.querySelector('iframe')){currentPanel.querySelector('iframe').style.visibility='hidden';};currentPanel.querySelector('.pattern').style.visibility='hidden';var currTransTotal=0,onTransitionEnd=function(event){currTransTotal++;if(currTransTotal<self.tiles){return false};this.removeEventListener('transitionend',onTransitionEnd);currentPanel.className='container-fluidss';currentPanel.querySelector('.rowss').style.visibility='visible';if(currentPanel.querySelector('iframe')){currentPanel.querySelector('iframe').style.visibility='visible';};currentPanel.querySelector('.pattern').style.visibility='visible';nextPanel.className='container-fluidss current';self.resetTransforms(currentPanel);self.isAnimating=false;if((self.isAnimating===false)&&(self.isClicked===true)){clearInterval(self.timing);self.isClicked=false;self.runSlider();};};if(true){currentPanel.addEventListener('webkitTransitionEnd',onTransitionEnd);currentPanel.addEventListener('transitionend',onTransitionEnd);currentPanel.addEventListener('oTransitionEnd otransitionend',onTransitionEnd);};};TileSlide.prototype.stopSlide=function(){var self=this;clearInterval(self.timing);this.pause=true;};TileSlide.prototype.playSlide=function(){};TileSlide.prototype.runSlider=function(){var self=this;self.timing=setInterval(function(){if((self.pause===false)&&(self.isClicked===false)){self.navigation('next');};},self.options.interval);};TileSlide.prototype.applyTransforms=function(panel){var self=this;[].slice.call(panel.querySelectorAll('div.bg-img')).forEach(function(tile,pos){tile.style.WebkitTransform=self.transforms['effect-1'][pos];tile.style.transform=self.transforms['effect-1'][pos];});};TileSlide.prototype.resetTransforms=function(panel){[].slice.call(panel.querySelectorAll('div.bg-img')).forEach(function(tile,pos){tile.style.WebkitTransform='none';tile.style.transform='none';});};TileSlide.prototype.events=function(){var self=this;var scrollDirection='';var prevButt=document.querySelector('.slick-prev');var nextButt=document.querySelector('.slick-next');prevButt.addEventListener('click',function(){self.navigation('prev');self.isClicked=true;});prevButt.addEventListener('touchstart',function(){self.navigation('prev');self.isClicked=true;});nextButt.addEventListener('click',function(){self.navigation('next');self.isClicked=true;});nextButt.addEventListener('touchstart',function(){self.navigation('next');self.isClicked=true;});$(window).scroll(function(event){if(($(document).scrollTop()>=$(self.node).height())&&(self.pause===false)){self.stopSlide();}else if((self.isAnimating===false)&&(self.pause===true)&&($(document).scrollTop()<=$(self.node).height())){self.pause=false;self.runSlider();};});$(window).load(function(){self.runSlider();});};window.TileSlide=TileSlide;})(jQuery);$(document).ready(function(){'use strict';function inViewport(el){var offsetTop=$(window).scrollTop();var windowHeight=window.innerHeight;var elementOffsetTop=$(el).offset().top;if((offsetTop+windowHeight)>elementOffsetTop){return true;}else{return false;}};function EventAnimate(nodes){this.$nodes=nodes;this.options={minDuration:0.4,maxDuration:1,durationIncrement:0,singleIncrement:0};this.init();};EventAnimate.prototype.animateEvents=function(){var durationIncr=this.options.minDuration;var self=this;this.options.singleIncrement=(this.options.maxDuration-this.options.minDuration)/9;this.items.each(function(){var nodeOffsetTop=$(this).scrollTop();if(!$(this).hasClass('shown')&&inViewport(this)){if($(window).width()<768){this.style.WebkitAnimationDuration='0.5s';this.style.MozAnimationDuration='0.5s';this.style.animationDuration='0.5s';}else{this.style.WebkitAnimationDuration=durationIncr+'s';this.style.MozAnimationDuration=durationIncr+'s';this.style.animationDuration=durationIncr+'s';};var selfy=this;$(selfy).addClass('active');setTimeout(function(){$(selfy).addClass('shown');$(selfy).removeClass('active');},850);durationIncr+=self.options.singleIncrement;};});};EventAnimate.prototype.showVisibleEvents=function(){var visibleEventsCount=0;var durationIncr=0;var randomDuration;var mDuration=this.options.minDuration;for(var i=0;i<this.itemsLength;i++){if(inViewport(this.items[i])){visibleEventsCount++;};};this.options.durationIncrement=(this.options.maxDuration-this.options.minDuration)/visibleEventsCount;durationIncr=mDuration;for(var i=0;i<this.itemsLength;i++){if(inViewport(this.items[i])){this.items[i].style.WebkitAnimationDuration=durationIncr+'s';this.items[i].style.MozAnimationDuration=durationIncr+'s';this.items[i].style.animationDuration=durationIncr+'s';$(this.items[i]).addClass('active');var self=this;setTimeout(function(){$(self.items[i]).addClass('shown');$(self.items[i]).removeClass('active');},1000);durationIncr+=this.options.durationIncrement;};};};EventAnimate.prototype.init=function(){var self=this;this.items=self.$nodes;this.itemsLength=self.items.length;window.addEventListener('scroll',function(){self.animateEvents();});this.showVisibleEvents();};window.EventAnimate=EventAnimate;});(function($){'use strict';var tinyAnimations={buttonSlider:function(nodes){var $nodes=nodes;$nodes.on('mousedown',function(){$(this).addClass('pressed');});},buttonArrow:function(nodes){var $nodes=nodes;$nodes.on('mousedown',function(){$(this).addClass('pressed');console.log(this,'pressed');});},radioButton:function(nodes){var $nodes=nodes;$nodes.on('mousedown',function(){var idRadio=$(this).attr('for');var $checkB=$(document.getElementById(idRadio));if(!($(this).hasClass('off-lb'))&&!($checkB.is(':checked'))&&!($(this).hasClass('hover-lb'))){$(this).addClass('pressed-lb');};});$nodes.on('click touchend',function(event){var idRadio=$(this).attr('for');var $checkB=$(document.getElementById(idRadio));if(!($(this).hasClass('off-lb'))&&!($checkB.is(':checked'))&&!($(this).hasClass('hover-lb'))){$(this).removeClass('pressed-lb');$(this).addClass('active');};if($(this).hasClass('off-lb')){event.preventDefault();};});},dropdownHidden:function(nodes){var $nodes=nodes;$nodes.on('click touchend',function(event){var $target=$(event.target).closest('.button-dropdown');if($target.hasClass('pressed')){$target.find('.hidden-dv').removeClass('hide');}else{$target.find('.hidden-dv').addClass('hide');};});},checkboxButton:function(nodes){var $nodes=nodes;$nodes.on('click touchend',function(event){var idRadio=$(this).attr('for');var $checkB=$(document.getElementById(idRadio));if(!($(this).hasClass('off-chb'))&&!($checkB.is(':checked'))&&!($(this).hasClass('hover-lb'))){$(this).addClass('active');};if($(this).hasClass('off-lb')){event.preventDefault();};});},initEventClasses:function(){var $tinyObj={$button1:$('.read-more'),$button2:$('.left-pag, .right-pag'),$buttonSlider:$('.button-slider'),$buttonArrowL:$('.button-arrow-left'),$buttonArrowR:$('.button-arrow-right'),$buttonFilterChecked:$('.button-filter.checked'),$buttonFilterUnchecked:$('.button-filter.unchecked'),$buttonMoreBlogs:$('.button-more'),$buttonDropDown:$('.button-dropdown'),$dropDownList:$('.dropdown-list .button-dropdown-text'),$tab:$('.tab-custom'),$menu:$('.mob-menu li a'),$radio:$('.radio-b input, .radio-b label'),$checkbox:$('.checkbox-b input, .checkbox-b label'),$getIn:$('.get-in')};for(var key in $tinyObj){$tinyObj[key].on('click touchend',function(event){if(!($(event.currentTarget).hasClass('off'))&&!($(event.currentTarget).hasClass('hover'))&&!($(event.currentTarget).hasClass('pressed'))){$(event.currentTarget).addClass('pressed');if($(event.currentTarget).hasClass('left-pag')||$(event.currentTarget).hasClass('right-pag')){setTimeout(function(){$(event.currentTarget).removeClass('pressed');},250);};}else if($(event.currentTarget).hasClass('pressed')){$(event.currentTarget).removeClass('pressed');};});};}};window.tinyAnimations=tinyAnimations;tinyAnimations.initEventClasses();tinyAnimations.dropdownHidden($('.button-dropdown.hidd'));})(jQuery);;(function($,window,document,undefined)
{'use strict';var cssTransitionSupport=function()
{var s=document.body||document.documentElement,s=s.style;if(s.WebkitTransition=='')return'-webkit-';if(s.MozTransition=='')return'-moz-';if(s.OTransition=='')return'-o-';if(s.transition=='')return'';return false;},isCssTransitionSupport=cssTransitionSupport()===false?false:true,cssTransitionTranslateX=function(element,positionX,speed)
{var options={},prefix=cssTransitionSupport();options[prefix+'transform']='translateX('+positionX+')';options[prefix+'transition']=prefix+'transform '+speed+'s linear';element.css(options);},hasTouch=('ontouchstart'in window),hasPointers=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,wasTouched=function(event)
{if(hasTouch)
return true;if(!hasPointers||typeof event==='undefined'||typeof event.pointerType==='undefined')
return false;if(typeof event.MSPOINTER_TYPE_MOUSE!=='undefined')
{if(event.MSPOINTER_TYPE_MOUSE!=event.pointerType)
return true;}
else
if(event.pointerType!='mouse')
return true;return false;};$.fn.imageLightbox=function(options)
{var options=$.extend({selector:'id="imagelightbox"',allowedTypes:'png|jpg|jpeg|gif',animationSpeed:250,preloadNext:true,enableKeyboard:true,quitOnEnd:false,quitOnImgClick:false,quitOnDocClick:true,onStart:false,onEnd:false,onLoadStart:false,onLoadEnd:false},options),targets=$([]),target=$(),image=$(),imageWidth=0,imageHeight=0,swipeDiff=0,inProgress=false,isTargetValid=function(element)
{return $(element).prop('tagName').toLowerCase()=='a'&&(new RegExp('\.('+options.allowedTypes+')$','i')).test($(element).attr('href'));},setImage=function()
{if(!image.length)return true;var screenWidth=$(window).width()*0.8,screenHeight=$(window).height()*0.9,tmpImage=new Image();tmpImage.src=image.attr('src');tmpImage.onload=function()
{imageWidth=tmpImage.width;imageHeight=tmpImage.height;if(imageWidth>screenWidth||imageHeight>screenHeight)
{var ratio=imageWidth/imageHeight>screenWidth/screenHeight?imageWidth/screenWidth:imageHeight/screenHeight;imageWidth/=ratio;imageHeight/=ratio;}
image.css({'width':imageWidth+'px','height':imageHeight+'px','top':($(window).height()-imageHeight)/2+'px','left':($(window).width()-imageWidth)/2+'px'});};},loadImage=function(direction)
{if(inProgress)return false;direction=typeof direction==='undefined'?false:direction=='left'?1:-1;if(image.length)
{if(direction!==false&&(targets.length<2||(options.quitOnEnd===true&&((direction===-1&&targets.index(target)==0)||(direction===1&&targets.index(target)==targets.length-1)))))
{quitLightbox();return false;}
var params={'opacity':0};if(isCssTransitionSupport)cssTransitionTranslateX(image,(100*direction)-swipeDiff+'px',options.animationSpeed/1000);else params.left=parseInt(image.css('left'))+100*direction+'px';image.animate(params,options.animationSpeed,function(){removeImage();});swipeDiff=0;}
inProgress=true;if(options.onLoadStart!==false)options.onLoadStart();setTimeout(function()
{image=$('<img '+options.selector+' />').attr('src',target.attr('href')).load(function()
{image.appendTo('body');setImage();var params={'opacity':1};image.css('opacity',0);if(isCssTransitionSupport)
{cssTransitionTranslateX(image,-100*direction+'px',0);setTimeout(function(){cssTransitionTranslateX(image,0+'px',options.animationSpeed/1000)},50);}
else
{var imagePosLeft=parseInt(image.css('left'));params.left=imagePosLeft+'px';image.css('left',imagePosLeft-100*direction+'px');}
image.animate(params,options.animationSpeed,function()
{inProgress=false;if(options.onLoadEnd!==false)options.onLoadEnd();});if(options.preloadNext)
{var nextTarget=targets.eq(targets.index(target)+1);if(!nextTarget.length)nextTarget=targets.eq(0);$('<img />').attr('src',nextTarget.attr('href')).load();}}).error(function()
{if(options.onLoadEnd!==false)options.onLoadEnd();})
var swipeStart=0,swipeEnd=0,imagePosLeft=0;image.on(hasPointers?'pointerup MSPointerUp':'click',function(e)
{e.preventDefault();if(options.quitOnImgClick)
{quitLightbox();return false;}
if(wasTouched(e.originalEvent))return true;var posX=(e.pageX||e.originalEvent.pageX)-e.target.offsetLeft;target=targets.eq(targets.index(target)-(imageWidth/2>posX?1:-1));if(!target.length)target=targets.eq(imageWidth/2>posX?targets.length:0);loadImage(imageWidth/2>posX?'left':'right');}).on('touchstart pointerdown MSPointerDown',function(e)
{if(!wasTouched(e.originalEvent)||options.quitOnImgClick)return true;if(isCssTransitionSupport)imagePosLeft=parseInt(image.css('left'));swipeStart=e.originalEvent.pageX||e.originalEvent.touches[0].pageX;}).on('touchmove pointermove MSPointerMove',function(e)
{if(!wasTouched(e.originalEvent)||options.quitOnImgClick)return true;e.preventDefault();swipeEnd=e.originalEvent.pageX||e.originalEvent.touches[0].pageX;swipeDiff=swipeStart-swipeEnd;if(isCssTransitionSupport)cssTransitionTranslateX(image,-swipeDiff+'px',0);else image.css('left',imagePosLeft-swipeDiff+'px');}).on('touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel',function(e)
{if(!wasTouched(e.originalEvent)||options.quitOnImgClick)return true;if(Math.abs(swipeDiff)>50)
{target=targets.eq(targets.index(target)-(swipeDiff<0?1:-1));if(!target.length)target=targets.eq(swipeDiff<0?targets.length:0);loadImage(swipeDiff>0?'right':'left');}
else
{if(isCssTransitionSupport)cssTransitionTranslateX(image,0+'px',options.animationSpeed/1000);else image.animate({'left':imagePosLeft+'px'},options.animationSpeed/2);}});},options.animationSpeed+100);},removeImage=function()
{if(!image.length)return false;image.remove();image=$();},quitLightbox=function()
{if(!image.length)return false;image.animate({'opacity':0},options.animationSpeed,function()
{removeImage();inProgress=false;if(options.onEnd!==false)options.onEnd();});};$(window).on('resize',setImage);if(options.quitOnDocClick)
{$(document).on(hasTouch?'touchend':'click',function(e)
{if(image.length&&!$(e.target).is(image))quitLightbox();})}
if(options.enableKeyboard)
{$(document).on('keyup',function(e)
{if(!image.length)return true;e.preventDefault();if(e.keyCode==27)quitLightbox();if(e.keyCode==37||e.keyCode==39)
{target=targets.eq(targets.index(target)-(e.keyCode==37?1:-1));if(!target.length)target=targets.eq(e.keyCode==37?targets.length:0);loadImage(e.keyCode==37?'left':'right');}});}
$(document).on('click',this.selector,function(e)
{if(!isTargetValid(this))return true;e.preventDefault();if(inProgress)return false;inProgress=false;if(options.onStart!==false)options.onStart();target=$(this);loadImage();});this.each(function()
{if(!isTargetValid(this))return true;targets=targets.add($(this));});this.switchImageLightbox=function(index)
{var tmpTarget=targets.eq(index);if(tmpTarget.length)
{var currentIndex=targets.index(target);target=tmpTarget;loadImage(index<currentIndex?'left':'right');}
return this;};this.quitImageLightbox=function()
{quitLightbox();return this;};return this;};})(jQuery,window,document);;(function($,window,document,undefined){var pluginName='sharrre',defaults={className:'sharrre',share:{googlePlus:false,facebook:false,twitter:false,digg:false,delicious:false,stumbleupon:false,linkedin:false,pinterest:false},shareTotal:0,template:'',title:'',url:document.location.href,text:document.title,urlCurl:'sharrre.php',count:{},total:0,shorterTotal:true,enableHover:true,enableCounter:true,enableTracking:false,hover:function(){},hide:function(){},click:function(){},render:function(){},buttons:{googlePlus:{url:'',urlCount:false,size:'medium',lang:'en-US',annotation:''},facebook:{url:'',urlCount:false,action:'like',layout:'button_count',width:'',send:'false',faces:'false',colorscheme:'',font:'',lang:'en_US'},twitter:{url:'',urlCount:false,count:'horizontal',hashtags:'',via:'',related:'',lang:'en'},digg:{url:'',urlCount:false,type:'DiggCompact'},delicious:{url:'',urlCount:false,size:'medium'},stumbleupon:{url:'',urlCount:false,layout:'1'},linkedin:{url:'',urlCount:false,counter:''},pinterest:{url:'',media:'',description:'',layout:'horizontal'}}},urlJson={googlePlus:"",facebook:"https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",twitter:"http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",digg:"http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",delicious:'http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?',stumbleupon:"",linkedin:"http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",pinterest:"http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?"},loadButton={googlePlus:function(self){var sett=self.options.buttons.googlePlus;$(self.element).find('.buttons').append('<div class="button googleplus"><div class="g-plusone" data-size="'+sett.size+'" data-href="'+(sett.url!==''?sett.url:self.options.url)+'" data-annotation="'+sett.annotation+'"></div></div>');window.___gcfg={lang:self.options.buttons.googlePlus.lang};var loading=0;if(typeof gapi==='undefined'&&loading==0){loading=1;(function(){var po=document.createElement('script');po.type='text/javascript';po.async=true;po.src='//apis.google.com/js/plusone.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(po,s);})();}
else{gapi.plusone.go();}},facebook:function(self){var sett=self.options.buttons.facebook;$(self.element).find('.buttons').append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="'+(sett.url!==''?sett.url:self.options.url)+'" data-send="'+sett.send+'" data-layout="'+sett.layout+'" data-width="'+sett.width+'" data-show-faces="'+sett.faces+'" data-action="'+sett.action+'" data-colorscheme="'+sett.colorscheme+'" data-font="'+sett.font+'" data-via="'+sett.via+'"></div></div>');var loading=0;if(typeof FB==='undefined'&&loading==0){loading=1;(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return;}
js=d.createElement(s);js.id=id;js.src='//connect.facebook.net/'+sett.lang+'/all.js#xfbml=1';fjs.parentNode.insertBefore(js,fjs);}(document,'script','facebook-jssdk'));}
else{FB.XFBML.parse();}},twitter:function(self){var sett=self.options.buttons.twitter;$(self.element).find('.buttons').append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+(sett.url!==''?sett.url:self.options.url)+'" data-count="'+sett.count+'" data-text="'+self.options.text+'" data-via="'+sett.via+'" data-hashtags="'+sett.hashtags+'" data-related="'+sett.related+'" data-lang="'+sett.lang+'">Tweet</a></div>');var loading=0;if(typeof twttr==='undefined'&&loading==0){loading=1;(function(){var twitterScriptTag=document.createElement('script');twitterScriptTag.type='text/javascript';twitterScriptTag.async=true;twitterScriptTag.src='//platform.twitter.com/widgets.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(twitterScriptTag,s);})();}
else{$.ajax({url:'//platform.twitter.com/widgets.js',dataType:'script',cache:true});}},digg:function(self){var sett=self.options.buttons.digg;$(self.element).find('.buttons').append('<div class="button digg"><a class="DiggThisButton '+sett.type+'" rel="nofollow external" href="http://digg.com/submit?url='+encodeURIComponent((sett.url!==''?sett.url:self.options.url))+'"></a></div>');var loading=0;if(typeof __DBW==='undefined'&&loading==0){loading=1;(function(){var s=document.createElement('SCRIPT'),s1=document.getElementsByTagName('SCRIPT')[0];s.type='text/javascript';s.async=true;s.src='//widgets.digg.com/buttons.js';s1.parentNode.insertBefore(s,s1);})();}},delicious:function(self){if(self.options.buttons.delicious.size=='tall'){var css='width:50px;',cssCount='height:35px;width:50px;font-size:15px;line-height:35px;',cssShare='height:18px;line-height:18px;margin-top:3px;';}
else{var css='width:93px;',cssCount='float:right;padding:0 3px;height:20px;width:26px;line-height:20px;',cssShare='float:left;height:20px;line-height:20px;';}
var count=self.shorterTotal(self.options.count.delicious);if(typeof count==="undefined"){count=0;}
$(self.element).find('.buttons').append('<div class="button delicious"><div style="'+css+'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;">'+'<div style="'+cssCount+'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">'+count+'</div>'+'<div style="'+cssShare+'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;">'+'<img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>');$(self.element).find('.delicious').on('click',function(){self.openPopup('delicious');});},stumbleupon:function(self){var sett=self.options.buttons.stumbleupon;$(self.element).find('.buttons').append('<div class="button stumbleupon"><su:badge layout="'+sett.layout+'" location="'+(sett.url!==''?sett.url:self.options.url)+'"></su:badge></div>');var loading=0;if(typeof STMBLPN==='undefined'&&loading==0){loading=1;(function(){var li=document.createElement('script');li.type='text/javascript';li.async=true;li.src='//platform.stumbleupon.com/1/widgets.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li,s);})();s=window.setTimeout(function(){if(typeof STMBLPN!=='undefined'){STMBLPN.processWidgets();clearInterval(s);}},500);}
else{STMBLPN.processWidgets();}},linkedin:function(self){var sett=self.options.buttons.linkedin;$(self.element).find('.buttons').append('<div class="button linkedin"><script type="in/share" data-url="'+(sett.url!==''?sett.url:self.options.url)+'" data-counter="'+sett.counter+'"></script></div>');var loading=0;if(typeof window.IN==='undefined'&&loading==0){loading=1;(function(){var li=document.createElement('script');li.type='text/javascript';li.async=true;li.src='//platform.linkedin.com/in.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li,s);})();}
else{window.IN.init();}},pinterest:function(self){var sett=self.options.buttons.pinterest;$(self.element).find('.buttons').append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url='+(sett.url!==''?sett.url:self.options.url)+'&media='+sett.media+'&description='+sett.description+'" class="pin-it-button" count-layout="'+sett.layout+'">Pin It</a></div>');(function(){var li=document.createElement('script');li.type='text/javascript';li.async=true;li.src='//assets.pinterest.com/js/pinit.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li,s);})();}},tracking={googlePlus:function(){},facebook:function(){fb=window.setInterval(function(){if(typeof FB!=='undefined'){FB.Event.subscribe('edge.create',function(targetUrl){_gaq.push(['_trackSocial','facebook','like',targetUrl]);});FB.Event.subscribe('edge.remove',function(targetUrl){_gaq.push(['_trackSocial','facebook','unlike',targetUrl]);});FB.Event.subscribe('message.send',function(targetUrl){_gaq.push(['_trackSocial','facebook','send',targetUrl]);});clearInterval(fb);}},1000);},twitter:function(){tw=window.setInterval(function(){if(typeof twttr!=='undefined'){twttr.events.bind('tweet',function(event){if(event){_gaq.push(['_trackSocial','twitter','tweet']);}});clearInterval(tw);}},1000);},digg:function(){},delicious:function(){},stumbleupon:function(){},linkedin:function(){function LinkedInShare(){_gaq.push(['_trackSocial','linkedin','share']);}},pinterest:function(){}},popup={googlePlus:function(opt){window.open("https://plus.google.com/share?hl="+opt.buttons.googlePlus.lang+"&url="+encodeURIComponent((opt.buttons.googlePlus.url!==''?opt.buttons.googlePlus.url:opt.url)),"","toolbar=0, status=0, width=900, height=500");},facebook:function(opt){window.open("http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent((opt.buttons.facebook.url!==''?opt.buttons.facebook.url:opt.url))+"&t="+opt.text+"","","toolbar=0, status=0, width=900, height=500");},twitter:function(opt){window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(opt.text)+"&url="+encodeURIComponent((opt.buttons.twitter.url!==''?opt.buttons.twitter.url:opt.url))+(opt.buttons.twitter.via!==''?'&via='+opt.buttons.twitter.via:''),"","toolbar=0, status=0, width=650, height=360");},digg:function(opt){window.open("http://digg.com/tools/diggthis/submit?url="+encodeURIComponent((opt.buttons.digg.url!==''?opt.buttons.digg.url:opt.url))+"&title="+opt.text+"&related=true&style=true","","toolbar=0, status=0, width=650, height=360");},delicious:function(opt){window.open('http://www.delicious.com/save?v=5&noui&jump=close&url='+encodeURIComponent((opt.buttons.delicious.url!==''?opt.buttons.delicious.url:opt.url))+'&title='+opt.text,'delicious','toolbar=no,width=550,height=550');},stumbleupon:function(opt){window.open('http://www.stumbleupon.com/badge/?url='+encodeURIComponent((opt.buttons.stumbleupon.url!==''?opt.buttons.stumbleupon.url:opt.url)),'stumbleupon','toolbar=no,width=550,height=550');},linkedin:function(opt){window.open('https://www.linkedin.com/cws/share?url='+encodeURIComponent((opt.buttons.linkedin.url!==''?opt.buttons.linkedin.url:opt.url))+'&token=&isFramed=true','linkedin','toolbar=no,width=550,height=550');},pinterest:function(opt){window.open('http://pinterest.com/pin/create/button/?url='+encodeURIComponent((opt.buttons.pinterest.url!==''?opt.buttons.pinterest.url:opt.url))+'&media='+encodeURIComponent(opt.buttons.pinterest.media)+'&description='+opt.buttons.pinterest.description,'pinterest','toolbar=no,width=700,height=300');}};function Plugin(element,options){this.element=element;this.options=$.extend(true,{},defaults,options);this.options.share=options.share;this._defaults=defaults;this._name=pluginName;this.init();};Plugin.prototype.init=function(){var self=this;if(this.options.urlCurl!==''){urlJson.googlePlus=this.options.urlCurl+'?url={url}&type=googlePlus';urlJson.stumbleupon=this.options.urlCurl+'?url={url}&type=stumbleupon';}
$(this.element).addClass(this.options.className);if(typeof $(this.element).data('title')!=='undefined'){this.options.title=$(this.element).attr('data-title');}
if(typeof $(this.element).data('url')!=='undefined'){this.options.url=$(this.element).data('url');}
if(typeof $(this.element).data('text')!=='undefined'){this.options.text=$(this.element).data('text');}
$.each(this.options.share,function(name,val){if(val===true){self.options.shareTotal++;}});if(self.options.enableCounter===true){$.each(this.options.share,function(name,val){if(val===true){try{self.getSocialJson(name);}catch(e){}}});}
else if(self.options.template!==''){this.options.render(this,this.options);}
else{this.loadButtons();}
$(this.element).hover(function(){if($(this).find('.buttons').length===0&&self.options.enableHover===true){self.loadButtons();}
self.options.hover(self,self.options);},function(){self.options.hide(self,self.options);});$(this.element).click(function(){self.options.click(self,self.options);return false;});};Plugin.prototype.loadButtons=function(){var self=this;$(this.element).append('<div class="buttons"></div>');$.each(self.options.share,function(name,val){if(val==true){loadButton[name](self);if(self.options.enableTracking===true){tracking[name]();}}});};Plugin.prototype.getSocialJson=function(name){var self=this,count=0,url=urlJson[name].replace('{url}',encodeURIComponent(this.options.url));if(this.options.buttons[name].urlCount===true&&this.options.buttons[name].url!==''){url=urlJson[name].replace('{url}',this.options.buttons[name].url);}
if(url!=''&&self.options.urlCurl!==''){$.getJSON(url,function(json){if(typeof json.count!=="undefined"){var temp=json.count+'';temp=temp.replace('\u00c2\u00a0','');count+=parseInt(temp,10);}
else if(json.data&&json.data.length>0&&typeof json.data[0].total_count!=="undefined"){count+=parseInt(json.data[0].total_count,10);}
else if(typeof json[0]!=="undefined"){count+=parseInt(json[0].total_posts,10);}
else if(typeof json[0]!=="undefined"){}
self.options.count[name]=count;self.options.total+=count;self.renderer();self.rendererPerso();}).error(function(){self.options.count[name]=0;self.rendererPerso();});}
else{self.renderer();self.options.count[name]=0;self.rendererPerso();}};Plugin.prototype.rendererPerso=function(){var shareCount=0;for(e in this.options.count){shareCount++;}
if(shareCount===this.options.shareTotal){this.options.render(this,this.options);}};Plugin.prototype.renderer=function(){var total=this.options.total,template=this.options.template;if(this.options.shorterTotal===true){total=this.shorterTotal(total);}
if(template!==''){template=template.replace('{total}',total);$(this.element).html(template);}
else{$(this.element).html('<div class="box"><a class="count" href="#">'+total+'</a>'+
(this.options.title!==''?'<a class="share" href="#">'+this.options.title+'</a>':'')+'</div>');}};Plugin.prototype.shorterTotal=function(num){if(num>=1e6){num=(num/1e6).toFixed(2)+"M"}else if(num>=1e3){num=(num/1e3).toFixed(1)+"k"}
return num;};Plugin.prototype.openPopup=function(site){popup[site](this.options);if(this.options.enableTracking===true){var tracking={googlePlus:{site:'Google',action:'+1'},facebook:{site:'facebook',action:'like'},twitter:{site:'twitter',action:'tweet'},digg:{site:'digg',action:'add'},delicious:{site:'delicious',action:'add'},stumbleupon:{site:'stumbleupon',action:'add'},linkedin:{site:'linkedin',action:'share'},pinterest:{site:'pinterest',action:'pin'}};_gaq.push(['_trackSocial',tracking[site].site,tracking[site].action]);}};Plugin.prototype.simulateClick=function(){var html=$(this.element).html();$(this.element).html(html.replace(this.options.total,this.options.total+1));};Plugin.prototype.update=function(url,text){if(url!==''){this.options.url=url;}
if(text!==''){this.options.text=text;}};$.fn[pluginName]=function(options){var args=arguments;if(options===undefined||typeof options==='object'){return this.each(function(){if(!$.data(this,'plugin_'+pluginName)){$.data(this,'plugin_'+pluginName,new Plugin(this,options));}});}else if(typeof options==='string'&&options[0]!=='_'&&options!=='init'){return this.each(function(){var instance=$.data(this,'plugin_'+pluginName);if(instance instanceof Plugin&&typeof instance[options]==='function'){instance[options].apply(instance,Array.prototype.slice.call(args,1));}});}};})(jQuery,window,document);var appMakeBeCool=(typeof appMakeBeCool==='undefined')?{}:console.log('Namespace appMakeBeCool is taken');appMakeBeCool.Site=function($,window,document,undefined){var $window=$(window),$document=$(document),$htmlBody=$('html, body'),_site={properties:{},globals:{siteConfigured:false,siteMode:null,winWidth:0,indexBase:0,},utils:{},classes:{},classInstances:[],events:{}};_site.init=function(options){var _options=$.extend({onComplete:function(){}},options);_site.config();_site.extendClasses();_site.instantiateClasses();_site.setup();_site.setEventBinds();_site.globals.siteConfigured=true;$window.trigger('siteConfigComplete');_options.onComplete();$window.trigger('siteInitComplete',{options:_options});};_site.setSiteMode=function(){_site.globals.siteMode='ThemeMode';};_site.config=function(){_site.globals.winWidth=$window.width();if(!window.requestAnimationFrame){window.requestAnimationFrame=(window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){return window.setTimeout(callback,1000/60);});}};_site.setup=function(){};_site.setEventBinds=function(){_site.eventBinds().setUnloadBind();};_site.eventBinds=function(){return{setUnloadBind:function(){$window.bind('load',function(){$htmlBody.scrollTop(0);});}}};_site.extendClasses=function(){_site.utils.extend(site.classes.SiteMode,site.base.Class);};_site.instantiateClasses=function(){site.createClassInstances(_site.getSiteMode());};_site.createClassInstance=function(instanceName,classObject,classProperties,classExtends){if(classExtends)_site.utils.extend(classObject,classExtends);if(typeof instanceName!=='string')return console.log('Error: _site.createClassInstance() expects a string for instanceName');if(typeof classObject!=='function')return console.log('Error: _site.createClassInstance() expects a function for classObject');var _classProperties=classProperties||{};site.classInstances[instanceName]=new classObject(_classProperties,$,$window,$document);return site.classInstances[instanceName];};_site.getSiteObj=function(){return site;};_site.getSiteMode=function(){var siteMode=[];siteMode.push({classObject:_site.globals.siteMode,classExtends:'SiteMode'});return siteMode;};_site.utils={extend:function(subClass,superClass){var F=function(){};F.prototype=superClass.prototype;subClass.prototype=new F();subClass.prototype.constructor=subClass;subClass.superclass=superClass.prototype;if(superClass.prototype.constructor==Object.prototype.constructor){superClass.prototype.constructor=superClass;}},arrayShiftTo:function(array,index,targetIndex){if(typeof array!=='object')return console.log('Error: array provided is not of type object');if(typeof index!=='number'||index<0||index>=array.length)return console.log('error: index provided is not valid');if(typeof targetIndex!=='number'||targetIndex<0||targetIndex>=array.length)return console.log('error: targetIndex provided is not valid');var origItem=array[index];array.splice(index,1);array.splice(targetIndex,0,origItem);return array;},mergeOptions:function(obj1,obj2){var obj3={};for(var attrname in obj1){obj3[attrname]=obj1[attrname];}
for(var attrname in obj2){obj3[attrname]=obj2[attrname];}
return obj3;}};var site=this;$.extend(site,{classes:{},modules:{},base:{},classInstances:{}});site.init=function(){if(!$.fn.findAndSelf)$.fn.findAndSelf=function(selector){return this.find(selector).andSelf().filter(selector);}
_site.setSiteMode();_site.init();};site.addClass=function(name,Class){site.classes[name]=Class;};site.createClassInstance=function(instanceName,classObject,classProperties,classExtends){return _site.createClassInstance(instanceName,classObject,classProperties,classExtends);};site.createClassInstances=function(obj){if(obj.length>0){$.each(obj,function(){var _obj=$.extend({instanceName:this.classObject,classObject:this.classObject,classProperties:{classId:this.classObject},classExtends:site.base.Class},this);if(typeof _obj.classObject==='string')_obj.classObject=site.classes[_obj.classObject];if(typeof _obj.classExtends==='string')_obj.classExtends=site.classes[_obj.classExtends];_site.createClassInstance(_obj.instanceName,_obj.classObject,_obj.classProperties,_obj.classExtends);});}};site.utils={extend:function(subClass,superClass){_site.utils.extend(subClass,superClass);},arrayShiftTo:function(array,index,targetIndex){return _site.utils.arrayShiftTo(array,index,targetIndex);},mergeOptions:function(obj1,obj2){return _site.utils.mergeOptions(obj1,obj2);}};site.getGlobals=function(){return _site.globals;};site.getClassInstance=function(instanceName){return site.classInstances[instanceName];};site.base.Class=function(properties){var _baseClass=this;var _CONSTANTS={VAR_1:null,VAR_2:null};var _defaults={sourceEl:null,classId:null,classType:null,msg:'This is the default base message',debugMode:false,eventsLog:{binds:[],triggers:[]},classDependents:[],triggerSrc:null,instanceName:'',autoCallCreateComplete:true,instanceIdAttr:'data-mbc-instance-id',onCreateComplete:function(){},onLoadComplete:function(){},onDestroyComplete:function(){}};_baseClass.properties=$.extend(_defaults,properties);_baseClass.globals={classId:'',alive:false,instantiated:false,setupComplete:false,createComplete:false,loadComplete:false,classDependentsInstantiated:false,classDependentsInstances:[],classType:'',timeouts:[],intervals:[],customCreate:function(){},customCreateComplete:function(){},customDestroy:function(){},customDestroyComplete:function(){},customResurrect:function(){},customLoadComplete:function(){}};var _init=function(){_config();};var _config=function(){_baseClass.globals.classType=_baseClass.properties.classType||_baseClass.properties.classId;_baseClass.properties.sourceEl=$(_baseClass.properties.sourceEl);_baseClass.globals.classId=_baseClass.properties.classId||instance;};var _setup=function(){};_baseClass.getConstants=function(){return _CONSTANTS;};_init();};site.base.Class.prototype={addMethod:function(name,fn){var _baseClass=this;if(!name||typeof fn!=='function')return _baseClass.logError('addMethod() parameters passed in are invalid');if(!_baseClass[name])_baseClass[name]=fn;},create:function(options){var _baseClass=this;var _options=$.extend({createStart:function(){},createComplete:function(){}},options);if(_baseClass.globals.alive){_baseClass.log(_baseClass);return _baseClass.logWarning('Class.create cannot create class, it is already created.');}
_baseClass.globals.alive=true;_baseClass.createStart(_options.createStart);_baseClass.createClassDependents();if(_baseClass.properties.sourceEl.length>0)_baseClass.properties.sourceEl.attr(_baseClass.properties.instanceIdAttr,_baseClass.globals.classId);if(typeof _baseClass.globals.customCreate==='function'&&!_baseClass.globals.instantiated){_baseClass.globals.customCreate();}else if(typeof _baseClass.globals.customResurrect==='function'&&_baseClass.globals.instantiated){_baseClass.globals.customResurrect();}
_baseClass.globals.setupComplete=true;if(_baseClass.properties.autoCallCreateComplete===true){_baseClass.createComplete(_options.createComplete);}
return true;},destroy:function(options){var _baseClass=this;var _options=$.extend({destroyStart:function(){},destroyComplete:function(){}},options);if(!_baseClass.globals.alive)return _baseClass.logWarning('Class.destroy cannot destroy class, it has not been created.');_baseClass.destroyStart(function(){_baseClass.destroyClassDependents();if(typeof _baseClass.globals.customDestroy==='function')_baseClass.globals.customDestroy();_baseClass.globals.alive=false;_baseClass.destroyComplete(_options.destroyComplete);});_baseClass.clearAllTimeouts();_baseClass.clearAllIntervals();return true;},createClassDependents:function(){var _baseClass=this;if(_baseClass.globals.classDependentsInstantiated){$.each(_baseClass.globals.classDependentsInstances,function(i){var _this=this;_this.create();});return true;}
if(_baseClass.properties.classDependents.length<1)return false;$.each(_baseClass.properties.classDependents,function(){_site.utils.extend(this.obj,site.base.Class);var _properties=$.extend({onCreateComplete:function(){setTimeout(function(){if(!_baseClass.globals.createComplete)_baseClass.createComplete();},1);}},this.properties);_baseClass.globals.classDependentsInstances.push(new this.obj(_properties));});_baseClass.globals.classDependentsInstantiated=true;return true;},destroyClassDependents:function(){var _baseClass=this;if(_baseClass.globals.classDependentsInstances.length<1)return false;$.each(_baseClass.globals.classDependentsInstances,function(){var _this=this;_this.destroy();});return true;},classDependentsStatus:function(){var _baseClass=this;if(_baseClass.properties.classDependents.length===0)return true;var _ret={setupComplete:true,loadComplete:true};$.each(_baseClass.properties.classDependents,function(i){if(!_baseClass.globals.classDependentsInstances[i].globals.setupComplete)_ret=$.extend(_ret,{setupComplete:false});if(!_baseClass.globals.classDependentsInstances[i].globals.loadComplete)_ret=$.extend(_ret,{loadComplete:false});});return _ret;},getInstanceName:function(){var _baseClass=this;if(_baseClass.properties.instanceName){return _baseClass.properties.instanceName;}else{return false;}},createStart:function(fn){var _baseClass=this;if(typeof fn==='function')fn();},createComplete:function(fn){_baseClass=this;if(_baseClass.globals.createComplete)return false;if(_baseClass.globals.classDependentsInstances.length>0)_baseClass.loadCompleteChecker();if(_baseClass.globals.classDependentsInstances.length>0&&!_baseClass.classDependentsStatus().setupComplete){return false;}
var _fn=function(){if(typeof fn==='function')fn();_baseClass.properties.onCreateComplete();_baseClass.globals.customCreateComplete();_baseClass.globals.createComplete=true;_baseClass.globals.instantiated=true;$window.trigger('classCreateComplete',{classId:_baseClass.properties.classId,classType:_baseClass.globals.classType});if(_baseClass.isLoaded())_baseClass.globals.loadComplete=true;};if(typeof _fn==='function')_fn();return true;},loadComplete:function(fn){_baseClass=this;var _fn=function(){if(typeof fn==='function')fn();_baseClass.properties.onLoadComplete();_baseClass.globals.customLoadComplete();_baseClass.globals.loadComplete=true;};_fn();},destroyStart:function(fn){_baseClass=this;this.trigger('classDestroyStart',{classId:_baseClass.properties.classId,classType:_baseClass.globals.classType});if(typeof fn==='function')fn();},destroyComplete:function(fn){_baseClass=this;var _fn=function(){if(typeof fn==='function')fn();_baseClass.properties.onDestroyComplete();_baseClass.globals.customDestroyComplete();_baseClass.globals.createComplete=false;_baseClass.trigger('classDestroyComplete',{classId:_baseClass.properties.classId,classType:_baseClass.globals.classType});};if(typeof fn==='function')_fn();},isLoaded:function(){_baseClass=this;if(!_baseClass.globals.createComplete)return false;else if(_baseClass.globals.classDependentsInstances<1)return true;else if(_baseClass.classDependentsStatus().loadComplete)return true;else return false;},loadCompleteChecker:function(){var _baseClass=this;var __baseClass=_baseClass;var interval=__baseClass.setInterval(function(){if(__baseClass.isLoaded()){__baseClass.clearInterval(interval);_baseClass=__baseClass;__baseClass.loadComplete();}},60);},log:function(msg,obj){var _baseClass=this;if(!_baseClass.properties.debugMode)return;if(typeof msg==='object'){obj=msg;msg='';}
if(typeof obj!=='object')obj='';if(typeof console==='object'&&typeof console.log==='function'){console.log(_baseClass.globals.classId+': '+msg,obj);}},logError:function(msg,obj){var _baseClass=this;_baseClass.log('Error - '+msg,obj);},logWarning:function(msg,obj){var _baseClass=this;_baseClass.log('Warning - '+msg,obj);},logNotice:function(msg,obj){var _baseClass=this;_baseClass.log('Notice - '+msg,obj);},setInterval:function(fn,duration){var _baseClass=this;if(typeof fn!=='function')return _baseClass.logError('setInterval() fn provided is not a function');var _duration=duration||1;var interval=setInterval(fn,duration);_baseClass.globals.intervals.push(interval);return interval;},clearInterval:function(id){var _baseClass=this;clearInterval(id);},clearAllIntervals:function(){var _baseClass=this;if(_baseClass.globals.intervals.length===0)return false;$.each(_baseClass.globals.intervals,function(){_baseClass.clearInterval(this);});_baseClass.globals.intervals=[];return true;},setTimeout:function(fn,duration){var _baseClass=this;if(typeof fn!=='function')return _baseClass.logError('setTimeout() fn provided is not a function');var _duration=duration||1;var timeout=setTimeout(fn,duration);_baseClass.globals.timeouts.push(timeout);return timeout;},clearTimeout:function(id){var _baseClass=this;clearTimeout(id);},clearAllTimeouts:function(){var _baseClass=this;if(_baseClass.globals.timeouts.length===0)return false;$.each(_baseClass.globals.timeouts,function(){_baseClass.clearTimeout(this);});_baseClass.globals.timeouts=[];return true;},on:function(el,event,fn){var _baseClass=this;if(_baseClass.properties.debugMode){console.log('SET LIVE - class:'+_baseClass.globals.classId+', event:'+event);}
$document.on(el,event,function(e,data){if(_baseClass.properties.debugMode&&event!='scroll'){console.log('LIVE - class:'+_baseClass.globals.classId+', event:'+event);}
if(typeof fn==='function')fn(e,data,this);});},bind:function(el,event,fn){var _baseClass=this;if(_baseClass.properties.debugMode){console.log('SET BIND - class:'+_baseClass.globals.classId+', event:'+event);}
el.bind(event,function(e,data){if(_baseClass.properties.debugMode&&event!='scroll'){console.log('BIND - class:'+_baseClass.globals.classId+', event:'+event);}
if(typeof fn==='function')fn(e,data,this);});},unbind:function(el,event){var _baseClass=this;if(_baseClass.properties.debugMode){console.log('UNBIND - class:'+_baseClass.globals.classId+', event:'+event);}
el.unbind(event,function(e){if(_baseClass.properties.debugMode){console.log('UNBIND - class:'+_baseClass.globals.classId+', event:'+event);}});},trigger:function(name,data){var _baseClass=this;var _data;if(!data)_data={};else _data=data;if(_baseClass.properties.debugMode&&event!='scroll'){console.log('TRIGGER - class:'+_baseClass.globals.classId+', event:'+name);}
$window.trigger(name,_data);return true;}};};appMakeBeCool.gateway=new appMakeBeCool.Site(jQuery,window,window.document);if(!appMakeBeCool.gateway)appMakeBeCool.gateway=new appMakeBeCool.Site();appMakeBeCool.gateway.addClass('SiteMode',function(properties,$window,$document){var _siteMode=this,_defaults={},_properties=$.extend(_defaults,properties),_globals={},_init=function(){appMakeBeCool.gateway.base.Class.apply(_siteMode,[_properties]);_siteMode.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods()};_siteMode.create();},_config=function(){},_setup=function(){},_setBinds=function(){},_setCustomMethods=function(){_siteMode.globals.customResurrect=function(){};_siteMode.globals.customDestroy=function(){};};_siteMode.addMethod('init',function(){});_siteMode.addMethod('getSiteGlobals',function(){return appMakeBeCool.gateway.getGlobals();});_siteMode.addMethod('getSiteObj',function(){return appMakeBeCool.gateway;});_init();});appMakeBeCool.gateway.addClass('ThemeMode',function(properties,$,$window,$document){var _themeMode=this,_defaults={classMode:'theme-mode'},_properties=$.extend(_defaults,properties),_globals={siteObj:null,preloaded:false},_init=function(){appMakeBeCool.gateway.classes.SiteMode.apply(_themeMode,[_properties])
if(!_globals.preloaded){return _themeMode.init();}
_config();_extendClasses();_instantiateClasses();_setup();_setBinds();_setCustomMethods();_themeMode.trigger(_themeMode.globals.classType+'_Complete');},_config=function(){_globals.siteObj=_themeMode.getSiteObj();},_extendClasses=function(){_globals.siteObj.utils.extend(_globals.siteObj.classes.Images,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.LoaderMain,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.FullHeightSlider,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.EventAnimate,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.BlogAnimate,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.Partners,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.ScrollAtOnce,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.MenuToTop,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.TopEventsSlider,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.TicketsEventsSlider,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.GallerySlider,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.FormContacts,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.FormSubscribe,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.GalleryPage,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.Sharrre,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.EventsTickets,_globals.siteObj.base.Class);_globals.siteObj.utils.extend(_globals.siteObj.classes.DropDownClick,_globals.siteObj.base.Class);},_instantiateClasses=function(){_globals.siteObj.createClassInstance('images',_globals.siteObj.classes.Images,{classId:'Images'});_globals.siteObj.createClassInstance('loaderMain',_globals.siteObj.classes.LoaderMain,{classId:'LoaderMain'});_globals.siteObj.createClassInstance('fullHeightSlider',_globals.siteObj.classes.FullHeightSlider,{classId:'FullHeightSlider'});_globals.siteObj.createClassInstance('eventAnimate',_globals.siteObj.classes.EventAnimate,{classId:'EventAnimate'});_globals.siteObj.createClassInstance('blogAnimate',_globals.siteObj.classes.BlogAnimate,{classId:'BlogAnimate'});_globals.siteObj.createClassInstance('partners',_globals.siteObj.classes.Partners,{classId:'Partners'});_globals.siteObj.createClassInstance('scrollAtOnce',_globals.siteObj.classes.ScrollAtOnce,{classId:'ScrollAtOnce'});_globals.siteObj.createClassInstance('menuToTop',_globals.siteObj.classes.MenuToTop,{classId:'MenuToTop'});_globals.siteObj.createClassInstance('topEventsSlider',_globals.siteObj.classes.TopEventsSlider,{classId:'TopEventsSlider'});_globals.siteObj.createClassInstance('ticketsEventsSlider',_globals.siteObj.classes.TicketsEventsSlider,{classId:'TicketsEventsSlider'});_globals.siteObj.createClassInstance('gallerySlider',_globals.siteObj.classes.GallerySlider,{classId:'GallerySlider'});_globals.siteObj.createClassInstance('formContacts',_globals.siteObj.classes.FormContacts,{classId:'FormContacts'});_globals.siteObj.createClassInstance('formSubscribe',_globals.siteObj.classes.FormSubscribe,{classId:'FormSubscribe'});_globals.siteObj.createClassInstance('galleryPage',_globals.siteObj.classes.GalleryPage,{classId:'GalleryPage'});_globals.siteObj.createClassInstance('sharrre',_globals.siteObj.classes.Sharrre,{classId:'Sharrre'});_globals.siteObj.createClassInstance('eventsTickets',_globals.siteObj.classes.EventsTickets,{classId:'EventsTickets'});_globals.siteObj.createClassInstance('dropDownClick',_globals.siteObj.classes.DropDownClick,{classId:'DropDownClick'});},_setup=function(){$('body').addClass(_properties.classMode);},_setBinds=function(){_binds().setCompleteBind();_binds().setImage_CompleteBind();_binds().setFullHeightSlider_BigSliderBind();_binds().setScrollAtOnce_ToggleBind();},_binds=function(){return{setCompleteBind:function(){_themeMode.bind($window,_themeMode.globals.classType+'_Complete',function(e,data){_themeMode.trigger('LoaderMain_Init',data);_themeMode.trigger('Images_Init',data);});},setImage_CompleteBind:function(){_themeMode.bind($window,'Images_ImagesComplete',function(e,data){_themeMode.trigger('FullHeightSlider_Init',data);_themeMode.trigger('LoaderMain_End',data);_themeMode.trigger('TopEventsSlider_Init',data);_themeMode.trigger('TicketsEventsSlider_Init',data);_themeMode.trigger('GallerySlider_Init',data);_themeMode.trigger('EventAnimate_Init',data);_themeMode.trigger('BlogAnimate_Init',data);_themeMode.trigger('Partners_Init',data);_themeMode.trigger('MenuToTop_Init',data);_themeMode.trigger('FormContacts_Init',data);_themeMode.trigger('FormSubscribe_Init',data);_themeMode.trigger('GalleryPage_Init',data);_themeMode.trigger('Sharrre_Init',data);_themeMode.trigger('EventsTickets_Init',data);_themeMode.trigger('DropDownClick_Init',data);});},setFullHeightSlider_BigSliderBind:function(){_themeMode.bind($window,'FullHeightSlider_BigSlider',function(e,data){_themeMode.trigger('ScrollAtOnce_Init',data);});},setScrollAtOnce_ToggleBind:function(){_themeMode.bind($window,'ScrollAtOnce_Toggle',function(e,data){_themeMode.trigger('FullHeightSlider_Action',data);});}}},_setCustomMethods=function(){_themeMode.globals.customResurrect=function(){};_themeMode.globals.customDestroy=function(){};};_themeMode.addMethod('init',function(){_themeMode.bind($window,'siteConfigComplete',function(){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('Images',function(properties,$,$window,$document){var _images=this,_defaults={imgPreloaderWrapClass:'img-preloader-wrap',imgPreloaderClass:'loading',imgPreloadClass:'img-preload',imgDataSrc2x:'data-src2x',imgDataSrc:'data-src',simulatedDelay:2,loaderClass:'.loading',loaderTemplate:''},_properties=$.extend(_defaults,properties),_globals={preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_images,[_properties]);if(!_globals.preloaded){return _images.init();}
_images.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();_triggers().generateImages();};_images.create();},_config=function(){},_setup=function(){},_setBinds=function(){_binds().setGenerateImagesBind();},_binds=function(){return{setGenerateImagesBind:function(){_images.bind($window,_images.globals.classType+'_GenerateImages',function(e,data,el){_generateImgs(data);});}};},_triggers=function(){return{generateImages:function(data){_images.trigger(_images.globals.classType+'_GenerateImages',data);},imagesComplete:function(data){_images.trigger(_images.globals.classType+'_ImagesComplete',data);}};},_setCustomMethods=function(){_images.globals.customResurrect=function(){};_images.globals.customDestroy=function(){};},_generateImgs=function(options){var _options=$.extend({context:'body',usePreloader:false},options);var $context=$(_options.context);if($context.length!==1)return console.log('Error in generateImgs - context provided is invalid.');var i=0;var imagesSrc=new Array();var images=new Array();$context.find('['+_properties.imgDataSrc+']').each(function(){var $this=$(this);var imgsrc=$this.attr('src');imgsrc=_makeImageResponsive($this);if($this.hasClass(_properties.imgPreloadClass)&&imgsrc){if(_options.usePreloader)_addImgPreloader($this);if(imgsrc.indexOf(global.baseUrl)!==0){imgsrc=global.baseUrl+imgsrc;}
imagesSrc.push(imgsrc);images.push($this);}
i++;});var baseLength=global.siteUrl.length;if(imagesSrc.length){$.imgpreload(imagesSrc,{each:function(i){var $this=this;setTimeout(function(){var j=$.inArray(global.baseUrl+$this.src.substr(baseLength),imagesSrc);var img=images[j];imagesSrc.splice(j,1);images.splice(j,1);if(_options.usePreloader)_removeImgPreloader(img);$(img).attr('src',$this.src);$(img).attr(_properties.imgDataSrc,'');$(img).attr(_properties.imgDataSrc2x,'');},_properties.simulatedDelay)},all:function(){_triggers().imagesComplete();}});}else{_triggers().imagesComplete();}},_makeImageResponsive=function(img){var viewport=$window.innerWidth||$document.documentElement.clientWidth||$document.body.clientWidth;var image=img.get(0);if(image.length===0){return;}
var hasAttr;if(!image.hasAttribute){hasAttr=function(el,attrName){return el.getAttribute(attrName)!==null;};}else{hasAttr=function(el,attrName){return el.hasAttribute(attrName);};}
var retina=$window.devicePixelRatio?$window.devicePixelRatio>=1.2?1:0:0;var srcAttr=(retina&&hasAttr(image,_properties.imgDataSrc2x))?_properties.imgDataSrc2x:_properties.imgDataSrc;if(!hasAttr(image,srcAttr)){return false;}
var queries=image.getAttribute(srcAttr);var queries_array=queries.split(',');for(var j=0;j<queries_array.length;j++){var query=queries_array[j].split(':');var condition=query[0];var response=query[1];var conditionpx;var bool;if(condition.indexOf('<')!==-1){conditionpx=condition.split('<');if(queries_array[(j-1)]){var prev_query=queries_array[(j-1)].split(/:(.+)/);var prev_cond=prev_query[0].split('<');bool=(viewport<=conditionpx[1]&&viewport>prev_cond[1]);}else{bool=(viewport<=conditionpx[1]);}}else{conditionpx=condition.split('>');if(queries_array[(j+1)]){var next_query=queries_array[(j+1)].split(/:(.+)/);var next_cond=next_query[0].split('>');bool=(viewport>=conditionpx[1]&&viewport<next_cond[1]);}else{bool=(viewport>=conditionpx[1]);}}
if(bool){var new_source=response;return new_source;break;}}},_addImgPreloader=function(imgEl){$imgEl=$(imgEl);if($imgEl.length!==1)return console.log('Error in addImgPreloaders - context provided is invalid.');if($imgEl.hasClass(_properties.imgNoPreloadClass))return console.log('No add preload');var parent=$imgEl.parent('figure');if(parent.children(_properties.loaderClass).length===1)return;parent.append(_properties.loaderTemplate);$imgEl.hide();},_removeImgPreloader=function(imgEl){var $img=$(imgEl);if($img.length!==1)return console.log('Error in removeImgPreloader - imgEl provided is invalid.');var parent=$img.parent('figure');var $preload=parent.children(_properties.loaderClass);if($preload.length!==1)return;$preload.remove();$img.show();};_images.addMethod('init',function(){_images.bind($window,_images.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('LoaderMain',function(properties,$,$window,$document){var _loaderMain=this,_defaults={container:'#loaderContainer',loader:'#loader',activeClass:'active',durationTiles:300,duration:1000},_properties=$.extend(_defaults,properties),_globals={container:null,loader:null,tiles:null,interval:null,current:0,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_loaderMain,[_properties]);if(!_globals.preloaded){return _loaderMain.init();}
_loaderMain.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_loaderMain.create();},_config=function(){_globals.container=$(_properties.container);_globals.loader=$(_properties.loader);_globals.tiles=_globals.loader.children();},_setup=function(){_globals.interval=_loaderMain.setInterval(function(){_globals.tiles.removeClass(_properties.activeClass);$(_globals.tiles[_globals.current]).addClass(_properties.activeClass);_globals.current++;if(_globals.current>3){_globals.current=0;};},_properties.durationTiles);},_setBinds=function(){_binds().setStartAnimationBind();_binds().setEndAnimationBind();},_binds=function(){return{setStartAnimationBind:function(){_loaderMain.bind($window,_loaderMain.globals.classType+'_Start',function(e,data,el){_globals.container.fadeIn(_properties.duration);_setup();});},setEndAnimationBind:function(){_loaderMain.bind($window,_loaderMain.globals.classType+'_End',function(e,data,el){_loaderMain.clearInterval(_globals.interval);_globals.container.fadeOut(1000);});}};},_setCustomMethods=function(){_loaderMain.globals.customResurrect=function(){};_loaderMain.globals.customDestroy=function(){};};_loaderMain.addMethod('init',function(){_loaderMain.bind($window,_loaderMain.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('FullHeightSlider',function(properties,$,$window,$document){var _fullHeightSlider=this,_defaults={slider:'#fullHeghtSlider',imgSlider:'#fullHeghtSlider .container-fluidss img.img-responsive',videos:'.video-bg',rowss:'.rowss',sliderClass:'slider',tileClass:'.bg-tile',sliderDefaultClass:'slider-default',imgResponsiveClass:'img-responsive',heightToWindowClass:'height-to-window'},_properties=$.extend(_defaults,properties),_globals={slider:null,imgSlider:null,videos:null,tileSlide:null,rowss:null,windowHeight:0,windowWidth:0,sliderHeight:0,slideNodeHeight:0,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_fullHeightSlider,[_properties]);if(!_globals.preloaded){return _fullHeightSlider.init();}
_fullHeightSlider.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_fullHeightSlider.create();},_config=function(){_globals.slider=$(_properties.slider);_globals.sliderFullHeight=$('.'+_properties.sliderClass);_globals.sliderDefault=$('.'+_properties.sliderDefaultClass);_globals.imgSlider=$(_properties.imgSlider);_globals.videos=$(_properties.videos);_globals.rowss=$(_properties.rowss);_globals.tileNode=$(_properties.tileClass);_globals.windowHeight=$window.height();_globals.windowWidth=$window.width();},_setup=function(){if(_globals.slider.length){if(_globals.slider.hasClass(_properties.sliderClass)){_triggers().bigSlider();}
_globals.sliderHeight=_globals.slider.height();_globals.slideNodeHeight=_globals.rowss.height();var sliderTopPadding=(_globals.sliderHeight-_globals.slideNodeHeight)/2;if((_globals.slideNodeHeight<_globals.sliderHeight)&&(_globals.sliderFullHeight.length)){_globals.rowss.css('top',sliderTopPadding+(_globals.slider.hasClass(_properties.sliderDefaultClass)?10:40));}else if((_globals.slideNodeHeight<_globals.windowHeight)&&(_globals.sliderDefault.length)){_globals.rowss.css('top',(_globals.sliderHeight-_globals.slideNodeHeight)/2-20);}else{_globals.rowss.css('top','130px');}
if((_globals.slideNodeHeight<_globals.sliderHeight)&&(window.devicePixelRatio===2)&&((_globals.windowWidth)===1024)){_globals.rowss.css('top',((_globals.sliderHeight/2-_globals.slideNodeHeight))+40);}
var tileOptions={};if(_globals.slider.hasClass(_properties.sliderDefaultClass)){tileOptions={dots:true}}
if(!$('bg-tile').length){_globals.tileSlide=new TileSlide(document.querySelector(_properties.slider),tileOptions);}
_globals.imgSlider.each(function(){var node=this;_changeClass(node);});}},_setBinds=function(){_binds().setResizeBind();_binds().setActionBind();},_binds=function(){return{setResizeBind:function(){_fullHeightSlider.bind($window,'resize',function(e,data,el){_setup();})},setActionBind:function(){_fullHeightSlider.bind($window,_fullHeightSlider.globals.classType+'_Action',function(e,data,el){var _options=$.extend({action:'play'},data);if(_globals.tileSlide){if(_options.action=='stop'){_globals.tileSlide.stopSlide();}else if(_options.action=='play'){_globals.tileSlide.playSlide();}}})}};},_triggers=function(){return{bigSlider:function(data){_fullHeightSlider.trigger(_fullHeightSlider.globals.classType+'_BigSlider',data);}};},_changeClass=function(node){if(_globals.windowHeight>_globals.windowWidth&&_globals.slider.hasClass(_properties.sliderClass)){$(node).removeClass(_properties.imgResponsiveClass).addClass(_properties.heightToWindowClass);}
if(_globals.windowHeight<_globals.windowWidth&&_globals.slider.hasClass(_properties.sliderClass)){$(node).removeClass(_properties.imgResponsiveClass).addClass(_properties.heightToWindowClass);}
if((_globals.windowHeight<1200)&&_globals.slider.hasClass(_properties.sliderDefaultClass)){$(node).removeClass(_properties.imgResponsiveClass).addClass(_properties.heightToWindowClass);}},_addVideos=function(){if(window.innerWidth>window.innerHeight){_globals.videos.width(document.body.clientWidth);_globals.videos.height((document.body.clientWidth/1.77)+40);}else{_globals.videos.width(window.innerWidth);_globals.videos.height(window.innerHeight+40);};}
_setCustomMethods=function(){_fullHeightSlider.globals.customResurrect=function(){};_fullHeightSlider.globals.customDestroy=function(){};};_fullHeightSlider.addMethod('init',function(){_fullHeightSlider.bind($window,_fullHeightSlider.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('EventAnimate',function(properties,$,$window,$document){var _eventAnimate=this,_defaults={events:'.top-event'},_properties=$.extend(_defaults,properties),_globals={events:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_eventAnimate,[_properties]);if(!_globals.preloaded){return _eventAnimate.init();}
_eventAnimate.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_eventAnimate.create();},_config=function(){_globals.events=$(_properties.events);},_setup=function(){if(_globals.events.length){new EventAnimate(_globals.events);}},_setBinds=function(){},_binds=function(){return{};},_triggers=function(){return{};},_setCustomMethods=function(){_eventAnimate.globals.customResurrect=function(){};_eventAnimate.globals.customDestroy=function(){};};_eventAnimate.addMethod('init',function(){_eventAnimate.bind($window,_eventAnimate.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('BlogAnimate',function(properties,$,$window,$document){var _blogAnimate=this,_defaults={blogs:'.blog-item',blogsTile:'.blog-item-def'},_properties=$.extend(_defaults,properties),_globals={blogs:null,blogsTile:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_blogAnimate,[_properties]);if(!_globals.preloaded){return _blogAnimate.init();}
_blogAnimate.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_blogAnimate.create();},_config=function(){_globals.blogs=$(_properties.blogs);_globals.blogsTile=$(_properties.blogsTile);},_setup=function(){if(_globals.blogs.length){new EventAnimate(_globals.blogs);}
if(_globals.blogsTile.length){new EventAnimate(_globals.blogsTile);}},_setBinds=function(){},_binds=function(){return{};},_triggers=function(){return{};},_setCustomMethods=function(){_blogAnimate.globals.customResurrect=function(){};_blogAnimate.globals.customDestroy=function(){};};_blogAnimate.addMethod('init',function(){_blogAnimate.bind($window,_blogAnimate.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('Partners',function(properties,$,$window,$document){var _partners=this,_defaults={partners:'#partnersSlider'},_properties=$.extend(_defaults,properties),_globals={partners:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_partners,[_properties]);if(!_globals.preloaded){return _partners.init();}
_partners.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_partners.create();},_config=function(){_globals.partners=$(_properties.partners);},_setup=function(){_partnersSlider();},_setBinds=function(){},_binds=function(){return{setResizeBind:function(){_partners.bind($window,'resize',function(e,data){_partnersSlider();});}};},_triggers=function(){return{};},_partnersSlider=function(){_globals.partners.slick({dots:false,infinite:false,speed:300,slidesToShow:5,pauseOnHover:false,touchMove:false,slidesToScroll:1,responsive:[{breakpoint:900,settings:{slidesToShow:3,slidesToScroll:3,infinite:false,dots:true}},{breakpoint:480,settings:{dots:false,infinite:false,speed:400,slidesToShow:1,touchMove:false,slidesToScroll:1,}}]});},_setCustomMethods=function(){_partners.globals.customResurrect=function(){};_partners.globals.customDestroy=function(){};};_partners.addMethod('init',function(){_partners.bind($window,_partners.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('ScrollAtOnce',function(properties,$,$window,$document){var _scrollAtOnce=this,_defaults={slider:'#fullHeghtSlider',topEvents:'#topEvents',gallery:'#galleryIndex',blog:'#blogIndex',scrollDownButt:'#scrollDownButt',header:'header',headerClass:'header-top active'},_properties=$.extend(_defaults,properties),_globals={slider:null,topEvents:null,gallery:null,blog:null,scrollDownButt:null,header:null,body:null,scrollTopValue:0,scrollToggle:false,scrollDirection:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_scrollAtOnce,[_properties]);if(!_globals.preloaded){return _scrollAtOnce.init();}
_scrollAtOnce.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_scrollAtOnce.create();},_config=function(){_globals.slider=$(_properties.slider);_globals.topEvents=$(_properties.topEvents);_globals.gallery=$(_properties.gallery);_globals.blogs=$(_properties.blog);_globals.scrollDownButt=$(_properties.scrollDownButt);_globals.header=$(_properties.header);_globals.body=$('body');},_setup=function(){if($document.scrollTop()===0){_setDefaultPositions();}},_setBinds=function(){_binds().setScrollDownButtBind();_binds().setScrollBind();_binds().setMousewheelBind();},_binds=function(){return{setScrollDownButtBind:function(){_scrollAtOnce.bind(_globals.scrollDownButt,'click',function(e,data,el){_globals.scrollToggle=true;$('html,body').stop().animate({scrollTop:$window.height()},600);var options={action:'stop'}
_triggers().scrollToggle(options);setTimeout(function(){_setCustomPositions();_globals.header.addClass(_properties.headerClass);$window.unbind('DOMMouseScroll mousewheel');},600);});},setScrollBind:function(){_scrollAtOnce.bind($window,'scroll',function(e,data,el){var _scrollValue=$window.scrollTop();if(($window.scrollTop()>=_globals.slider.outerHeight())&&(_scrollValue>_globals.scrollTopValue)&&(_globals.scrollToggle===false)){_globals.scrollToggle=true;_setCustomPositions();_globals.header.addClass(_properties.headerClass);var options={action:'stop'}
_triggers().scrollToggle(options);}else if(($window.scrollTop()<=_globals.slider.outerHeight())&&(_scrollValue<_globals.scrollTopValue)&&(_globals.scrollToggle===true)){_globals.scrollToggle=false;_setDefaultPositions();_globals.header.removeClass(_properties.headerClass);var options={action:'play'}
_triggers().scrollToggle(options);}
_globals.scrollTopValue=_scrollValue;});},setMousewheelBind:function(){_globals.body.on('DOMMouseScroll mousewheel',function(event){if(event.originalEvent.detail>0||event.originalEvent.wheelDelta<0){_globals.scrollDirection='down';}else{_globals.scrollDirection='up';};if(($document.scrollTop()===0)&&(_globals.scrollDirection==='down')){$('html,body').stop().animate({scrollTop:$window.height()},600);$window.bind('DOMMouseScroll mousewheel',function(event){event.preventDefault();});setTimeout(function(){_setCustomPositions();_globals.header.addClass(_properties.headerClass);$window.unbind('DOMMouseScroll mousewheel');},600);_globals.scrollToggle=true;var options={action:'stop'}
_triggers().scrollToggle(options);return false;}else if(($document.scrollTop()<=(_globals.slider.height()))&&(_globals.scrollDirection==='up')){_setDefaultPositions();_globals.header.removeClass(_properties.headerClass);$window.bind('DOMMouseScroll mousewheel',function(event){event.preventDefault();});setTimeout(function(){$window.unbind('DOMMouseScroll mousewheel');},600);$('html,body').stop().animate({scrollTop:0},600);var options={action:'play'}
_triggers().scrollToggle(options);_globals.scrollToggle=false;return false;};});}};},_triggers=function(){return{scrollToggle:function(data){_scrollAtOnce.trigger(_scrollAtOnce.globals.classType+'_Toggle',data);}};},_setDefaultPositions=function(){_globals.slider.css({zIndex:11});_globals.topEvents.css({position:'fixed',width:'100%',top:0,left:0});_globals.gallery.css({position:'fixed',width:'100%',top:_globals.topEvents.outerHeight(),left:0});_globals.blogs.css({marginTop:_globals.topEvents.outerHeight()+_globals.gallery.outerHeight()});},_setCustomPositions=function(){_globals.topEvents.css({position:'relative'});_globals.gallery.css({position:'relative',top:0});_globals.blogs.css({marginTop:0});},_setCustomMethods=function(){_scrollAtOnce.globals.customResurrect=function(){};_scrollAtOnce.globals.customDestroy=function(){};};_scrollAtOnce.addMethod('init',function(){_scrollAtOnce.bind($window,_scrollAtOnce.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('MenuToTop',function(properties,$,$window,$document){var _menuToTop=this,_defaults={header:'#header',headerSlider:'#fullHeghtSlider',headerSliderClass:'slider-default',navClass:'.navbar-collapse',class:'header-top active',activeClass:'active'},_properties=$.extend(_defaults,properties),_globals={header:null,headerSlider:null,headerSize:0,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_menuToTop,[_properties]);if(!_globals.preloaded){return _menuToTop.init();}
_menuToTop.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_menuToTop.create();},_config=function(){_globals.header=$(_properties.header);_globals.headerSlider=$(_properties.headerSlider);_globals.navBar=$(_properties.navClass);},_setup=function(){_globals.headerSize=_globals.header.height();if(_globals.headerSlider.length){if(($(window).scrollTop()>_globals.headerSlider.height())&&(!_globals.header.hasClass('header-top'))){_globals.header.addClass(_properties.class);setTimeout(function(){_globals.header.removeClass(_properties.activeClass);},2000);};}else{if(!_globals.header.hasClass('header-top')){_globals.header.addClass(_properties.class);setTimeout(function(){_globals.header.removeClass(_properties.activeClass);},2000);};};},_setBinds=function(){_binds().setScrollBinds();},_binds=function(){return{setScrollBinds:function(){_menuToTop.bind($window,'scroll',function(e,data,el){if(_globals.headerSlider.length){if(($(window).scrollTop()>_globals.headerSlider.height())&&(!_globals.header.hasClass('header-top'))){_globals.header.addClass(_properties.class);setTimeout(function(){_globals.header.removeClass(_properties.activeClass);},2000);}else if(($(window).scrollTop()<=_globals.headerSize)&&(_globals.header.hasClass('header-top'))&&(!_globals.navBar.hasClass('in'))){_globals.header.removeClass(_properties.class);};}else{if(!_globals.header.hasClass('header-top')){_globals.header.addClass(_properties.class);setTimeout(function(){_globals.header.removeClass(_properties.activeClass);},2000);};};});}};},_setCustomMethods=function(){_menuToTop.globals.customResurrect=function(){};_menuToTop.globals.customDestroy=function(){};};_menuToTop.addMethod('init',function(){_menuToTop.bind($window,_menuToTop.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('GallerySlider',function(properties,$,$window,$document){var _gallerySlider=this,_defaults={slider:'#gallerySliderInMain',},_properties=$.extend(_defaults,properties),_globals={slider:null,windowWidth:0,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_gallerySlider,[_properties]);if(!_globals.preloaded){return _gallerySlider.init();}
_gallerySlider.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_gallerySlider.create();},_config=function(){_globals.slider=$(_properties.slider);_globals.windowWidth=$window.width();},_setup=function(){if(_globals.slider.length){if(_globals.windowWidth>479){_globals.slider.slick({slidesToShow:3,arrows:true,easing:'easeInExpo',draggable:false,pauseOnHover:false,speed:900,swipe:true,dots:false,infinite:false,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:false,arrows:false,dots:false}},{breakpoint:900,settings:{slidesToShow:2,slidesToScroll:2,infinite:false,arrows:false,dots:false}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,infinite:false,arrows:false,dots:false}}]});};}},_setBinds=function(){_binds().setResizeBind();},_binds=function(){return{setResizeBind:function(){_gallerySlider.bind($window,'resize',function(e,data,el){_setup();})}};},_triggers=function(){return{};},_setCustomMethods=function(){_gallerySlider.globals.customResurrect=function(){};_gallerySlider.globals.customDestroy=function(){};};_gallerySlider.addMethod('init',function(){_gallerySlider.bind($window,_gallerySlider.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('TopEventsSlider',function(properties,$,$window,$document){var _topEventsSlider=this,_defaults={slider:'#topEventsSliders'},_properties=$.extend(_defaults,properties),_globals={slider:null,windowWidth:0,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_topEventsSlider,[_properties]);if(!_globals.preloaded){return _topEventsSlider.init();}
_topEventsSlider.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_topEventsSlider.create();},_config=function(){_globals.slider=$(_properties.slider);_globals.windowWidth=$window.width();},_setup=function(){if(_globals.slider.length){if(_globals.windowWidth>479){_globals.slider.slick({slidesToShow:3,easing:'easeInExpo',draggable:false,speed:900,swipe:true,dots:false,pauseOnHover:false,infinite:false,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:false,dots:false}},{breakpoint:900,settings:{slidesToShow:2,slidesToScroll:2,infinite:false,dots:false}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,infinite:false,arrows:false,dots:true}}]});};}},_setBinds=function(){_binds().setResizeBind();},_binds=function(){return{setResizeBind:function(){_topEventsSlider.bind($window,'resize',function(e,data,el){_setup();})}};},_triggers=function(){return{};},_setCustomMethods=function(){_topEventsSlider.globals.customResurrect=function(){};_topEventsSlider.globals.customDestroy=function(){};};_topEventsSlider.addMethod('init',function(){_topEventsSlider.bind($window,_topEventsSlider.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('TicketsEventsSlider',function(properties,$,$window,$document){var _ticketsEventsSlider=this,_defaults={slider:'#ticketsSlider',defaultSlider:'.default-slider-tickets'},_properties=$.extend(_defaults,properties),_globals={slider:null,defaultSlider:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_ticketsEventsSlider,[_properties]);if(!_globals.preloaded){return _ticketsEventsSlider.init();}
_ticketsEventsSlider.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_ticketsEventsSlider.create();},_config=function(){_globals.slider=$(_properties.slider);_globals.defaultSlider=$(_properties.defaultSlider);},_setup=function(){if((_globals.slider.length)&&(!_globals.slider.hasClass(_properties.defaultSlider))){_globals.slider.slick({slidesToShow:1,dots:false,easing:'easeInExpo',autoplay:false,autoplaySpeed:4200,pauseOnHover:false,draggable:false,infinite:false,speed:300,vertical:true});}else if((_globals.slider.length)&&(_globals.slider.hasClass(_properties.defaultSlider))){_globals.slider.slick({slidesToShow:1,dots:false,easing:'easeInExpo',autoplay:false,arrows:true,autoplaySpeed:4200,pauseOnHover:false,draggable:false,infinite:false,speed:300,vertical:true,responsive:[{breakpoint:1024,settings:{arrows:true,slidesToShow:1,infinite:false,dots:false}},{breakpoint:768,settings:{arrows:true,slidesToShow:1,infinite:false,dots:false}},{breakpoint:320,settings:{arrows:false,slidesToShow:1,infinite:false,dots:false}}]});}},_setBinds=function(){_binds().setResizeBind();},_binds=function(){return{setResizeBind:function(){_ticketsEventsSlider.bind($window,'resize',function(e,data,el){_setup();})}};},_triggers=function(){return{};},_setCustomMethods=function(){_ticketsEventsSlider.globals.customResurrect=function(){};_ticketsEventsSlider.globals.customDestroy=function(){};};_ticketsEventsSlider.addMethod('init',function(){_ticketsEventsSlider.bind($window,_ticketsEventsSlider.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('FormContacts',function(properties,$,$window,$document){var _formContacts=this,_defaults={contactForm:'#contactForm',contactFormSuccessMessage:'#successMessage'},_properties=$.extend(_defaults,properties),_globals={contactForm:null,contactFormSuccessMessage:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_formContacts,[_properties]);if(!_globals.preloaded){return _formContacts.init();}
_formContacts.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_formContacts.create();},_config=function(){_globals.contactForm=$(_properties.contactForm);_globals.contactFormSuccessMessage=$(_properties.contactFormSuccessMessage);},_setup=function(){if(_globals.contactForm.length){_globals.contactForm.validate();_globals.contactForm.ajaxForm({dataType:'json',beforeSubmit:_formContactBeforeSubmit,success:_formContactSuccess});}},_setBinds=function(){},_binds=function(){return{}},_triggers=function(){return{}},_setCustomMethods=function(){_formContacts.globals.customResurrect=function(){};_formContacts.globals.customDestroy=function(){};},_formContactBeforeSubmit=function(arr,$form,options){},_formContactSuccess=function(response){if(response.success){_globals.contactForm.slideUp('slow',function(){_globals.contactFormSuccessMessage.slideDown('slow');});}else{for(var key in response.errors){var el=$('#'+key);el.addClass('error');}}};_formContacts.addMethod('init',function(){_formContacts.bind($window,_formContacts.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('FormSubscribe',function(properties,$,$window,$document){var _formSubscribe=this,_defaults={form:'#email-footer-form',formSuccessMessage:'#successSubscribe',formSuccessLoader:'#loaderSubscribeForm'},_properties=$.extend(_defaults,properties),_globals={form:null,formSuccessMessage:null,formSuccessLoader:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_formSubscribe,[_properties]);if(!_globals.preloaded){return _formSubscribe.init();}
_formSubscribe.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_formSubscribe.create();},_config=function(){_globals.form=$(_properties.form);_globals.formSuccessMessage=$(_properties.formSuccessMessage);_globals.formSuccessLoader=$(_properties.formSuccessLoader);},_setup=function(){if(_globals.form.length){_globals.form.validate({errorElement:'span',errorPlacement:function(error,element){if($(element).hasClass('error')&&!$('label[for='+$(element).attr('id')+']').length){var label=$('<label/>');label.addClass('error').attr('for',$(element).attr('id'));var arrow=$('<span/>');arrow.addClass('subscribe-label-arrow');error.addClass('subscribe-label-inner').removeClass('error');error.insertAfter(element).wrap(label);arrow.insertBefore(error);_globals.form.addClass('error');}else if($(element).hasClass('valid')){$(error).parent('label').remove();_globals.form.removeClass('error');}},success:function(label){$('label[for=email-subscribe]').remove();}});_globals.form.ajaxForm({dataType:'json',beforeSubmit:_formBeforeSubmit,success:_formSuccess});}},_setBinds=function(){},_binds=function(){return{}},_triggers=function(){return{}},_setCustomMethods=function(){_formSubscribe.globals.customResurrect=function(){};_formSubscribe.globals.customDestroy=function(){};},_formBeforeSubmit=function(arr,$form,options){_globals.formSuccessLoader.removeClass('hide');},_formSuccess=function(response){if(response.success){_globals.form.slideUp('slow',function(){_globals.formSuccessMessage.slideDown('slow');});}else{_globals.formSuccessLoader.addClass('hide');for(var key in response.errors){var el=$('#'+key);el.addClass('error');}}};_formSubscribe.addMethod('init',function(){_formSubscribe.bind($window,_formSubscribe.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('GalleryPage',function(properties,$,$window,$document){var _galleryPage=this,_defaults={galleryContainer:'#galleryContainer',galleryText:'#galleryText',scrollButton:'#scrollButton',borderGallery:'#borderGallery',galleryCount:'#galleryCount',imagesCounter:'#imagesCounter',allImagesBlock:'#allImagesBlock',allImgContainers:'.gallery-tile',imageLightBox:'#imagelightbox',imageLightBoxWrap:'.imageLightboxWrap'},_properties=$.extend(_defaults,properties),_globals={galleryContainer:null,galleryText:null,scrollButton:null,borderGallery:null,galleryCount:null,imagesCounter:null,allImagesBlock:null,allImgContainers:null,currentImageContainer:null,galleryLightBox:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_galleryPage,[_properties]);if(!_globals.preloaded){return _galleryPage.init();}
_galleryPage.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_galleryPage.create();},_config=function(){_globals.galleryContainer=$(_properties.galleryContainer);_globals.galleryText=$(_properties.galleryText);_globals.scrollButton=$(_properties.scrollButton);_globals.borderGallery=$(_properties.borderGallery);_globals.galleryCount=$(_properties.galleryCount);_globals.imagesCounter=$(_properties.imagesCounter);_globals.allImagesBlock=$(_properties.allImagesBlock);_globals.allImgContainers=$(_properties.allImgContainers);},_setup=function(){_globals.galleryLightBox=_globals.allImgContainers.imageLightbox({allowedTypes:'png|jpg|jpeg|gif',animationSpeed:250,preloadNext:true,enableKeyboard:true,quitOnEnd:false,quitOnImgClick:false,quitOnDocClick:true,onStart:function(){_showGalleryPicture();},onEnd:function(){_exitGalleryPicture();},onLoadStart:function(){_galleryLoader(true);},onLoadEnd:function(){_galleryLoader(false);_showGalleryPicture();_imgCounter();}})},_setBinds=function(){_binds().setScrollButtonBind();_binds().setAllImageBlockBind();_binds().setAllImgContainersBind();},_binds=function(){return{setScrollButtonBind:function(){_globals.scrollButton.unbind('click touchend');_globals.scrollButton.bind('click touchend',function(){if(_globals.galleryText.hasClass('active')){_globals.scrollButton.find('.scroll-down-inner').text('about this event');_globals.galleryContainer.animate({top:0},700);setTimeout(function(){_globals.galleryContainer.removeClass('top');_globals.galleryText.removeClass('active');$('html,body').scrollTop(0);},700);_globals.scrollButton.removeClass('active top');_globals.borderGallery.removeClass('active');}else{_globals.borderGallery.addClass('active');_globals.scrollButton.addClass('active top');_globals.scrollButton.find('.scroll-down-inner').text('to gallery');_globals.galleryContainer.addClass('top');_globals.galleryContainer.animate({top:-(_globals.galleryContainer.outerHeight())},700);_globals.galleryText.addClass('active');$('html, body').animate({scrollTop:0},700);}})},setAllImageBlockBind:function(){_globals.allImagesBlock.on('click',function(){_globals.galleryLightBox.quitImageLightbox();});},setAllImgContainersBind:function(){_globals.allImgContainers.on('click',function(){_globals.curentImageContainer=$(this);});}};},_triggers=function(){return{};},_countImages=function(){var imagesLength=_globals.allImgContainers.length;var currentImageNumber=1;for(var i=0;i<imagesLength;i++){if(_globals.allImgContainers[i].href===$(_globals.currentImageContainer).attr('href')){currentImageNumber=i+1;}}
_globals.imagesCounter.text(currentImageNumber+'/'+imagesLength);},_imgCounter=function(){var $openedImage=$(_properties.imageLightBox);var $target=$(_properties.allImgContainers+'[href="'+$openedImage.attr('src')+'"]');var index=$target.index(_properties.allImgContainers);_globals.imagesCounter.text((index+1)+'/'+_globals.allImgContainers.length);},_clickGalleryNavigation=function(direction){var $openedImage=$(_properties.imageLightBox);var $target=$(_properties.allImgContainers+'[href="'+$openedImage.attr('src')+'"]');var index=$target.index(_properties.allImgContainers);if(direction==='left'){index=index-1;if(!_globals.allImgContainers.eq(index).length){index=_globals.allImgContainers.length;}}else{index=index+1;if(!_globals.allImgContainers.eq(index).length){index=0;}}
_globals.galleryLightBox.switchImageLightbox(index);return false;},_showGalleryPicture=function(){if(!$(_properties.imageLightBoxWrap).length){var wrapper='<div class="imageLightboxWrap"></div>';var loader='<div class="loader-gall"><div class="fr-bl"></div><div class="sc-bl"></div><div class="thr-bl"></div><div class="fth-bl"></div></div>';var prevNavigation='<div class="lightbox-prev"></div>';var nextNavigation='<div class="lightbox-next"></div>';$(wrapper).appendTo('body');$(loader).appendTo('body');$(prevNavigation).appendTo('body');$(nextNavigation).appendTo('body');$('.lightbox-prev').unbind('click touchend').bind('click touchend',function(){_clickGalleryNavigation('left');});$('.lightbox-next').unbind('click touchend').bind('click touchend',function(){_clickGalleryNavigation('right');});}else{$(_properties.imageLightBoxWrap).fadeIn();$('.lightbox-prev').show();$('.lightbox-next').show();$('.loader-gall').show();};_globals.scrollButton.hide();_globals.galleryCount.hide();_globals.allImagesBlock.show();_countImages();},_exitGalleryPicture=function(){var $wrapper=$(_properties.imageLightBoxWrap);var $prevNavigation=$('.lightbox-prev');var $nextNavigation=$('.lightbox-next');var $loader=$('.loader-gall');$loader.hide();$wrapper.fadeOut();$prevNavigation.hide();$nextNavigation.hide();_globals.allImagesBlock.hide();_globals.scrollButton.show();_globals.galleryCount.show();},_galleryLoader=function(flag){var $loader=$('.loader-gall');if(flag===true){$loader.show();}else{$loader.hide();}},_setCustomMethods=function(){_galleryPage.globals.customResurrect=function(){};_galleryPage.globals.customDestroy=function(){};};_galleryPage.addMethod('init',function(){_galleryPage.bind($window,_galleryPage.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('Sharrre',function(properties,$,$window,$document){var _sharrre=this,_defaults={twitter:'.tw-soc.ver1',fb:'.fb-soc.ver1',twitter2:'.tw-soc.ver2',fb2:'.fb-soc.ver2'},_properties=$.extend(_defaults,properties),_globals={twitter:null,fb:null,twitter2:null,fb2:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_sharrre,[_properties]);if(!_globals.preloaded){return _sharrre.init();}
_sharrre.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_sharrre.create();},_config=function(){_globals.twitter=$(_properties.twitter);_globals.fb=$(_properties.fb);_globals.twitter2=$(_properties.twitter2);_globals.fb2=$(_properties.fb2);},_setup=function(){if(_globals.twitter.length){_globals.twitter.sharrre({share:{twitter:true},url:$(this).data('url')!='undefined'?$(this).data('url'):'',text:$(this).data('text')!='undefined'?$(this).data('text'):'',enableHover:false,enableTracking:true,template:'<div class="tw-icon"></div><div class="numbers"><span class="triangle"></span><span class="tw-numbers">{total}</span></div>',click:function(api,options){api.simulateClick();api.openPopup('twitter');}});}
if(_globals.fb.length){_globals.fb.sharrre({share:{facebook:true},url:$(this).data('url')!='undefined'?$(this).data('url'):'',text:$(this).data('text')!='undefined'?$(this).data('text'):'',enableHover:false,enableTracking:true,template:'<div class="fb-icon"></div><div class="numbers"><span class="triangle"></span><span class="fb-numbers">{total}</span></div>',click:function(api,options){api.simulateClick();api.openPopup('facebook');}});}
if(_globals.twitter2.length){_globals.twitter2.sharrre({share:{twitter:true},url:$(this).data('url')!='undefined'?$(this).data('url'):'',text:$(this).data('text')!='undefined'?$(this).data('text'):'',enableHover:false,enableTracking:true,template:'<i class="fa fa-twitter"></i><span class="numbers"><span class="triangle"></span><span class="tw-numbers">{total}</span></span>',click:function(api,options){api.simulateClick();api.openPopup('twitter');}});}
if(_globals.fb2.length){_globals.fb2.sharrre({share:{facebook:true},url:$(this).data('url')!='undefined'?$(this).data('url'):'',text:$(this).data('text')!='undefined'?$(this).data('text'):'',enableHover:false,enableTracking:true,template:'<i class="fa fa-facebook"></i><span class="numbers"><span class="triangle"></span><span class="fb-numbers">{total}</span></span>',click:function(api,options){api.simulateClick();api.openPopup('facebook');}});}},_setBinds=function(){},_binds=function(){return{};},_triggers=function(){return{};},_setCustomMethods=function(){_sharrre.globals.customResurrect=function(){};_sharrre.globals.customDestroy=function(){};};_sharrre.addMethod('init',function(){_sharrre.bind($window,_sharrre.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('EventsTickets',function(properties,$,$window,$document){var _eventsTickets=this,_defaults={tickets:'.ticket-event',lineUpClass:'.ticket-event-lineup',shClass:'.ticket-line-up.sh',hidClass:'.ticket-line-up.hid'},_properties=$.extend(_defaults,properties),_globals={tickets:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_eventsTickets,[_properties]);if(!_globals.preloaded){return _eventsTickets.init();}
_eventsTickets.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_eventsTickets.create();},_config=function(){_globals.tickets=$(_properties.tickets);},_setup=function(){if(_globals.tickets.length>0){_globals.tickets.mouseenter(function(){var width=$(this).find(_properties.lineUpClass).width();var outerWidth=$(this).find(_properties.lineUpClass).outerWidth();var $shNode=$(this).find(_properties.shClass);var $hdNode=$(this).find(_properties.hidClass);$shNode.stop();$hdNode.stop();$shNode.width(width);$hdNode.width(width);$shNode.animate({left:-outerWidth},500);$hdNode.animate({left:0},500);}).mouseleave(function(){var outerWidth=$(this).find(_properties.lineUpClass).outerWidth();var $shNode=$(this).find(_properties.shClass);var $hdNode=$(this).find(_properties.hidClass);$shNode.stop();$hdNode.stop();$shNode.animate({left:0},500);$hdNode.animate({left:outerWidth},500);});}},_setBinds=function(){},_binds=function(){return{};},_triggers=function(){return{};},_setCustomMethods=function(){_eventsTickets.globals.customResurrect=function(){};_eventsTickets.globals.customDestroy=function(){};};_eventsTickets.addMethod('init',function(){_eventsTickets.bind($window,_eventsTickets.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});appMakeBeCool.gateway.addClass('DropDownClick',function(properties,$,$window,$document){var _dropDownClick=this,_defaults={dropdown:'.dropdown',dropdownToggle:'.dropdown-toggle'},_properties=$.extend(_defaults,properties),_globals={dropdown:null,preloaded:false},_init=function(){appMakeBeCool.gateway.base.Class.apply(_dropDownClick,[_properties]);if(!_globals.preloaded){return _dropDownClick.init();}
_dropDownClick.globals.customCreate=function(){_config();_setup();_setBinds();_setCustomMethods();};_dropDownClick.create();},_config=function(){_globals.dropdown=$(_properties.dropdown);},_setup=function(){},_setBinds=function(){},_binds=function(){return{};},_triggers=function(){return{};},_setCustomMethods=function(){_dropDownClick.globals.customResurrect=function(){};_dropDownClick.globals.customDestroy=function(){};};_dropDownClick.addMethod('init',function(){_dropDownClick.bind($window,_dropDownClick.globals.classType+'_Init',function(e,data,el){_globals.preloaded=true;_init();});});_init();});$(function(){if(global.cultureKey!='en'){downloadJSAtOnload(designUrl+'js/jquery/plugins/validation/localization/messages_'+global.cultureKey+'.js');}
appMakeBeCool.gateway.init();});
