(function (window, document, undefined) {
    //Add unity as a global object
    var unity = window.unity || (window.unity = {});
    unity.views = {};
    unity.changeView = function (view) {
        window.location.hash = view;
    };
    //Go to the next view using the order in which the views appear in the HTML
    unity.changeToNextView = function () {
        unity.viewNames = Object.keys(unity.views);
        for (var i = 0; i < unity.viewNames.length; i++) {
            if (unity.currentView.id === unity.viewNames[i]) {
                window.location.hash = i === unity.viewNames.length - 1 ? unity.viewNames[1] : unity.viewNames[i + 1];
                break;
            }
        }
    };
    //Go to the previous view using the order in which the views appear in the HTML
    unity.changeToPreviousView = function () {
        unity.viewNames = Object.keys(unity.views);
        for (var i = 0; i < unity.viewNames.length;  i++) {
            if (unity.currentView.id === unity.viewNames[i]) {
                window.location.hash = i === 1 ? unity.viewNames[unity.viewNames.length - 1] : unity.viewNames[i - 1];
                break;
            }
        }
    };

    var divs = document.querySelectorAll("div[data-role='view']"), //All div elements on the main html file with a data-role attribute that equals 'view'

        view = null,

        i, //Reusable counter

        //This function takes care of showing views both at initialization and whenever a user switches views.
        showViews = function () {
            //Hide all views
            for (view in unity.views) {
                if (unity.views.hasOwnProperty(view)) {
                    view = unity.views[view];
                    view.className = view.className.replace(/visibleView/g, "").trim();
                }
            }

            //Display only the view corresponding to the URL's hash
            for (view in unity.views) {
                if (unity.views.hasOwnProperty(view)) {
                    view = unity.views[view];
                    if (unity.hash === "") {
                        //Avoid creating ugly class attributes such as " visibleView" instead of "visibleView"
                        if (unity.views.firstView.className) {
                            unity.views.firstView.className += " visibleView";
                        } else {
                            unity.views.firstView.className = "visibleView";
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
        //Save a reference to the first view.
        if (Object.keys(unity.views).length === 0) {
            unity.views.firstView = divs[i];
        }
        unity.views[divs[i].id] = divs[i];
    }

    //Check for onhashchange support
    if ("onhashchange" in window) {
        window.onhashchange = function (event) {
            //Display view that corresponds to the current hash
            if (event.newURL) {
                unity.hash = event.newURL.slice(event.newURL.indexOf("#") + 1);
            } else {
                unity.hash = window.location.hash.slice(window.location.hash.indexOf("#") + 1);
            }
            if (unity.hash) {
                unity.currentView = unity.views[unity.hash];
                showViews();
            } else {
                unity.currentView = unity.views[Object.keys(unity.views)[0]];
                showViews();
            }
        }
    } else {
        alert("Your browser might not support certain functionality on this website. Please update it.")
    }

    checkRefresh(location.hash);

})(window, document);
