/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 652
(__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) {


;// ./src/js/module/functions.js
/* Проверка мобильного браузера */
let isMobile = (/* unused pure expression or super */ null && ({
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
}));
// Отключение скейла страницы на IOS
const disableIOSTextFieldZoom = () => {
  if (!isIOS()) {
    return;
  }
  const element = document.querySelector('meta[name=viewport]');
  if (element !== null) {
    let content = element.getAttribute('content');
    let scalePattern = /maximum\-scale=[0-9\.]+/g;
    if (scalePattern.test(content)) {
      content = content.replace(scalePattern, 'maximum-scale=1');
    } else {
      content = [content, 'maximum-scale=1'].join(', ');
    }
    element.setAttribute('content', content);
  }
};
// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
function isIOS() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform,
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) document.documentElement.classList.add('touch');
}
// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.documentElement.classList.add('loaded');
    }, 0);
  });
}
// Получение хеша в адресе сайта
function getHash() {
  if (location.hash) {
    return location.hash.replace('#', '');
  }
}
// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0];
  history.pushState('', '', hash);
}
// Учет плавающей панели на мобильных устройствах при 100vh
function fullVHfix() {
  const fullScreens = document.querySelectorAll('[data-fullscreen]');
  if (fullScreens.length && isMobile.any()) {
    window.addEventListener('resize', fixHeight);
    function fixHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    fixHeight();
  }
}
// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty('height') : null;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      !showmore ? target.style.removeProperty('overflow') : null;
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent('slideUpDone', {
          detail: {
            target: target,
          },
        }),
      );
    }, duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty('height') : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent('slideDownDone', {
          detail: {
            target: target,
          },
        }),
      );
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
  if (document.documentElement.classList.contains('_is-lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
let bodyUnlock = (delay = 500) => {
  let body = document.querySelector('body');
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll('[data-lp]');
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = '';
      }
      body.style.paddingRight = '';
      document.documentElement.classList.remove('_is-lock');
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
let bodyLock = (delay = 500) => {
  let body = document.querySelector('body');
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll('[data-lp]');
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    document.documentElement.classList.add('_is-lock');

    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
// Модуль работы со спойлерами =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-spojlery.html
Сниппет (HTML): spollers
*/
function spollers() {
  const spollersArray = document.querySelectorAll('[data-spollers]');
  if (spollersArray.length > 0) {
    // Событие клика
    document.addEventListener('click', setSpollerAction);
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(',')[0];
    });
    // Инициализация обычных слойлеров
    if (spollersRegular.length) {
      initSpollers(spollersRegular);
    }
    // Получение слойлеров с медиа-запросами
    let mdQueriesArray = dataMediaQueries(spollersArray, 'spollers');
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock) => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_spoller-init');
          initSpollerBody(spollersBlock);
        } else {
          spollersBlock.classList.remove('_spoller-init');
          initSpollerBody(spollersBlock, false);
        }
      });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerItems = spollersBlock.querySelectorAll('details');
      if (spollerItems.length) {
        //spollerItems = Array.from(spollerItems).filter(item => item.closest('[data-spollers]') === spollersBlock);
        spollerItems.forEach((spollerItem) => {
          let spollerTitle = spollerItem.querySelector('summary');
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex');
            if (!spollerItem.hasAttribute('data-open')) {
              spollerItem.open = false;
              spollerTitle.nextElementSibling.hidden = true;
            } else {
              spollerTitle.classList.add('_spoller-active');
              spollerItem.open = true;
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.classList.remove('_spoller-active');
            spollerItem.open = true;
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }
    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest('summary') && el.closest('[data-spollers]')) {
        e.preventDefault();
        if (el.closest('[data-spollers]').classList.contains('_spoller-init')) {
          const spollerTitle = el.closest('summary');
          const spollerBlock = spollerTitle.closest('details');
          const spollersBlock = spollerTitle.closest('[data-spollers]');
          const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
          const scrollSpoller = spollerBlock.hasAttribute('data-spoller-scroll');
          const spollerSpeed = spollersBlock.dataset.spollersSpeed
            ? parseInt(spollersBlock.dataset.spollersSpeed)
            : 500;
          if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerBlock.open) {
              hideSpollersBody(spollersBlock);
            }

            const isOpen = !spollerBlock.open;

            if (isOpen) {
              spollerBlock.open = true;
              spollersBlock.classList.add('_spollers-active');
            } else {
              setTimeout(() => {
                spollerBlock.open = false;

                // если нет открытых спойлеров — удаляем класс
                if (!spollersBlock.querySelector('details[open]')) {
                  spollersBlock.classList.remove('_spollers-active');
                }
              }, spollerSpeed);
            }

            spollerTitle.classList.toggle('_spoller-active');
            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);

            if (scrollSpoller && spollerTitle.classList.contains('_spoller-active')) {
              const scrollSpollerValue = spollerBlock.dataset.spollerScroll;
              const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
              const scrollSpollerNoHeader = spollerBlock.hasAttribute('data-spoller-scroll-noheader')
                ? document.querySelector('.header').offsetHeight
                : 0;

              //setTimeout(() => {
              window.scrollTo({
                top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
                behavior: 'smooth',
              });
              //}, spollerSpeed);
            }
          }
        }
      }
      // Закрытие при клике вне спойлера
      if (!el.closest('[data-spollers]')) {
        const spollersClose = document.querySelectorAll('[data-spoller-close]');
        if (spollersClose.length) {
          spollersClose.forEach((spollerClose) => {
            const spollersBlock = spollerClose.closest('[data-spollers]');
            const spollerCloseBlock = spollerClose.parentNode;
            if (spollersBlock.classList.contains('_spoller-init')) {
              const spollerSpeed = spollersBlock.dataset.spollersSpeed
                ? parseInt(spollersBlock.dataset.spollersSpeed)
                : 500;
              spollerClose.classList.remove('_spoller-active');
              _slideUp(spollerClose.nextElementSibling, spollerSpeed);
              setTimeout(() => {
                spollerCloseBlock.open = false;
              }, spollerSpeed);
            }
          });
        }
      }
    }
    function hideSpollersBody(spollersBlock) {
      const spollerActiveBlock = spollersBlock.querySelector('details[open]');
      if (spollerActiveBlock && !spollersBlock.querySelectorAll('._slide').length) {
        const spollerActiveTitle = spollerActiveBlock.querySelector('summary');
        const spollerSpeed = spollersBlock.dataset.spollersSpeed
          ? parseInt(spollersBlock.dataset.spollersSpeed)
          : 500;
        spollerActiveTitle.classList.remove('_spoller-active');
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
        setTimeout(() => {
          spollerActiveBlock.open = false;
        }, spollerSpeed);
      }
    }
  }
}
// Модуь работы с табами =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-taby.html
Сниппет (HTML): tabs
*/
function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener('click', setTabsAction);
      initTabs(tabsBlock);
    });

    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(tabs, 'tabs');
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  // Установка позиций заголовков
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach((tabsMediaItem) => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(
        (item) => item.closest('[data-tabs]') === tabsMediaItem,
      );
      tabsContentItems = Array.from(tabsContentItems).filter(
        (item) => item.closest('[data-tabs]') === tabsMediaItem,
      );
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }
  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter((item) => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter((item) => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
      });
    }
  }
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
    }
    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter((item) => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter((item) => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
        let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
        tabActiveTitle.length
          ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
              (item) => item.closest('[data-tabs]') === tabsBlock,
            ))
          : null;
        tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/menu-burger.html
