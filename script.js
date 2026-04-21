(function () {
    "use strict";

    function $(id) {
        return document.getElementById(id);
    }

    function setText(el, text) {
        if (el) el.innerText = text || "";
    }

    function setVisible(el, visible) {
        if (!el) return;
        el.style.display = visible ? "" : "none";
        el.hidden = !visible;
    }

    function init() {
        // Cache elements after DOM is ready (repo search expects this pattern)
        const loginView = $("loginView");
        const appView = $("appView");
        const loginForm = $("loginForm");
        const usernameInput = $("username");
        const passwordInput = $("password");
        const loginMessage = $("loginMessage");
        const message = $("message");
        const logoutBtn = $("logoutBtn");

        function clearInputs() {
            if (usernameInput) usernameInput.value = "";
            if (passwordInput) passwordInput.value = "";
        }

        function clearMessages() {
            setText(loginMessage, "");
            setText(message, "");
        }

        function showLoginView() {
            setVisible(loginView, true);
            setVisible(appView, false);
        }

        function showAppView() {
            setVisible(loginView, false);
            setVisible(appView, true);
        }

        // Initial state
        showLoginView();
        clearMessages();

        if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
                if (e && typeof e.preventDefault === "function") e.preventDefault();

                const username = usernameInput ? usernameInput.value : "";
                const password = passwordInput ? passwordInput.value : "";

                if (username === "admin" && password === "1234") {
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
    }

    document.addEventListener("DOMContentLoaded", init);
})();
