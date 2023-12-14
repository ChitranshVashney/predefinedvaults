const Moralis = require("moralis").default;
const {eth}=require("./newvault")
const vault=require("./vault.json")
const abi= require("./erc20abi.json")
const {ethers}= require("ethers")


async function details(address){
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth/c386860665c23de6c8a99a6997ad628a47e6bf648bfedf77e0281aac05e3c558');
const contract = new ethers.Contract(
    address,
    abi,
    provider
  );
  const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const totalSupply = ethers.utils.formatUnits(await contract.totalSupply(), decimals);

    console.log(`Name: ${name}`);
    console.log(`Symbol: ${symbol}`);
    console.log(`Decimals: ${decimals}`);
    console.log(`Total Supply: ${totalSupply}`);
    
    try {
      await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImExYjhmNjE0LTczNmMtNGY4NS1hODE4LTBkYTg1NmMwZjYyOCIsIm9yZ0lkIjoiMjkzNjc5IiwidXNlcklkIjoiMzAwNTE5IiwidHlwZUlkIjoiOGQ1MzRiOTUtNDJkZS00MjAxLThkNjUtNzc5ZDM3OTE0NGIzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODYyMjIzOTcsImV4cCI6NDg0MTk4MjM5N30.eqF4vyLycWpYR7jV8KB8vbwThXFiNGTCgf3oB3-If4E"
      });
    
      const response = await Moralis.EvmApi.token.getTokenPrice({
        "chain": "0x1",
        "include": "percent_change",
        "address": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"
      });
    
      console.log(response.raw);
    } catch (e) {
      console.error(e);
    }
}
details("0x2aF1dF3AB0ab157e1E2Ad8F88A7D04fbea0c7dc6")