Сниппет (HTML): menu
*/
function menuInit() {
  if (document.querySelector('[data-menu]')) {
    document.addEventListener('click', function (e) {
      const menuBtn = e.target.closest('[data-menu]');
      if (bodyLockStatus && menuBtn) {
        if (window.innerWidth < 1280) {
          bodyLockToggle();
        } else {
          const rect = menuBtn.getBoundingClientRect();
          const rightOffset = window.innerWidth - (rect.left + rect.width / 2);
          document.documentElement.style.setProperty('--menu-dropdown-right', `${rightOffset}px`);
        }
        document.documentElement.classList.toggle('_is-menu-open');
      }
    });
  }
}
function menuOpen() {
  bodyLock();
  document.documentElement.classList.add('_is-menu-open');
}
function menuClose() {
  if (!document.documentElement.closest('._is-popup-open')) {
    bodyUnlock();
  }
  document.documentElement.classList.remove('_is-menu-open');
}
// Модуль "показать еще" =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-pokazat-eshhjo.html
Сниппет (HTML): showmore
*/
function showMore() {
  const showMoreBlocks = document.querySelectorAll('[data-showmore]');
  let showMoreBlocksRegular;
  let mdQueriesArray;
  if (showMoreBlocks.length) {
    // Получение обычных объектов
    showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
      return !item.dataset.showmoreMedia;
    });
    // Инициализация обычных объектов
    showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

    document.addEventListener('click', showMoreActions);
    window.addEventListener('resize', showMoreActions);

    // Получение объектов с медиа запросами
    mdQueriesArray = dataMediaQueries(showMoreBlocks, 'showmoreMedia');
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
      });
      initItemsMedia(mdQueriesArray);
    }
  }
  function initItemsMedia(mdQueriesArray) {
    mdQueriesArray.forEach((mdQueriesItem) => {
      initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
    });
  }
  function initItems(showMoreBlocks, matchMedia) {
    showMoreBlocks.forEach((showMoreBlock) => {
      initItem(showMoreBlock, matchMedia);
    });
  }
  function initItem(showMoreBlock, matchMedia = false) {
    showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
    let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
    let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');
    showMoreContent = Array.from(showMoreContent).filter(
      (item) => item.closest('[data-showmore]') === showMoreBlock,
    )[0];
    showMoreButton = Array.from(showMoreButton).filter(
      (item) => item.closest('[data-showmore]') === showMoreBlock,
    )[0];
    const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
    if (matchMedia.matches || !matchMedia) {
      if (hiddenHeight < getOriginalHeight(showMoreContent)) {
        _slideUp(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = false;
      } else {
        _slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    } else {
      _slideDown(showMoreContent, 0, hiddenHeight);
      showMoreButton.hidden = true;
    }
  }
  function getHeight(showMoreBlock, showMoreContent) {
    let hiddenHeight = 0;
    const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
    if (showMoreType === 'items') {
      const showMoreTypeValue = showMoreContent.dataset.showmoreContent
        ? showMoreContent.dataset.showmoreContent
        : 3;
      const showMoreItems = showMoreContent.children;
      for (let index = 1; index < showMoreItems.length; index++) {
        const showMoreItem = showMoreItems[index - 1];
        hiddenHeight += showMoreItem.offsetHeight;
        if (index == showMoreTypeValue) break;
      }
    } else {
      const showMoreTypeValue = showMoreContent.dataset.showmoreContent
        ? showMoreContent.dataset.showmoreContent
        : 150;
      hiddenHeight = showMoreTypeValue;
    }
    return hiddenHeight;
  }
  function getOriginalHeight(showMoreContent) {
    let parentHidden;
    let hiddenHeight = showMoreContent.offsetHeight;
    showMoreContent.style.removeProperty('height');
    if (showMoreContent.closest(`[hidden]`)) {
      parentHidden = showMoreContent.closest(`[hidden]`);
      parentHidden.hidden = false;
    }
    let originalHeight = showMoreContent.offsetHeight;
    parentHidden ? (parentHidden.hidden = true) : null;
    showMoreContent.style.height = `${hiddenHeight}px`;
    return originalHeight;
  }
  function showMoreActions(e) {
    const targetEvent = e.target;
    const targetType = e.type;
    if (targetType === 'click') {
      if (targetEvent.closest('[data-showmore-button]')) {
        const showMoreButton = targetEvent.closest('[data-showmore-button]');
        const showMoreBlock = showMoreButton.closest('[data-showmore]');
        const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
        const showMoreSpeed = showMoreButton.dataset.showmoreButton
          ? showMoreButton.dataset.showmoreButton
          : '500';
        const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
        if (!showMoreContent.classList.contains('_slide')) {
          showMoreBlock.classList.contains('_showmore-active')
            ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
            : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
          showMoreBlock.classList.toggle('_showmore-active');
        }
      }
    } else if (targetType === 'resize') {
      showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
      mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
    }
  }
}
//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================

// Получить цифры из строки
function getDigFromString(item) {
  return parseInt(item.replace(/[^\d]/g, ''));
}
// Форматирование цифр типа 100 000 000
function getDigFormat(item) {
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
// Убрать класс из всех элементов массива
function removeClasses(array, className) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
}
// Уникализация массива
function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}
// Функция получения индекса внутри родителя
function indexInParent(parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}
// Обработа медиа запросов из атрибутов
function dataMediaQueries(array, dataSetValue) {
  // Получение объектов с медиа запросами
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(',')[0];
    }
  });
  // Инициализация объектов с медиа запросами
  if (media.length) {
    const breakpointsArray = [];
    media.forEach((item) => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // Получаем уникальные брейкпоинты
    let mdQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
    });
    mdQueries = uniqArray(mdQueries);
    const mdQueriesArray = [];

    if (mdQueries.length) {
      // Работаем с каждым брейкпоинтом
      mdQueries.forEach((breakpoint) => {
        const paramsArray = breakpoint.split(',');
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // Объекты с нужными условиями
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia,
        });
      });
      return mdQueriesArray;
    }
  }
}
//================================================================================================================================================================================================================================================================================================================

;// ./src/js/module/dynamic_adapt.js
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

function DynamicAdapt(type) {
	this.type = type;
}
DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");
	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}
	this.arraySort(this.оbjects);
	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});
	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];
		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};
DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		//for (let i = 0; i < оbjects.length; i++) {
		for (let i = оbjects.length - 1; i >= 0; i--) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};
// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}
// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}
// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};
// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};
const da = new DynamicAdapt("max");
da.init();
;// ./src/js/module/popup.js
// Модуль попапов



// Чистые функции авто-триггеров (без DOM) — покрыты юнит-тестами
function parseTriggerValue(raw) {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!/^\d+(\.\d+)?$/.test(trimmed)) return null;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : null;
}

function shouldOpenOnScroll(scrollY, thresholdPx) {
  if (!Number.isFinite(thresholdPx)) return false;
  return scrollY >= thresholdPx;
}

function parseTriggers({ scrollRaw, delayRaw, rememberPresent }) {
  return {
    scrollPx: parseTriggerValue(scrollRaw),
    delaySec: parseTriggerValue(delayRaw),
    remember: Boolean(rememberPresent),
  };
}

