import React from "react";
import { BadPayInvoicePage } from "./PayInvoicePage";
import { BadInvoicesPage } from "./InvoicesPage";

export function BadDashboard({ page }: { page: "PAY" | "INVOICES" }) {
  return (
    <div className="row">
      <div className="card">
        <h2>BAD • UI</h2>
        <p className="small">
          Todo mezclado (UI + lógica + llamadas). Intencional para la práctica.
        </p>

        {page === "PAY" ? <BadPayInvoicePage /> : <BadInvoicesPage />}
      </div>

      <div className="card">
        <h2>Qué está “mal”</h2>
        <ul className="small">
          <li>Estado del servidor a mano (useEffect + useState).</li>
          <li>Lógica de validación en el componente.</li>
          <li>Acoplamiento directo al API.</li>
          <li>XSS: render HTML sin sanitizar (INV-002 dispara alert).</li>
        </ul>
        <div className="hr" />
        <p className="small">
          Cambia a <b>GOOD</b> para ver el refactor y que siga funcionando.
        </p>
      </div>
    </div>
  );
}
