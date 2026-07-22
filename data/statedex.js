// ============================================================================
// STATEDEX — data for the Learnmon: North America experience (StudentHub.jsx)
// ----------------------------------------------------------------------------
// A "Learnmon" is a creature-collecting learning game. Here every U.S. state is
// a collectible Learnmon: catch it by answering a geography question, then its
// card (capital, nickname, region, fun fact) is unlocked in the Statedex.
//
// Content goals: accurate capitals + nicknames, one kid-friendly fun fact per
// state, and a light North America framing (the continent and its three
// largest countries) so the 50 states sit in a bigger geographic picture.
//
// Region grouping follows the widely taught National Geographic five-region
// model (Northeast, Southeast, Midwest, Southwest, West), which covers all 50
// states. The emoji for each state is flavor only — an iconic symbol, animal,
// food, or landmark — while the capitals and facts are the real lesson.
// ============================================================================

// Each state: name, abbr, capital, nickname, emoji (its Learnmon "look"), fact.
export const STATES = [
  // ---- Northeast (11) ----
  { name: "Connecticut", abbr: "CT", capital: "Hartford", region: "northeast", nickname: "The Constitution State", emoji: "🌳", fact: "Connecticut is home to the oldest U.S. newspaper still being printed today." },
  { name: "Delaware", abbr: "DE", capital: "Dover", region: "northeast", nickname: "The First State", emoji: "🐔", fact: "Delaware was the very first state to approve the U.S. Constitution, back in 1787." },
  { name: "Maine", abbr: "ME", capital: "Augusta", region: "northeast", nickname: "The Pine Tree State", emoji: "🦞", fact: "Maine catches more lobster than any other state in the country." },
  { name: "Maryland", abbr: "MD", capital: "Annapolis", region: "northeast", nickname: "The Old Line State", emoji: "🦀", fact: "The Star-Spangled Banner was written in Maryland during the Battle of Baltimore." },
  { name: "Massachusetts", abbr: "MA", capital: "Boston", region: "northeast", nickname: "The Bay State", emoji: "🦃", fact: "The Pilgrims landed at Plymouth, Massachusetts, and held the first Thanksgiving." },
  { name: "New Hampshire", abbr: "NH", capital: "Concord", region: "northeast", nickname: "The Granite State", emoji: "🏔️", fact: "New Hampshire holds the very first presidential primary vote every four years." },
  { name: "New Jersey", abbr: "NJ", capital: "Trenton", region: "northeast", nickname: "The Garden State", emoji: "🍅", fact: "Thomas Edison invented the light bulb and phonograph in his New Jersey lab." },
  { name: "New York", abbr: "NY", capital: "Albany", region: "northeast", nickname: "The Empire State", emoji: "🗽", fact: "The Statue of Liberty has welcomed people to New York Harbor since 1886." },
  { name: "Pennsylvania", abbr: "PA", capital: "Harrisburg", region: "northeast", nickname: "The Keystone State", emoji: "🔔", fact: "The Declaration of Independence was signed in Philadelphia in 1776." },
  { name: "Rhode Island", abbr: "RI", capital: "Providence", region: "northeast", nickname: "The Ocean State", emoji: "🐓", fact: "Rhode Island is the smallest state, but its full official name is the longest." },
  { name: "Vermont", abbr: "VT", capital: "Montpelier", region: "northeast", nickname: "The Green Mountain State", emoji: "🍁", fact: "Vermont makes more maple syrup than any other state." },

  // ---- Southeast (12) ----
  { name: "Alabama", abbr: "AL", capital: "Montgomery", region: "southeast", nickname: "The Yellowhammer State", emoji: "🚀", fact: "The rockets that carried astronauts to the Moon were built in Huntsville, Alabama." },
  { name: "Arkansas", abbr: "AR", capital: "Little Rock", region: "southeast", nickname: "The Natural State", emoji: "💎", fact: "At Crater of Diamonds State Park you can dig for real diamonds and keep what you find." },
  { name: "Florida", abbr: "FL", capital: "Tallahassee", region: "southeast", nickname: "The Sunshine State", emoji: "🐊", fact: "Florida is the only place where alligators and crocodiles live side by side." },
  { name: "Georgia", abbr: "GA", capital: "Atlanta", region: "southeast", nickname: "The Peach State", emoji: "🍑", fact: "Georgia grows so many peaches it earned the nickname the Peach State." },
  { name: "Kentucky", abbr: "KY", capital: "Frankfort", region: "southeast", nickname: "The Bluegrass State", emoji: "🐎", fact: "The Kentucky Derby is the oldest continuously held horse race in the United States." },
  { name: "Louisiana", abbr: "LA", capital: "Baton Rouge", region: "southeast", nickname: "The Pelican State", emoji: "🎷", fact: "Jazz music was born in New Orleans, Louisiana." },
  { name: "Mississippi", abbr: "MS", capital: "Jackson", region: "southeast", nickname: "The Magnolia State", emoji: "🎸", fact: "The mighty Mississippi River gives the state its name and its shape." },
  { name: "North Carolina", abbr: "NC", capital: "Raleigh", region: "southeast", nickname: "The Tar Heel State", emoji: "✈️", fact: "The Wright brothers flew the first airplane at Kitty Hawk, North Carolina, in 1903." },
  { name: "South Carolina", abbr: "SC", capital: "Columbia", region: "southeast", nickname: "The Palmetto State", emoji: "🌴", fact: "Palmetto logs at a fort bounced off cannonballs and helped win a Revolutionary War battle." },
  { name: "Tennessee", abbr: "TN", capital: "Nashville", region: "southeast", nickname: "The Volunteer State", emoji: "🎶", fact: "Nashville, Tennessee is called Music City and is the home of country music." },
  { name: "Virginia", abbr: "VA", capital: "Richmond", region: "southeast", nickname: "The Old Dominion", emoji: "🏛️", fact: "Eight U.S. presidents were born in Virginia, more than any other state." },
  { name: "West Virginia", abbr: "WV", capital: "Charleston", region: "southeast", nickname: "The Mountain State", emoji: "⛰️", fact: "West Virginia is almost entirely covered by mountains and forests." },

  // ---- Midwest (12) ----
  { name: "Illinois", abbr: "IL", capital: "Springfield", region: "midwest", nickname: "The Prairie State", emoji: "🎩", fact: "Abraham Lincoln grew up in Illinois, which proudly calls itself the Land of Lincoln." },
  { name: "Indiana", abbr: "IN", capital: "Indianapolis", region: "midwest", nickname: "The Hoosier State", emoji: "🏎️", fact: "The Indianapolis 500 is one of the most famous car races in the world." },
  { name: "Iowa", abbr: "IA", capital: "Des Moines", region: "midwest", nickname: "The Hawkeye State", emoji: "🌽", fact: "Iowa grows more corn than any other state." },
  { name: "Kansas", abbr: "KS", capital: "Topeka", region: "midwest", nickname: "The Sunflower State", emoji: "🌻", fact: "Kansas is where Dorothy's tornado begins in the story The Wizard of Oz." },
  { name: "Michigan", abbr: "MI", capital: "Lansing", region: "midwest", nickname: "The Great Lakes State", emoji: "🚗", fact: "Michigan touches four of the five Great Lakes and built America's first cars in Detroit." },
  { name: "Minnesota", abbr: "MN", capital: "Saint Paul", region: "midwest", nickname: "The North Star State", emoji: "🛶", fact: "Minnesota is called the Land of 10,000 Lakes — it actually has even more!" },
  { name: "Missouri", abbr: "MO", capital: "Jefferson City", region: "midwest", nickname: "The Show-Me State", emoji: "🌉", fact: "The 630-foot Gateway Arch in St. Louis is the tallest monument in the United States." },
  { name: "Nebraska", abbr: "NE", capital: "Lincoln", region: "midwest", nickname: "The Cornhusker State", emoji: "🌾", fact: "Nebraska's Chimney Rock guided thousands of pioneers along the old Oregon Trail." },
  { name: "North Dakota", abbr: "ND", capital: "Bismarck", region: "midwest", nickname: "The Peace Garden State", emoji: "🦬", fact: "Wild bison roam Theodore Roosevelt National Park in North Dakota." },
  { name: "Ohio", abbr: "OH", capital: "Columbus", region: "midwest", nickname: "The Buckeye State", emoji: "🌰", fact: "Seven U.S. presidents and astronaut Neil Armstrong were all born in Ohio." },
  { name: "South Dakota", abbr: "SD", capital: "Pierre", region: "midwest", nickname: "The Mount Rushmore State", emoji: "🗿", fact: "The faces of four presidents are carved into Mount Rushmore in South Dakota." },
  { name: "Wisconsin", abbr: "WI", capital: "Madison", region: "midwest", nickname: "The Badger State", emoji: "🧀", fact: "Wisconsin makes more cheese than any other state." },

  // ---- Southwest (4) ----
  { name: "Arizona", abbr: "AZ", capital: "Phoenix", region: "southwest", nickname: "The Grand Canyon State", emoji: "🌵", fact: "The Grand Canyon in Arizona is more than a mile deep." },
  { name: "New Mexico", abbr: "NM", capital: "Santa Fe", region: "southwest", nickname: "The Land of Enchantment", emoji: "🎈", fact: "New Mexico hosts the world's largest hot-air balloon festival every fall." },
  { name: "Oklahoma", abbr: "OK", capital: "Oklahoma City", region: "southwest", nickname: "The Sooner State", emoji: "🤠", fact: "Oklahoma has more human-made lakes than any other state." },
  { name: "Texas", abbr: "TX", capital: "Austin", region: "southwest", nickname: "The Lone Star State", emoji: "⭐", fact: "Texas is so big it was once its own country, the Republic of Texas." },

  // ---- West (11) ----
  { name: "Alaska", abbr: "AK", capital: "Juneau", region: "west", nickname: "The Last Frontier", emoji: "🐻‍❄️", fact: "Alaska is the largest state and has Denali, the highest mountain in North America." },
  { name: "California", abbr: "CA", capital: "Sacramento", region: "west", nickname: "The Golden State", emoji: "🎬", fact: "California has both the highest and lowest points in the lower 48 states." },
  { name: "Colorado", abbr: "CO", capital: "Denver", region: "west", nickname: "The Centennial State", emoji: "🎿", fact: "Colorado has more than 50 mountain peaks that rise above 14,000 feet." },
  { name: "Hawaii", abbr: "HI", capital: "Honolulu", region: "west", nickname: "The Aloha State", emoji: "🌺", fact: "Hawaii is the only U.S. state made entirely of islands." },
  { name: "Idaho", abbr: "ID", capital: "Boise", region: "west", nickname: "The Gem State", emoji: "🥔", fact: "Idaho grows about a third of all the potatoes in the United States." },
  { name: "Montana", abbr: "MT", capital: "Helena", region: "west", nickname: "Big Sky Country", emoji: "🏞️", fact: "Montana is called Big Sky Country for its wide, open views." },
  { name: "Nevada", abbr: "NV", capital: "Carson City", region: "west", nickname: "The Silver State", emoji: "🎰", fact: "Nevada's city of Las Vegas is one of the brightest places on Earth at night." },
  { name: "Oregon", abbr: "OR", capital: "Salem", region: "west", nickname: "The Beaver State", emoji: "🦫", fact: "Crater Lake in Oregon is the deepest lake in the United States." },
  { name: "Utah", abbr: "UT", capital: "Salt Lake City", region: "west", nickname: "The Beehive State", emoji: "🐝", fact: "The Great Salt Lake in Utah is so salty that swimmers float easily." },
  { name: "Washington", abbr: "WA", capital: "Olympia", region: "west", nickname: "The Evergreen State", emoji: "🍎", fact: "Washington grows more apples than any other state." },
  { name: "Wyoming", abbr: "WY", capital: "Cheyenne", region: "west", nickname: "The Equality State", emoji: "🌋", fact: "Yellowstone, the world's first national park, is mostly in Wyoming." },
];