// Класс Popup
class Popup {
  constructor(options) {
    let config = {
      init: true,
      // Для кнопок
      attributeOpenButton: 'data-popup', // Атрибут для кнопки, которая вызывает попап
      attributeCloseButton: 'data-popup-close', // Атрибут для кнопки, которая закрывает попап
      // Для авто-триггеров открытия (значения задаются в HTML на элементе попапа)
      attributeScrollTrigger: 'data-popup-scroll', // Порог прокрутки в px
      attributeDelayTrigger: 'data-popup-delay', // Задержка в секундах
      attributeRemember: 'data-popup-scroll-remember', // Показ один раз на сессию
      // Для сторонних объектов
      fixElementSelector: '[data-lp]', // Атрибут для элементов с левым паддингом (которые fixed)
      // Для объекта попапа
      videoAttribute: 'data-popup-video', // Атрибут для кода video
      videoPlaceAttribute: 'data-popup-video-place', // Атрибут для вставки ролика video
      setAutoplayYoutube: true,
      // Изменение классов
      classes: {
        popup: 'popup',
        popupWrapper: 'popup',
        popupContent: 'popup__body',
        popupActive: '_is-open', // Добавляется для попапа, когда он открывается
        bodyActive: '_is-popup-open', // Добавляется для боди, когда попап открыт
      },
      focusCatch: true, // Фокус внутри попапа зациклен
      closeEsc: true, // Закрытие по ESC
      bodyLock: true, // Блокировка скролла
      hashSettings: {
        location: true, // Хэш в адресной строке
        goHash: true, // Переход по наличию в адресной строке
      },
      on: {
        // События
        beforeOpen: function () {},
        afterOpen: function () {},
        beforeClose: function () {},
        afterClose: function () {},
      },
    };
    this.videoCode;
    this.isOpen = false;
    // Текущее окно
    this.targetOpen = {
      selector: false,
      element: false,
    };
    // Предыдущее открытое
    this.previousOpen = {
      selector: false,
      element: false,
    };
    // Последнее закрытое
    this.lastClosed = {
      selector: false,
      element: false,
    };
    this._dataValue = false;
    this.hash = false;

    this._reopen = false;
    this._selectorOpen = false;

    this.lastFocusEl = false;
    this._focusEl = [
      'a[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      'button:not([disabled]):not([aria-hidden])',
      'select:not([disabled]):not([aria-hidden])',
      'textarea:not([disabled]):not([aria-hidden])',
      'area[href]',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])',
    ];
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes,
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings,
      },
      on: {
        ...config.on,
        ...options?.on,
      },
    };
    this.bodyLock = false;
    // Состояние авто-триггеров открытия
    this._autoTriggers = [];
    this._autoTimers = new Map();
    this._autoShown = new Set();
    this._autoTrigger = false;
    this._scrollListening = false;
    this._scrollRaf = null;
    this._onScrollBound = this._onScroll.bind(this);
    this._openedAuto = false;
    this._hashWritten = false;
    this.options.init ? this.initPopups() : null;
  }
  initPopups() {
    this.eventsPopup();
    this._initAutoTriggers();
  }
  eventsPopup() {
    // Клик на всем документе
    document.addEventListener(
      'click',
      function (e) {
        // Клик по кнопке "открыть"
        const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
        if (buttonOpen) {
          e.preventDefault();
          this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton)
            ? buttonOpen.getAttribute(this.options.attributeOpenButton)
            : 'error';
          this.videoCode = buttonOpen.getAttribute(this.options.videoAttribute)
            ? buttonOpen.getAttribute(this.options.videoAttribute)
            : null;
          if (this._dataValue !== 'error') {
            if (!this.isOpen) this.lastFocusEl = buttonOpen;
            this.targetOpen.selector = `${this._dataValue}`;
            this._selectorOpen = true;
            this.open();
            return;
          }

          return;
        }
        // Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
        const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
        if (buttonClose || (!e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen)) {
          e.preventDefault();
          this.close();
          return;
        }
      }.bind(this),
    );
    // Закрытие по ESC
    document.addEventListener(
      'keydown',
      function (e) {
        if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
          e.preventDefault();
          this.close();
          return;
        }
        if (this.options.focusCatch && e.which == 9 && this.isOpen) {
          this._focusCatch(e);
          return;
        }
      }.bind(this),
    );

    // Открытие по хешу
    if (this.options.hashSettings.goHash) {
      // Проверка изменения адресной строки
      window.addEventListener(
        'hashchange',
        function () {
          if (window.location.hash) {
            this._openToHash();
          } else {
            this.close(this.targetOpen.selector);
          }
        }.bind(this),
      );

      window.addEventListener(
        'load',
        function () {
          if (window.location.hash) {
            this._openToHash();
          }
        }.bind(this),
      );
    }
  }
  open(selectorValue) {
    if (bodyLockStatus) {
      // Если перед открытием попапа был режим lock
      this.bodyLock = document.documentElement.classList.contains('_is-lock') ? true : false;

      // Если ввести значение селектора (селектор настраивается в options)
      if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;

      this.targetOpen.element = document.querySelector(this.targetOpen.selector);

      if (this.targetOpen.element) {
        // YouTube
        if (this.videoCode) {
          let urlVideo = this.videoCode;
          let iframe;

          iframe = document.createElement('video');
          iframe.setAttribute('playsinline', '');
          iframe.setAttribute('controls', '');
          iframe.setAttribute('autoplay', '');
          iframe.setAttribute('preload', 'auto');
          iframe.setAttribute('src', urlVideo);

          if (!this.targetOpen.element.querySelector(`[${this.options.videoPlaceAttribute}]`)) {
            const videoPlace = this.targetOpen.element
              .querySelector('.popup__text')
              .setAttribute(`${this.options.videoPlaceAttribute}`, '');
          }
          this.targetOpen.element
            .querySelector(`[${this.options.videoPlaceAttribute}]`)
            .appendChild(iframe);
        }
        if (this.options.hashSettings.location && !this._autoTrigger) {
          // Получение хэша и его выставление
          this._getHash();
          this._setHash();
          this._hashWritten = true;
        }

        // До открытия
        this.options.on.beforeOpen(this);
        // Создаем свое событие перед открытием попапа
        document.dispatchEvent(
          new CustomEvent('beforePopupOpen', {
            detail: {
              popup: this,
            },
          }),
        );

        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);

        if (!this._reopen) {
          !this.bodyLock ? bodyLock() : null;
        } else this._reopen = false;

        this.targetOpen.element.setAttribute('aria-hidden', 'false');

        // Запоминаю это открытое окно. Оно будет последним открытым
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;

        this._selectorOpen = false;

        this.isOpen = true;

        // Ключ авто-триггеров — id элемента, а не формат селектора кнопки
        this._openedAuto = !!this._autoTrigger;
        const triggerKey = this.targetOpen.element.id || null;
        if (triggerKey) {
          this._cancelTriggersFor(triggerKey);
        }

        // Авто-открытие не перехватывает фокус пользователя
        if (!this._autoTrigger) {
          setTimeout(() => {
            this._focusTrap();
          }, 50);
        }

        // После открытия
        this.options.on.afterOpen(this);
        // Создаем свое событие после открытия попапа
        document.dispatchEvent(
          new CustomEvent('afterPopupOpen', {
            detail: {
              popup: this,
            },
          }),
        );
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
      this.previousOpen.selector = selectorValue;
    }
    if (!this.isOpen || !bodyLockStatus) {
      return;
    }
    // До закрытия
    this.options.on.beforeClose(this);
    // Создаем свое событие перед закрытием попапа
    document.dispatchEvent(
      new CustomEvent('beforePopupClose', {
        detail: {
          popup: this,
        },
      }),
    );

    // YouTube
    if (this.videoCode) {
      if (this.targetOpen.element.querySelector(`[${this.options.videoPlaceAttribute}]`))
        this.targetOpen.element.querySelector(`[${this.options.videoPlaceAttribute}]`).innerHTML = '';
    }
    if (this.previousOpen.element) {
      this.previousOpen.element.classList.remove(this.options.classes.popupActive);
    }
    // aria-hidden
    this.previousOpen.element.setAttribute('aria-hidden', 'true');
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
    }
    // Очищение адресной строки — только если хэш реально записывался
    if (this._hashWritten) {
      this._removeHash();
      this._hashWritten = false;
    }
    if (this._selectorOpen) {
      this.lastClosed.selector = this.previousOpen.selector;
      this.lastClosed.element = this.previousOpen.element;
    }
    // После закрытия
    this.options.on.afterClose(this);
    // Создаем свое событие после закрытия попапа
    document.dispatchEvent(
      new CustomEvent('afterPopupClose', {
        detail: {
          popup: this,
        },
      }),
    );

    // Для авто-открытого попапа не возвращаем фокус в закрытое окно
    if (!this._openedAuto) {
      setTimeout(() => {
        this._focusTrap();
      }, 50);
    }
  }
  // Авто-триггеры открытия: ключ — id попапа (без решётки)
  _rememberKey(key) {
    return `popup-auto-shown:${key}`;
  }
  _storageGet(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
  _storageSet(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch (e) {
      /* private mode / sandbox: деградируем до памяти экземпляра */
    }
  }
  // Сбор триггеров с элементов попапов и подписка на scroll/timer
  _initAutoTriggers() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this._initAutoTriggers());
      return;
    }
    const { attributeScrollTrigger, attributeDelayTrigger, attributeRemember, classes } = this.options;
    const triggerSelector = `.${classes.popup}[${attributeScrollTrigger}], .${classes.popup}[${attributeDelayTrigger}]`;
    document.querySelectorAll(triggerSelector).forEach((el) => {
      if (!el.id) {
        console.warn('Popup auto-trigger: у элемента попапа нет id, триггер пропущен', el);
        return;
      }
      const key = el.id;
      const selector = `#${el.id}`;
      const triggers = parseTriggers({
        scrollRaw: el.getAttribute(attributeScrollTrigger),
        delayRaw: el.getAttribute(attributeDelayTrigger),
        rememberPresent: el.hasAttribute(attributeRemember),
      });
      if (triggers.scrollPx === null && triggers.delaySec === null) return;
      if (triggers.remember && this._storageGet(this._rememberKey(key))) return;
      this._autoTriggers.push({ key, selector, ...triggers });
      if (triggers.delaySec !== null) {
        this._autoTimers.set(
          key,
          setTimeout(() => this._fireAutoTrigger(key), triggers.delaySec * 1000),
        );
      }
    });
    if (this._autoTriggers.some((t) => t.scrollPx !== null)) {
      this._startScrollListening();
    }
  }
  _startScrollListening() {
    if (this._scrollListening) return;
    this._scrollListening = true;
    window.addEventListener('scroll', this._onScrollBound, { passive: true });
  }
  _stopScrollListening() {
    if (!this._scrollListening) return;
    this._scrollListening = false;
    window.removeEventListener('scroll', this._onScrollBound);
  }
  _onScroll() {
    if (this._scrollRaf) return;
    this._scrollRaf = requestAnimationFrame(() => {
      this._scrollRaf = null;
      const scrollY = window.scrollY ?? document.documentElement.scrollTop;
      this._autoTriggers.slice().forEach((t) => {
        if (t.scrollPx !== null && shouldOpenOnScroll(scrollY, t.scrollPx)) {
          this._fireAutoTrigger(t.key);
        }
      });
    });
  }
  _fireAutoTrigger(key) {
    if (this._autoShown.has(key)) return;
    const trigger = this._autoTriggers.find((t) => t.key === key);
    if (!trigger) return;
    if (trigger.remember && this._storageGet(this._rememberKey(key))) {
      this._cancelTriggersFor(key);
      return;
    }
    if (!document.querySelector(trigger.selector)) {
      this._cancelTriggersFor(key);
      return;
    }
    this._autoTrigger = true;
    this.lastFocusEl = document.activeElement || false;
    try {
      this.open(trigger.selector);
    } finally {
      this._autoTrigger = false;
      this._cancelTriggersFor(key);
    }
    if (this.isOpen) {
      this._autoShown.add(key);
      if (trigger.remember) {
        this._storageSet(this._rememberKey(key), '1');
      }
    }
  }
  _cancelTriggersFor(key) {
    const timer = this._autoTimers.get(key);
    if (timer) {
      clearTimeout(timer);
      this._autoTimers.delete(key);
    }
    this._autoTriggers = this._autoTriggers.filter((t) => t.key !== key);
    if (!this._autoTriggers.some((t) => t.scrollPx !== null)) {
      this._stopScrollListening();
    }
  }
  // Получение хэша
  _getHash() {
    if (this.options.hashSettings.location) {
      this.hash = this.targetOpen.selector.includes('#')
        ? this.targetOpen.selector
        : this.targetOpen.selector.replace('.', '#');
    }
  }
  _openToHash() {
    const hash = window.location.hash;

    // Проверяем, существует ли popup с таким id
    const popup = document.querySelector(hash);

    // Если элемента нет или это не popup — выходим
    if (!popup || !popup.classList.contains(this.options.classes.popup)) {
      return;
    }

    this.open(hash);
  }
  // Утсановка хэша
  _setHash() {
    history.pushState('', '', this.hash);
  }
  _removeHash() {
    history.pushState('', '', window.location.href.split('#')[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);

    if (e.shiftKey && focusedIndex === 0) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
  _focusTrap() {
    const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
    if (!this.isOpen && this.lastFocusEl) {
      this.lastFocusEl.focus();
    } else {
      focusable[0].focus();
    }
  }
}
// Запускаем
new Popup({});

;// ./src/js/module/watcher.js


// === Атрибуты наблюдаемых элементов [data-watch] ===
// data-watch - можно писать значение для применения кастомного кода через событие watcherCallback
//   значение 'navigator' - если не задан data-watch-threshold, порог рассчитывается автоматически:
//   window.innerHeight / 2 / (clientHeight - 1), ограничен 1 (фиксация по центру экрана)
// data-watch-root - родительский элемент, внутри которого ведётся наблюдение за объектом
// data-watch-margin - отступ срабатывания (в px или %)
// data-watch-threshold - точки срабатывания (через запятую) либо 'prx' для режима параллакса
//   (при 'prx' генерируются точки 0..1 с шагом 0.005)
// data-watch-once - наблюдать только один раз (слежка отключается после первого появления)
// data-watch-after - не снимать класс _is-view, когда элемент уходит вверх за пределы экрана
//   (класс сохраняется, пока элемент не скроется снизу)
// === Служебные классы ===
// _is-watch - класс на <html>, добавляется при запуске наблюдателя (блокирует повторный запуск)
// _is-view - класс, добавляемый элементу при его появлении во вьюпорте

class ScrollWatcher {
  constructor(props) {
    let defaultConfig = {};
    this.config = Object.assign(defaultConfig, props);
    this.observer;
    !document.documentElement.classList.contains('_is-watch') ? this.scrollWatcherRun() : null;
  }
  // Обновляем конструктор
  scrollWatcherUpdate() {
    this.scrollWatcherRun();
  }
  // Запускаем конструктор
  scrollWatcherRun() {
    document.documentElement.classList.add('_is-watch');
    this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
  }
  // Конструктор наблюдателей
  scrollWatcherConstructor(items) {
    if (items.length) {
      // Уникализируем параметры
      let uniqParams = uniqArray(
        Array.from(items).map(function (item) {
          // Вычисление автоматического threshold
          if (item.dataset.watch === 'navigator' && !item.dataset.watchThreshold) {
            let valueOfThreshold;
            if (item.clientHeight > 2) {
              valueOfThreshold = window.innerHeight / 2 / (item.clientHeight - 1);
              if (valueOfThreshold > 1) {
                valueOfThreshold = 1;
              }
            } else {
              valueOfThreshold = 1;
            }
            item.setAttribute('data-watch-threshold', valueOfThreshold.toFixed(2));
          }
          return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
        }),
      );
      // Получаем группы объектов с одинаковыми параметрами,
      // создаем настройки, инициализируем наблюдатель
      uniqParams.forEach((uniqParam) => {
        let uniqParamArray = uniqParam.split('|');
        let paramsWatch = {
          root: uniqParamArray[0],
          margin: uniqParamArray[1],
          threshold: uniqParamArray[2],
        };
        let groupItems = Array.from(items).filter(function (item) {
          let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
          let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
          let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
          if (
            String(watchRoot) === paramsWatch.root &&
            String(watchMargin) === paramsWatch.margin &&
            String(watchThreshold) === paramsWatch.threshold
          ) {
            return item;
          }
        });

        let configWatcher = this.getScrollWatcherConfig(paramsWatch);

        // Инициализация наблюдателя со своими настройками
        this.scrollWatcherInit(groupItems, configWatcher);
      });
    }
  }
  // Функция создания настроек
  getScrollWatcherConfig(paramsWatch) {
    // Создаем настройки
    let configWatcher = {};
    // Родитель, внутри которого ведется наблюдение
    if (document.querySelector(paramsWatch.root)) {
      configWatcher.root = document.querySelector(paramsWatch.root);
    }
    // Отступ срабатывания
    configWatcher.rootMargin = paramsWatch.margin;
    if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
      return;
    }
    // Точки срабатывания
    if (paramsWatch.threshold === 'prx') {
      // Режим параллакса
      paramsWatch.threshold = [];
      for (let i = 0; i <= 1.0; i += 0.005) {
        paramsWatch.threshold.push(i);
      }
    } else {
      paramsWatch.threshold = paramsWatch.threshold.split(',');
    }
    configWatcher.threshold = paramsWatch.threshold;

    return configWatcher;
  }
  // Функция создания нового наблюдателя со своими настройками
  scrollWatcherCreate(configWatcher) {
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        this.scrollWatcherCallback(entry, observer);
      });
    }, configWatcher);
  }
  // Функция инициализации наблюдателя со своими настройками
  scrollWatcherInit(items, configWatcher) {
    // Создание нового наблюдателя со своими настройками
    this.scrollWatcherCreate(configWatcher);
    // Передача наблюдателю элементов
    items.forEach((item) => this.observer.observe(item));
  }
  // Функция обработки базовых действий точек срабатывания
  scrollWatcherIntersecting(entry, targetElement) {
    // if (entry.isIntersecting) {
    // 	// Видим объект
    // 	// Добавляем класс
    // 	!targetElement.classList.contains('_is-view') ? targetElement.classList.add('_is-view') : null;
    // } else {
    // 	// Не видим объект
    // 	// Убираем класс
    // 	targetElement.classList.contains('_is-view') ? targetElement.classList.remove('_is-view') : null;
    // }
    if (entry.isIntersecting) {
      targetElement.classList.add('_is-view');
    } else {
      if (targetElement.hasAttribute('data-watch-after') && entry.boundingClientRect.top < 0) {
        return;
      }
      targetElement.classList.remove('_is-view');
    }
  }
  // Функция отключения слежения за объектом
  scrollWatcherOff(targetElement, observer) {
    observer.unobserve(targetElement);
  }
  // Функция обработки наблюдения
  scrollWatcherCallback(entry, observer) {
    const targetElement = entry.target;
    // Обработка базовых действий точек срабатывания
    this.scrollWatcherIntersecting(entry, targetElement);
    // Если есть атрибут data-watch-once убираем слежку
    targetElement.hasAttribute('data-watch-once') && entry.isIntersecting
      ? this.scrollWatcherOff(targetElement, observer)
      : null;
    // Создаем свое событие отбратной связи
    document.dispatchEvent(
      new CustomEvent('watcherCallback', {
        detail: {
          entry: entry,
        },
      }),
    );

    /*
		// Выбираем нужные объекты
		if (targetElement.dataset.watch === 'some value') {
			// пишем уникальную специфику
		}
		if (entry.isIntersecting) {
			// Видим объект
		} else {
			// Не видим объект
		}
		*/
  }
}
// Запускаем и добавляем в объект модулей
new ScrollWatcher({});

