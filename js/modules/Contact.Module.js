class Contact {
  static username = false;
  static useremail = false;
  static age = false;
  static number = false;
  static password = false;
  static repassword = false;

  validation() {
    $("input").on("keyup", function () {
      console.log(Contact.useremail);
      if (this.getAttribute("id") == "user-email") {
        Contact.validateInputs(
          "user-email",
          `<div id="email-validate" class="alert alert-danger">Email not valid *exemple@yyy.zzz</div>`,
          "email-validate",
          /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gi
        )
          ? (Contact.useremail = true)
          : (Contact.useremail = false);
      }
      if (this.getAttribute("id") == "user-number") {
        Contact.validateInputs(
          "user-number",
          `<div id="number-validate" class="alert alert-danger">Enter valid Phone Number</div>`,
          "number-validate",
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gi
        )
          ? (Contact.number = true)
          : (Contact.number = false);
      }
      if (this.getAttribute("id") == "user-age") {
        Contact.validateInputs(
          "user-age",
          `<div id="age-validate" class="alert alert-danger">Enter valid age</div>`,
          "age-validate",
          /^(0?[1-9]|[1-9][0-9]|[1][1-9]|99)$/gi
        )
          ? (Contact.age = true)
          : (Contact.age = false);
      }
      if (this.getAttribute("id") == "user-name") {
        Contact.validateInputs(
          "user-name",
          `<div id="name-validate" class=" alert alert-danger">Special characters and numbers not allowed</div>`,
          "name-validate",
          /^[a-z_-]{3,15}$/gi
        )
          ? (Contact.username = true)
          : (Contact.username = false);
      }
      if (this.getAttribute("id") == "user-password") {
        Contact.validateInputs(
          "user-password",
          ` <div id="password-validate" class="alert alert-danger">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>`,
          "password-validate",
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]?).{8,}$/gi
        )
          ? (Contact.password = true)
          : (Contact.password = false);
      }
      if (this.getAttribute("id") == "user-repassword") {
        Contact.validateRePass()
          ? (Contact.repassword = true)
          : (Contact.repassword = false);
      }

      if (
        Contact.username &&
        Contact.useremail &&
        Contact.password &&
        Contact.age &&
        Contact.number &&
        Contact.repassword
      ) {
        $(".btn-outline-danger").prop("disabled", false);
      } else {
        $(".btn-outline-danger").prop("disabled", true);
      }
    });
  }
  static validateInputs(elementId, alertElement, alertID, regex) {
    const inputValue = $(`#${elementId}`).val();
    let valid = false;
    const reg = regex;
    if (reg.test(inputValue)) {
      valid = true;
      $(`#${alertID}`).length > 0 ? $(`#${alertID}`).remove() : "";
    } else {
      valid = false;
      $(`#${alertID}`).length > 0
        ? ""
        : $(alertElement).insertAfter(`#${elementId}`);
    }
    return valid;
  }
  static validateRePass() {
    let valid = false;
    const pass = $("#user-password").val();
    const rePass = $("#user-repassword").val();
    if (pass === rePass) {
      valid = true;
      $("#repassword-validate").length > 0
        ? $("#repassword-validate").remove()
        : "";
    } else {
      valid = false;
      $("#repassword-validate").length > 0
        ? ""
        : $(
            ` <div id="repassword-validate" class="alert alert-danger">Password Don't Match</div>`
          ).insertAfter("#user-repassword");
    }
    return valid;
  }
}

const contact = new Contact();
export const validationMethod = contact.validation;
