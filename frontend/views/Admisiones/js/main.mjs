
import { unahSidebar } from "../../../assets/components/sidebar.mjs"
import{header} from "../../../assets/components/header.mjs"
import{unahPagination} from "../../../assets/components/pagination.mjs"
import{unahSolicitudesTable} from "../components/solicitudesTable.mjs"
import{unahSolicitudesDetalle} from "../components/solicitudesDetalle.mjs"


customElements.define("unah-sidebar", unahSidebar)
customElements.define("display-header", header)
customElements.define("unah-pagination", unahPagination)
customElements.define("admisiones-solicitudes-table", unahSolicitudesTable)
customElements.define("admisiones-solicitudes-detalle", unahSolicitudesDetalle)

 