;// ./src/js/module/steps-lot.js
// Навигационный слой шагов (десктоп >= $md2): под шапкой показываем последние
// N (--step-lot-max) полностью пройденных карточек. Оригинальный список статичен.
function stepsLotInit() {
  const nav = document.querySelector('.d-steps-nav');
  const list = document.querySelector('.d-steps__list');
  if (!nav || !list) return;

  const items = Array.from(list.querySelectorAll('.d-steps__item'));
  const navItems = Array.from(nav.querySelectorAll('.d-steps-nav__item'));
  if (!items.length || !navItems.length) return;

  // Порог десктоп-режима = $md2 (1023.98). Ниже — слой скрыт.
  const mqDesktop = window.matchMedia('(min-width: 1023.98px)');

  // Низ фиксированной шапки берём из фактического rect, а не из calc()-переменной.
  const headerEl = document.querySelector('.header');
  const readHeaderHeight = () => (headerEl ? headerEl.getBoundingClientRect().bottom : 0);
  const lotMax = parseInt(getComputedStyle(list).getPropertyValue('--step-lot-max'), 10) || 2;

  let rafId = null;

  const apply = () => {
    if (!mqDesktop.matches) {
      navItems.forEach((navItem) => {
        navItem.hidden = true;
      });
      return;
    }

    const headerBottom = readHeaderHeight();
    const listTop = list.getBoundingClientRect().top;
    const listOffsetTop = list.offsetTop;

    // Пройден = карточка полностью ушла под шапку (её layout-низ <= низ шапки).
    const passed = [];
    items.forEach((item, i) => {
      const layoutBottom = listTop + (item.offsetTop - listOffsetTop) + item.offsetHeight;
      if (layoutBottom <= headerBottom) passed.push(i);
    });

    const inLot = new Set(passed.slice(-lotMax));
    navItems.forEach((navItem, i) => {
      navItem.hidden = !inLot.has(i);
    });
  };

  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      apply();
      rafId = null;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  mqDesktop.addEventListener('change', apply);

  apply();
}

