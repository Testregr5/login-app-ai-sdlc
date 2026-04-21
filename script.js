(function () {
    "use strict";

    /**
     * Returns the element by ID.
     * @param {string} id 
     * @returns {HTMLElement|null}
     */
    const $ = function (id) {
        return document.getElementById(id);
    };

    /**
     * Sets the text content of an element, or clears if none provided.
     * @param {HTMLElement|null} el
     * @param {string} text
     */
    const setText = function (el, text) {
        if (el) el.innerText = text || "";
    };

    /**
     * Sets element visibility via display and hidden property.
     * @param {HTMLElement|null} el
     * @param {boolean} visible
     */
    const setVisible = function (el, visible) {
        if (!el) return;
        el.style.display = visible ? "" : "none";
        el.hidden = !visible;
    };

    // Valid credentials as constants
    const VALID_USERNAME = "admin";
    const VALID_PASSWORD = "1234";

    /**
     * Validates username and password against constants.
     * @param {string} username
     * @param {string} password
     * @returns {boolean}
     */
    const isValidCredentials = function (username, password) {
        return username === VALID_USERNAME && password === VALID_PASSWORD;
    };

    /**
     * Initializes login app after DOMContentLoaded event.
     */
    const init = function () {
        // Cache elements after DOM is ready (repo search expects this pattern)
        const loginView = $("loginView");
        const appView = $("appView");
        const loginForm = $("loginForm");
        const usernameInput = $("username");
        const passwordInput = $("password");
        const loginMessage = $("loginMessage");
        const message = $("message");
        const logoutBtn = $("logoutBtn");

        const clearInputs = function () {
            if (usernameInput) usernameInput.value = "";
            if (passwordInput) passwordInput.value = "";
        };

        const clearMessages = function () {
            setText(loginMessage, "");
            setText(message, "");
        };

        const showLoginView = function () {
            setVisible(loginView, true);
            setVisible(appView, false);
        };

        const showAppView = function () {
            setVisible(loginView, false);
            setVisible(appView, true);
        };

        // Initial state
        showLoginView();
        clearMessages();

        if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
                if (e && typeof e.preventDefault === "function") e.preventDefault();

                const username = usernameInput ? usernameInput.value : "";
                const password = passwordInput ? passwordInput.value : "";

                if (isValidCredentials(username, password)) {
                    setText(message, "Welcome");
                    setText(loginMessage, "");
                    showAppView();
                } else {
                    setText(loginMessage, "Invalid credentials");
                    setText(message, "");
                    showLoginView();
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", function (e) {
                if (e && typeof e.preventDefault === "function") e.preventDefault();

                // Ensure "Welcome" is not displayed after logout
                clearMessages();
                clearInputs();
                showLoginView();
            });
        }
    };

    document.addEventListener("DOMContentLoaded", init);
})();