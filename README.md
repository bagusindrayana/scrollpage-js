# scrollpage-js
![npm (scoped)](https://img.shields.io/npm/v/scrollpage-js)

Single full page scroll animation inspired by fullPage JS

- DEMO : http://scrollpage-js.netlify.app/
- CODEPEN : https://codepen.io/bagusindrayana/pen/QWOWKeY


## Installation using npm

```
npm i scrollpage-js
```

## Using CDN

```
https://cdn.jsdelivr.net/npm/scrollpage-js/scrollpage.js
```

## Usage

HTML

```html
<div  id="main-page">
    <div  id="page1" class="page-item"></div>
    <div  id="page2" class="page-item"></div>
    <div  id="page3" class="page-item"></div>
</div>
```

CSS
```css

#main-page {
    width: 100%;
}

#main-page .page-item {
    width: 100%;
    height: 100vh;
}

#page1 {
    background-color: aquamarine;
}

#page2 {
    background-color: blueviolet;
}

#page3 {
    background-color: darkorange;
}
```

JS
```html
<script src="./scrollpage.js"></script>
<script>
    const scrollPage = new ScrollPage("#main-page"); 
</script>
```

## Options

setting animation and duration, all animation reference from https://easings.net
```js
const scrollPage = new ScrollPage("#main-page",{
      animation:"easeInQuart",//default easeInSine
      time:1000, //default 500
      scrollBar:true,//show or hide scrollbar (default false),
      pageSelectedClass:"active",//css class name for page element if active or selected (default 'active')
      menuSelectedClass:"active",//css class name for menu element if active or selected (default 'active')
});
```

setting per-pages
```js
const scrollPage = new ScrollPage("#main-page",{
    pages:{
	    //for page 1
        1:{
            animation:"easeInQuart",
            time:1000
        },
        //for page 2
        2:{
            animation:"easeOutQuint",
            time:500
        },
        //for page 3
        3:{
            animation:"easeOutCubic",
            time:700
        }
    }
}); 
```

trigger scroll page if scrolling content reach bottom or top
```js
const scrollPage = new ScrollPage("#main-page", {
    triggerScrollChildren:true//default false
});
```


height based or relative to parent height,you need to set height for parent or "main-page" element.relative options will also set `postion:relative` for parent element
```js
const scrollPage = new ScrollPage("#main-page", {
    relative:true//default false
});
```

non relative scrollpage will be full 100% height of browser window/screen

if you want make sub scrollpage inside another scrollpage make sure you use relative scrollpage and set height for sub scrollpage element.
see [example](https://github.com/bagusindrayana/scrollpage-js/blob/master/examples/relative.html)



## Event & Method

- `onScroll(e)` will be fired if the mouse wheel is scrolling or touch swipe
- `onMove(e)` will fire if animation is playing/page is moving or scrolling
- `onStart(e)` will fire before the animation plays/page start moving or scrolling
- `onFinish(e)` will be fired after the animation finishes playing/page finish moving or scrolling
- `on(pageName,e)` will fire if move or scrolling to a specific page (based on page element `id` if there is value otherwise will be based on page sequence number starting from 1)
- `moveTo(page,options)` move to spesific page (you can pass string,number or DOM object to `page` argument)

all response values from the event will be in this format
```js
{
    sp,// scrollpage object
    currentPage,// current page number (origin page)
    nextPage,// next page number (destination page)
    currentPageName,// current page name (if have `id` otherwise  will olny return page number)
    nextPageName,// next page name (if have `id` otherwise  will olny return page number)
    index,// current page index (start from 0)
}
```


### Example

```js
scrollPage.onScroll(function(e){
    console.log("Leaving from : "+e.currentPageName);//only fire if you keep scroll your mouse wheel
    console.log("Scroll to : "+e.nextPageName);
});

scrollPage.onMove(function(e){
    console.log("Move to : "+e.nextPageName);//will be fired every frame along with the animation (both moving with menu or mouse wheel)
});

scrollPage.onStart(function(e){
    console.log("The previous page was : "+e.currentPageName);
    console.log("The next page is : "+e.nextPageName);
});

scrollPage.onFinish(function(e){
    console.log("Arrived at : "+e.currentPageName); //will have same value as next page because is already arrived/finish
    console.log("Done Go to : "+e.nextPageName);
});

scrollPage.on('page3',function(e){
    console.log("Event 1 on : "+e.currentPageName); //will have same value as next page
    console.log("Event 2 on : "+e.nextPageName);
});
```


## Menu
you can add a custom menu that works to control the page, this will read every element that is in the menu element and if those elements are clicked it will redirect to the page based on the `data-page` attribute

every selected menu both menu item and page element will be add `active` class, you can change class name with `pageSelectedClass` and `menuSelectedClass` in options

```html
<ul class="side-nav">
    <!-- add the `data-page` attribute that contains the selector to the page elemen -->
    <li data-page="#page1" >Page 1</li>
    <li data-page="#page2" >Page 2</li>
    <li data-page="#page3" >Page 3</li>
</ul>
```

```js
const scrollPage = new ScrollPage("#main-page",{
    menu:"ul.side-nav",//menu selector
});
```

## More Advance Menu by Scott Rhamy @cycle4passion

In this example the menu will only display dots and on hover will show the page name.just using css
[CODEPEN](https://codepen.io/bagusindrayana/pen/jOaQJmx)



## Resource & Reference

- https://alvarotrigo.com/fullPage/
- https://stackoverflow.com/questions/48068487/full-page-scrolling-with-plain-javascript
- https://codepen.io/brian-chen/pen/eKpMrX
- https://easings.net


## Issue / Features Requests / Contribution
- You can report errors, problems, bugs, or other problems via the github issue, I'll try to respond as soon as possible
- for the current case, the features that are currently available are enough for me but of course it doesn't rule out the possibility of developing other features if you have other feature ideas you can request it if possible I will implement it soon
- this is my first javascript library/package so maybe my code is a bit messy and a bit difficult to understand but of course I am open to all suggestions and criticisms that you give you can also change the code as you like, if you want to contribute I will try my best to put everything together