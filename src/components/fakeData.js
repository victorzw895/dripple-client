import axios from "axios";

export const susolvkaCoords = { lat: -33.9198675, lng: 151.2012775 };

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
      const newObject = {
        id: i,
        lat: dripplesArray[i].latitude,
        lng: dripplesArray[i].longitude
      };
      resultArray.push(newObject);
    }
  });
  console.log(resultArray);
  return resultArray;
};
export const markersData = getLocationArray();

// export const markersData = [...Array(200)]
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
