$(window).load(function() {
  $('.flexslider').flexslider({
    animation: "slide"
  });
});

var contactForm, firstNameField, emailField;
// Array of contacts to save/load to/from localStorage
var contacts = [];
var textMessageInvalid = "This field contains invalid chjaracters";
window.addEventListener("load", function() {
  // called when the page has been entirely loaded
  
    // the form element
  contactForm = document.forms[0];
  
    // get the fields elements
  firstNameField = contactForm.givenName;
  emailField = contactForm.email;
  
    // read contacts from localStorag
  contacts = getContacts();
  
    // Listener for input events on the two text fields. Check for
  // invalid charcters %, &, $, ! that are forbidden.
  firstNameField.oninput = function() {
	if (this.value.match(/[%&$!]/)) {
		this.setCustomValidity(textMessageInvalid);
	} else {
		this.setCustomValidity("");
	}
};
  
});

// Called when the form is submitted
function submitForm() {
  // When we execute this function, the form has already been validated
  // by the HTML5 built-in validation system (bubbles etc.)
  console.log("We are saving the current contact in the form");
  
  // Create a new contact JavaScript object with the current values
  // in the form inoput fields
 var contact = {};
  contact.givenName = firstNameField.value;
  contact.email = emailField.value;
    // Add the contact in the array of contacts
  contacts.push(contact);
  
  // Save the array of contacts in JSON format
  localStorage.contacts = JSON.stringify(contacts); 
  
  // Update the HTML table with the new contact at the end
  addLineToHTMLTable(contact);
  
  // do not submit the form using HTTP, return false prevents this
  // submission
  return false;
}
// Read contacts from localStorage
function getContacts() {
	var contacts = localStorage.contacts;
	if (contacts) {
		return JSON.parse(contacts);
	} else {
		return [];
	}
};

function showInsertSect(){
  var dataSection = document.querySelector("#mainContent");
  dataSection.innerHTML = "<h2>Заполните поля</h2>";
}




