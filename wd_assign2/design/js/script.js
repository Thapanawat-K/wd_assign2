// res arrays
var restaurants = [
  {
    id: "dainty",
    name: "Dainty Sichuan Noodles QV",
    cuisine: "Chinese / Sichuan",
    price: 20,
    dietary: ["none", "halal"],
    purposes: ["casual", "tourist", "family"],
    description: "Quick spicy Sichuan noodles in Red Cape Lane at QV.",
    image: "../design/images/dainty-sichuan.jpg"
  },
  {
    id: "dodee",
    name: "DoDee Paidang Swanston",
    cuisine: "Thai",
    price: 22,
    dietary: ["none", "vegetarian", "glutenfree"],
    purposes: ["casual", "family", "tourist", "date"],
    description: "Lively Thai street food on Swanston Street, famous for Tom Yum noodles.",
    image: "../design/images/dodee-paidang.jpg"
  },
  {
    id: "yappari",
    name: "Yappari Steak Swanston",
    cuisine: "Japanese Steakhouse",
    price: 35,
    dietary: ["none", "glutenfree"],
    purposes: ["date", "business", "family"],
    description: "Sizzling steaks on lava stone plates, perfect for a date night.",
    image: "../design/images/yappari-steak.jpg"
  },
  {
    id: "soi38",
    name: "Soi 38",
    cuisine: "Thai Street Food",
    price: 25,
    dietary: ["none", "vegetarian", "vegan"],
    purposes: ["casual", "tourist", "family", "date"],
    description: "Authentic Bangkok-style boat noodles in Tivoli Arcade.",
    image: "../design/images/soi-38.jpg"
  },
  {
    id: "gopals",
    name: "Gopals",
    cuisine: "Vegetarian / Vegan",
    price: 15,
    dietary: ["none", "vegetarian", "vegan", "halal", "glutenfree"],
    purposes: ["casual", "family", "tourist", "business"],
    description: "Melbourne's oldest vegetarian restaurant, run by Hare Krishna.",
    image: "../design/images/gopals.jpg"
  },
  {
    id: "udon",
    name: "Udon Yasan",
    cuisine: "Japanese / Udon",
    price: 12,
    dietary: ["none", "vegetarian"],
    purposes: ["casual", "business", "tourist"],
    description: "Cheap, satisfying Japanese udon bowls on Bourke Street.",
    image: "../design/images/udon-yasan.jpg"
  }
];


// recommendation calc
function getRecommendation() {
  var dietary = document.getElementById("dietary").value;
  var purpose = document.getElementById("purpose").value;
  var budgetRadios = document.getElementsByName("budget");
  var budget = "low";
  for (var i = 0; i < budgetRadios.length; i++) {
    if (budgetRadios[i].checked) {
      budget = budgetRadios[i].value;
    }
  }

  // convert budget
  var minPrice = 0;
  var maxPrice = 100;
  if (budget === "low") { minPrice = 0;  maxPrice = 20; }
  if (budget === "mid") { minPrice = 20; maxPrice = 30; }
  if (budget === "high") { minPrice = 30; maxPrice = 100; }

  // score each restaurant
  var bestMatch = null;
  var bestScore = -1;

  for (var j = 0; j < restaurants.length; j++) {
    var r = restaurants[j];
    var score = 0;

    // dietary match
    if (r.dietary.indexOf(dietary) !== -1) {
      score += 3;
    } else if (dietary === "none") {
      score += 1;
    } else {
      continue;
    }

    // budget match
    if (r.price >= minPrice && r.price <= maxPrice) {
      score += 3;
    } else if (r.price < minPrice) {
      score += 0;
    } else {
      continue;
    }

    // purpose match
    if (r.purposes.indexOf(purpose) !== -1) {
      score += 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = r;
    }
  }

  var resultEl = document.getElementById("recommendResult");
  if (bestMatch === null) {
    resultEl.innerHTML = "<p>Sorry, no restaurants match your preferences.</p>";
    return;
  }

  resultEl.innerHTML =
    '<h2>We recommend:</h2>' +
    '<article class="restaurant-card">' +
      '<img src="' + bestMatch.image + '" alt="' + bestMatch.name + '" />' +
      '<div class="restaurant-info">' +
        '<h2>' + bestMatch.name + '</h2>' +
        '<p class="cuisine">' + bestMatch.cuisine + '</p>' +
        '<p class="description">' + bestMatch.description + '</p>' +
        '<p><strong>Average price:</strong> $' + bestMatch.price + ' per person</p>' +
        '<a href="reservation.html?restaurant=' + bestMatch.id + '" class="btn">Reserve</a>' +
      '</div>' +
    '</article>';
}


