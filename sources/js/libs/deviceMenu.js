const DeviceMenu = () => {
    /* Responsive Navigation */
    const hamBurger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.mbnav__backdrop');
    const mbnav = document.querySelector('.mbnav');
    const menuWrap = document.querySelector('.mbnav .menu-wrap');
  
    const menuClose = () => {
        hamBurger.classList.remove('is-clicked');
        document.body.classList.remove('scroll-fixed');
        mbnav.classList.remove('is-open');
        const menuItems = menuWrap.querySelectorAll('li');
        menuItems.forEach(item => item.classList.remove('is-open'));
        document.querySelector('.mbnav__inner > .menu-wrap').style.setProperty('--leftSlide', '0');
    };
  
    /* Mobile overlay click */
    overlay.addEventListener('click', () => {
        menuClose();
    });
  
    hamBurger.addEventListener('click', function() {
        if (hamBurger.classList.contains('is-clicked')) {
            menuClose();
        } else {
            hamBurger.classList.add('is-clicked');
            mbnav.classList.add('is-open');
            document.body.classList.add('scroll-fixed');
        }
    });
  
    const clickable = document.querySelector('.mbnav__state').getAttribute('data-clickable');
  
    const listItemsWithSubMenu = document.querySelectorAll('.mbnav li:has(ul)');
    listItemsWithSubMenu.forEach(item => item.classList.add('has-sub'));
  
    const subMenus = document.querySelectorAll('.mbnav li > ul');
    subMenus.forEach(subMenu => subMenu.classList.add('sub-menu'));
  
    const hasSubLinks = document.querySelectorAll('.mbnav .has-sub > a');
    hasSubLinks.forEach(link => {
        const caret = document.createElement('em');
        caret.classList.add('mbnav__caret');
        link.after(caret);
    });
  
    const subMenuItems = document.querySelectorAll('.mbnav ul > li:has(ul.sub-menu)');
    subMenuItems.forEach(item => {
        const subMenu = item.querySelector('> ul');
        const backClick = document.createElement('li');
        backClick.classList.add('back-click');
        backClick.textContent = 'Main Menu';
        subMenu.prepend(backClick);
    });
  
    if (clickable === 'true') {
        const caretElements = document.querySelectorAll('.mbnav .has-sub > .mbnav__caret');
        caretElements.forEach(caret => caret.classList.add('trigger-caret'));
    } else {
        const nonClickableLinks = document.querySelectorAll('.mbnav .has-sub > a');
        nonClickableLinks.forEach(link => {
            link.classList.add('trigger-caret');
            link.setAttribute('href', 'javascript:;');
        });
    }
  
    // Wrap content
    const menuInner = document.querySelector('.mbnav__inner');
    const wrapper = document.createElement('div');
    wrapper.classList.add('menu-wrap');
    const innerWrapper = document.createElement('div');
    innerWrapper.classList.add('menu-inner');
    wrapper.appendChild(innerWrapper);
    menuInner.appendChild(wrapper);
  
    const subMenuWrapper = document.querySelectorAll('.mbnav__inner ul li.has-sub ul');
    subMenuWrapper.forEach(subMenu => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('menu-wrap');
        const innerWrapper = document.createElement('div');
        innerWrapper.classList.add('menu-inner');
        wrapper.appendChild(innerWrapper);
        subMenu.parentNode.appendChild(wrapper);
    });
  
    // Open menu on caret click
    const caretTriggers = document.querySelectorAll('.mbnav .has-sub > .trigger-caret');
    caretTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const element = this.parentElement;
            element.classList.add('is-open');
            document.body.classList.add('scroll-fixed');
            const menuLeftMove = document.querySelector('.mbnav__inner > .menu-wrap');
            const backMove = parseInt(menuLeftMove.getPropertyValue('--leftSlide'), 10);
            menuLeftMove.style.setProperty('--leftSlide', `${backMove + 100}%`);
        });
    });
  
    // Handle back click
    const backClicks = document.querySelectorAll('.mbnav__inner .back-click');
    backClicks.forEach(backClick => {
        backClick.addEventListener('click', function() {
            this.closest('li').classList.remove('is-open');
            const menuLeftMove = document.querySelector('.mbnav__inner > .menu-wrap');
            const backMove = parseInt(menuLeftMove.getPropertyValue('--leftSlide'), 10);
            menuLeftMove.style.setProperty('--leftSlide', `${backMove - 100}%`);
        });
    });
  
    // Set padding from header height
    const headerHeight = document.querySelector('header.main-header').offsetHeight;
    document.querySelector('.mbnav .menu-wrap > .menu-inner').style.paddingTop = `${headerHeight}px`;
};
  
export default DeviceMenu;
