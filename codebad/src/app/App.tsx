import React, { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BadDashboard } from "../bad/BadDashboard";
import { GoodDashboard } from "../good/GoodDashboard";

type Mode = "BAD" | "GOOD";
type Page = "PAY" | "INVOICES";

export function App() {
  const [mode, setMode] = useState<Mode>("BAD");
  const [page, setPage] = useState<Page>("PAY");

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <div className="head">
          <div>
            <div className="badge">
              <span className="mono">AT&T Billing Frontend</span>
              <span>•</span>
              <span className={mode === "BAD" ? "err" : "ok"}>{mode}</span>
            </div>
            <div className="small" style={{ marginTop: 6 }}>
              Cambia entre BAD y GOOD para comparar el refactor sin perder funcionalidad.
            </div>
          </div>

          <div style={{ width: 220 }}>
            <label>Modo</label>
            <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
              <option value="BAD">BAD (incorrecto)</option>
              <option value="GOOD">GOOD (refactor)</option>
            </select>
          </div>
        </div>

        <div className="tabs">
          <button className={`tab ${page === "PAY" ? "tabActive" : ""}`} onClick={() => setPage("PAY")}>
            Pago de factura
          </button>
          <button className={`tab ${page === "INVOICES" ? "tabActive" : ""}`} onClick={() => setPage("INVOICES")}>
            Mis facturas
          </button>
        </div>

        <div className="hr" />

        {mode === "BAD" ? (
          <BadDashboard page={page} />
        ) : (
          <GoodDashboard page={page} />
        )}
      </div>
    </QueryClientProvider>
  );
}
