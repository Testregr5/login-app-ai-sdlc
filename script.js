(function () {
    "use strict";

    function $(id) {
        return document.getElementById(id);
    }

    const loginView = $("loginView");
    const appView = $("appView");
    const loginForm = $("loginForm");
    const usernameInput = $("username");
    const passwordInput = $("password");
    const loginMessage = $("loginMessage");
    const message = $("message");
    const logoutBtn = $("logoutBtn");

    function setText(el, text) {
        if (el) el.innerText = text || "";
    }

    function setVisible(el, visible) {
        if (!el) return;
        el.style.display = visible ? "" : "none";
        el.hidden = !visible;
    }

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

    function init() {
        showLoginView();
        clearMessages();

        if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
                e.preventDefault();

                const username = usernameInput ? usernameInput.value : "";
                const password = passwordInput ? passwordInput.value : "";

                if (username === "admin" && password === "1234") {
                    setText(loginMessage, "");
                    setText(message, "Welcome");
                    showAppView();
                } else {
                    setText(message, "");
                    setText(loginMessage, "Invalid credentials");
                    showLoginView();
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", function (e) {
                if (e && typeof e.preventDefault === "function") e.preventDefault();

                clearMessages();
                clearInputs();
                showLoginView();
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();