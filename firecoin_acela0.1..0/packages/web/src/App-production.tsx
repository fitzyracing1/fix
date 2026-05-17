import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { useMemo, useState } from "react";
import abi from "./abi/FireCoin.json";

const contractAddress = (import.meta.env.VITE_CONTRACT_ADDRESS || "") as `0x${string}`;
const contractAddrValid = /^0x[a-fA-F0-9]{40}$/.test(contractAddress);

export default function App() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const [amount, setAmount] = useState("0");
  const [to, setTo] = useState("");

  const contractDisabled = useMemo(() => !contractAddrValid, []);

  async function transfer() {
    if (contractDisabled || !to || !address) return;
    const value = BigInt(Math.floor(Number(amount) * 1e18));
    writeContract({
      address: contractAddress,
      abi,
      functionName: "transfer",
      args: [to as `0x${string}`, value],
    });
  }

  async function mint() {
    if (contractDisabled || !address) return;
    const value = BigInt(Math.floor(Number(amount) * 1e18));
    writeContract({
      address: contractAddress,
      abi,
      functionName: "mint",
      args: [address, value],
    });
  }

  async function mine() {
    if (contractDisabled || !address) return;
    writeContract({
      address: contractAddress,
      abi,
      functionName: "mine",
      args: [],
    });
  }

  const baseScanUrl = contractAddrValid ? `https://basescan.org/address/${contractAddress}` : "#";

  return (
    <>
      <style>{`
        :root {
          --bg: #090f1a;
          --panel: rgba(13, 25, 43, 0.88);
          --panel-strong: #0f1f33;
          --line: rgba(160, 199, 255, 0.28);
          --text: #f2f7ff;
          --muted: #a5bedf;
          --brand: #ff7d2e;
          --brand-2: #ffd16f;
          --ok: #7cffcb;
          --danger: #ff8a8a;
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: "Space Grotesk", "Avenir Next", "Segoe UI", sans-serif;
          color: var(--text);
          background:
            radial-gradient(circle at 20% 18%, rgba(255, 125, 46, 0.3), transparent 42%),
            radial-gradient(circle at 82% 8%, rgba(95, 210, 255, 0.28), transparent 45%),
            linear-gradient(165deg, #070d18 0%, #091325 55%, #060b14 100%);
          min-height: 100vh;
        }

        .app-shell {
          width: min(1100px, calc(100% - 32px));
          margin: 28px auto 48px;
        }

        .hero {
          border: 1px solid var(--line);
          border-radius: 26px;
          padding: 28px;
          background:
            linear-gradient(150deg, rgba(9, 20, 38, 0.95), rgba(15, 29, 51, 0.9));
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
          animation: rise 520ms ease-out both;
        }

        .eyebrow {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          padding: 7px 12px;
          border-radius: 999px;
          font-family: "IBM Plex Mono", "SFMono-Regular", monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid rgba(255, 209, 111, 0.35);
          color: var(--brand-2);
          background: rgba(255, 209, 111, 0.08);
        }

        .title {
          margin: 16px 0 10px;
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
        }

        .subtitle {
          margin: 0;
          color: var(--muted);
          font-size: 1.02rem;
          max-width: 70ch;
          line-height: 1.6;
        }

        .cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .btn {
          border: 0;
          border-radius: 999px;
          padding: 12px 18px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .btn:hover { transform: translateY(-1px); }

        .btn-primary {
          color: #15100b;
          background: linear-gradient(130deg, var(--brand), var(--brand-2));
          box-shadow: 0 12px 30px rgba(255, 125, 46, 0.28);
        }

        .btn-ghost {
          border: 1px solid var(--line);
          color: var(--text);
          background: rgba(10, 19, 34, 0.65);
        }

        .grid {
          margin-top: 18px;
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(12, minmax(0, 1fr));
        }

        .panel {
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 18px;
          background: var(--panel);
          backdrop-filter: blur(5px);
          animation: rise 600ms ease-out both;
        }

        .panel h2 {
          margin: 0 0 10px;
          font-size: 1.15rem;
        }

        .panel p {
          margin: 0;
          color: var(--muted);
          line-height: 1.5;
        }

        .listing-panel { grid-column: span 7; }
        .wallet-panel { grid-column: span 5; }

        .stat-grid {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .stat {
          border: 1px solid rgba(160, 199, 255, 0.16);
          background: var(--panel-strong);
          border-radius: 12px;
          padding: 10px;
        }

        .stat-label {
          font-family: "IBM Plex Mono", "SFMono-Regular", monospace;
          color: var(--muted);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .stat-value {
          margin-top: 6px;
          font-size: 13px;
          word-break: break-all;
        }

        .wallet-list {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .alert {
          margin-top: 10px;
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 14px;
        }

        .alert-ok {
          background: rgba(124, 255, 203, 0.12);
          border: 1px solid rgba(124, 255, 203, 0.32);
          color: var(--ok);
        }

        .alert-danger {
          background: rgba(255, 138, 138, 0.1);
          border: 1px solid rgba(255, 138, 138, 0.3);
          color: var(--danger);
        }

        .actions {
          margin-top: 8px;
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .field {
          width: 100%;
          border: 1px solid rgba(160, 199, 255, 0.3);
          border-radius: 10px;
          padding: 10px 12px;
          color: var(--text);
          background: rgba(8, 16, 30, 0.9);
          margin-top: 8px;
          margin-bottom: 10px;
        }

        .field:focus {
          outline: 2px solid rgba(255, 125, 46, 0.45);
          border-color: rgba(255, 125, 46, 0.4);
        }

        .label {
          font-family: "IBM Plex Mono", "SFMono-Regular", monospace;
          color: var(--muted);
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .small {
          font-size: 12px;
          color: var(--muted);
          margin-top: 8px;
        }

        @media (max-width: 980px) {
          .listing-panel,
          .wallet-panel,
          .actions > * {
            grid-column: span 12;
          }

          .actions {
            grid-template-columns: 1fr;
          }
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <main className="app-shell">
        <section className="hero">
          <div className="eyebrow">FireCoin Listing Hub</div>
          <h1 className="title">Launch-Ready FireCoin Website for Exchanges and Listings</h1>
          <p className="subtitle">
            Everything needed by exchanges, explorers, and listing teams in one page: contract details, token list,
            whitepaper, and on-chain actions.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="/FIRECOIN-WHITEPAPER.md" target="_blank" rel="noreferrer">
              Read Whitepaper
            </a>
            <a className="btn btn-ghost" href="/firecoin-tokenlist.json" target="_blank" rel="noreferrer">
              Token List JSON
            </a>
            {contractAddrValid && (
              <a className="btn btn-ghost" href={baseScanUrl} target="_blank" rel="noreferrer">
                View Contract on BaseScan
              </a>
            )}
          </div>
        </section>

        <section className="grid">
          <article className="panel listing-panel">
            <h2>Listing Profile</h2>
            <p>Key details for listing reviewers and integration engineers.</p>
            <div className="stat-grid">
              <div className="stat">
                <div className="stat-label">Token</div>
                <div className="stat-value">FireCoin (FCOIN)</div>
              </div>
              <div className="stat">
                <div className="stat-label">Network</div>
                <div className="stat-value">Base Mainnet</div>
              </div>
              <div className="stat">
                <div className="stat-label">Chain ID</div>
                <div className="stat-value">{chainId ?? "unknown"}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Contract</div>
                <div className="stat-value">{contractAddrValid ? contractAddress : "Not configured"}</div>
              </div>
            </div>
            {contractDisabled && (
              <div className="alert alert-danger">
                Contract address is not set. Build with VITE_CONTRACT_ADDRESS for live listing details.
              </div>
            )}
          </article>

          <article className="panel wallet-panel">
            <h2>Wallet</h2>
            {!isConnected ? (
              <>
                <p>Connect a wallet to perform on-chain actions.</p>
                <div className="wallet-list">
                  {connectors.map((connector) => (
                    <button
                      key={connector.id}
                      className="btn btn-ghost"
                      onClick={() => connect({ connector })}
                      type="button"
                    >
                      {connector.name}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p>Connected account:</p>
                <div className="stat" style={{ marginTop: 8 }}>
                  <div className="stat-value">{address}</div>
                </div>
                <div className="wallet-list">
                  <button className="btn btn-ghost" onClick={() => disconnect()} type="button">
                    Disconnect
                  </button>
                </div>
              </>
            )}

            {hash && (
              <div className="alert alert-ok">
                Transaction submitted: {hash}
                {isConfirming && <div className="small">Waiting for confirmation...</div>}
                {isSuccess && <div className="small">Confirmed on-chain.</div>}
              </div>
            )}

            {error && <div className="alert alert-danger">Error: {error.message}</div>}
          </article>
        </section>

        {isConnected && (
          <section className="actions">
            <article className="panel">
              <h2>Mine</h2>
              <p>Mint mine rewards according to contract rules.</p>
              <button className="btn btn-primary" onClick={mine} disabled={isPending} type="button">
                {isPending ? "Mining..." : "Mine FireCoin"}
              </button>
            </article>

            <article className="panel">
              <h2>Transfer</h2>
              <label className="label" htmlFor="recipient">Recipient Address</label>
              <input
                id="recipient"
                className="field"
                type="text"
                placeholder="0x..."
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <label className="label" htmlFor="amount-transfer">Amount</label>
              <input
                id="amount-transfer"
                className="field"
                type="number"
                min="0"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button className="btn btn-primary" onClick={transfer} disabled={isPending} type="button">
                {isPending ? "Sending..." : "Send"}
              </button>
            </article>

            <article className="panel">
              <h2>Mint (Owner)</h2>
              <label className="label" htmlFor="amount-mint">Amount</label>
              <input
                id="amount-mint"
                className="field"
                type="number"
                min="0"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button className="btn btn-primary" onClick={mint} disabled={isPending} type="button">
                {isPending ? "Minting..." : "Mint"}
              </button>
              <div className="small">Owner-only contract action.</div>
            </article>
          </section>
        )}
      </main>
    </>
  );
}
