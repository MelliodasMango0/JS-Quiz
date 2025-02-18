var characters = [];

//JSON Fetch
fetch('data.json')
  .then((response) => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Data not found");
      } else if (response.status === 500) {
        throw new Error("Server error");
      } else {
        throw new Error("Network response was not ok");
      }
    }
    return response.json();
  })
  .then((data) => {
    characters = data['characters'];
		console.log(characters);
  })
  .catch((error) => {
    console.error("Error:", error);
  });