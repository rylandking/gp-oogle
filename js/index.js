// Populate matching GPO members (#matched-list)
const matchedList = document.querySelector('#matched-list');
const setupMatchedList = data => {
  let html = '';

  data.forEach(doc => {
    const gpoMember = doc.data();

    if (gpoMember.gpoName == 'Vizient') {
      gpoMemberCard = `
      <div class="card card-body logged-in">
        <h5 class="amber-text lighten- mb-11"><strong>${gpoMember.memberName}</strong></h5>
        <div class="pb-3">
          <span><em>${gpoMember.classOfTrade}</em></span>
        </div>
        <p class="blue-grey-text darken-4 mb-0 pb-0">
          ${gpoMember.address}, ${gpoMember.city}, ${gpoMember.state} ${gpoMember.zip}
        </p>
        <p class="blue-grey-text darken-4 mb-3">${gpoMember.phone}</p>
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
        <h5 class="teal-text lighten-1 mb-1"><strong>${gpoMember.memberName}</strong></h5>
        <div class="pb-3">
          <span><em>${gpoMember.classOfTrade}</em></span>
        </div>
        <p class="blue-grey-text darken-4 mb-0 pb-0">
          ${gpoMember.address}, ${gpoMember.city}, ${gpoMember.state} ${gpoMember.zip}
        </p>
        <p class="blue-grey-text darken-4 mb-3">${gpoMember.phone}</p>
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
        <h5 class="pink-text lighten-1 mb-1"><strong>${gpoMember.memberName}</strong></h5>
        <div class="pb-3">
          <span><em>${gpoMember.classOfTrade}</em></span>
        </div>
        <p class="blue-grey-text darken-4 mb-0 pb-0">
          ${gpoMember.address}, ${gpoMember.city}, ${gpoMember.state} ${gpoMember.zip}
        </p>
        <p class="blue-grey-text darken-4 mb-3">${gpoMember.phone}</p>
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

// Listen for Auth Status Changes
auth.onAuthStateChanged(user => {
  if (user) {
    // Get Data On Click or Enter Key Stroke
    const searchButton = document.querySelector('#search-button');
    let searchInput = document.querySelector('#search-input');
    const searchMemberName = document.querySelector(
      'input[searchBy=searchMemberName]'
    );
    const searchAddress = document.querySelector(
      'input[searchBy=searchAddress]'
    );
    const searchCity = document.querySelector('input[searchBy=searchCity]');
    const searchPhone = document.querySelector('input[searchBy=searchPhone]');
    const searchZip = document.querySelector('input[searchBy=searchZip]');
    const searchTrade = document.querySelector('input[searchBy=searchTrade]');
    // Get all documents matching searchInput on 'enter' key click
    searchInput.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
      }
    });

    // Convert string to capital first letter of each word
    function titleCase(str) {
      var splitStr = str.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
        // Assign it back to the array
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      // Directly return the joined string
      return splitStr.join(' ');
    }

    // Find all documents with city field matches searchInput
    const searchQuery = () => {
      //Convert searchInput to capital letter of each word
      searchInput = titleCase(searchInput);

      db.collection('test2')
        .where(field, '>=', searchInput)
        .where(field, '<=', searchInput + '\uf8ff')
        .get()
        .then(function(data) {
          data.forEach(function(doc) {
            setupMatchedList(data.docs);
          });
          // If no matching document
          if (data.empty) {
            noMatch();
          }
        })
        .catch(function(error) {
          console.log(error.message);
        });
    };

    // If no matching document, run this function
    const noMatch = () => {
      const matchedList = document.querySelector('#matched-list');
      matchedList.innerHTML = `<p id="no-matches" class="teal-text darken-4 center-align pt-3">No matches. Please try another search.</p>`;
    };

    // Get all documents matching searchInput on click
    searchButton.addEventListener('click', e => {
      // Get value inside searchInput
      searchInput = document.querySelector('#search-input').value.toLowerCase();
      // Ensure the searchInput string is > 0
      if (searchInput.length < 1) {
        noMatch();
      } else {
        if (searchMemberName.checked) {
          field = 'memberName';
          searchQuery();
        }
        if (searchAddress.checked) {
          field = 'address';
          searchQuery();
        }
        if (searchCity.checked) {
          field = 'city';
          searchQuery();
        }
        if (searchPhone.checked) {
          field = 'phone';
          searchQuery();
        }
        if (searchZip.checked) {
          field = 'zip';
          searchQuery();
        }
        if (searchTrade.checked) {
          field = 'classOfTrade';
          searchQuery();
        }
      }
    });
  } else {
    // If no authenticated user, set matched list to nothing
    setupMatchedList([]);
  }
});

// Set Up Materialize Components
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
});
