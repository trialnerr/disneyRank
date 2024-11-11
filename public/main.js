const thumbUps = Array.from(document.getElementsByClassName('fa-thumbs-up'));
const thumbsDown = Array.from(document.getElementsByClassName('fa-thumbs-down'));
const trashCans = Array.from(document.querySelectorAll('.fa-trash'));


thumbUps.forEach(function (element, i) {
  element.addEventListener('click', function () {

    const name = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText.trim();
    const song = this.parentNode.parentNode.parentNode.parentNode.childNodes[3].innerText.trim();
    console.log({ name, song })
    fetch('likeMovie', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        song
      }),
    })
      .then((response) => {
        if (response.ok) return response.text();
        else console.error(`error: status: ${response.status}, statusText: ${response.statusText}`);
      })
      .then((data) => {
        window.location.reload(true);
      });
  });
});

trashCans.forEach(function (element, i) {
  element.addEventListener('click', function () {
    const ancestor = this.parentNode.parentNode.parentNode;
    const name =
      ancestor.childNodes[1].innerText.trim();
    const song =
      ancestor.childNodes[3].innerText.trim();

    fetch('delete', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        song,
      }),
    })
      .then((response) => {
        if (response.ok) return response.text();
        else
          console.error(
            `error: status: ${response.status}, statusText: ${response.statusText}`
          );
      })
      .then((data) => {
         window.location.reload(true);
      });
  });
});


thumbsDown.forEach(function (element) {
  element.addEventListener('click', function () {
    const name =
      this.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText.trim();
    const song =
      this.parentNode.parentNode.parentNode.parentNode.childNodes[3].innerText.trim();
    console.log({ name, song });

    fetch('dislike', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        song,
      }),
    })
      .then((response) => {
        if (response.ok) return response.text();
        else
          console.error(
            `error: status: ${response.status}, statusText: ${response.statusText}`
          );
      })
      .then((data) => {
        window.location.reload(true);
      });
  });
});