;// ./src/js/module/filter.js
const filtering = (button) => {
  const filterContainer = button.closest('[data-filter-container]');

  if (!filterContainer) return;

  const mode = filterContainer.dataset.filterContainer; // 'multi' или 'once'
  const buttons = filterContainer.querySelectorAll('[data-filter]');
  const items = filterContainer.querySelectorAll('[data-filterable]');
  const filterValue = button.dataset.filter;
  const allButton = filterContainer.querySelector('[data-filter="all"]');

  // Логика для режима одиночного выбора (once)
  if (mode === 'once') {
    buttons.forEach((btn) => {
      btn.classList.remove('_is-active');
    });
    button.classList.add('_is-active');
  }
  // Логика для режима мультивыбора (multi)
  else if (mode === 'multi') {
    // Если нажата кнопка «Все», сбрасываем все фильтры и активируем только её
    if (filterValue === 'all') {
      buttons.forEach((btn) => {
        btn.classList.remove('_is-active');
      });
      allButton.classList.add('_is-active');
    } else {
      // Если нажата любая другая кнопка:
      // 1. Сбрасываем кнопку «Все»
      allButton?.classList.remove('_is-active');
      // 2. Переключаем активный класс для текущей кнопки
      button.classList.toggle('_is-active');
    }
  }

  // Получаем все активные фильтры (кроме «all»)
  const activeFilters = Array.from(buttons)
    .filter((btn) => btn.classList.contains('_is-active') && btn.dataset.filter !== 'all')
    .map((btn) => btn.dataset.filter);

  // Если нет активных фильтров или активна кнопка «Все», показываем всё
  if (activeFilters.length === 0 || (allButton && allButton.classList.contains('_is-active'))) {
    items.forEach((item) => {
      item.hidden = false;
    });
  } else {
    // Фильтруем элементы — показываем, если элемент соответствует хотя бы одному активному фильтру
    items.forEach((item) => {
      const rawCategories = item.dataset.filterable;

      // Карточка без категорий («без категории»): скрываем при любом активном фильтре,
      // показываем только в режиме «Все» (ветка выше уже показывает все при пустом activeFilters).
      const categories = rawCategories
        ? rawCategories.split(' ').map((category) => category.trim()).filter(Boolean)
        : [];

      const isShow = activeFilters.some((filter) => categories.includes(filter));

      item.hidden = !isShow;
    });
  }

  // Уведомляем подписчиков (например, Swiper) о завершении фильтрации,
  // чтобы пересчитать раскладку/скроллбар при скрытии карточек.
  // Безопасно для блога/мобильной ширины: там слушателей нет или слайдер уничтожен.
  filterContainer.dispatchEvent(new CustomEvent('filter:change', { bubbles: true }));
};

