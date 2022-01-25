# scrollpage-js
![npm (scoped)](https://img.shields.io/npm/v/scrollpage-js)

Single full page scroll animation inspired from fullPage JS


## Installation using npm

```
npm i scrollpage-js
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
body {
    margin: 0px;
    padding: 0px;
    overflow: hidden;
}

div {
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
      time:1000 //default 500
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


## Resource & Reference

- https://alvarotrigo.com/fullPage/
- https://stackoverflow.com/questions/48068487/full-page-scrolling-with-plain-javascript
- https://codepen.io/brian-chen/pen/eKpMrX
- https://easings.net