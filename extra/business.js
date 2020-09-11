var timeOnSlide = 4, 		
 		timeBetweenSlides =2, 	
    	animationstring = 'animation',
    	animation = false,
    	keyframeprefix = '',
    	domPrefixes = 'Webkit Moz O Khtml'.split(' '), 
    // array of possible vendor prefixes
    	pfx  = '',
    	slidy = document.getElementById("slidy"); 
		if (slidy.style.animationName !== undefined)
		{ 
			animation = true; 
		} 
		if( animation === false ) {
  				for( var i = 0; i < domPrefixes.length; i++ ) 
  				{
				    if( slidy.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) 
				    {
				      pfx = domPrefixes[ i ];
				      animationstring = pfx + 'Animation';
				      keyframeprefix = '-' + pfx.toLowerCase() + '-';
				      animation = true;
				      break;
    				}
			  	}

			}
if( animation === false ) {
  // animate in JavaScript fallback
} else {
  var images = slidy.getElementsByTagName("img"),
      firstImg = images[0], 
      imgWrap = firstImg.cloneNode(false);  
  slidy.appendChild(imgWrap); 
  var imgCount = images.length, t
      totalTime = (timeOnSlide + timeBetweenSlides) * (imgCount - 1), 
      slideRatio = (timeOnSlide / totalTime)*100, 
      moveRatio = (timeBetweenSlides / totalTime)*100,
      basePercentage = 100/imgCount, 
      position = 0,
      css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML += "#slidy { text-align: left; margin: 0; font-size: 0; position: relative; width: " + (imgCount * 100) + "%;  }\n"; 
  css.innerHTML += "#slidy img { float: left; width: " + basePercentage + "%; }\n";
  css.innerHTML += "@"+keyframeprefix+"keyframes slidy {\n"; 
  for (i=0;i<(imgCount-1); i++) {  
    position+= slideRatio;
    css.innerHTML += position+"% { left: -"+(i * 100)+"%; }\n";
    position += moveRatio; // make the postion for the _next_ slide
    css.innerHTML += position+"% { left: -"+((i+1) * 100)+"%; }\n";
}
  css.innerHTML += "}\n";
  css.innerHTML += "#slidy { left: 0%; "+keyframeprefix+"transform: translate3d(0,0,0); "+keyframeprefix+"animation: "+totalTime+"s slidy infinite; }\n"; 
document.body.appendChild(css); 
}