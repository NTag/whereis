const path = require(`path`);
const DottedMap = require("dotted-map").default;
const levenshtein = require("fast-levenshtein");
const cities = require("all-the-cities");

const MIN_POPULATION = 10_000;

const findLocation = (city, countryCode) => {
  const smallerCities = cities.filter((c) => {
    if (countryCode && c.country !== countryCode) {
      return false;
    }

    return c.population > MIN_POPULATION;
  });
  const citiesWithScore = smallerCities.map((c) => {
    const score = levenshtein.get(c.name, city) - c.population / 5_000_000;
    return {
      name: c.name,
      country: c.country,
      score,
      coords: c.loc.coordinates,
    };
  });
  const sortedCities = citiesWithScore.sort((a, b) => a.score - b.score);

  const [location] = sortedCities;
  console.log(`Location found:`, location);

  const [lng, lat] = location.coords;
  return [lat, lng];
};

const CURRENT_LOCATION = findLocation("Lisbon", "PT");

const getXYFromLatLng = ({ map, point }) => {
  const { height, width } = map.image;

  const originX = `max(0px, calc(0.5 * (100vh * ${width} / ${height} - 100vw)))`;
  const originY = `max(0px, calc(0.5 * (100vw * ${height} / ${width} - 100vh)))`;

  const x = `calc(max(100vw * ${point.x} / ${width}, 100vh * ${point.x} / ${height}) - ${originX})`;
  const y = `calc(max(100vw * ${point.y} / ${width}, 100vh * ${point.y} / ${height}) - ${originY})`;

  return { x, y };
};

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
  const point = map.addPin({
    lat,
    lng,
    svgOptions: { color: "#fffcf2", radius: 0.4 },
  });

  const { x, y } = getXYFromLatLng({ map, point });

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
      point: { x, y },
    },
  });
};
