<script>
(function () {
    "use strict";

    var MOBILE_BREAKPOINT = 800;
    var html = document.documentElement;
    var wasMobile = window.innerWidth <= MOBILE_BREAKPOINT;

    /*
     * Add the viewport tag required for responsive layouts.
     */
    function addViewportTag() {
        var viewport = document.querySelector('meta[name="viewport"]');

        if (!viewport) {
            viewport = document.createElement("meta");
            viewport.name = "viewport";
            document.head.appendChild(viewport);
        }

        viewport.content =
            "width=device-width, initial-scale=1, maximum-scale=5";
    }

    /*
     * Inject the mobile CSS.
     */
    function addMobileStyles() {
        if (document.getElementById("fbr-mobile-styles")) {
            return;
        }

        var style = document.createElement("style");
        style.id = "fbr-mobile-styles";

        style.textContent = `
            /* Prevent horizontal movement */
            html.fbr-mobile,
            html.fbr-mobile body {
                width: 100% !important;
                min-width: 0 !important;
                max-width: 100% !important;
                overflow-x: hidden !important;
                margin: 0 !important;
            }

            /*
             * Builder 7 makes the canvas fixed and scrollable.
             * Convert it into a normal document on mobile.
             */
            html.fbr-mobile .wsb-canvas.body {
                position: static !important;
                width: 100% !important;
                height: auto !important;
                min-height: 100vh !important;
                overflow: visible !important;
            }

            html.fbr-mobile .wsb-canvas-page-container {
                position: static !important;
                width: 100% !important;
                height: auto !important;
                overflow: visible !important;
            }

            /*
             * Main Builder 7 page container.
             */
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
            }

            /*
             * Stack Builder 7 elements vertically.
             */
            html.fbr-mobile #wsb-canvas-template-container > [id^="wsb-element-"],
            html.fbr-mobile #wsb-canvas-template-footer-container > [id^="wsb-element-"] {
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
             * Decorative Builder 7 lines and shapes do not translate
             * well into a vertical layout.
             */
            html.fbr-mobile .wsb-element-line,
            html.fbr-mobile .wsb-element-shape {
                display: none !important;
            }

            /*
             * Replace the old desktop navigation with our mobile menu.
             */
            html.fbr-mobile .wsb-element-navigation {
                display: none !important;
            }

            /*
             * Text boxes.
             */
            html.fbr-mobile .txt,
            html.fbr-mobile .wsb-element-text .txt {
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                overflow: visible !important;
                box-sizing: border-box !important;
                line-height: 1.45 !important;
                overflow-wrap: anywhere !important;
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
            }

            /*
             * Images.
             */
            html.fbr-mobile .wsb-image-inner,
            html.fbr-mobile .wsb-image-inner > div,
            html.fbr-mobile .wsb-element-image > div {
                position: relative !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                overflow: visible !important;
            }

            html.fbr-mobile .wsb-element-image img,
            html.fbr-mobile img {
                position: relative !important;
                display: block !important;
                width: auto !important;
                max-width: 100% !important;
                height: auto !important;
                top: auto !important;
                right: auto !important;
                bottom: auto !important;
                left: auto !important;
                margin-left: auto !important;
                margin-right: auto !important;
                object-fit: contain !important;
            }

            /*
             * HTML snippets and embedded forms.
             */
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

            /*
             * Give the ride-request form enough room.
             * Adjust this if the form ends sooner or continues farther.
             */
            html.fbr-mobile body.fbr-request-page iframe {
                min-height: 1050px !important;
            }

            /*
             * Forms and touch targets.
             */
            html.fbr-mobile input,
            html.fbr-mobile select,
            html.fbr-mobile textarea,
            html.fbr-mobile button {
                max-width: 100% !important;
                min-height: 44px !important;
                box-sizing: border-box !important;
                font-size: 16px !important;
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

            /*
             * Mobile header.
             */
            #fbr-mobile-header {
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
                font-family: Arial, sans-serif;
                font-size: 18px;
                font-weight: 700;
                text-decoration: none;
            }

            #fbr-menu-button {
                min-width: 48px;
                min-height: 44px;
                padding: 8px 12px;
                background: #111111;
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
                box-sizing: border-box;
                font-family: Arial, sans-serif;
                font-size: 16px;
                font-weight: 600;
                text-decoration: none;
            }

            /*
             * Persistent ride buttons.
             */
            #fbr-mobile-actions {
                display: none;
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
                font-family: Arial, sans-serif;
                font-size: 15px;
                font-weight: 700;
                text-align: center;
                text-decoration: none;
                box-sizing: border-box;
            }

            #fbr-call-button {
                background: #ffffff;
                color: #111111;
                border: 2px solid #111111;
            }

            #fbr-request-button {
                background: #111111;
                color: #ffffff;
                border: 2px solid #111111;
            }

            html.fbr-mobile body {
                padding-bottom: 76px !important;
            }
        `;

        document.head.appendChild(style);
    }

    /*
     * Builder 7 elements are absolutely positioned.
     * Reorder them using their original vertical coordinates before
     * converting them into normal document-flow elements.
     */
    function stackBuilderElements(container) {
        if (!container || container.getAttribute("data-fbr-stacked") === "1") {
            return;
        }

        var items = Array.prototype.slice.call(container.children)
            .filter(function (element) {
                return element.id &&
                    element.id.indexOf("wsb-element-") === 0;
            })
            .map(function (element, index) {
                var computed = window.getComputedStyle(element);
                var top = parseFloat(computed.top);
                var left = parseFloat(computed.left);

                return {
                    element: element,
                    index: index,
                    top: isNaN(top) ? element.offsetTop : top,
                    left: isNaN(left) ? element.offsetLeft : left
                };
            });

        items.sort(function (a, b) {
            if (Math.abs(a.top - b.top) < 20) {
                return a.left - b.left;
            }

            return a.top - b.top || a.index - b.index;
        });

        items.forEach(function (item) {
            container.appendChild(item.element);
        });

        container.setAttribute("data-fbr-stacked", "1");
    }

    function getNavigationLinks() {
        var navigation = document.querySelector(".wsb-element-navigation");
        var links = [];
        var seen = {};

        if (navigation) {
            Array.prototype.slice.call(
                navigation.querySelectorAll("a[href]")
            ).forEach(function (link) {
                var text = (link.textContent || "").trim();
                var href = link.getAttribute("href");

                if (!text || !href || href === "#" || seen[href]) {
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
         * Fallback links in case Builder 7's navigation is not available
         * when this script runs.
         */
        if (!links.length) {
            links = [
                { text: "Home", href: "/" },
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
        if (document.getElementById("fbr-mobile-header")) {
            return;
        }

        var pageContainer =
            document.querySelector(".wsb-canvas-page-container") ||
            document.body;

        var header = document.createElement("header");
        header.id = "fbr-mobile-header";

        var bar = document.createElement("div");
        bar.id = "fbr-mobile-header-bar";

        var home = document.createElement("a");
        home.id = "fbr-mobile-home";
        home.href = "/";
        home.textContent = "Free Beach Ride";

        var button = document.createElement("button");
        button.id = "fbr-menu-button";
        button.type = "button";
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", "fbr-mobile-menu");
        button.setAttribute("aria-label", "Open navigation menu");
        button.textContent = "☰";

        var menu = document.createElement("nav");
        menu.id = "fbr-mobile-menu";

        getNavigationLinks().forEach(function (item) {
            var link = document.createElement("a");
            link.href = item.href;
            link.textContent = item.text;
            menu.appendChild(link);
        });

        button.addEventListener("click", function () {
            var isOpen = menu.classList.toggle("fbr-open");

            button.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            button.textContent = isOpen ? "×" : "☰";
        });

        bar.appendChild(home);
        bar.appendChild(button);
        header.appendChild(bar);
        header.appendChild(menu);

        pageContainer.insertBefore(header, pageContainer.firstChild);
    }

    function createMobileActions() {
        if (document.getElementById("fbr-mobile-actions")) {
            return;
        }

        var actions = document.createElement("div");
        actions.id = "fbr-mobile-actions";

        var callButton = document.createElement("a");
        callButton.id = "fbr-call-button";
        callButton.href = "tel:+17277767553";
        callButton.textContent = "Call for a Ride";

        var requestButton = document.createElement("a");
        requestButton.id = "fbr-request-button";
        requestButton.href = "/request-ride-now-.html";
        requestButton.textContent = "Request Ride";

        actions.appendChild(callButton);
        actions.appendChild(requestButton);

        document.body.appendChild(actions);
    }

    function applyMobileLayout() {
        if (window.innerWidth > MOBILE_BREAKPOINT) {
            return;
        }

        html.classList.add("fbr-mobile");

        if (/request-ride/i.test(window.location.pathname)) {
            document.body.classList.add("fbr-request-page");
        }

        stackBuilderElements(
            document.getElementById("wsb-canvas-template-container")
        );

        stackBuilderElements(
            document.getElementById(
                "wsb-canvas-template-footer-container"
            )
        );

        createMobileHeader();
        createMobileActions();
    }

    function initialize() {
        addViewportTag();
        addMobileStyles();
        applyMobileLayout();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize);
    } else {
        initialize();
    }

    /*
     * Reload only when resizing across the mobile breakpoint.
     * This prevents desktop styles from remaining after rotation or resize.
     */
    var resizeTimer;

    window.addEventListener("resize", function () {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(function () {
            var isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

            if (isMobile !== wasMobile) {
                window.location.reload();
            }
        }, 300);
    });
})();
</script>