;// ./src/js/module/getAdaptiveValue.js
// Адаптивное значение с жестким контролем привязки (s1 -> w1, s2 -> w2)
//
// Примеры:
// getAdaptiveValue('38-20, 360-1920')  => 38px на 360px, 20px на 1920px (уменьшение)
// getAdaptiveValue('14-38, 360-1920')  => 14px на 360px, 38px на 1920px (увеличение)
// getAdaptiveValue('14-38, 360-1920', '38-76, 1920-3840') => мультидиапазон
//
// @param {...string} ranges - Строки формата 'size1-size2, width1-width2'
// @returns {number} Целочисленное значение в px
//
function getAdaptiveValue(...ranges) {
  const currentWidth = document.documentElement.offsetWidth || window.innerWidth;

  const parsed = ranges.map((str) => {
    const [sizes, widths] = str.split(',').map((s) => s.trim());
    const [s1, s2] = sizes.split('-').map(Number);
    const [w1, w2] = widths.split('-').map(Number);

    return {
      s1,
      s2,
      w1,
      w2,
      minW: Math.min(w1, w2),
      maxW: Math.max(w1, w2),
    };
  });

  // Ищем диапазон, в который попал текущий экран
  let target = parsed.find((r) => currentWidth >= r.minW && currentWidth <= r.maxW);

  if (!target) {
    // Экран больше всех переданных диапазонов — фиксируем значение на самом большом экране
    const maxRange = parsed.reduce((p, c) => (c.maxW > p.maxW ? c : p));
    if (currentWidth > maxRange.maxW) {
      return Math.round(maxRange.w1 === maxRange.maxW ? maxRange.s1 : maxRange.s2);
    }
    // Экран меньше всех переданных диапазонов — фиксируем значение на самом маленьком экране
    const minRange = parsed.reduce((p, c) => (c.minW < p.minW ? c : p));
    if (currentWidth < minRange.minW) {
      return Math.round(minRange.w1 === minRange.minW ? minRange.s1 : minRange.s2);
    }
  }

  // Строгий расчет линейной интерполяции от w1 до w2
  const { s1, s2, w1, w2 } = target;
  const progress = (currentWidth - w1) / (w2 - w1);
  const result = s1 + (s2 - s1) * progress;

  return Math.round(result);
}

;// ./src/js/module/sliders.js


