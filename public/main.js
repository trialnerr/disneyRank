const thumbUps = Array.from(document.getElementsByClassName('fa-thumbs-up'));
console.log(thumbUps);
// const trashCans = Array.from(document.querySelector('.fa-trash'));

// <ul class="messages">
//     <% for (let i = 0; i < rappers.length; i++){ %>
//       <li class="rapper">
//         <span>Name: <%= rappers[i].name %></span>
//         <span>Birth Date: <%= rappers[i].birthDate %></span>
//         <span>Likes: <%= rappers[i].likes %></span>
//         <span><i class="fa fa-thumbs-up" aria-hidden="true"></i></span>
//       </li>
//     <% } %>
//   </ul>
thumbUps.forEach(function (element, i) {
  element.addEventListener('click', function () {
    console.log(`clicked ${i}`);
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const thumbUp = parseFloat(
      this.parentNode.parentNode.childNodes[5].innerText
    );
    console.log({name, msg, thumbUp})
    fetch('messages', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        msg: msg,
        thumbUp: thumbUp,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        // window.location.reload(true);
      });
  });
});

// trashCans.forEach(function (element) {
//   element.addEventListener('click', function () {
//     const name = this.parentNode.parentNode.childNodes[1].innerText;
//     const msg = this.parentNode.parentNode.childNodes[3].innerText;
//     fetch('messages', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: name,
//         msg: msg,
//       }),
//     }).then(function (response) {
//       window.location.reload();
//     });
//   });
// });

// structure:
//  <li class="message">
//       <span><%= messages[i].name %></span>
//       <span><%= messages[i].msg %></span>
//       <span><%= messages[i].thumbUp %></span>
//       <span><i class="fa fa-thumbs-up" aria-hidden="true"></i></span>
//       <span><i class="fa fa-thumbs-down" aria-hidden="true"></i></span>
//       <span><i class="fa fa-trash" aria-hidden="true"></i></span>
//     </li>
