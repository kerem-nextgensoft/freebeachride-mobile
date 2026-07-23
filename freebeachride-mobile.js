(function () {
    "use strict";
    console.log("v4");
    var MOBILE_BREAKPOINT = 800;
    var html = document.documentElement;
    var startedMobile = false;
    var observer = null;
    var resizeTimer = null;

    function isMobileWidth() {
        var innerWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            9999;

        var screenWidth =
            window.screen && window.screen.width
                ? window.screen.width
                : innerWidth;

        return (
            Math.min(innerWidth, screenWidth) <=
            MOBILE_BREAKPOINT
        );
    }

    function addViewport() {
        var viewport = document.querySelector(
            'meta[name="viewport"]'
        );

        if (!viewport) {
            viewport = document.createElement("meta");
            viewport.name = "viewport";
            document.head.appendChild(viewport);
        }

        viewport.content =
            "width=device-width, initial-scale=1, maximum-scale=5";
    }

    function addStyles() {
        if (
            document.getElementById(
                "fbr-mobile-styles"
            )
        ) {
            return;
        }

        var style =
            document.createElement("style");

        style.id = "fbr-mobile-styles";

        style.textContent = `
            html.fbr-mobile,
            html.fbr-mobile body {
                width: 100% !important;
                min-width: 0 !important;
                max-width: 100% !important;
                margin: 0 !important;
                overflow-x: hidden !important;
            }

            html.fbr-mobile body {
                padding-bottom: 76px !important;
            }

            html.fbr-mobile .wsb-canvas.body,
            html.fbr-mobile .wsb-canvas-page-container {
                position: static !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                margin: 0 !important;
                overflow: visible !important;
            }

            html.fbr-mobile #wsb-canvas-template-page {
                position: relative !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                height: auto !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 18px !important;
                box-sizing: border-box !important;
            }

            html.fbr-mobile #wsb-canvas-template-container,
            html.fbr-mobile #wsb-canvas-template-footer,
            html.fbr-mobile #wsb-canvas-template-footer-container {
                position: relative !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                top: auto !important;
                right: auto !important;
                bottom: auto !important;
                left: auto !important;
                margin: 0 !important;
                overflow: visible !important;
                box-sizing: border-box !important;
            }

            /*
             * Stack normal Builder 7 elements, but do not
             * stack the original navigation or translator.
             */
            html.fbr-mobile
                #wsb-canvas-template-container
                > [id^="wsb-element-"]:not(.wsb-element-navigation):not(.fbr-skip-stack),
            html.fbr-mobile
                #wsb-canvas-template-footer-container
                > [id^="wsb-element-"]:not(.wsb-element-navigation):not(.fbr-skip-stack) {
                position: relative !important;
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                top: auto !important;
                right: auto !important;
                bottom: auto !important;
                left: auto !important;
                margin: 0 0 20px !important;
                padding: 0 !important;
                transform: none !important;
                overflow: visible !important;
                box-sizing: border-box !important;
            }

            /*
             * Hide the original GoDaddy navigation.
             */
            html.fbr-mobile
                #wsb-canvas-template-container
                > .wsb-element-navigation,
            html.fbr-mobile
                #wsb-canvas-template-footer-container
                > .wsb-element-navigation,
            html.fbr-mobile .wsb-element-navigation,
            html.fbr-mobile .wsb-navigation,
            html.fbr-mobile .fbr-legacy-navigation,
            html.fbr-mobile .view-as-mobile,
            html.fbr-mobile #mobile-site-link,
            html.fbr-mobile .mobile-site-link,
            html.fbr-mobile a[href*="view=mobile"] {
                display: none !important;
                visibility: hidden !important;
                width: 0 !important;
                height: 0 !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
            }

            /*
             * Hide the empty Builder 7 container after the
             * Google Translate element has been moved.
             */
            html.fbr-mobile .fbr-translate-source {
                display: none !important;
                visibility: hidden !important;
                width: 0 !important;
                height: 0 !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
            }

            html.fbr-mobile .wsb-element-line,
            html.fbr-mobile .wsb-element-shape {
                display: none !important;
            }

            html.fbr-mobile .txt,
            html.fbr-mobile .wsb-element-text .txt {
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                line-height: 1.45 !important;
                overflow: visible !important;
                overflow-wrap: anywhere !important;
                box-sizing: border-box !important;
            }

            html.fbr-mobile .txt p {
                max-width: 100% !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
            }

            html.fbr-mobile h1 {
                font-size: clamp(
                    30px,
                    9vw,
                    44px
                ) !important;

                line-height: 1.1 !important;
            }

            html.fbr-mobile h2 {
                font-size: clamp(
                    25px,
                    7vw,
                    36px
                ) !important;

                line-height: 1.2 !important;
            }

            html.fbr-mobile h3 {
                font-size: clamp(
                    21px,
                    6vw,
                    30px
                ) !important;

                line-height: 1.25 !important;
            }

            html.fbr-mobile .wsb-image-inner,
            html.fbr-mobile .wsb-image-inner > div,
            html.fbr-mobile
                .wsb-element-image
                > div {
                position: relative !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                overflow: visible !important;
            }

            html.fbr-mobile
                .wsb-element-image
                img {
                position: relative !important;
                display: block !important;
                width: auto !important;
                max-width: 100% !important;
                height: auto !important;
                top: auto !important;
                right: auto !important;
                bottom: auto !important;
                left: auto !important;
                margin: 0 auto !important;
                object-fit: contain !important;
            }

            /*
             * Responsive Builder 7 slideshow.
             */
            html.fbr-mobile
                .fbr-gallery-wrapper {
                position: relative !important;
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                min-height: 1px !important;
                margin: 0 0 20px !important;
                padding: 0 !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
            }

            html.fbr-mobile
                .fbr-gallery-wrapper
                > .wsb-element-gallery {
                margin: 0 !important;
                padding: 0 !important;
                transform-origin:
                    top left !important;
            }

            html.fbr-mobile
                .wsb-htmlsnippet-element,
            html.fbr-mobile
                .wsb-element-htmlsnippet,
            html.fbr-mobile
                .wsb-element-htmlsnippet
                > div {
                position: relative !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                overflow: visible !important;
                box-sizing: border-box !important;
            }

            html.fbr-mobile iframe,
            html.fbr-mobile video,
            html.fbr-mobile embed {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                border: 0 !important;
            }

            html.fbr-mobile
                body.fbr-request-page
                iframe {
                min-height: 1050px !important;
            }

            html.fbr-mobile input,
            html.fbr-mobile select,
            html.fbr-mobile textarea,
            html.fbr-mobile button {
                max-width: 100% !important;
                min-height: 44px !important;
                font-size: 16px !important;
                box-sizing: border-box !important;
            }

            html.fbr-mobile textarea {
                min-height: 120px !important;
            }

            html.fbr-mobile table {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                overflow-x: auto !important;
            }

            #fbr-mobile-header,
            #fbr-mobile-actions {
                display: none;
            }

            html.fbr-mobile
                #fbr-mobile-header {
                position: sticky !important;
                top: 0 !important;
                z-index: 999999 !important;
                display: block !important;
                width: 100% !important;
                background: #ffffff !important;
                border-bottom:
                    1px solid #d8d8d8 !important;
                box-sizing: border-box !important;
            }

            #fbr-mobile-header-bar {
                display: flex !important;
                align-items: center !important;
                justify-content:
                    space-between !important;
                min-height: 60px !important;
                padding: 10px 16px !important;
                box-sizing: border-box !important;
            }

            #fbr-mobile-home {
                color: #0B3954 !important;
                font:
                    700 18px Arial,
                    sans-serif !important;
                text-decoration: none !important;
            }

            #fbr-menu-button {
                display: inline-flex !important;
                align-items: center !important;
                justify-content:
                    center !important;
                width: 48px !important;
                min-width: 48px !important;
                height: 44px !important;
                min-height: 44px !important;
                padding: 0 !important;
                color: #ffffff !important;
                background: #0B3954 !important;
                border:
                    2px solid #0B3954 !important;
                border-radius: 5px !important;
                font-size: 24px !important;
                line-height: 1 !important;
                cursor: pointer !important;
            }

            #fbr-mobile-menu {
                display: none !important;
                width: 100% !important;
                padding:
                    0 16px 16px !important;
                background: #ffffff !important;
                box-sizing: border-box !important;
            }

            #fbr-mobile-menu.fbr-open {
                display: block !important;
            }

            #fbr-mobile-menu-links a {
                display: block !important;
                min-height: 48px !important;
                padding: 14px 8px !important;
                color: #0B3954 !important;
                border-bottom:
                    1px solid #e5e5e5 !important;

                font:
                    600 16px Arial,
                    sans-serif !important;

                text-decoration: none !important;
                box-sizing: border-box !important;
            }

            /*
             * Google Translate appears at the top of
             * the opened hamburger menu.
             */
            #fbr-mobile-translate {
                display: block !important;
                width: 100% !important;
                min-height: 50px !important;
                padding: 12px 0 !important;
                border-bottom:
                    1px solid #e5e5e5 !important;
                box-sizing: border-box !important;
            }

            #fbr-mobile-translate:empty {
                display: none !important;
                min-height: 0 !important;
                padding: 0 !important;
                border: 0 !important;
            }

            #fbr-mobile-translate
                #google_translate_element,
            #fbr-mobile-translate
                .goog-te-gadget {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
                visibility: visible !important;
            }

            #fbr-mobile-translate
                .goog-te-gadget {
                font-size: 0 !important;
            }

            #fbr-mobile-translate
                .goog-te-combo {
                display: block !important;
                width: 100% !important;
                min-height: 44px !important;
                margin: 0 !important;
                padding: 8px 10px !important;
                color: #0B3954 !important;
                background: #ffffff !important;
                border:
                    2px solid #0B3954 !important;
                border-radius: 5px !important;
                font-size: 16px !important;
                box-sizing: border-box !important;
                visibility: visible !important;
            }

            html.fbr-mobile
                #fbr-mobile-actions {
                position: fixed !important;
                right: 0 !important;
                bottom: 0 !important;
                left: 0 !important;
                z-index: 999999 !important;
                display: grid !important;
                grid-template-columns:
                    1fr 1fr !important;
                gap: 8px !important;
                padding: 8px !important;
                background:
                    rgba(
                        255,
                        255,
                        255,
                        0.97
                    ) !important;

                border-top:
                    1px solid #d8d8d8 !important;

                box-sizing: border-box !important;
            }

            #fbr-mobile-actions a {
                display: flex !important;
                align-items: center !important;
                justify-content:
                    center !important;
                min-height: 50px !important;
                padding: 10px !important;
                border-radius: 5px !important;

                font:
                    700 15px Arial,
                    sans-serif !important;

                text-align: center !important;
                text-decoration: none !important;
                box-sizing: border-box !important;
            }

            #fbr-call-button {
                color: #0B3954 !important;
                background: #ffffff !important;
                border:
                    2px solid #0B3954 !important;
            }

            #fbr-request-button {
                color: #ffffff !important;
                background: #C2410C !important;
                border:
                    2px solid #C2410C !important;
            }

            #fbr-call-button:hover,
            #fbr-call-button:focus {
                background: #EAF4F8 !important;
            }

            #fbr-request-button:hover,
            #fbr-request-button:focus {
                background: #A93808 !important;
                border-color: #A93808 !important;
            }
        `;

        document.head.appendChild(style);
    }

    function setImportant(
        element,
        property,
        value
    ) {
        if (element) {
            element.style.setProperty(
                property,
                value,
                "important"
            );
        }
    }

    function closestBuilderElement(element) {
        while (
            element &&
            element !== document.body
        ) {
            if (
                element.id &&
                element.id.indexOf(
                    "wsb-element-"
                ) === 0
            ) {
                return element;
            }

            element = element.parentElement;
        }

        return null;
    }

    function findTranslateElement() {
        var element =
            document.getElementById(
                "google_translate_element"
            );

        if (element) {
            return element;
        }

        var gadget =
            document.querySelector(
                ".goog-te-gadget"
            );

        return gadget
            ? gadget.parentElement
            : null;
    }

    function markTranslateSource() {
        var translateElement =
            findTranslateElement();

        if (!translateElement) {
            return;
        }

        var source =
            closestBuilderElement(
                translateElement
            );

        if (source) {
            source.classList.add(
                "fbr-skip-stack"
            );

            source.classList.add(
                "fbr-translate-source"
            );
        }
    }

    function getNavigationLinks() {
        var navigation =
            document.querySelector(
                ".wsb-element-navigation, .wsb-navigation"
            );

        var links = [];
        var seen = {};

        if (navigation) {
            Array.prototype.slice.call(
                navigation.querySelectorAll(
                    "a[href]"
                )
            ).forEach(function (link) {
                var text =
                    (
                        link.textContent ||
                        ""
                    )
                        .replace(/\s+/g, " ")
                        .trim();

                var href =
                    link.getAttribute("href");

                if (
                    !text ||
                    !href ||
                    href === "#" ||
                    seen[href] ||
                    /view on mobile/i.test(
                        text
                    )
                ) {
                    return;
                }

                seen[href] = true;

                links.push({
                    text: text,
                    href: href
                });
            });
        }

        if (!links.length) {
            links = [
                {
                    text: "Home",
                    href: "/"
                },
                {
                    text: "Request Ride Now",
                    href:
                        "/request-ride-now-.html"
                },
                {
                    text: "Drive With Us",
                    href:
                        "/drive-with-us-1.html"
                },
                {
                    text:
                        "Reserve / Private Parties",
                    href:
                        "/reserve-private-parties.html"
                },
                {
                    text: "Privacy Policy",
                    href:
                        "/privacy-policy-2.html"
                },
                {
                    text:
                        "Terms and Conditions",
                    href:
                        "/terms-and-conditions-.html"
                }
            ];
        }

        return links;
    }

    function hideLegacyNavigation() {
        Array.prototype.slice.call(
            document.querySelectorAll(
                ".wsb-element-navigation, .wsb-navigation"
            )
        ).forEach(function (navigation) {
            navigation.classList.add(
                "fbr-legacy-navigation"
            );

            setImportant(
                navigation,
                "display",
                "none"
            );

            setImportant(
                navigation,
                "visibility",
                "hidden"
            );

            setImportant(
                navigation,
                "height",
                "0px"
            );

            setImportant(
                navigation,
                "min-height",
                "0px"
            );

            setImportant(
                navigation,
                "margin",
                "0px"
            );

            setImportant(
                navigation,
                "padding",
                "0px"
            );

            setImportant(
                navigation,
                "overflow",
                "hidden"
            );

            var builderElement =
                closestBuilderElement(
                    navigation
                );

            if (
                builderElement &&
                builderElement !== navigation
            ) {
                builderElement.classList.add(
                    "fbr-legacy-navigation"
                );

                builderElement.classList.add(
                    "fbr-skip-stack"
                );

                setImportant(
                    builderElement,
                    "display",
                    "none"
                );

                setImportant(
                    builderElement,
                    "visibility",
                    "hidden"
                );

                setImportant(
                    builderElement,
                    "height",
                    "0px"
                );

                setImportant(
                    builderElement,
                    "min-height",
                    "0px"
                );

                setImportant(
                    builderElement,
                    "margin",
                    "0px"
                );

                setImportant(
                    builderElement,
                    "padding",
                    "0px"
                );

                setImportant(
                    builderElement,
                    "overflow",
                    "hidden"
                );
            }
        });

        Array.prototype.slice.call(
            document.querySelectorAll("a")
        ).forEach(function (link) {
            if (
                /view on mobile/i.test(
                    (
                        link.textContent ||
                        ""
                    ).trim()
                )
            ) {
                setImportant(
                    link,
                    "display",
                    "none"
                );

                var wrapper =
                    closestBuilderElement(
                        link
                    );

                if (wrapper) {
                    wrapper.classList.add(
                        "fbr-skip-stack"
                    );

                    setImportant(
                        wrapper,
                        "display",
                        "none"
                    );

                    setImportant(
                        wrapper,
                        "height",
                        "0px"
                    );

                    setImportant(
                        wrapper,
                        "margin",
                        "0px"
                    );

                    setImportant(
                        wrapper,
                        "padding",
                        "0px"
                    );
                }
            }
        });
    }

    function createMobileHeader() {
        if (
            document.getElementById(
                "fbr-mobile-header"
            )
        ) {
            return;
        }

        var links =
            getNavigationLinks();

        var pageContainer =
            document.querySelector(
                ".wsb-canvas-page-container"
            ) ||
            document.body;

        var header =
            document.createElement(
                "header"
            );

        var bar =
            document.createElement("div");

        var home =
            document.createElement("a");

        var button =
            document.createElement(
                "button"
            );

        var menu =
            document.createElement("nav");

        var translateSlot =
            document.createElement("div");

        var menuLinks =
            document.createElement("div");

        header.id =
            "fbr-mobile-header";

        bar.id =
            "fbr-mobile-header-bar";

        home.id =
            "fbr-mobile-home";

        button.id =
            "fbr-menu-button";

        menu.id =
            "fbr-mobile-menu";

        translateSlot.id =
            "fbr-mobile-translate";

        menuLinks.id =
            "fbr-mobile-menu-links";

        home.href = "/";
        home.textContent =
            "Free Beach Ride";

        button.type = "button";
        button.textContent = "☰";

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        button.setAttribute(
            "aria-controls",
            "fbr-mobile-menu"
        );

        button.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        /*
         * Force the navy menu-button colors.
         */
        setImportant(
            button,
            "background",
            "#0B3954"
        );

        setImportant(
            button,
            "color",
            "#ffffff"
        );

        setImportant(
            button,
            "border",
            "2px solid #0B3954"
        );

        links.forEach(function (item) {
            var link =
                document.createElement("a");

            link.href = item.href;
            link.textContent = item.text;

            menuLinks.appendChild(link);
        });

        button.addEventListener(
            "click",
            function () {
                var isOpen =
                    menu.classList.toggle(
                        "fbr-open"
                    );

                button.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

                button.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

                button.textContent =
                    isOpen ? "×" : "☰";
            }
        );

        bar.appendChild(home);
        bar.appendChild(button);

        menu.appendChild(
            translateSlot
        );

        menu.appendChild(menuLinks);

        header.appendChild(bar);
        header.appendChild(menu);

        pageContainer.insertBefore(
            header,
            pageContainer.firstChild
        );
    }

    function moveTranslateIntoMenu() {
        if (
            !html.classList.contains(
                "fbr-mobile"
            )
        ) {
            return false;
        }

        var slot =
            document.getElementById(
                "fbr-mobile-translate"
            );

        var translateElement =
            findTranslateElement();

        if (
            !slot ||
            !translateElement
        ) {
            return false;
        }

        if (
            translateElement.parentElement !==
            slot
        ) {
            var source =
                closestBuilderElement(
                    translateElement
                );

            if (source) {
                source.classList.add(
                    "fbr-skip-stack"
                );

                source.classList.add(
                    "fbr-translate-source"
                );
            }

            slot.appendChild(
                translateElement
            );
        }

        setImportant(
            translateElement,
            "display",
            "block"
        );

        setImportant(
            translateElement,
            "visibility",
            "visible"
        );

        setImportant(
            translateElement,
            "width",
            "100%"
        );

        var combo =
            slot.querySelector(
                ".goog-te-combo"
            );

        if (combo) {
            setImportant(
                combo,
                "display",
                "block"
            );

            setImportant(
                combo,
                "visibility",
                "visible"
            );

            setImportant(
                combo,
                "width",
                "100%"
            );

            setImportant(
                combo,
                "min-height",
                "44px"
            );

            setImportant(
                combo,
                "margin",
                "0px"
            );

            setImportant(
                combo,
                "color",
                "#0B3954"
            );

            setImportant(
                combo,
                "background",
                "#ffffff"
            );

            setImportant(
                combo,
                "border",
                "2px solid #0B3954"
            );

            setImportant(
                combo,
                "border-radius",
                "5px"
            );

            setImportant(
                combo,
                "font-size",
                "16px"
            );
        }

        return true;
    }

    function initializeTranslate() {
        var attempts = 0;
        var maximumAttempts = 40;

        function tryMove() {
            attempts += 1;

            var moved =
                moveTranslateIntoMenu();

            var combo =
                document.querySelector(
                    "#fbr-mobile-translate .goog-te-combo"
                );

            if (moved && combo) {
                return;
            }

            if (
                attempts <
                maximumAttempts
            ) {
                window.setTimeout(
                    tryMove,
                    500
                );
            }
        }

        tryMove();
    }

    function createMobileActions() {
        if (
            document.getElementById(
                "fbr-mobile-actions"
            )
        ) {
            return;
        }

        var actions =
            document.createElement("div");

        var callButton =
            document.createElement("a");

        var requestButton =
            document.createElement("a");

        actions.id =
            "fbr-mobile-actions";

        callButton.id =
            "fbr-call-button";

        requestButton.id =
            "fbr-request-button";

        callButton.href =
            "tel:+17277767553";

        callButton.textContent =
            "Call for a Ride";

        requestButton.href =
            "/request-ride-now-.html";

        requestButton.textContent =
            "Request Ride";

        /*
         * Call button:
         * white background and navy border.
         */
        setImportant(
            callButton,
            "background",
            "#ffffff"
        );

        setImportant(
            callButton,
            "color",
            "#0B3954"
        );

        setImportant(
            callButton,
            "border",
            "2px solid #0B3954"
        );

        /*
         * Request Ride:
         * orange background and white text.
         */
        setImportant(
            requestButton,
            "background",
            "#C2410C"
        );

        setImportant(
            requestButton,
            "color",
            "#ffffff"
        );

        setImportant(
            requestButton,
            "border",
            "2px solid #C2410C"
        );

        actions.appendChild(
            callButton
        );

        actions.appendChild(
            requestButton
        );

        document.body.appendChild(
            actions
        );
    }

    function stackElements(container) {
        if (
            !container ||
            container.getAttribute(
                "data-fbr-stacked"
            ) === "1"
        ) {
            return;
        }

        var items =
            Array.prototype.slice
                .call(container.children)
                .filter(
                    function (element) {
                        if (
                            !element.id ||
                            element.id.indexOf(
                                "wsb-element-"
                            ) !== 0
                        ) {
                            return false;
                        }

                        if (
                            element.classList.contains(
                                "wsb-element-navigation"
                            ) ||
                            element.classList.contains(
                                "fbr-skip-stack"
                            ) ||
                            element.querySelector(
                                ".wsb-element-navigation, .wsb-navigation"
                            ) ||
                            element.querySelector(
                                "#google_translate_element, .goog-te-gadget"
                            )
                        ) {
                            element.classList.add(
                                "fbr-skip-stack"
                            );

                            return false;
                        }

                        return true;
                    }
                )
                .map(
                    function (
                        element,
                        index
                    ) {
                        var computed =
                            window.getComputedStyle(
                                element
                            );

                        var top =
                            parseFloat(
                                computed.top
                            );

                        var left =
                            parseFloat(
                                computed.left
                            );

                        return {
                            element: element,
                            index: index,
                            top: isNaN(top)
                                ? element.offsetTop
                                : top,
                            left: isNaN(left)
                                ? element.offsetLeft
                                : left
                        };
                    }
                );

        items.sort(function (a, b) {
            if (
                Math.abs(
                    a.top - b.top
                ) < 20
            ) {
                return a.left - b.left;
            }

            return (
                a.top - b.top ||
                a.index - b.index
            );
        });

        items.forEach(
            function (item) {
                container.appendChild(
                    item.element
                );
            }
        );

        container.setAttribute(
            "data-fbr-stacked",
            "1"
        );
    }

    function captureGallerySizes() {
        Array.prototype.slice.call(
            document.querySelectorAll(
                ".wsb-element-gallery"
            )
        ).forEach(function (gallery) {
            if (
                gallery.getAttribute(
                    "data-fbr-original-width"
                )
            ) {
                return;
            }

            var computed =
                window.getComputedStyle(
                    gallery
                );

            var rect =
                gallery.getBoundingClientRect();

            var width =
                parseFloat(
                    gallery.style.width
                ) ||
                parseFloat(
                    computed.width
                ) ||
                rect.width ||
                gallery.offsetWidth;

            var height =
                parseFloat(
                    gallery.style.height
                ) ||
                parseFloat(
                    computed.height
                ) ||
                rect.height ||
                gallery.offsetHeight;

            if (
                !width ||
                width < 1
            ) {
                width = 947;
            }

            if (
                !height ||
                height < 1
            ) {
                height =
                    Math.round(
                        width * 0.5
                    );
            }

            gallery.setAttribute(
                "data-fbr-original-width",
                String(width)
            );

            gallery.setAttribute(
                "data-fbr-original-height",
                String(height)
            );
        });
    }

    function wrapGalleries() {
        Array.prototype.slice.call(
            document.querySelectorAll(
                ".wsb-element-gallery"
            )
        ).forEach(function (gallery) {
            if (
                gallery.parentElement &&
                gallery.parentElement
                    .classList.contains(
                        "fbr-gallery-wrapper"
                    )
            ) {
                return;
            }

            if (!gallery.parentNode) {
                return;
            }

            var wrapper =
                document.createElement(
                    "div"
                );

            wrapper.className =
                "fbr-gallery-wrapper";

            gallery.parentNode.insertBefore(
                wrapper,
                gallery
            );

            wrapper.appendChild(
                gallery
            );
        });
    }

    function resizeGalleries() {
        if (
            !html.classList.contains(
                "fbr-mobile"
            )
        ) {
            return;
        }

        Array.prototype.slice.call(
            document.querySelectorAll(
                ".fbr-gallery-wrapper"
            )
        ).forEach(function (wrapper) {
            var gallery =
                wrapper.querySelector(
                    ".wsb-element-gallery"
                );

            if (!gallery) {
                return;
            }

            var originalWidth =
                parseFloat(
                    gallery.getAttribute(
                        "data-fbr-original-width"
                    )
                );

            var originalHeight =
                parseFloat(
                    gallery.getAttribute(
                        "data-fbr-original-height"
                    )
                );

            if (
                !originalWidth ||
                !originalHeight
            ) {
                return;
            }

            var availableWidth =
                wrapper.clientWidth ||
                (
                    wrapper.parentElement
                        ? wrapper.parentElement
                            .clientWidth
                        : 0
                ) ||
                Math.max(
                    1,
                    window.innerWidth - 36
                );

            var scale =
                Math.min(
                    1,
                    availableWidth /
                        originalWidth
                );

            var scaledHeight =
                Math.max(
                    1,
                    Math.round(
                        originalHeight *
                            scale
                    )
                );

            wrapper.style.height =
                scaledHeight + "px";

            setImportant(
                gallery,
                "position",
                "absolute"
            );

            setImportant(
                gallery,
                "top",
                "0px"
            );

            setImportant(
                gallery,
                "right",
                "auto"
            );

            setImportant(
                gallery,
                "bottom",
                "auto"
            );

            setImportant(
                gallery,
                "left",
                "0px"
            );

            setImportant(
                gallery,
                "width",
                originalWidth + "px"
            );

            setImportant(
                gallery,
                "max-width",
                originalWidth + "px"
            );

            setImportant(
                gallery,
                "height",
                originalHeight + "px"
            );

            setImportant(
                gallery,
                "min-height",
                originalHeight + "px"
            );

            setImportant(
                gallery,
                "transform",
                "scale(" +
                    scale +
                    ")"
            );

            setImportant(
                gallery,
                "transform-origin",
                "top left"
            );

            setImportant(
                gallery,
                "overflow",
                "hidden"
            );
        });
    }

    function syncGalleries() {
        captureGallerySizes();
        wrapGalleries();
        resizeGalleries();
    }

    function observePage() {
        if (
            !(
                "MutationObserver" in
                window
            ) ||
            observer
        ) {
            return;
        }

        observer =
            new MutationObserver(
                function () {
                    hideLegacyNavigation();
                    moveTranslateIntoMenu();
                    syncGalleries();
                }
            );

        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );
    }

    function applyMobileLayout() {
        if (!isMobileWidth()) {
            return;
        }

        /*
         * Capture slideshow dimensions before
         * applying the mobile styles.
         */
        captureGallerySizes();
        markTranslateSource();
        createMobileHeader();

        html.classList.add(
            "fbr-mobile"
        );

        if (
            /request-ride/i.test(
                window.location.pathname
            )
        ) {
            document.body.classList.add(
                "fbr-request-page"
            );
        }

        hideLegacyNavigation();

        stackElements(
            document.getElementById(
                "wsb-canvas-template-container"
            )
        );

        stackElements(
            document.getElementById(
                "wsb-canvas-template-footer-container"
            )
        );

        initializeTranslate();
        createMobileActions();
        syncGalleries();
        observePage();

        window.setTimeout(
            function () {
                hideLegacyNavigation();
                moveTranslateIntoMenu();
                syncGalleries();
            },
            100
        );

        window.setTimeout(
            function () {
                hideLegacyNavigation();
                moveTranslateIntoMenu();
                syncGalleries();
            },
            500
        );

        window.setTimeout(
            function () {
                hideLegacyNavigation();
                moveTranslateIntoMenu();
                syncGalleries();
            },
            1500
        );
    }

    function initialize() {
        addViewport();
        addStyles();

        startedMobile =
            isMobileWidth();

        applyMobileLayout();
    }

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );
    } else {
        initialize();
    }

    window.addEventListener(
        "resize",
        function () {
            window.clearTimeout(
                resizeTimer
            );

            resizeTimer =
                window.setTimeout(
                    function () {
                        var isMobile =
                            isMobileWidth();

                        if (
                            isMobile !==
                            startedMobile
                        ) {
                            window.location.reload();
                            return;
                        }

                        if (isMobile) {
                            hideLegacyNavigation();
                            moveTranslateIntoMenu();
                            resizeGalleries();
                        }
                    },
                    300
                );
        }
    );
})();
