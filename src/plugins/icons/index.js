import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faDesktop, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import FontAwesomeIcon from "./font-awesome-icon.vue";
 
library.add(fas, faTwitter, faInstagram, faDesktop, faTicketAlt);
 
export { FontAwesomeIcon };