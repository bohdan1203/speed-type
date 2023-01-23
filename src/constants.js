export const TEXTS_URL = (id) =>
  `https://speed-type-auth-default-rtdb.europe-west1.firebasedatabase.app/texts${
    id ? "/" + id : ""
  }.json`;

export const RESULTS_URL = (id) =>
  `https://speed-type-auth-default-rtdb.europe-west1.firebasedatabase.app/results${
    id ? "/" + id : ""
  }.json`;
