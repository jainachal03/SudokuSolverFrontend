console.log(" Script loaded ");
const input = document.getElementById("avatar");
input.addEventListener("change", () => {
  uploadFile(input.files[0]);
});
// add event listener
const uploadFile = async (file) => {
  // check file type
  if (
    !["image/jpeg", "image/gif", "image/png", "image/svg+xml"].includes(
      file.type
    )
  ) {
    console.log("Only images are allowed.");
    return;
  }

  // check file size (< 2MB)
  if (file.size > 2 * 1024 * 1024) {
    console.log("File must be less than 2MB.");
    return;
  }

  const fd = new FormData();
  fd.append("files", file);

  // send `POST` request
  let finalboard;

  let url = " http://127.0.0.1:5000/upload";
  let resp = await fetch(url, {
    headers: {},
    method: "POST",
    body: fd,
  })
    .then((result) => {
      console.log("API CALLED", result);
      return result.json();
    })
    .catch((error) => ("Something went wrong!", error));

  board = resp["board"];
  console.log(board);
  if (board != null) {
    const table = document.createElement("table");

    let rows = [];
    for (let i = 0; i < 9; i++) {
      let row = table.insertRow(i);
      rows.push(row);
    }

    const cells = [];
    for (let j = 0; j < rows.length; j++) {
      let elem = rows[j];
      let temp = [];
      for (let k = 0; k < 9; k++) {
        let c = elem.insertCell(k);
        temp.push(c);
      }
      cells.push(temp);
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        cells[i][j].innerHTML = board[i][j];

        cells[i][j].style.border = "1px solid #000";
        cells[i][j].style.margin = "5px 5px 5px 5px";
        cells[i][j].style.font = "25px";
      }
    }

    table.style.border = "1px solid #000";
    document.body.appendChild(table);
    console.log(board);
  }
};