function sliders(
  $md11,
  $md2,
  $md3,
  $md4,
  matchMediaMi11,
  matchMediaMi2,
  matchMediaMi3,
  matchMediaMi4,
) {
  if (document.querySelector('.articles-slider')) {
    const SliderBody = document.querySelector('.articles-slider');

    function responsiveInit() {
      if (window.innerWidth > $md3 && SliderBody.dataset.slider == 'false') {
        SliderBody.classList.add('_is-slider-init');

        window.articlesSwiper = new Swiper(SliderBody, {
          slidesPerView: 2,
          spaceBetween: getAdaptiveValue('10-20, 360-1920', '20-40, 1920-3840'),
          roundLengths: true,
          resistanceRatio: 0,
          wrapperClass: 'articles-slider__items',
          slideClass: 'articles-slider__item',
          slideActiveClass: 'articles-slider__item_active',
          slidePrevClass: 'articles-slider__item_prev',
          slideNextClass: 'articles-slider__item_next',
          scrollbar: {
            el: '.articles-slider__scrollbar',
            dragClass: 'articles-slider__scrollbar-drag',
            draggable: true,
          },
          breakpoints: {
            1280: {
              slidesPerView: 3,
            },
          },
          on: {
            init: (swiper) => {
              swiper.el.classList.toggle('_is-slider-lock', swiper.isLocked);
            },
            update: (swiper) => {
              swiper.el.classList.toggle('_is-slider-lock', swiper.isLocked);
            },
            resize: (swiper) => {
              swiper.params.spaceBetween = getAdaptiveValue('10-20, 360-1920', '20-40, 1920-3840');
              swiper.el.classList.toggle('_is-slider-lock', swiper.isLocked);
            },
          },
        });
        SliderBody.dataset.slider = 'true';
      }
      if (window.innerWidth <= $md3) {
        SliderBody.dataset.slider = 'false';
        if (window.articlesSwiper) {
          SliderBody.classList.remove('_is-slider-init');
          window.articlesSwiper.destroy(true, true);
        }
      }
    }
    responsiveInit();
    matchMediaMi3.addEventListener('change', () => {
      responsiveInit();
    });

    // Пересчёт слайдера при фильтрации карточек внутри контейнера.
    // Слушатель вешаем один раз вне responsiveInit, чтобы не дублировать его при ресайзах.
    // requestAnimationFrame гарантирует, что браузер применил display:none/'' до пересчёта Swiper.
    // slideTo(0, 0) сбрасывает позицию на первый видимый слайд (слайдеры без loop — безопасно),
    // устраняя «зависание» на скрытом слайде при переключении/возврате «Все».
    // На мобильной ширине слайдер уничтожен (Slider.destroyed === true) — update не вызываем.
    const articlesFilterContainer = SliderBody.closest('[data-filter-container]');
    articlesFilterContainer?.addEventListener('filter:change', () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (window.articlesSwiper && !window.articlesSwiper.destroyed) {
            window.articlesSwiper.update();
            window.articlesSwiper.scrollbar?.updateSize();
            window.articlesSwiper.slideTo(0, 0);
          }
        });
      });
    });
  }

  if (document.querySelector('.questions-slider')) {
    const SliderBody = document.querySelector('.questions-slider');

    function responsiveInit() {
      if (window.innerWidth > $md3 && SliderBody.dataset.slider == 'false') {
        SliderBody.classList.add('_is-slider-init');

        window.questionsSwiper = new Swiper(SliderBody, {
          slidesPerView: 2,
          spaceBetween: getAdaptiveValue('10-20, 360-1920', '20-40, 1920-3840'),
          roundLengths: true,
          resistanceRatio: 0,
          watchSlidesProgress: true,
          slideVisibleClass: 'questions-slider__item_visible',
          slideFullyVisibleClass: 'questions-slider__item_shown',
          wrapperClass: 'questions-slider__items',
          slideClass: 'questions-slider__item',
          slideActiveClass: 'questions-slider__item_active',
          slidePrevClass: 'questions-slider__item_prev',
          slideNextClass: 'questions-slider__item_next',
          scrollbar: {
            el: '.questions-slider__scrollbar',
            dragClass: 'questions-slider__scrollbar-drag',
            draggable: true,
          },
          breakpoints: {
            1280: {
              slidesPerView: 3,
            },
            1536: {
              slidesPerView: 4,
            },
          },
          on: {
            init: (swiper) => {
              swiper.el.classList.toggle('_is-slider-lock', swiper.isLocked);
            },
            update: (swiper) => {
              swiper.el.classList.toggle('_is-slider-lock', swiper.isLocked);
            },
            resize: (swiper) => {
              swiper.params.spaceBetween = getAdaptiveValue('10-20, 360-1920', '20-40, 1920-3840');
              swiper.el.classList.toggle('_is-slider-lock', swiper.isLocked);
            },
          },
        });
        SliderBody.dataset.slider = 'true';
      }
      if (window.innerWidth <= $md3) {
        SliderBody.dataset.slider = 'false';
        if (window.questionsSwiper) {
          SliderBody.classList.remove('_is-slider-init');
          window.questionsSwiper.destroy(true, true);
        }
      }
    }
    responsiveInit();
    matchMediaMi3.addEventListener('change', () => {
      responsiveInit();
    });

    // Пересчёт слайдера при фильтрации карточек внутри контейнера.
    // Слушатель вешаем один раз вне responsiveInit, чтобы не дублировать его при ресайзах.
    // requestAnimationFrame гарантирует, что браузер применил display:none/'' до пересчёта Swiper.
    // slideTo(0, 0) сбрасывает позицию на первый видимый слайд (слайдеры без loop — безопасно),
    // устраняя «зависание» на скрытом слайде при переключении/возврате «Все».
    // На мобильной ширине слайдер уничтожен (Slider.destroyed === true) — update не вызываем.
    const questionsFilterContainer = SliderBody.closest('[data-filter-container]');
    questionsFilterContainer?.addEventListener('filter:change', () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (window.questionsSwiper && !window.questionsSwiper.destroyed) {
            window.questionsSwiper.update();
            window.questionsSwiper.scrollbar?.updateSize();
            window.questionsSwiper.slideTo(0, 0);
          }
        });
      });
    });
  }

  if (document.querySelector('.media-slider__main')) {
    const mediaSliderEl = document.querySelector('.media-slider__main');
    mediaSliderEl.classList.add('_is-slider-init');

    window.mediaSwiper = new Swiper(mediaSliderEl, {
      slidesPerView: 1,
      spaceBetween: getAdaptiveValue('14-38, 360-1920', '38-76, 1920-3840'),
      resistanceRatio: 0,
      loop: true,
      roundLengths: true,
      loopAdditionalSlides: 2,
      watchSlidesProgress: true,
      slideVisibleClass: 'media-slider__item_visible',
      slideFullyVisibleClass: 'media-slider__item_shown',
      wrapperClass: 'media-slider__items',
      slideClass: 'media-slider__item',
      slideActiveClass: 'media-slider__item_active',
      slidePrevClass: 'media-slider__item_prev',
      slideNextClass: 'media-slider__item_next',
      scrollbar: {
        el: '.media-slider__scrollbar',
        dragClass: 'media-slider__scrollbar-drag',
        draggable: true,
      },
      navigation: {
        prevEl: '.media-slider__btn_prev',
        nextEl: '.media-slider__btn_next',
        disabledClass: 'media-slider__btn_disabled',
        lockClass: '_is-lock',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
      on: {
        init: (swiper) => {
          swiper.loopFix();
          swiper.el.classList.toggle('_is-slider-lock', swiper.isLocked);
        },
        resize: (swiper) => {
          swiper.params.spaceBetween = getAdaptiveValue('14-38, 360-1920', '38-76, 1920-3840');
          swiper.loopFix();
          swiper.el.classList.toggle('_is-slider-lock', swiper.isLocked);
        },
      },
    });
  }

  if (document.querySelector('.answers-slider')) {
    document.querySelector('.answers-slider__body').classList.add('_is-slider-init');

    window.answersSwiper = new Swiper('.answers-slider__body', {
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      autoHeight: true,
      observerParent: true,
      allowTouchMove: false,
      wrapperClass: 'answers-slider__items',
      slideClass: 'answers-slider__item',
      slideActiveClass: 'answers-slider__item_active',
      slidePrevClass: 'answers-slider__item_prev',
      slideNextClass: 'answers-slider__item_next',
      navigation: {
        prevEl: '.answers-slider__btn_prev',
        nextEl: '.answers-slider__btn_next',
        disabledClass: 'answers-slider__btn_disabled',
        lockClass: '_is-lock',
      },
      on: {
        init: (swiper) => {
          swiper.el.classList.toggle('_is-slider-lock', swiper.isLocked);
        },
        resize: (swiper) => {
          swiper.el.classList.toggle('_is-slider-lock', swiper.isLocked);
        },
      },
    });
  }
}

// EXTERNAL MODULE: ./node_modules/swiper/swiper-bundle.mjs + 31 modules
var swiper_bundle = __webpack_require__(392);
;// ./src/js/script.js








// import './module/select.js';
// import * as video from "./module/video.js";
// import { phoneMask } from "./module/phone_mask.js";
// import { setViewType } from "./module/viewType.js";
// import { wrappedTextWidth } from './module/wrapped_text_width.js';
// import { showAllInit } from './module/show_all.js';
// import { quantityInit } from "./module/quantity.js";
// import { rangeInit } from "./module/range.js";
// import { registerTensionMask } from './module/tension-mask.js';


// import noUiSlider from 'nouislider';
// import tippy from "tippy.js";
// import ClipboardJS from 'clipboard';
// import Masonry from "masonry-layout";
// import AirDatepicker from "air-datepicker";

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// import {
//   gsap,
//   ScrollTrigger,
//   ScrollToPlugin,
//   ScrollSmoother,
// } from "./module/gsap/all.js";
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

window.Swiper = swiper_bundle/* default */.A;
// window.noUiSlider = noUiSlider;
// window.ClipboardJS = ClipboardJS;
// window.Lottie = Lottie;
// window.Matter = Matter;
// window.Masonry = Masonry;
// window.AirDatepicker = AirDatepicker;

