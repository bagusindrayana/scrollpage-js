# scrollpage-js
![npm (scoped)](https://img.shields.io/npm/v/scrollpage-js)

Single full page scroll animation inspired by fullPage JS

DEMO : http://scrollpage-js.netlify.app/


## Installation using npm

```
npm i scrollpage-js
```

## Using CDN

```
https://cdn.jsdelivr.net/npm/scrollpage-js@0.0.3/scrollpage.js
```

## Usage

HTML

```html
<div  id="main-page">
    <div  id="page1"  class="active"></div>
    <div  id="page2"></div>
    <div  id="page3"></div>
</div>
```

CSS
```css
#main-page {
    width: 100%;
}

#main-page div {
    display: block;
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
      scrollBar:true//show or hide scrollbar (default false)
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

## Method

- `onScroll(e)` will be fired if the mouse wheel is scrolling
- `onMove(e)` will fire if animation is playing
- `onStart(e)` will fire before the animation plays
- `onFinish(e)` will be fired after the animation finishes playing
- `moveTo(page,options)` move to spesific page (you can pass string,number or DOM object to `page` argument)


## Menu
you can add a custom menu that works to control the page, this will read every element that is in the menu element and if those elements are clicked it will redirect to the page based on the `data-page` attribute

every selected menu both menu item and page element will be add `active` class, you can change class name with `pageSelectedClass` and `menuSelectedClass` in options

```html
<ul class="side-nav">
    <!-- add the `data-page` attribute that contains the selector to the page elemen -->
    <li data-page="#page1" class="active">Page 1</li>
    <li data-page="#page2" >Page 2</li>
    <li data-page="#page3" >Page 3</li>
</ul>
```

```js
const scrollPage = new ScrollPage("#main-page",{
    menu:"ul.side-nav",//menu selector
});
```



## Resource & Reference

- https://alvarotrigo.com/fullPage/
- https://stackoverflow.com/questions/48068487/full-page-scrolling-with-plain-javascript
- https://codepen.io/brian-chen/pen/eKpMrX
- https://easings.net