// register form val
function validateRegister() {
  var valid = true;

  // clear previous errors
  var errors = document.getElementsByClassName("error");
  for (var i = 0; i < errors.length; i++) {
    errors[i].textContent = "";
  }

  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var pwd1 = document.getElementById("pwd1").value;
  var pwd2 = document.getElementById("pwd2").value;
  var genderRadios = document.getElementsByName("gender");
  var genderSelected = false;
  for (var g = 0; g < genderRadios.length; g++) {
    if (genderRadios[g].checked) genderSelected = true;
  }

  // username
  if (username === "") {
    document.getElementById("err-username").textContent = "Username is required.";
    valid = false;
  } else if (username.length < 5) {
    document.getElementById("err-username").textContent = "Username must be at least 5 characters.";
    valid = false;
  } else if (!/^[A-Za-z0-9_]+$/.test(username)) {
    document.getElementById("err-username").textContent = "Letters, numbers, and underscores only.";
    valid = false;
  }

  // email
  if (email === "") {
    document.getElementById("err-email").textContent = "Email is required.";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("err-email").textContent = "Please enter a valid email address.";
    valid = false;
  }

  // phone
  if (phone === "") {
    document.getElementById("err-phone").textContent = "Phone number is required.";
    valid = false;
  } else if (!/^[0-9]{8,15}$/.test(phone)) {
    document.getElementById("err-phone").textContent = "Phone must be 8-15 digits.";
    valid = false;
  }

  // password
  if (pwd1 === "") {
    document.getElementById("err-pwd1").textContent = "Password is required.";
    valid = false;
  } else if (pwd1.length < 10) {
    document.getElementById("err-pwd1").textContent = "Password must be at least 10 characters.";
    valid = false;
  } else if (!/[A-Z]/.test(pwd1) || !/[a-z]/.test(pwd1) || !/[0-9]/.test(pwd1) || !/[^A-Za-z0-9]/.test(pwd1)) {
    document.getElementById("err-pwd1").textContent = "Must include uppercase, lowercase, number, and special character.";
    valid = false;
  }

  // confirm password
  if (pwd2 === "") {
    document.getElementById("err-pwd2").textContent = "Please retype your password.";
    valid = false;
  } else if (pwd1 !== pwd2) {
    document.getElementById("err-pwd2").textContent = "Passwords do not match.";
    valid = false;
  }

  // gender
  if (!genderSelected) {
    document.getElementById("err-gender").textContent = "Please select a gender.";
    valid = false;
  }

  return valid;
}
// reservation
function updateDeposit() {
  var selected = document.getElementById("restaurant").value;
  var depositField = document.getElementById("deposit");

  if (selected === "yappari") {
    depositField.value = "$20";
  } else {
    depositField.value = "$0";
  }
}

// payment method seclect
function updatePaymentFields() {
  var paymentRadios = document.getElementsByName("payment");
  var selected = "";
  for (var i = 0; i < paymentRadios.length; i++) {
    if (paymentRadios[i].checked) selected = paymentRadios[i].value;
  }

  var voucherGroup = document.getElementById("voucher-group");
  var cardGroup = document.getElementById("card-group");

  if (selected === "voucher") {
    voucherGroup.style.display = "block";
    cardGroup.style.display = "none";
  } else if (selected === "card") {
    voucherGroup.style.display = "none";
    cardGroup.style.display = "block";
  } else {
    voucherGroup.style.display = "none";
    cardGroup.style.display = "none";
  }
}

// copy email
function copyBillingEmail() {
  var checkbox = document.getElementById("sameemail");
  var emailField = document.getElementById("email");
  var billingField = document.getElementById("billing");
  if (checkbox.checked) {
    billingField.value = emailField.value;
  }
}


