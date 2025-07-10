
import { pathWebComponent } from "../utilities.js"
import { admissionsWebComponent } from "../utilities.js";


/*import { unahSidebar } from '{pathWebcomponet}sidebar.mjs'
import { unahFooter } from "../../../assets/components/footer.mjs"
import { unahLoging} from "../../../assets/components/loging.mjs"
import{header} from "../../../assets/components/header.mjs"
import{unahPagination} from "../../../assets/components/pagination.mjs"
import{unahSolicitudesTable} from "../components/solicitudesTable.mjs"
import{unahSolicitudesDetalle} from "../components/solicitudesDetalle.mjs"
*/

/*import { unahSidebar } from `${pathWebComponent}sidebar.mjs`
import { unahFooter } from `${pathWebComponent}footer.mjs`
import { unahLoging} from `${pathWebComponent}loging.mjs`
import{unahHeader} from `${pathWebComponent}header.mjs`
import{unahPagination} from `${pathWebComponent}pagination.mjs`
import{unahSolicitudesTable} from `${admissionsWebComponent}solicitudesTable.mjs`
import{unahSolicitudesDetalle} from `${admissionsWebComponent}solicitudesDetalle.mjs`
 */

const {unahSidebar} = await import (`${pathWebComponent}sidebar.mjs`);
const {unahFooter} = await import (`${pathWebComponent}footer.mjs`);
const {unahLoging} = await import (`${pathWebComponent}loging.mjs`);
const {unahHeader} = await import (`${pathWebComponent}header.mjs`);
const {unahPagination} = await import (`${pathWebComponent}pagination.mjs`);
const {unahSolicitudesTable} = await import (`${admissionsWebComponent}tableRequest.mjs`);
const {unahSolicitudesDetalle} = await import (`${admissionsWebComponent}detailsRequest.mjs`);

customElements.define("unah-sidebar", unahSidebar)
customElements.define("unah-footer", unahFooter)
customElements.define("unah-loging", unahLoging)
customElements.define("display-header", unahHeader)
customElements.define("unah-pagination", unahPagination)
customElements.define("admissions-requests-table", unahSolicitudesTable)
customElements.define("admissions-requests-detalle", unahSolicitudesDetalle)




 

