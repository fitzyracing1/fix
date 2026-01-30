import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "wagmi";
import { http } from "viem";
import { base } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import App from "./App-production";

// Configure wagmi for Base mainnet
const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    walletConnect({ 
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "default_id"
    }),
  ],
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_RPC_URL || "https://mainnet.base.org"),
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <App />
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
