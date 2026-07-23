(function () {
    "use strict";

    var MOBILE_BREAKPOINT = 800;
    var html = document.documentElement;
    var startedMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    var galleryObserver = null;

    function addViewport() {
        var viewport = document.querySelector('meta[name="viewport"]');

        if (!viewport) {
            viewport = document.createElement("meta");
            viewport.name = "viewport";
            document.head.appendChild(viewport);
        }

        viewport.content =
            "width=device-width, initial-scale=1, maximum-scale=5";
    }

    function addStyles() {
        if (document.getElementById("fbr-mobile-styles")) {
            return;
        }

        var style = document.createElement("style");
        style.id = "fbr-mobile-styles";

        style.textContent = `
            html.-mobile,
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
                box-sizing: border-box !important;
                overflow: visible !important;
            }

            html.fbr-mobile
                #wsb-canvas-template-container
                > [id^="wsb-element-"],
            html.fbr-mobile
                #wsb-canvas-template-footer-container
                > [id^="wsb-element-"] {
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
                box-sizing: border-box !important;
                overflow: visible !important;
            }

            /*
 * Google Translate mobile row.
 */
#fbr-mobile-translate {
    display: none;
}

html.fbr-mobile #fbr-mobile-translate {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 52px;
    padding: 6px 16px 10px;
    background: #ffffff;
    border-top: 1px solid #eeeeee;
    box-sizing: border-box;
}

html.fbr-mobile #fbr-mobile-translate #google_translate_element {
    display: block !important;
    width: 100% !important;
    max-width: 320px !important;
    margin: 0 auto !important;
    visibility: visible !important;
}

html.fbr-mobile #fbr-mobile-translate .goog-te-gadget {
    display: block !important;
    width: 100% !important;
    font-size: 0 !important;
    visibility: visible !important;
}

html.fbr-mobile #fbr-mobile-translate .goog-te-combo {
    display: block !important;
    width: 100% !important;
    min-height: 42px !important;
    margin: 0 !important;
    padding: 8px 10px !important;
    color: #0B3954 !important;
    background: #ffffff !important;
    border: 2px solid #0B3954 !important;
    border-radius: 5px !important;
    font-size: 16px !important;
    box-sizing: border-box !important;
    visibility: visible !important;
}

/*
 * Hide the now-empty original Builder 7 element after moving
 * the translator into the mobile header.
 */
html.fbr-mobile .fbr-translate-source {
    display: none !important;
}

            /*
             * Hide GoDaddy's original navigation when our menu is active.
             */
            html.fbr-mobile .wsb-element-navigation,
            html.fbr-mobile .wsb-navigation,
            html.fbr-mobile .view-as-mobile,
            html.fbr-mobile #mobile-site-link,
            html.fbr-mobile .mobile-site-link,
            html.fbr-mobile a[href*="view=mobile"] {
                display: none !important;
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
                font-size: clamp(30px, 9vw, 44px) !important;
                line-height: 1.1 !important;
            }

            html.fbr-mobile h2 {
                font-size: clamp(25px, 7vw, 36px) !important;
                line-height: 1.2 !important;
            }

            html.fbr-mobile h3 {
                font-size: clamp(21px, 6vw, 30px) !important;
                line-height: 1.25 !important;
            }

            html.fbr-mobile .wsb-image-inner,
            html.fbr-mobile .wsb-image-inner > div,
            html.fbr-mobile .wsb-element-image > div {
                position: relative !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                overflow: visible !important;
            }

            html.fbr-mobile .wsb-element-image img {
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
             * Responsive home-page slideshow wrapper.
             *
             * The slideshow itself retains its original dimensions and is
             * scaled proportionally so its slides, arrows and transitions
             * continue working.
             */
            html.fbr-mobile .fbr-gallery-wrapper {
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
                transform-origin: top left !important;
            }

            html.fbr-mobile .wsb-htmlsnippet-element,
            html.fbr-mobile .wsb-element-htmlsnippet,
            html.fbr-mobile .wsb-element-htmlsnippet > div {
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

            html.fbr-mobile body.fbr-request-page iframe {
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

            html.fbr-mobile #fbr-mobile-header {
                position: sticky;
                top: 0;
                z-index: 999999;
                display: block;
                width: 100%;
                background: #ffffff;
                border-bottom: 1px solid #d8d8d8;
                box-sizing: border-box;
            }

            #fbr-mobile-header-bar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-height: 60px;
                padding: 10px 16px;
                box-sizing: border-box;
            }

            #fbr-mobile-home {
                color: #111111;
                font: 700 18px Arial, sans-serif;
                text-decoration: none;
            }

            #fbr-menu-button {
                min-width: 48px;
                min-height: 44px;
                padding: 8px 12px;
                background: #0B3954;
                color: #ffffff;
                border: 0;
                border-radius: 4px;
                font-size: 24px;
                line-height: 1;
                cursor: pointer;
            }

            #fbr-mobile-menu {
                display: none;
                padding: 0 16px 16px;
                background: #ffffff;
            }

            #fbr-mobile-menu.fbr-open {
                display: block;
            }

            #fbr-mobile-menu a {
                display: block;
                min-height: 48px;
                padding: 14px 8px;
                color: #111111;
                border-bottom: 1px solid #e5e5e5;
                font: 600 16px Arial, sans-serif;
                text-decoration: none;
                box-sizing: border-box;
            }

            html.fbr-mobile #fbr-mobile-actions {
                position: fixed;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 999999;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                padding: 8px;
                background: rgba(255, 255, 255, 0.97);
                border-top: 1px solid #d8d8d8;
                box-sizing: border-box;
            }

            #fbr-mobile-actions a {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 50px;
                padding: 10px;
                border-radius: 5px;
                font: 700 15px Arial, sans-serif;
                text-align: center;
                text-decoration: none;
                box-sizing: border-box;
            }

            #fbr-call-button {
                background: #ffffff;
                color: #0B3954;
                border: 2px solid #0B3954;
            }

            #fbr-request-button {
                 background: #C2410C;
                 color: #ffffff;
                 border: 2px solid #C2410C;
            }

            #fbr-call-button:hover,
            #fbr-call-button:focus {
                background: #EAF4F8;
            }

            #fbr-request-button:hover,
            #fbr-request-button:focus {
                background: #A93808;
                border-color: #A93808;
            }
        `;

        document.head.appendChild(style);
    }

    /*
     * Capture the original slideshow dimensions before mobile styling is
     * applied. Builder 7 depends on these fixed dimensions.
     */
    function captureGallerySizes() {
        Array.prototype.slice.call(
            document.querySelectorAll(".wsb-element-gallery")
        ).forEach(function (gallery) {
            if (gallery.getAttribute("data-fbr-original-width")) {
                return;
            }

            var computed = window.getComputedStyle(gallery);
            var rect = gallery.getBoundingClientRect();

            var width =
                parseFloat(gallery.style.width) ||
                parseFloat(computed.width) ||
                rect.width ||
                gallery.offsetWidth;

            var height =
                parseFloat(gallery.style.height) ||
                parseFloat(computed.height) ||
                rect.height ||
                gallery.offsetHeight;

            /*
             * Fallback dimensions in case Builder 7 has not finished
             * rendering the slideshow yet.
             */
            if (!width || width < 1) {
                width = 947;
            }

            if (!height || height < 1) {
                height = Math.round(width * 0.5);
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
            document.querySelectorAll(".wsb-element-gallery")
        ).forEach(function (gallery) {
            if (
                gallery.parentElement &&
                gallery.parentElement.classList.contains(
                    "fbr-gallery-wrapper"
                )
            ) {
                return;
            }

            if (!gallery.parentNode) {
                return;
            }

            var wrapper = document.createElement("div");
            wrapper.className = "fbr-gallery-wrapper";

            gallery.parentNode.insertBefore(wrapper, gallery);
            wrapper.appendChild(gallery);
        });
    }

    function setImportant(element, property, value) {
        if (element) {
            element.style.setProperty(
                property,
                value,
                "important"
            );
        }
    }

    function resizeGalleries() {
        if (!html.classList.contains("fbr-mobile")) {
            return;
        }

        Array.prototype.slice.call(
            document.querySelectorAll(".fbr-gallery-wrapper")
        ).forEach(function (wrapper) {
            var gallery;

            try {
                gallery = wrapper.querySelector(
                    ":scope > .wsb-element-gallery"
                );
            } catch (error) {
                gallery = wrapper.firstElementChild;
            }

            if (!gallery) {
                gallery = wrapper.firstElementChild;
            }

            if (!gallery) {
                return;
            }

            var originalWidth = parseFloat(
                gallery.getAttribute(
                    "data-fbr-original-width"
                )
            );

            var originalHeight = parseFloat(
                gallery.getAttribute(
                    "data-fbr-original-height"
                )
            );

            if (!originalWidth || !originalHeight) {
                return;
            }

            var parentWidth = wrapper.parentElement
                ? wrapper.parentElement.clientWidth
                : 0;

            var availableWidth =
                wrapper.clientWidth ||
                parentWidth ||
                Math.max(1, window.innerWidth - 36);

            var scale = Math.min(
                1,
                availableWidth / originalWidth
            );

            var scaledHeight = Math.max(
                1,
                Math.round(originalHeight * scale)
            );

            wrapper.style.height = scaledHeight + "px";

            setImportant(gallery, "position", "absolute");
            setImportant(gallery, "top", "0px");
            setImportant(gallery, "right", "auto");
            setImportant(gallery, "bottom", "auto");
            setImportant(gallery, "left", "0px");

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
                "scale(" + scale + ")"
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

    function observeGalleries() {
        if (
            !("MutationObserver" in window) ||
            galleryObserver
        ) {
            return;
        }

        galleryObserver = new MutationObserver(
            function (mutations) {
                var added = mutations.some(
                    function (mutation) {
                        return (
                            mutation.addedNodes &&
                            mutation.addedNodes.length > 0
                        );
                    }
                );

                if (added) {
                    window.setTimeout(syncGalleries, 0);
                }
            }
        );

        galleryObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /*
     * Builder 7 absolutely positions each element. Capture its original
     * vertical position and reorder the elements before converting them
     * into normal document flow.
     */
    function stackElements(container) {
        if (
            !container ||
            container.getAttribute("data-fbr-stacked") === "1"
        ) {
            return;
        }

        var items = Array.prototype.slice
            .call(container.children)
            .filter(function (element) {
                return (
                    element.id &&
                    element.id.indexOf("wsb-element-") === 0
                );
            })
            .map(function (element, index) {
                var computed =
                    window.getComputedStyle(element);

                var top = parseFloat(computed.top);
                var left = parseFloat(computed.left);

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
            });

        items.sort(function (a, b) {
            if (Math.abs(a.top - b.top) < 20) {
                return a.left - b.left;
            }

            return (
                a.top - b.top ||
                a.index - b.index
            );
        });

        items.forEach(function (item) {
            container.appendChild(item.element);
        });

        container.setAttribute(
            "data-fbr-stacked",
            "1"
        );
    }

    function getNavigationLinks() {
        var navigation = document.querySelector(
            ".wsb-element-navigation"
        );

        var links = [];
        var seen = {};

        if (navigation) {
            Array.prototype.slice.call(
                navigation.querySelectorAll("a[href]")
            ).forEach(function (link) {
                var text =
                    (link.textContent || "").trim();

                var href =
                    link.getAttribute("href");

                if (
                    !text ||
                    !href ||
                    href === "#" ||
                    seen[href]
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

        /*
         * Fallback menu links if the original navigation has not loaded.
         */
        if (!links.length) {
            links = [
                {
                    text: "Home",
                    href: "/"
                },
                {
                    text: "Request Ride Now",
                    href: "/request-ride-now-.html"
                },
                {
                    text: "Drive With Us",
                    href: "/drive-with-us-1.html"
                },
                {
                    text: "Reserve / Private Parties",
                    href: "/reserve-private-parties.html"
                },
                {
                    text: "Privacy Policy",
                    href: "/privacy-policy-2.html"
                },
                {
                    text: "Terms and Conditions",
                    href: "/terms-and-conditions-.html"
                }
            ];
        }

        return links;
    }

    function createMobileHeader() {
        if (
            document.getElementById(
                "fbr-mobile-header"
            )
        ) {
            return;
        }

        var pageContainer =
            document.querySelector(
                ".wsb-canvas-page-container"
            ) ||
            document.body;

        var header =
            document.createElement("header");

        var bar =
            document.createElement("div");

        var home =
            document.createElement("a");

        var button =
            document.createElement("button");

        var menu =
            document.createElement("nav");

        header.id = "fbr-mobile-header";
        bar.id = "fbr-mobile-header-bar";

        home.id = "fbr-mobile-home";
        home.href = "/";
        home.textContent = "Free Beach Ride";

        button.id = "fbr-menu-button";
        button.type = "button";

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

        button.textContent = "☰";

        menu.id = "fbr-mobile-menu";

        getNavigationLinks().forEach(
            function (item) {
                var link =
                    document.createElement("a");

                link.href = item.href;
                link.textContent = item.text;
                menu.appendChild(link);
            }
        );

        button.addEventListener(
            "click",
            function () {
                var isOpen =
                    menu.classList.toggle(
                        "fbr-open"
                    );

                button.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
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

        header.appendChild(bar);
        header.appendChild(menu);

        pageContainer.insertBefore(
            header,
            pageContainer.firstChild
        );
    }

    function createMobileTranslateSlot() {
    var header = document.getElementById(
        "fbr-mobile-header"
    );

    if (!header) {
        return null;
    }

    var slot = document.getElementById(
        "fbr-mobile-translate"
    );

    if (slot) {
        return slot;
    }

    slot = document.createElement("div");
    slot.id = "fbr-mobile-translate";
    slot.setAttribute(
        "aria-label",
        "Choose website language"
    );

    var headerBar = document.getElementById(
        "fbr-mobile-header-bar"
    );

    /*
     * Insert the translator underneath the title/menu row
     * and above the expandable navigation.
     */
    if (headerBar && headerBar.nextSibling) {
        header.insertBefore(
            slot,
            headerBar.nextSibling
        );
    } else {
        header.appendChild(slot);
    }

    return slot;
}

function moveGoogleTranslateToMobileHeader() {
    if (!html.classList.contains("fbr-mobile")) {
        return false;
    }

    var slot = createMobileTranslateSlot();

    if (!slot) {
        return false;
    }

    /*
     * This is the standard ID used by the Google Translate
     * website widget.
     */
    var translateElement = document.getElementById(
        "google_translate_element"
    );

    /*
     * Fallback in case the containing ID is different.
     */
    if (!translateElement) {
        var gadget = document.querySelector(
            ".goog-te-gadget"
        );

        if (gadget) {
            translateElement =
                gadget.parentElement;
        }
    }

    if (!translateElement) {
        return false;
    }

    if (translateElement.parentElement !== slot) {
        var originalBuilderElement =
            translateElement.closest(
                '[id^="wsb-element-"]'
            );

        slot.appendChild(translateElement);

        if (
            originalBuilderElement &&
            originalBuilderElement !== slot
        ) {
            originalBuilderElement.classList.add(
                "fbr-translate-source"
            );
        }
    }

    translateElement.style.setProperty(
        "display",
        "block",
        "important"
    );

    translateElement.style.setProperty(
        "visibility",
        "visible",
        "important"
    );

    return true;
}

function initializeMobileTranslate() {
    var attempts = 0;
    var maximumAttempts = 30;

    function tryToMoveTranslator() {
        attempts += 1;

        var moved =
            moveGoogleTranslateToMobileHeader();

        var languageDropdown =
            document.querySelector(
                "#fbr-mobile-translate .goog-te-combo"
            );

        if (
            moved &&
            languageDropdown
        ) {
            return;
        }

        /*
         * Google loads the widget asynchronously, so retry
         * for approximately 15 seconds.
         */
        if (attempts < maximumAttempts) {
            window.setTimeout(
                tryToMoveTranslator,
                500
            );
        }
    }

    tryToMoveTranslator();
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

        actions.id = "fbr-mobile-actions";

        callButton.id = "fbr-call-button";
        callButton.href = "tel:+17277767553";
        callButton.textContent = "Call for a Ride";

        requestButton.id =
            "fbr-request-button";

        requestButton.href =
            "/request-ride-now-.html";

        requestButton.textContent =
            "Request Ride";

        actions.appendChild(callButton);
        actions.appendChild(requestButton);

        document.body.appendChild(actions);
    }

    function applyMobileLayout() {
        if (
            window.innerWidth >
            MOBILE_BREAKPOINT
        ) {
            return;
        }

        /*
         * Capture the slideshow dimensions before the mobile class applies.
         */
        captureGallerySizes();

        html.classList.add("fbr-mobile");

        if (
            /request-ride/i.test(
                window.location.pathname
            )
        ) {
            document.body.classList.add(
                "fbr-request-page"
            );
        }

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

        createMobileHeader();
        initializeMobileTranslate();
        createMobileActions();
        syncGalleries();
        observeGalleries();

        /*
         * Builder 7 sometimes initializes the slideshow after DOM ready.
         */
        window.setTimeout(
            syncGalleries,
            100
        );

        window.setTimeout(
            syncGalleries,
            500
        );

        window.setTimeout(
            syncGalleries,
            1500
        );
    }

    function initialize() {
        addViewport();
        addStyles();
        applyMobileLayout();
    }

    if (
        document.readyState === "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );
    } else {
        initialize();
    }

    var resizeTimer;

    window.addEventListener(
        "resize",
        function () {
            window.clearTimeout(resizeTimer);

            resizeTimer =
                window.setTimeout(
                    function () {
                        var isMobile =
                            window.innerWidth <=
                            MOBILE_BREAKPOINT;

                        if (
                            isMobile !==
                            startedMobile
                        ) {
                            window.location.reload();
                            return;
                        }

                        if (isMobile) {
                            resizeGalleries();
                        }
                    },
                    300
                );
        }
    );
})();
