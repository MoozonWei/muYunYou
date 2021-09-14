/* 
/* carousel effect
/* 通常使用 IIFE 来包裹，目的是为了不污染全局变量
 */

(function () {
    var carousel_list = document.getElementById('carousel_list');
    var left_btn = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    var circle_ol = document.getElementById('circle_ol');
    var circle_lis = circle_ol.children;
    var banner = document.getElementById('banner');

    var clone_li = carousel_list.firstElementChild.cloneNode(true);
    carousel_list.appendChild(clone_li);

    // 节流锁
    var lock = false;

    var n = 0;

    function right_btn_handler() {
        // 查锁
        if (lock) return;
        // 上锁
        lock = true;
        n++;
        carousel_list.style.transition = 'transform .5s ease 0s';
        carousel_list.style.transform = `translateX(${-16.666 * n}%)`;
        if (n == 5) {
            n = 0;
            setTimeout(function () {
                carousel_list.style.transition = 'none';
                carousel_list.style.transform = 'none';
            }, 500);
        }
        setCircles();

        // 开锁
        setTimeout(function () {
            lock = false;
        }, 500);
    }
    right_btn.onclick = right_btn_handler;

    left_btn.onclick = function () {
        // 查锁
        if (lock) return;
        // 上锁
        lock = true;
        if (n == 0) {
            n = 5;
            carousel_list.style.transition = 'none';
            carousel_list.style.transform = `translateX(${-16.666 * n}%)`;
        }
        setTimeout(function () {
            n--;
            carousel_list.style.transition = 'transform .5s ease 0s';
            carousel_list.style.transform = `translateX(${-16.666 * n}%)`;
            setCircles();
        }, 0);
        // 开锁
        setTimeout(function () {
            lock = false;
        }, 500);
    }

    // 切图时候的圆点动画
    function setCircles() {
        for (var i = 0; i < 5; i++) {
            if (i == n) {
                circle_lis[i].className = 'current';
            } else {
                circle_lis[i].className = '';
            }
        }
    }

    // 事件委托，点击圆点的效果
    circle_ol.onclick = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            var num = Number(e.target.getAttribute('data-n'));
            n = num;
            carousel_list.style.transform = `translateX(${-16.666 * n}%)`;
            setCircles();
        }
    };

    // 自动轮播
    var timer = setInterval(right_btn_handler, 2500);
    banner.onmouseenter = function () {
        clearInterval(timer);
    }
    banner.onmouseleave = function () {
        // 设表先关！！！！
        clearInterval(timer);
        timer = setInterval(right_btn_handler, 2500);
    }
})();