// The five regions. `desc` is a kid-friendly one-liner; counts are derived.
export const REGIONS = [
  { key: "northeast", name: "Northeast", emoji: "🍁", color: "#c9a84c", desc: "Colonial history, autumn leaves, and the birthplace of the nation." },
  { key: "southeast", name: "Southeast", emoji: "🐊", color: "#66bb6a", desc: "Warm weather, wetlands, music, and the mighty Mississippi." },
  { key: "midwest", name: "Midwest", emoji: "🌽", color: "#ff9a44", desc: "The Great Lakes, endless farmland, and the heart of the country." },
  { key: "southwest", name: "Southwest", emoji: "🌵", color: "#ff6eb4", desc: "Deserts, canyons, big skies, and cowboy country." },
  { key: "west", name: "West", emoji: "🏔️", color: "#22b8cf", desc: "Mountains, forests, islands, and the tallest peak on the continent." },
];

// Light North America framing so the 50 states sit inside the bigger picture.
export const NORTH_AMERICA = {
  facts: [
    "North America is the third-largest continent on Earth.",
    "It stretches from the icy Arctic in the north to the warm tropics in the south.",
    "It is surrounded by three oceans: the Arctic, Atlantic, and Pacific.",
    "Its three largest countries are Canada, the United States, and Mexico.",
  ],
  countries: [
    { name: "Canada", emoji: "🇨🇦", capital: "Ottawa", note: "The largest country in North America by land, famous for maple leaves and hockey." },
    { name: "United States", emoji: "🇺🇸", capital: "Washington, D.C.", note: "Made up of the 50 states you can collect as Learnmon in this game." },
    { name: "Mexico", emoji: "🇲🇽", capital: "Mexico City", note: "Home to ancient pyramids and one of the biggest cities in the world." },
  ],
};

// Build a multiple-choice question for a state encounter. Types rotate between
// capital, nickname, and abbreviation so repeat visits stay interesting. Wrong
// options are drawn from other states of the same kind, so distractors are
// always plausible (real capitals, real nicknames, real abbreviations).
export function buildQuestion(state, pool, rand = Math.random) {
  const types = [
    { key: "capital", prompt: `What is the capital of ${state.name}?`, get: (s) => s.capital },
    { key: "nickname", prompt: `Which nickname belongs to ${state.name}?`, get: (s) => s.nickname },
    { key: "abbr", prompt: `What is the two-letter abbreviation for ${state.name}?`, get: (s) => s.abbr },
  ];
  const type = types[Math.floor(rand() * types.length)];
  const answer = type.get(state);
  const distractors = pool
    .filter((s) => s.abbr !== state.abbr && type.get(s) !== answer)
    .map((s) => type.get(s));
  // Shuffle distractors and take two.
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  const options = [answer, distractors[0], distractors[1]];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { prompt: type.prompt, options, answer };
}
