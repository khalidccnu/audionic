import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KC_URL,
  realm: import.meta.env.VITE_KC_RM,
  clientId: import.meta.env.VITE_KC_CID,
});

export default keycloak;
