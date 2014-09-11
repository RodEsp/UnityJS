(function (window, document, undefined) {
    //Add unity as a global object
    var unity = window.unity || (window.unity = {});
    unity.views = {};

    var divs = document.getElementsByTagName("div"), //All div elements on the main html file.

        view = null,

        i, //Reusable counter

        //This function takes care of showing views both at initialization and whenever a user switches views.
        showViews = function () {
            for (view in unity.views) {
                if (unity.views.hasOwnProperty(view)) {
                    view = unity.views[view];
                    view.className = view.className.replace(/visibleView/g, "").trim();
                }
            }

            for (view in unity.views) {
                if (unity.views.hasOwnProperty(view)) {
                    view = unity.views[view];
                    if (unity.hash === "") {
                        //Avoid creating ugly class attributes such as " visibleView" instead of "visibleView"
                        if (unity.views.mainView.className) {
                            unity.views.mainView.className += " visibleView";
                        } else {
                            unity.views.mainView.className = "visibleView";
                        }
                    } else if (view.id.match(unity.hash)) {
                        //Avoid creating ugly class attributes such as " visibleView" instead of "visibleView"
                        if (view.className) {
                            view.className += " visibleView";
                        } else {
                            view.className = "visibleView";
                        }
                    }
                }
            }
        },

        checkRefresh = function (hash) {
            //Simulate a hash change event.
            window.onhashchange({newURL: hash});
        };

    //Save all the views the page loaded within Unity.
    for (i = 0; i < divs.length; i++) {
        if (divs[i].getAttribute("data-role") === "view") {
            //Save a reference to the first view.
            if (Object.keys(unity.views).length === 0) {
                unity.views.mainView = divs[i];
            }
            unity.views[divs[i].id] = divs[i];
        }
    }

    //Check for onhashchange support
    if ("onhashchange" in window) {
        window.onhashchange = function (event) {
            unity.previousView = document.getElementById(unity.hash);
            //Display view that corresponds to the current hash
            unity.hash = event.newURL.slice(event.newURL.indexOf("#") + 1);
            if (unity.hash) {
                unity.currentView = document.getElementById(unity.hash);
                showViews();
            } else {
                showViews();
            }
        }
    } else {
        alert("Your browser might not support certain functionality on this website. Please update it.")
    }

    checkRefresh(location.hash);

})(window, document);