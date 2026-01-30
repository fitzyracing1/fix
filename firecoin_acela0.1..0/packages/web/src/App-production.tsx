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

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 800, margin: "0 auto" }}>
      <h1>🔥 FireCoin</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        A mineable ERC20 cryptocurrency on Ethereum
      </p>

      <div style={{ marginBottom: 24, padding: 16, backgroundColor: "#f5f5f5", borderRadius: 8 }}>
        {contractDisabled && (
          <div style={{ padding: 12, marginBottom: 12, background: "#fff3cd", borderRadius: 6, border: "1px solid #f0ad4e" }}>
            <strong>Contract address missing.</strong> Please ensure the app is built with VITE_CONTRACT_ADDRESS set.
          </div>
        )}
        <div style={{ marginBottom: 8, fontSize: 14, color: "#444" }}>
          <div><strong>Contract:</strong> {contractAddrValid ? contractAddress : "(not set)"}</div>
          <div><strong>Chain ID:</strong> {chainId ?? "unknown"}</div>
        </div>
        {isConnected ? (
          <div>
            <div style={{ marginBottom: 8 }}>
              <strong>Connected:</strong> {address}
            </div>
            <button
              onClick={() => disconnect()}
              style={{
                padding: "8px 16px",
                backgroundColor: "#666",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div>
            <p><strong>Connect Wallet to Start:</strong></p>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                style={{
                  padding: "10px 20px",
                  margin: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                {connector.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {hash && (
        <div style={{ marginBottom: 24, padding: 16, backgroundColor: "#d4edda", borderRadius: 8 }}>
          <p><strong>Transaction Hash:</strong> {hash}</p>
          {isConfirming && <p>⏳ Waiting for confirmation...</p>}
          {isSuccess && <p>✅ Transaction confirmed!</p>}
        </div>
      )}
      
      {error && (
        <div style={{ marginBottom: 24, padding: 16, backgroundColor: "#f8d7da", borderRadius: 8 }}>
          <p><strong>Error:</strong> {error.message}</p>
        </div>
      )}

      {isConnected && (
        <>
          <div style={{ marginBottom: 24, padding: 16, backgroundColor: "#e7f3ff", borderRadius: 8 }}>
            <h3>🪙 Mine FireCoin</h3>
            <p>Click to mine new FireCoin tokens (gas required)</p>
            <button
              onClick={mine}
              disabled={isPending}
              style={{
                padding: "12px 24px",
                backgroundColor: "#ff6b35",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: isPending ? "not-allowed" : "pointer",
                opacity: isPending ? 0.6 : 1,
              }}
            >
              {isPending ? "Mining..." : "⛏️ Mine"}
            </button>
          </div>

          <div style={{ marginBottom: 24, padding: 16, backgroundColor: "#fff3cd", borderRadius: 8 }}>
            <h3>💸 Transfer FireCoin</h3>
            <input
              type="text"
              placeholder="Recipient address (0x...)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 12,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 12,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={transfer}
              disabled={isPending}
              style={{
                padding: "12px 24px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: isPending ? "not-allowed" : "pointer",
                opacity: isPending ? 0.6 : 1,
              }}
            >
              {isPending ? "Sending..." : "Send"}
            </button>
          </div>

          <div style={{ marginBottom: 24, padding: 16, backgroundColor: "#d1ecf1", borderRadius: 8 }}>
            <h3>🏦 Mint (Owner Only)</h3>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 12,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={mint}
              disabled={isPending}
              style={{
                padding: "12px 24px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: isPending ? "not-allowed" : "pointer",
                opacity: isPending ? 0.6 : 1,
              }}
            >
              {isPending ? "Minting..." : "Mint"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
