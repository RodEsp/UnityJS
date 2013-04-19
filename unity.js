(function (window, document, undefined) {
    //Add unity as a global object
    var unity = window.unity || (window.unity = {});

    var divs = document.getElementsByTagName("div"), //All div elements on the main html file.

    //This function takes care of hiding views both at initialization and whenever a user switches views.
        hideViews = function () {
            for (i = 0; i < divs.length; i++) {
                if (divs[i].getAttribute("data-role") === "view") {
                    //Don't hide the first div that is a view.
                    if (divs.skipFirst && divs[i].className.indexOf("hiddenView") === -1) {
                        //Avoid creating ugly class attributes such as " hiddenView" instead of "hiddenView"
                        if (divs[i].className) {
                            divs[i].className += " hiddenView";
                        } else {
                            divs[i].className = "hiddenView";
                        }
                    } else if (!divs.skipFirst) {
                        divs[i].className = divs[i].className.replace("hiddenView", "");
                    }
                    divs.skipFirst = true;
                }
            }
        },

        checkRefresh = function (hash) {
            //If a hash exists on refresh simulate a hash change event.
            if (hash) {
                window.onhashchange({newURL: hash});
            }
        },
        i; //Reusable counter

    //Check for onhashchange support
    if ("onhashchange" in window) {
        window.onhashchange = function (event) {
            //Display view that corresponds to the current hash
            unity.hash = event.newURL.slice(event.newURL.indexOf("#") + 1);
            if (unity.hash) {
                unity.currentView = document.getElementById(unity.hash);
                hideViews();
                if (unity.currentView.className.match("hiddenView").length) {
                    unity.currentView.className = unity.currentView.className.replace("hiddenView", "");
                }
            } else {
                divs.skipFirst = undefined;
                hideViews();
            }
        }
    } else {
        alert("Your browser might not support certain functionality on this website. Please update it.")
    }

    //Hide all views on initialization (other than the initial view) and check if user refreshed while not on the initial view.
    hideViews();
    checkRefresh(location.hash);

})(window, document);