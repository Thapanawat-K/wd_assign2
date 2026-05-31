T.Kittisiddho 105702974
Structure
assignment2/
├─ index.html
├─ restaurants.html
├─ recommend.html
├─ register.html
├─ reservation.html
├─ bill.html
Section
design
├─ css/
│ └─ style.css
├─ js/
│ └─ script.js
├─ images/
   └─ pictures.jpg …
└─ Readme.txt

GitHub Link
https://github.com/Thapanawat-K/wd_assign2

JS explaination
recommendation page:
recommendation was done through creating an array for each restaurant
Example:
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

then is calculated through a scoring system which grades each restaurant on how close they match each category. if they match it gets scored 3 otherwise it gets scored 1

   // dietary match
    if (r.dietary.indexOf(dietary) !== -1) {
      score += 3;
    } else if (dietary === "none") {
      score += 1;
    } else {
      continue;
    }

this process is done once for each criteria and the highest score is recommended

    if (score > bestScore) {
      bestScore = score;
      bestMatch = r;
    }

register page:
JS is used for form validation based on the following
All fields must be completed
Username: minimum 5 characters; letters, numbers, and underscores only
○Email: valid email format
○Phone number: digits only, 8–15 digits
○Password: minimum 10 characters, including uppercase, lowercase, numbers, and
special characters
Confirm password must match the password
Gender must be selected

example:
  if (phone === "") {
    document.getElementById("err-phone").textContent = "Phone number is required.";
    valid = false;
  } else if (!/^[0-9]{8,15}$/.test(phone)) {
    document.getElementById("err-phone").textContent = "Phone must be 8-15 digits.";
    valid = false;
  }

Reservation page:
JS implemented to validate form
Required fields must not be empty
● Email must be valid (in valid format)
● Phone number must contain at least 10 digits
● Reservation date must not be in the past
● The number of people must be greater than 0

alongside this JS was also used to implement payment options by either allowing payment through voucher or through card

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
grabs the payment element from html and sees which one is selected through an index, then using if else conditions brings you to voucher if 0 is selected or card if 1 is selected

additionally a copy billing email feature was implemented
function copyBillingEmail() {
  var checkbox = document.getElementById("sameemail");
  var emailField = document.getElementById("email");
  var billingField = document.getElementById("billing");
  if (checkbox.checked) {
    billingField.value = emailField.value;
  }
}

gets the email entered previously in the register page and inputs it there

finally a js was used so users can quick select a restaurant to reserve through the recommendations page using the following:
<a href="reservation.html?restaurant=dainty" class="btn">Reserve</a>

when button is clicked on the restaurant page, this js code matches the ?restaurant= field and inputs it in the option for reservation

unction prefillRestaurant() {
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

bill:
js used to estimate the bill,

  var total = pricePerPerson * people;

a form is given to the user to select both a restaurant and the group of people, average price is stored directly in the dropdown in the bill.html page

limitations:
recommendation page is extremely limited due to overlapping restaurant criteria
an attempt to make the sidebar nav collapse able failed and was discarded due to improper css and js implementation
recommendation page isn't  easily scalable, needing a whole new array entry and criterias for each new restaurant.

References:

Broadsheet Media 2019, 'Soi 38, a beloved Thai street food spot in Melbourne', Broadsheet, viewed 31 May 2026, <https://www.broadsheet.com.au/melbourne/restaurants/soi-38>.
 
Dainty Sichuan Food n.d., Dainty Sichuan Food, viewed 31 May 2026, <https://www.daintysichuanfood.com.au/>.
 
Dodee Paidang n.d., Dodee Paidang Swanston, viewed 31 May 2026, <https://www.dodeepaidang.com/swanston>.

Google Maps n.d., Dainty Sichuan Noodles QV, viewed 31 May 2026, <https://www.google.com/maps/place/Dainty+Sichuan+Noodles+QV>.
 
Google Maps n.d., DoDee Paidang Swanston, viewed 31 May 2026, <https://www.google.com/maps/place/DoDee+Paidang+Swanston>.
 
Google Maps n.d., Gopals, viewed 31 May 2026, <https://www.google.com/maps/place/Gopals>.
 
Google Maps n.d., Soi 38 Melbourne, viewed 31 May 2026, <https://www.google.com/maps/place/Soi+38+Melbourne>.
 
Google Maps n.d., Udon Yasan, viewed 31 May 2026, <https://www.google.com/maps/place/Udon+Yasan>.
 
Google Maps n.d., Yappari Steak Swanston Melbourne, viewed 31 May 2026, <https://www.google.com/maps/place/Yappari+Steak+Swanston+Melbourne>.

AI USAGE DECLARATION:
AI was used to write brief descriptions of each restaurants and the about section in the index page, alongside usage to implement the javascript scoring system for the recommendation page

technology specification:
Anthropic 2026, Claude (Opus 4.7) [Large language model], viewed 31 May 2026, <https://claude.ai/>.

example prompt: write a brief description for the following restaurants 1)https://www.google.com/maps/place/Udon+Yasan/@-37.8130156,144.9668226,19z/data=!4m6!3m5!1s0x6ad642c991562361:0x58ff85e3529069e7!8m2!3d-37.812729!4d144.9677634!16s%2Fg%2F11bwzyzbv4?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D 2)https://www.google.com/maps/place/Dainty+Sichuan+Noodles+QV/@-37.8110066,144.9649778,19.58z/data=!3m1!5s0x6ad642cbb8318ecb:0xf66d4dfb61cc8b30!4m14!1m7!3m6!1s0x6ad642c991562361:0x58ff85e3529069e7!2sUdon+Yasan!8m2!3d-37.812729!4d144.9677634!16s%2Fg%2F11bwzyzbv4!3m5!1s0x6ad6433214e9b03f:0xe3597304590ef5a9!8m2!3d-37.8107897!4d144.9648873!16s%2Fg%2F11ptzl6m58?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D
