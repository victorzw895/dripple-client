import axios from "axios";

export const susolvkaCoords = { lat: -33.9198675, lng: 151.2012775 };

// passing dripple details in marker for google map
const getLocationArray = () => {
  let resultArray = [];
  axios({
    method: "get",
    url: "http://www.localhost:3000/api/dripples.json"
    // headers: { Authorization: token }
  }).then(response => {
    const dripplesArray = response.data;
    // let newArray = [];
    for (let i = 0; i < dripplesArray.length; i++) {
      const dripple = dripplesArray[i];
      const newObject = {
        id: i,
        lat: dripple.latitude,
        lng: dripple.longitude,
        dripple_id: dripple.id,
        title: dripple.title,
        content: dripple.content,
        user: dripple.user_name.name
      };
      resultArray.push(newObject);
    }
  });
  return resultArray;
};

export const markersData = getLocationArray();

// Generate rando points for demo
// export const markersData = [...Array(20)]
//   .fill(0) // fill(0) for loose mode
//   .map((__, index) => ({
//     id: index,
//     lat:
//       susolvkaCoords.lat +
//       0.01 *
//         index *
//         Math.sin((30 * Math.PI * index) / 180) *
//         Math.cos((50 * Math.PI * index) / 180) +
//       Math.sin((5 * index) / 180),
//     lng:
//       susolvkaCoords.lng +
//       0.01 *
//         index *
//         Math.cos(70 + (23 * Math.PI * index) / 180) *
//         Math.cos((50 * Math.PI * index) / 180) +
//       Math.sin((5 * index) / 180)
//   }));
