const path = require(`path`);
const DottedMap = require("dotted-map").default;

const CURRENT_LOCATION = [44.89, 6.64]; // lat, lng

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const Home = path.resolve(`src/components/Home/index.js`);

  const map = new DottedMap({
    height: 100,
    grid: "diagonal",
    region: {
      lat: { min: 30, max: 66 },
      lng: { min: -27.261267, max: 46 },
    },
  });

  const [lat, lng] = CURRENT_LOCATION;
  map.addPin({
    lat,
    lng,
    svgOptions: { color: "#fffcf2", radius: 0.4 },
  });

  const svg = map.getSVG({
    radius: 0.22,
    color: "#423B38",
    shape: "circle",
    backgroundColor: "#020300",
  });

  createPage({
    path: `/`,
    component: Home,
    context: {
      svg,
    },
  });
};
