const thumbUps = Array.from(document.getElementsByClassName('fa-thumbs-up'));
const trashCans = Array.from(document.querySelectorAll('.fa-trash'));

thumbUps.forEach(function (element, i) {
  element.addEventListener('click', function () {
    // console.log(`clicked ${i}`);
    console.log(this.parentNode.parentNode.parentNode.parentNode.childNodes);
    const name = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText.trim();
    const birthDate = this.parentNode.parentNode.parentNode.parentNode.childNodes[3].innerText.trim();
    console.log({ name, birthDate})
   
    fetch('addLike', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        birthDate
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
    const birthDate =
      ancestor.childNodes[3].innerText.trim();
    console.log({ name, birthDate });

    fetch('deleteRapper', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        birthDate,
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


