// const search = document.getElementById('search');
// const searchButton = document.getElementById('search-button');
// const matchList = document.getElementById('match-list');
// let gpoMembers;

// // Set timeout with alert says click into search bar and type "Q" and wait.
// setTimeout(function() {
//   document.getElementById('loading-alert').style.display = 'none';
// }, 5000);

// // Show Instructions message
// setTimeout(function() {
//   document.getElementById('instructions-alert').classList.remove('d-none');
// }, 5000);

// // Show Instructions message
// setTimeout(function() {
//   document.getElementById('instructions-alert').classList.add('d-none');
// }, 17000);

// // Show Ready message
// setTimeout(function() {
//   document.getElementById('ready-alert').classList.remove('d-none');
// }, 17000);

// // Hide Ready message
// setTimeout(function() {
//   document.getElementById('ready-alert').classList.add('d-none');
// }, 20000);

// // Get all gpoMembers from json
// const getGpoMembers = async () => {
//   const resPremier = await fetch('../data/Premier.json');
//   const resCoreTrust = await fetch('../data/CoreTrust.json');
//   const resVizient = await fetch('../data/Vizient.json');
//   const resVizientTwo = await fetch('../data/Vizient2.json');

//   premier = await resPremier.json();
//   coreTrust = await resCoreTrust.json();
//   vizient = await resVizient.json();
//   vizientTwo = await resVizientTwo.json();

//   gpoMembers = premier.concat(coreTrust, vizient, vizientTwo);

//   console.log(gpoMembers);
// };

// // Search gpoMembers from json and filter it
// const searchGPOMembers = async searchText => {
//   const regex = new RegExp(`${searchText}`, 'gi');

//   // Get matches to current text input
//   let matches = gpoMembers.filter(gpoMember => {
//     return (
//       gpoMember.name.match(regex) || gpoMember.address.match(regex)
//       // gpoMember.phone.match(regex)
//     );
//   });

//   // When nothing in search bar, return nothing
//   if (searchText.length === 0) {
//     matches = [];
//     matchList.innerHTML = '';
//   }

//   // Output the GPO Members
//   outputHTML(matches);
// };

// // Show matched GPO Members in HTML
// const outputHTML = matches => {
//   if (matches.length > 0) {
//     const premierHTML = matches
//       .filter(match => match.gpoName === 'Premier')
//       .map(
//         match => `
//         <div class="card card-body mb-4">
//           <h5 class="text-success"><strong>${match.name}</strong></h5>
//           <small class="mb-2">${match.address}, ${match.city}, ${match.state} ${match.zip}</small>
//           <small class="mb-2">${match.phone}</small>
//           <small class="mb-2 text-success"><strong>${match.directParentName} | ${match.topParentName}</strong></small>
//           <span class="badge badge-success"><h6 class="mt-2"><strong>${match.gpoName} - ${match.gpoID}</strong></h6></span>
//         </div>
//         `
//       )
//       .join('');

//     const vizientHTML = matches
//       .filter(match => match.gpoName === 'Vizient')
//       .map(
//         match => `
//         <div class="card card-body mb-4">
//           <h5 class="text-danger"><strong>${match.name}</strong></h5>
//           <small class="mb-2">${match.address}, ${match.city}, ${match.state} ${match.zip}</small>
//           <small class="mb-2">${match.phone}</small>
//           <small class="mb-2 text-danger"><strong>System: ${match.systemName} | ${match.systemID}</strong></small>
//           <small class="mb-2 text-danger">AM: ${match.accountManager} | ${match.accountManagerEmail}</small>
//           <span class="badge badge-danger"><h6 class="mt-2"><strong>${match.gpoName} - ${match.gpoID}</strong></h6></span>
//         </div>
//         `
//       )
//       .join('');

//     const hpgHTML = matches
//       .filter(match => match.gpoName === 'HPG')
//       .map(
//         match => `
//         <div class="card card-body mb-4">
//           <h5 class="text-info"><strong>${match.name}</strong></h5>
//           <small class="mb-2">${match.address}, ${match.city}, ${match.state} ${match.zip}</small>
//           <small class="mb-2 text-info"><strong>AO: ${match.accountOwner} | AM: ${match.ctAccountManager}</strong></small>
//           <span class="badge badge-info"><h6 class="mt-2"><strong>${match.gpoName} - ${match.gpoID}</strong></h6></span>
//         </div>
//         `
//       )
//       .join('');

//     matchList.innerHTML = premierHTML;
//     matchList.insertAdjacentHTML('beforeend', vizientHTML);
//     matchList.insertAdjacentHTML('beforeend', hpgHTML);
//   } else {
//     matchList.innerHTML = `
//       <div class="alert alert-dismissible alert-danger">
//       <h6 class="alert-heading font-weight-bold mt-2">
//         Op! No matches. Please try another search. 🙂
//       </h6>
//       </div>
//     `;
//   }
// };

// // Get GPO Members from json on page load
// window.addEventListener('DOMContentLoaded', getGpoMembers);
// // Filter GPO Members on each input to search
// // search.addEventListener('input', () => searchGPOMembers(search.value));
// searchButton.addEventListener('click', () => searchGPOMembers(search.value));
