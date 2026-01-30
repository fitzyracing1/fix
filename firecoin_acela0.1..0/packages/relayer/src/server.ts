import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ethers } from "ethers";
import path from "path";
import fs from "fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
app.use(cors());
app.use(express.json());

const RPC_URL = process.env.RPC_URL || process.env.SEPOLIA_RPC_URL || "http://127.0.0.1:8545";
const PRIVATE_KEY = process.env.SUBSIDY_PRIVATE_KEY || process.env.PRIVATE_KEY || "";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || process.env.VITE_CONTRACT_ADDRESS || "";
const PORT = Number(process.env.PORT || 8787);

if (!PRIVATE_KEY) {
  console.error("Missing SUBSIDY_PRIVATE_KEY/PRIVATE_KEY in .env");
}
if (!CONTRACT_ADDRESS) {
  console.error("Missing CONTRACT_ADDRESS/VITE_CONTRACT_ADDRESS in .env");
}

// Load ABI from contracts artifacts or web abi
function loadAbi(): any {
  const localAbiCandidates = [
    path.resolve(process.cwd(), "../contracts/artifacts/contracts/FireCoin.sol/FireCoin.json"),
    path.resolve(process.cwd(), "../web/src/abi/FireCoin.json")
  ];
  for (const p of localAbiCandidates) {
    if (fs.existsSync(p)) {
      const json = JSON.parse(fs.readFileSync(p, "utf-8"));
      return json.abi || json;
    }
  }
  throw new Error("FireCoin ABI not found. Ensure artifacts or web abi exists.");
}

const abi = loadAbi();
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY, provider) : undefined;

app.get("/health", async (_req, res) => {
  try {
    const net = await provider.getNetwork();
    res.json({ ok: true, chainId: Number(net.chainId) });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.post("/mine-for", async (req, res) => {
  try {
    const { beneficiary } = req.body as { beneficiary: string };
    if (!wallet) return res.status(400).json({ ok: false, error: "Missing relayer wallet" });
    if (!beneficiary || !ethers.isAddress(beneficiary)) {
      return res.status(400).json({ ok: false, error: "Invalid beneficiary" });
    }
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
    const tx = await contract.mineFor(beneficiary);
    const receipt = await tx.wait();
    res.json({ ok: true, txHash: tx.hash, status: receipt.status });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.post("/mine", async (_req, res) => {
  try {
    if (!wallet) return res.status(400).json({ ok: false, error: "Missing relayer wallet" });
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
    const tx = await contract.mine();
    const receipt = await tx.wait();
    res.json({ ok: true, txHash: tx.hash, status: receipt.status });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

// Simple buy endpoint: mints tokens to beneficiary. Requires owner key.
// Intended for testnet/demo use only; add your own auth/rate limits.
app.post("/buy", async (req, res) => {
  try {
    const { beneficiary, amount } = req.body as { beneficiary: string; amount: string };
    if (!wallet) return res.status(400).json({ ok: false, error: "Missing relayer wallet" });
    if (!beneficiary || !ethers.isAddress(beneficiary)) {
      return res.status(400).json({ ok: false, error: "Invalid beneficiary" });
    }
    const amt = amount ? amount : "0";
    const value = ethers.parseUnits(amt, 18);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
    const tx = await contract.mint(beneficiary, value);
    const receipt = await tx.wait();
    res.json({ ok: true, txHash: tx.hash, status: receipt.status });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.listen(PORT, () => {
  console.log(`Relayer listening on http://localhost:${PORT}`);
});
