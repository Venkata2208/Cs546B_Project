$(() => {
  const loginForm = $("#login-form");
  const serverError = $("#server-error");
  loginForm.on("submit", (event) => {
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
    req.fail((jqXHR, error) => {
      serverError.append(`<p>${jqXHR.responseJSON.data}</p>`);
      serverError.show();
    });
    req.done((data) => {
      window.location.href = '/';
    });
  });

  function init(event) {
    event.preventDefault();
    serverError.empty();
    serverError.hide();
  }
});
