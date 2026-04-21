(function () {
    "use strict";

    // Constants for credentials and messages
    const VALID_USERNAME = "admin";
    const VALID_PASSWORD = "1234";
    const MESSAGE_WELCOME = "Welcome";
    const MESSAGE_INVALID_CREDENTIALS = "Invalid credentials";

    // Helper to get element by ID
    function $(id) {
        return document.getElementById(id);
    }

    function setText(element, text) {
        if (element) element.innerText = text || "";
    }

    function setVisible(element, visible) {
        if (!element) return;
        element.style.display = visible ? "" : "none";
        element.hidden = !visible;
    }

    function clearInput(element) {
        if (element) element.value = "";
    }

    function clearAllInputs(inputs) {
        inputs.forEach(clearInput);
    }

    function clearMessages(elements) {
        elements.forEach(el => setText(el, ""));
    }

    function showView(showElement, hideElement) {
        setVisible(showElement, true);
        setVisible(hideElement, false);
    }

    function credentialsAreValid(username, password) {
        return username === VALID_USERNAME && password === VALID_PASSWORD;
    }

    function init() {
        // Cache elements after DOM is ready
        const loginView = $("loginView");
        const appView = $("appView");
        const loginForm = $("loginForm");
        const usernameInput = $("username");
        const passwordInput = $("password");
        const loginMessage = $("loginMessage");
        const message = $("message");
        const logoutBtn = $("logoutBtn");

        // Initial state
        showView(loginView, appView);
        clearMessages([loginMessage, message]);

        if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
                if (e && typeof e.preventDefault === "function") e.preventDefault();

                const username = usernameInput ? usernameInput.value : "";
                const password = passwordInput ? passwordInput.value : "";

                if (credentialsAreValid(username, password)) {
                    setText(message, MESSAGE_WELCOME);
                    setText(loginMessage, "");
                    showView(appView, loginView);
                } else {
                    setText(loginMessage, MESSAGE_INVALID_CREDENTIALS);
                    setText(message, "");
                    showView(loginView, appView);
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", function (e) {
                if (e && typeof e.preventDefault === "function") e.preventDefault();

                // Ensure "Welcome" is not displayed after logout
                clearMessages([loginMessage, message]);
                clearAllInputs([usernameInput, passwordInput]);
                showView(loginView, appView);
            });
        }
    }

    document.addEventListener("DOMContentLoaded", init);
})();