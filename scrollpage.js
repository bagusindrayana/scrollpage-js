class ScrollPage {
    constructor(element, options = null) {
        const _this = this;
        _this.element = element;
        _this.options = options;

        _this.initEvents();

        document.addEventListener('wheel', function (e) {
            e.preventDefault();
            _this.scrollListener(e);
        }, { passive: options?.passive ?? false });

        _this.touchstartX = 0;
        _this.touchstartY = 0;
        _this.touchendX = 0;
        _this.touchendY = 0;

        const body = document.body;
        body.addEventListener('touchstart', function(event) {
            event.preventDefault();
            _this.touchstartX = event.changedTouches[0].screenX;
            _this.touchstartY = event.changedTouches[0].screenY;
        },{passive: false});
    
        body.addEventListener('touchend', function(event) {
            _this.scrollListener(event);
        },{passive: true}); 

        const parent = document.querySelector(this.element);
        _this.childs = [...parent.children];
        _this.stop = true;
        if(options?.menu){
            _this.setMenu(options?.menu);
        }
        _this.pageSelectedClass = options?.pageSelectedClass ?? 'active';
        _this.menuSelectedClass = options?.menuSelectedClass ?? 'active';
        
        _this.currentPage = options?.currentPage ?? 1;
        _this.currentTarget = _this.childs[_this.currentPage-1];
        if(options?.currentPage){
            _this.moveTo(_this.currentPage);
        } else {
            if(window.pageYOffset <= 1){
                _this.currentPage = options?.currentPage ?? 1;
                _this.currentTarget = _this.childs[0];
            } else {
                _this.childs.forEach(child => {
                    if(window.pageYOffset == child.offsetTop){
                        _this.currentPage = _this.pageNumber(child);
                        _this.currentTarget = child;
                    }
                });
            }
        }
    }

    initEvents(){
        this.scrollCallback = this.options?.scrollCallback ?? function(e){};
        this.moveCallback = this.options?.moveCallback ?? function(e){};
        this.startCallback = this.options?.startCallback ?? function(e){};
        this.finishCallback = this.options?.finishCallback ?? function(e){};
    }

    has(object, key) {
        return object ? hasOwnProperty.call(object, key) : false;
    }


    pageIndex(element) {
        return this.childs.indexOf(element ?? this.currentTarget);
    }

    pageNumber(element) {
        return this.pageIndex(element ?? this.currentTarget)+1;
    }

    scrollListener(e) {
        this.scrollCallback(this);
        const childs = this.childs;
        var next = e.target.nextElementSibling;
        var prev = e.target.previousElementSibling;

        if(this.stop){
            this.startCallback(this);
        } else {
            return false;
        }

        const active = e.target.closest("."+this.pageSelectedClass);
        if(active){
            active.classList.remove(this.pageSelectedClass);
        }

        let up = false;
        if(e.changedTouches.length){
            this.touchendX = e.changedTouches[0].screenX;
            this.touchendY = e.changedTouches[0].screenY;
            const delx = this.touchendX - this.touchstartX;
            const dely = this.touchendY - this.touchstartY;
            if(Math.abs(delx) < Math.abs(dely)){
                if(dely > 0){
                    up = true;
                }
                else {
                    up = false;
                }
            }
        }

        if(e.deltaY != undefined && e.deltaY != null){
            if (e.deltaY < 0) {
                up = true;
            } else if (e.deltaY > 0) {
                up = false;
            }
        }

        
        if (up) {
            e.preventDefault();
            if (childs.includes(prev)) {
                if(prev){
                    this.stop = false;
                    const pn = this.pageNumber(prev);
                    const optionsPage = this.has(this.options?.pages,pn) ? this.options?.pages[pn] : null;
                    if(optionsPage?.start){
                        optionsPage?.start();
                    }
                    let easingAnimation = optionsPage?.animation ?? this.options?.animation;
                    let timeAnimation = optionsPage?.time ?? this.options?.time;
                    prev.classList.add(this.pageSelectedClass);
                    this.currentTarget = prev;

                    //play animation
                    this.verticalScroll(prev, timeAnimation,easingAnimation,optionsPage?.finish);
                    
                }
         
            }
    
        } else {
            e.preventDefault();
            if (childs.includes(next)) {
                if(next){
                    this.stop = false;
                    const pn = this.pageNumber(next);
                    const optionsPage = this.has(this.options?.pages,pn) ? this.options?.pages[pn] : null;
                    if(optionsPage?.start){
                        optionsPage?.start();
                    }
                    let easingAnimation = optionsPage?.animation ?? this.options?.animation;
                    let timeAnimation = optionsPage?.time ?? this.options?.time;
                    next.classList.add(this.pageSelectedClass);
                    this.currentTarget = next;

                    //play animation
                    this.verticalScroll(next, timeAnimation,easingAnimation,optionsPage?.finish);
                    
                }
            }
        }

    }

    verticalScroll(destination) {
        const _this = this;
        if(destination === undefined || destination === null) {
            return false;
        }
        const duration = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];
        const easing = arguments.length <= 2 || (arguments[2] === undefined || arguments[2] === null) ? 'easeInSine' : arguments[2];
        const callback = arguments[3];
        const loadDestination = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
        const easings = {
            easeInSine(x) {
                return 1 - Math.cos(x * Math.PI / 2);
            },
            easeOutSine(x) {
                return Math.sin((x * Math.PI) / 2);
            },
            easeInOutSine(x) {
                return -(Math.cos(Math.PI * x) - 1) / 2;
            },
            easeInQuad(x) {
                return x * x;
            },
            easeInQuad(x) {
                return 1 - (1 - x) * (1 - x);
            },
            easeInOutQuad(x) {
                return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
            },
            easeInCubic(x) {
                return x * x * x;
            },
            easeOutCubic(x) {
                return 1 - Math.pow(1 - x, 3);
            },
            easeInOutCubic(x) {
                return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
            },
            easeInQuart(x) {
                return x * x * x * x;
            },
            easeOutQuart(x) {
                return 1 - Math.pow(1 - x, 4);
            },
            easeInOutQuart(x) {
                return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
            },
            easeInQuint(x) {
                return x * x * x * x * x;
            },
            easeOutQuint(x) {
                return 1 - Math.pow(1 - x, 5);
            },
            easeInOutQuint(x) {
                return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
            },
            easeInExpo(x) {
                return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
            },
            easeOutExpo(x) {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            },
            easeInOutExpo(x) {
                return x === 0
                ? 0
                : x === 1
                ? 1
                : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                : (2 - Math.pow(2, -20 * x + 10)) / 2;
            },
            easeInCirc(x) {
                return 1 - Math.sqrt(1 - Math.pow(x, 2));
            },
            easeOutCirc(x) {
                return Math.sqrt(1 - Math.pow(x - 1, 2));
            },
            easeInOutCirc(x) {
                return x < 0.5
                  ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                  : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
            },
            easeInBack(x) {
                const c1 = 1.70158;
                const c3 = c1 + 1;
                
                return c3 * x * x * x - c1 * x * x;
            },
            easeOutBack(x) {
                const c1 = 1.70158;
                const c3 = c1 + 1;
                
                return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
            },
            easeInOutBack(x) {
                const c1 = 1.70158;
                const c2 = c1 * 1.525;
                
                return x < 0.5
                  ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                  : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
            },
            easeInElastic(x) {
                const c4 = (2 * Math.PI) / 3;
                
                return x === 0
                  ? 0
                  : x === 1
                  ? 1
                  : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
            },
            easeOutElastic(x) {
                const c4 = (2 * Math.PI) / 3;
                
                return x === 0
                  ? 0
                  : x === 1
                  ? 1
                  : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
            },
            easeInOutElastic(x) {
                const c5 = (2 * Math.PI) / 4.5;
                
                return x === 0
                  ? 0
                  : x === 1
                  ? 1
                  : x < 0.5
                  ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                  : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
            },
            easeInBounce(x) {
                return 1 - easings["easeOutBounce"](1 - x);
            },
            easeOutBounce(x) {
                const n1 = 7.5625;
                const d1 = 2.75;
                
                if (x < 1 / d1) {
                    return n1 * x * x;
                } else if (x < 2 / d1) {
                    return n1 * (x -= 1.5 / d1) * x + 0.75;
                } else if (x < 2.5 / d1) {
                    return n1 * (x -= 2.25 / d1) * x + 0.9375;
                } else {
                    return n1 * (x -= 2.625 / d1) * x + 0.984375;
                }
            },
            easeInOutBounce(x) {
                return x < 0.5
                    ? (1 - easings["easeOutBounce"](1 - 2 * x)) / 2
                    : (1 + easings["easeOutBounce"](2 * x - 1)) / 2;
            }
        };
    
        var start = window.pageYOffset;
        var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
        var destinationOffsetToScroll = documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset;
       
        
        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, destinationOffsetToScroll);
            if (callback) {
                callback();
            }
            _this.stop = true;
            return;
        }
    
        function scroll() {
            var now = 'now' in window.performance ? performance.now() : new Date().getTime();
            var time = Math.min(1, (now - startTime) / duration);
            var timeFunction = easings[easing](time);
   
            window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));
            if (window.pageYOffset === destinationOffsetToScroll || (easing == "easeInSine" && window.pageYOffset - destinationOffsetToScroll) == 1) {
                if (callback) {
                    callback();
                    
                }
               
                _this.stop = true;
                _this.currentPage = _this.pageNumber();
                _this.finishCallback(_this);
                return;
            }
            
            _this.moveCallback(_this);
            
    
            requestAnimationFrame(scroll);
        }
    
        scroll();
    }

    onScroll(callback){
        this.scrollCallback = callback;
    }

    onMove(callback){
        this.moveCallback = callback;
    }

    onStart(callback){
        this.startCallback = callback;
    }

    onFinish(callback){
        this.finishCallback = callback;
    }

    moveTo(page, options = null){
        let target = null;
        let i = 0;
        if (typeof page === 'number' ) {
            i = page-1;
            target = this.childs[i];
        } else if (typeof page === 'string' ) {
            i = this.findPageByNode(document.querySelector(page));
            target = this.childs[i];
            
            
        } else if (this.findPageByNode(page) !== -1) {
            i = this.findPageByNode(page);
            target = this.childs[i];
            
            
        } else {
            
            target = document.querySelector(page);
        }

        if(options == null){
            if(this.has(this.options?.pages,i+1)  && this.options?.pages[i+1]){
                options = this.options?.pages[i+1];
            } else {
                options = this.options;
            }
            
        }
        
        if(target){
            if(options?.start){
                options?.start();
            }
            this.currentTarget = target;
            this.verticalScroll(target, options?.time,options?.animation,options?.finish);
        } else {
            console.e("page not found");
        }
    }

    setMenu(menuSelector){
        const _this = this;
        const menu = document.querySelector(menuSelector);
        if(menu){
            const menuItems = [...menu.children];
            menuItems.forEach((item)=>{
                item.addEventListener('click',(e)=>{
                    e.preventDefault();
                    const actives = menu.querySelectorAll("."+_this.menuSelectedClass);
                    if(actives.length > 0){
                        actives.forEach(active => {
                            active.classList.remove(_this.menuSelectedClass);
                        });
                    }
                    _this.moveTo(item.getAttribute('data-page'));
                    e.target.classList.add(_this.menuSelectedClass);
                    
                });
            });
        }
    }

    findPageByNode(node){
        return this.childs.indexOf(node);
    }
};
