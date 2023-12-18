(
    function ($) {
        'use strict';

        var Helpers = subwallet.Helpers,
            $window = $(window),
            $header = $('#header');

        $window.on('scroll', function () {
            var currentST = $(this).scrollTop();

            if (currentST > 0) {
                $header.addClass('header-pinned');
            } else {
                $header.removeClass('header-pinned');
            }
        });

        $(document).ready(function () {
            scrollTo();
            //initVideoPopups();
            initSliders();
            initGrids();
            redirectLanguage();
        });

        function redirectLanguage() {
            var language = navigator.language || navigator.userLanguage;
            const params = window.location.search;
            if (params.indexOf('lang') > -1) {
                return;
            }
            let pathName = window.location.pathname;
            const languages = ['/zh/'];
			let isChangeToLanguageDefault = false;
            for (const item of languages) {
                if (pathName.indexOf(item) > -1){
                    pathName = pathName.replace(item, '');
					isChangeToLanguageDefault = true;
                }
            }
            const country = language.split('-')[0] ?? 'en';

            const LANGUAGE_SUPPORT_MAP = {
                'zh': 'zh',
                'en': 'en',
            }
            if (LANGUAGE_SUPPORT_MAP[country]) {
                let value = LANGUAGE_SUPPORT_MAP[country];
                if (pathName.indexOf(value) === -1) {
                    if (isChangeToLanguageDefault && value === 'en'){
						window.location.href = window.location.origin + '/' + pathName;
					}
					if (value !== 'en' && !isChangeToLanguageDefault){
						window.location.href = window.location.origin + '/' + value   + pathName;
					}
                }
            }
        }

        $(window).on('load', function () {
            initSectionEffectSnow();
        });

        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                delay: 200,
                once: true,
            });
        }
        var $switcher = $('.language-switcher');

        $switcher.on('click', '.current-lang', function (evt) {
            evt.preventDefault();

            $switcher.addClass('show');
        });

        $(document).on('click', function (e) {
            if ($(e.target).closest($switcher).length == 0) {
                $switcher.removeClass('show');
            }
        });

        function scrollTo() {
            $(document.body).on('click', '.scroll-to', function (evt) {
                evt.preventDefault();
                const target = $(this).attr('href');
                const offsetTop = $(target).offset().top;

                window.scroll({
                    top: offsetTop - 30,
                    left: 0,
                    behavior: 'smooth'
                })
            })
        }

        function initVideoPopups() {
            if ($.fn.lightGallery) {
                var options = {
                    selector: '.video-link',
                    fullScreen: false,
                    zoom: false,
                    getCaptionFromTitleOrAlt: false,
                    counter: false
                };

                $('.video-popup').each(function () {
                    $(this).lightGallery(options);
                });
            }
        }

        function initSliders() {
            $('.tm-swiper').each(function () {
                $(this).subwalletSwiper();
            });
        }

        function initGrids() {
            if ($.fn.subwalletGridLayout()) {
                $('.block-grid').subwalletGridLayout();
            }
        }

        function initSectionEffectSnow() {
            if (!$.firefly) {
                return;
            }

            $('.section-effect-snow').each(function () {
                var $thisSection = $(this);

                var total = $thisSection.data('firefly-total') ? $thisSection.data('firefly-total') : 50;

                var minPixel = Helpers.isHandheld() ? 2 : 3;
                var maxPixel = Helpers.isHandheld() ? 3 : 4;

                var settings = {
                    color: 'rgba(255,255,255,0.3)',
                    minPixel: minPixel,
                    maxPixel: maxPixel,
                    total: total,
                    on: $thisSection,
                    zIndex: 0,
                };

                $.firefly(settings);
            });
        }

    }(jQuery)
);
