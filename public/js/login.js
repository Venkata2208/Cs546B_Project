$(() => {
  const loginForm = $("#login-form");
  const serverError = $("#server-error");
  loginForm.on("submit", (event) => {
    try {
      init(event);
      const username = $("#login-username").val();
      const password = $("#login-password").val();

      let req = $.ajax({
        method: "POST",
        url: "/users/login",
        data: {
          username: username,
          password: password,
        },
      });
      checkInput(username);
      checkInput(password);

      checkUsername(username);
      checkPassword(password);

      req.fail((jqXHR, error) => {
        console.log(jqXHR.responseJSON.data);
        serverError.append(`<p>${jqXHR.responseJSON.data}</p>`);
        serverError.show();
      });
      req.done((data) => {
        window.location.href = "/";
      });
    } catch (error) {
      console.log(error);
      document.getElementById("error").innerHTML = error;
      document.getElementById("error").style.display = "block";
    }
  });

  function init(event) {
    event.preventDefault();
    serverError.empty();
    serverError.hide();
  }

  function checkInput(input) {
    if (!input) throw "you must provide both username and password";
  }
  function checkUsername(username) {
    if (typeof username !== "string") throw "username must be a string";

    username = username.trim();

    if (username === "") throw "username cannot be just spaces";

    if (username.length < 4) throw "username must be at least 4 characters";

    if (!/^[a-zA-Z0-9]+$/.test(username)) throw "username must be alphanumeric";

    if (/\s/.test(username)) throw "username cannot have spaces";
  }
  function checkPassword(password) {
    if (typeof password !== "string") throw "password must be a string";

    password = password.trim();

    if (/\s/.test(password)) throw "password cannot have spaces";

    if (password.length < 6) throw "password must be at least 6 characters";

    if (!/[A-Z]/.test(password))
      throw "password must have at least one upper case letter";

    if (!/[0-9]/.test(password)) throw "password must have at least one number";

    if (/^[a-zA-Z0-9]+$/.test(password))
      throw "password must have at least one special character";
  }
});
