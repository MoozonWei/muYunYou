(function () {
    var bannerNavUl = document.getElementById('banner-nav-ul');
    var bannerNav = document.getElementById('banner-nav');
    var menus = document.querySelectorAll('.menus-box .menu');
    var bannerNavLis = document.querySelectorAll('#banner-nav-ul li');

    // 事件委托
    bannerNavUl.onmouseover = function (e) {
        var target = e.target;
        if (target.tagName.toLowerCase() == 'li') {
            var t = target.getAttribute('data-t');
            var themenu = document.querySelector(`.menus-box .menu[data-t=${t}]`);
            for (let i = 0; i < bannerNavLis.length; i++) {
                let className = bannerNavLis[i].className;
                // console.log('before:' + className);
                if (className.indexOf(' current') != -1) {
                    bannerNavLis[i].className = className.substring(0, className.indexOf(' current'));
                }
                // console.log('after:' + bannerNavLis[i].className);
            }
            for (let i = 0; i < menus.length; i++) {
                menus[i].className = 'menu';
            }
            target.className += ' current';
            themenu.className += ' current';
        }
    };

    bannerNav.onmouseleave = function () {
        for (let i = 0; i < bannerNavLis.length; i++) {
            let className = bannerNavLis[i].className;
            // console.log('before:' + className);
            if (className.indexOf(' current') != -1) {
                bannerNavLis[i].className = className.substring(0, className.indexOf(' current'));
            }
            // console.log('after:' + bannerNavLis[i].className);
        }
        for (let i = 0; i < menus.length; i++) {
            menus[i].className = 'menu';
        }
    }
})();