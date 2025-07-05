
import { pathWebComponent } from "./utilities.js"
import { admissionsWebComponent } from "./utilities.js";
/*import { unahSidebar } from '{pathWebcomponet}sidebar.mjs'
import { unahFooter } from "../../../assets/components/footer.mjs"
import { unahLoging} from "../../../assets/components/loging.mjs"
import{header} from "../../../assets/components/header.mjs"
import{unahPagination} from "../../../assets/components/pagination.mjs"
import{unahSolicitudesTable} from "../components/solicitudesTable.mjs"
import{unahSolicitudesDetalle} from "../components/solicitudesDetalle.mjs"
*/

const {unahSidebar} = await import (`${pathWebComponent}sidebar.mjs`);
const {unahFooter} = await import (`${pathWebComponent}footer.mjs`);
const {unahLoging} = await import (`${pathWebComponent}loging.mjs`);
const {unahHeader} = await import (`${pathWebComponent}header.mjs`);
const {unahPagination} = await import (`${pathWebComponent}pagination.mjs`);
const {unahSolicitudesTable} = await import (`${admissionsWebComponent}solicitudesTable.mjs`);
const {unahSolicitudesDetalle} = await import (`${admissionsWebComponent}solicitudesDetalle.mjs`);

customElements.define("unah-sidebar", unahSidebar)
customElements.define("unah-footer", unahFooter)
customElements.define("unah-loging", unahLoging)
customElements.define("display-header", unahHeader)
customElements.define("unah-pagination", unahPagination)
customElements.define("admisiones-solicitudes-table", unahSolicitudesTable)
customElements.define("admisiones-solicitudes-detalle", unahSolicitudesDetalle)




 

