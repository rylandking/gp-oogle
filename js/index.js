const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const userEmail = document.querySelector('#user-email');
const matchedList = document.querySelector('#matched-list');
const adminItems = document.querySelectorAll('.admin');

const setupUI = user => {
  if (user) {
    // Toggle admin elements
    if (user.admin) {
      adminItems.forEach(item => (item.style.display = 'block'));
    }
    // Toggle Authenticated UI Elements
    loggedInLinks.forEach(item => (item.style.display = 'block'));
    loggedOutLinks.forEach(item => (item.style.display = 'none'));

    // Show user email
    userEmail.append(user.email);
  } else {
    // Toggle admin elements
    adminItems.forEach(item => (item.style.display = 'none'));

    // Toggle Authenticated UI Elements
    loggedInLinks.forEach(item => (item.style.display = 'none'));
    loggedOutLinks.forEach(item => (item.style.display = 'block'));

    // Reset user email
    userEmail.innerHTML = '';
  }
};

// Populate matching GPO members (#matched-list)
const setupMatchedList = data => {
  let html = '';

  data.forEach(doc => {
    const gpoMember = doc.data();

    if (gpoMember.gpoName == 'Vizient') {
      gpoMemberCard = `
      <div class="card card-body logged-in">
        <h5 class="amber-text lighten-1"><strong>${gpoMember.memberName}</strong></h5>
        <p class="blue-grey-text darken-4 mb-2">
          ${gpoMember.address}, ${gpoMember.city}, ${gpoMember.state} ${gpoMember.zip}
        </p>
        <p class="blue-grey-text darken-4 mb-2">${gpoMember.phone}</p>
        <span class="grey-text lighten-1"
          >${gpoMember.directParentName} | ${gpoMember.topParentName}</span
        >
        <div class="new amber lighten-1 mt-4 py-3 center">
          <strong><span class="white-text">${gpoMember.gpoName} - ${gpoMember.gpoID}</span></strong>
        </div>
      </div>
    `;
    } else if (gpoMember.gpoName == 'Premier') {
      gpoMemberCard = `
      <div class="card card-body logged-in">
        <h5 class="teal-text lighten-1"><strong>${gpoMember.memberName}</strong></h5>
        <p class="blue-grey-text darken-4 mb-2">
          ${gpoMember.address}, ${gpoMember.city}, ${gpoMember.state} ${gpoMember.zip}
        </p>
        <p class="blue-grey-text darken-4 mb-2">${gpoMember.phone}</p>
        <span class="grey-text lighten-1"
          >${gpoMember.directParentName} | ${gpoMember.topParentName}</span
        >
        <div class="new teal lighten-1 mt-4 py-3 center">
          <strong><span class="white-text">${gpoMember.gpoName} - ${gpoMember.gpoID}</span></strong>
        </div>
      </div>
    `;
    } else {
      gpoMemberCard = `
      <div class="card card-body logged-in">
        <h5 class="pink-text lighten-1"><strong>${gpoMember.memberName}</strong></h5>
        <p class="blue-grey-text darken-4 mb-2">
          ${gpoMember.address}, ${gpoMember.city}, ${gpoMember.state} ${gpoMember.zip}
        </p>
        <p class="blue-grey-text darken-4 mb-2">${gpoMember.phone}</p>
        <span class="grey-text lighten-1"
          >${gpoMember.directParentName} | ${gpoMember.topParentName}</span
        >
        <div class="new pink lighten-1 mt-4 py-3 center">
          <strong><span class="white-text">${gpoMember.gpoName} - ${gpoMember.gpoID}</span></strong>
        </div>
      </div>
    `;
    }

    html += gpoMemberCard;
  });

  matchedList.innerHTML = html;
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
});