function prefillRestaurant() {
  var url = window.location.search;
  var match = url.match(/restaurant=([^&]+)/);
  if (match) {
    var id = match[1];
    var dropdown = document.getElementById("restaurant");
    if (dropdown) {
      dropdown.value = id;
      updateDeposit();
    }
  }
}
// reservation val
function validateReservation() {
  var valid = true;

  // clear previous errors
  var errors = document.getElementsByClassName("error");
  for (var i = 0; i < errors.length; i++) {
    errors[i].textContent = "";
  }

  var fullname = document.getElementById("fullname").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var restaurant = document.getElementById("restaurant").value;
  var datetime = document.getElementById("datetime").value;
  var people = document.getElementById("people").value;
  var billing = document.getElementById("billing").value;

  var paymentRadios = document.getElementsByName("payment");
  var paymentSelected = "";
  for (var p = 0; p < paymentRadios.length; p++) {
    if (paymentRadios[p].checked) paymentSelected = paymentRadios[p].value;
  }

  // full name
  if (fullname === "") {
    document.getElementById("err-fullname").textContent = "Full name is required.";
    valid = false;
  }

  // email
  if (email === "") {
    document.getElementById("err-email").textContent = "Email is required.";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("err-email").textContent = "Please enter a valid email address.";
    valid = false;
  }

  // phone
  if (phone === "") {
    document.getElementById("err-phone").textContent = "Phone number is required.";
    valid = false;
  } else if (!/^[0-9]{10,}$/.test(phone)) {
    document.getElementById("err-phone").textContent = "Phone must contain at least 10 digits.";
    valid = false;
  }

  // restaurant must be selected
  if (restaurant === "") {
    document.getElementById("err-restaurant").textContent = "Please select a restaurant.";
    valid = false;
  }

  // reservation date
  if (datetime === "") {
    document.getElementById("err-datetime").textContent = "Reservation date and time is required.";
    valid = false;
  } else {
    var chosenDate = new Date(datetime);
    var now = new Date();
    if (chosenDate < now) {
      document.getElementById("err-datetime").textContent = "Reservation cannot be in the past.";
      valid = false;
    }
  }

  //people
  if (people === "" || parseInt(people) <= 0) {
    document.getElementById("err-people").textContent = "Number of people must be greater than 0.";
    valid = false;
  }

  // payment method
  if (paymentSelected === "") {
    document.getElementById("err-payment").textContent = "Please select a payment method.";
    valid = false;
  }

  // credit card
  if (paymentSelected === "card") {
    var cardtype = document.getElementById("cardtype").value;
    var cardnum = document.getElementById("cardnum").value;

    if (cardnum === "") {
      document.getElementById("err-cardnum").textContent = "Card number is required.";
      valid = false;
    } else if (!/^[0-9]+$/.test(cardnum)) {
      document.getElementById("err-cardnum").textContent = "Card number must be digits only.";
      valid = false;
    } else if ((cardtype === "visa" || cardtype === "mc") && cardnum.length !== 16) {
      document.getElementById("err-cardnum").textContent = "Visa/Mastercard must be 16 digits.";
      valid = false;
    } else if (cardtype === "amex" && cardnum.length !== 15) {
      document.getElementById("err-cardnum").textContent = "Amex must be 15 digits.";
      valid = false;
    }
  }

  // billing email
  if (billing === "") {
    document.getElementById("err-billing").textContent = "Billing email is required.";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing)) {
    document.getElementById("err-billing").textContent = "Please enter a valid billing email.";
    valid = false;
  }

  return valid;
}


window.addEventListener("load", function() {
  // recommend page
  var recBtn = document.getElementById("recommendBtn");
  if (recBtn) {
    recBtn.onclick = getRecommendation;
  }

  // register page
  var regForm = document.getElementById("regform");
  if (regForm) {
    regForm.onsubmit = function(e) {
      if (!validateRegister()) {
        e.preventDefault();
        return false;
      }
      return true;
    };
  }

  // reservation page
  var resForm = document.getElementById("resform");
  if (resForm) {
    document.getElementById("restaurant").onchange = updateDeposit;

    var paymentRadios = document.getElementsByName("payment");
    for (var i = 0; i < paymentRadios.length; i++) {
      paymentRadios[i].onchange = updatePaymentFields;
    }

    document.getElementById("sameemail").onchange = copyBillingEmail;

    // prefill restaurant
    prefillRestaurant();

    // validate
    resForm.onsubmit = function(e) {
      if (!validateReservation()) {
        e.preventDefault();
        return false;
      }
      return true;
    };
  }

  // bill
  var billBtn = document.getElementById("billBtn");
  if (billBtn) {
    billBtn.onclick = calculateBill;
  }
});


function calculateBill() {
  var pricePerPerson = parseFloat(document.getElementById("billRestaurant").value);
  var people = parseInt(document.getElementById("billPeople").value);
  var resultEl = document.getElementById("billResult");

  // basic checks
  if (!pricePerPerson) {
    resultEl.innerHTML = "<p>Please select a restaurant.</p>";
    return;
  }
  if (!people || people <= 0) {
    resultEl.innerHTML = "<p>Please enter a valid number of people.</p>";
    return;
  }

  var total = pricePerPerson * people;
  resultEl.innerHTML =
    "<h2>Estimated Total: $" + total + "</h2>" +
    "<p>" + people + " people \u00D7 $" + pricePerPerson + " per person</p>";
}