window.addEventListener('load', function () {
  disableIOSTextFieldZoom();
  menuInit();
  spollers();
  tabs();
  stepsLotInit();
  // phoneMask();
  // quantityInit();
  // rangeInit();
  // setViewType();
  // showAllInit(wrappedTextWidth);
  // wrappedTextWidth();
  // registerTensionMask();

  // tippy("[data-tippy-content]", {
  //   allowHTML: true,
  //   maxWidth: 260,
  //   arrow: false,
  //   placement: "top-start",
  //   trigger: "mouseenter click",
  //   onShow(instance) {
  //     instance.setProps({ maxWidth: window.innerWidth > 2240 ? 336 : 260 });
  //   },
  // });

  // new ClipboardJS('[data-clipboard-text]');

  // if (document.querySelector(".video")) {
  //   video.findVideos();
  // }

  // if (document.querySelector("input[type='tel']")) {
  //   phoneMask();
  // }

  // if (document.querySelector("[data-quantity]")) {
  //   quantityInit();
  // }

  // if (document.querySelector("[data-range]")) {
  //   rangeInit();
  // }

  // if (document.querySelector("[data-view-types]")) {
  //   setViewType();
  // }

  const HEADER = document.querySelector('.header');
  const HEADER_TOP = document.querySelector('.header__top');
  const ALERT = document.querySelector('.alert');
  let resizeRaf = null;
  let prevWidth = window.innerWidth;
  let prevHeight = window.innerHeight;
  const scrollTrigger = 40;
  const $md4 = 575.98;
  const $md3 = 767.98;
  const $md2 = 1023.98;
  const $md11 = 1279.98;
  const matchMediaMi4 = window.matchMedia(`(min-width: ${$md4}px)`);
  const matchMediaMi3 = window.matchMedia(`(min-width: ${$md3}px)`);
  const matchMediaMi2 = window.matchMedia(`(min-width: ${$md2}px)`);
  const matchMediaMi11 = window.matchMedia(`(min-width: ${$md11}px)`);

  matchMediaMi4.addEventListener('change', () => {});
  matchMediaMi3.addEventListener('change', () => {});
  matchMediaMi2.addEventListener('change', () => {});
  matchMediaMi11.addEventListener('change', () => {
    if (document.documentElement.classList.contains('_is-menu-open')) {
      menuClose();
    }
  });

  // const dataAction = (target, attr) => {
  //   if (target.closest(`[data-${attr}]`)) {
  //     document.documentElement.classList.toggle(`_is-${attr}-open`);
  //   }
  //   if (document.documentElement.closest(`._is-${attr}-open`) && !target.closest(`.${attr}`)) {
  //     document.documentElement.classList.remove(`_is-${attr}-open`);
  //   }
  // };

  const adaptiveFix = () => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    const isHorizontalResize = currentWidth !== prevWidth;
    const isVerticalResize = currentHeight !== prevHeight;
    prevWidth = currentWidth;
    prevHeight = currentHeight;

    document.documentElement.style.setProperty('--width-page', `${currentWidth}px`);
    document.documentElement.style.setProperty('--height-page', `${currentHeight}px`);
    document.documentElement.style.setProperty(
      '--height-header',
      `${HEADER ? HEADER.offsetHeight : 0}px`,
    );
    document.documentElement.style.setProperty(
      '--height-header-top',
      `${HEADER_TOP ? HEADER_TOP.offsetHeight : 0}px`,
    );
    document.documentElement.style.setProperty('--height-alert', `${ALERT ? ALERT.offsetHeight : 0}px`);
    document.documentElement.classList.toggle(
      '_is-scroll',
      document.documentElement.scrollTop > scrollTrigger,
    );

    if (isHorizontalResize) {
      // console.log('horizontal resize');
      // showAllInit(wrappedTextWidth);
      // wrappedTextWidth();

      if (window.innerWidth < $md11) {
        document.documentElement.style.removeProperty('--menu-dropdown-right');
      }
    }

    if (isVerticalResize) {
      // console.log('vertical resize');
    }

    //   if (window.innerWidth < 576) {
    //   }
  };
  adaptiveFix();

  const handleResize = () => {
    document.documentElement.classList.remove('_is-scroll');

    if (resizeRaf) return;

    resizeRaf = requestAnimationFrame(() => {
      adaptiveFix();
      resizeRaf = null;
    });
  };

  // const inputsActions = () => {
  //   const inputs = document.querySelectorAll('.input');

  //   inputs.forEach((inputBody) => {
  //     const inputBtn = inputBody.querySelector('.input__btn');

  //     if (inputBtn) {
  //       const input = inputBody.querySelector('.input__body');
  //       const inputBtnType = inputBtn.dataset.input;

  //       inputBody.classList.add('input_btn');

  //       if (inputBtnType == 'reset') {
  //         input.addEventListener('input', (e) => {
  //           inputBody.classList.toggle('_is-fill', e.target.value.length);
  //         });
  //       }

  //       inputBody.addEventListener('click', (e) => {
  //         const targetElement = e.target;

  //         if (targetElement === inputBtn) {
  //           if (inputBtnType == 'reset') {
  //             input.focus();
  //             input.value = '';
  //             inputBody.classList.remove('_is-fill');
  //           }

  //           if (inputBtnType == 'password') {
  //             input.setAttribute('type', input.type == 'password' ? 'text' : 'password');
  //             targetElement.classList.toggle('_is-active');
  //           }
  //         }
  //       });
  //     }
  //   });
  // };
  // inputsActions();

  // if (document.querySelector("textarea")) {
  //   const textAreas = document.querySelectorAll("textarea");

  //   textAreas.forEach((textArea) => {
  //     textArea.style.overflow = "hidden";

  //     textArea.addEventListener("input", (e) => {
  //       e.target.value.length
  //         ? (textArea.style.height = textArea.scrollHeight + "px")
  //         : (textArea.style.height = "");
  //     });
  //   });
  // }

  sliders($md11, $md2, $md3, $md4, matchMediaMi11, matchMediaMi2, matchMediaMi3, matchMediaMi4);

  document.addEventListener('beforePopupOpen', (e) => {
    const popup = e.detail.popup;
    const triggerEl = popup.lastFocusEl;

    if (triggerEl) {
      const answerIndexAttr = triggerEl.getAttribute('data-answer-index');

      // Переключение слайда ответов при открытии попапа из карточки вопроса
      if (answerIndexAttr !== null && window.answersSwiper && !window.answersSwiper.destroyed) {
        const slideIndex = parseInt(answerIndexAttr, 10) - 1;
        window.answersSwiper.slideTo(slideIndex, 0);
      }
    }
  });

  //---------- При клике
  document.addEventListener('click', (e) => {
    const targetElement = e.target;
    const targetPath = e.composedPath();

    const isTargetMenu = targetPath.some((el) => el.classList?.contains('menu'));

    // dataAction(targetElement, "search");
    // dataAction(targetElement, "filters");
    // dataAction(targetElement, "filter-sort");

    //   Menu
    if (!isTargetMenu && document.documentElement.classList.contains('_is-menu-open')) {
      menuClose();
    }

    if (targetElement.closest('[data-filter]')) {
      filtering(targetElement.closest('[data-filter]'));
      return;
    }
    //   View Type
    // if (targetElement.closest("[data-view-type]")) {
    //   const viewTypes = targetElement.parentElement.closest("[data-view-types]").dataset.viewTypes;
    //   window.localStorage.setItem(`${viewTypes}-view-type`, targetElement.dataset.viewType);
    //   setViewType();
    // }

    //   Tabs Anchor
    // if (targetElement.closest('[data-tab-id]')) {
    //   document.querySelector(targetElement.dataset.tabId).click();
    // }
  });

  window.addEventListener(
    'scroll',
    () => {
      const isScroll = document.documentElement.scrollTop > scrollTrigger;
      document.documentElement.classList.toggle('_is-scroll', isScroll);
      if (!isScroll && document.documentElement.classList.contains('_is-menu-open')) {
        menuClose();
      }
    },
    { passive: true },
  );

  window.addEventListener('resize', handleResize);
  window.visualViewport?.addEventListener('resize', handleResize);

  //  Scroll Watcher
  document.documentElement.classList.toggle(
    '_is-footer-view',
    document.querySelector('.footer').closest('._is-view'),
  );
  document.addEventListener('watcherCallback', (e) => {
    const watcherElement = e.detail.entry.target;

    document.documentElement.classList.toggle(
      '_is-footer-view',
      watcherElement.closest('.footer._is-view'),
    );
  });
});


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			let notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn, priority] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			910: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = self["webpackChunkproject"] = self["webpackChunkproject"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, [979], () => (__webpack_require__(652)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;