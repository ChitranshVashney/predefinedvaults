const fs = require("fs");
const Moralis = require("moralis").default;
const { eth } = require("./newvault");
const { error } = require("console");
async function vaultdetails() {
  let data = [];
  await Moralis.start({
    apiKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImExYjhmNjE0LTczNmMtNGY4NS1hODE4LTBkYTg1NmMwZjYyOCIsIm9yZ0lkIjoiMjkzNjc5IiwidXNlcklkIjoiMzAwNTE5IiwidHlwZUlkIjoiOGQ1MzRiOTUtNDJkZS00MjAxLThkNjUtNzc5ZDM3OTE0NGIzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODYyMjIzOTcsImV4cCI6NDg0MTk4MjM5N30.eqF4vyLycWpYR7jV8KB8vbwThXFiNGTCgf3oB3-If4E",
  });
  async function details(address) {
    try {
      const response = await Moralis.EvmApi.token.getTokenPrice({
        chain: "0x1",
        include: "percent_change",
        address: address,
      });
      //   console.log(response.raw);
      return response.raw;
    } catch (e) {
    }
  }
  for (i in eth) {
    try {
      let a = await details(eth[i].address.toLowerCase());
      let obj = {};
      let coinObj = [];
      let obj1 = {};
      obj1["coinLogo"] = a.tokenLogo;
      obj1["coinName"] = a.tokenName;
      obj1["coinPrice"] = a.usdPrice;
      obj1["vaultPerc"] = 100;
      obj1["coinSymbol"] = a.tokenSymbol;
      obj1["coinAddress"] = a.tokenAddress;
      coinObj.push(obj1);
      obj["vaultId"] = 200 + i;
      obj["vaultName"] = a.tokenName;
      obj["vaultAddress"] = a.tokenAddress;
      obj["vaultSymbol"] = a.tokenSymbol;
      obj["vaultPrice"] = a.usdPrice;
      obj[
        "vaultDescription"
      ] = `Smart contract address of this token is ${a.tokenAddress}`;
      obj["vaultBuytype"] = "Market Driven";
      obj["vaultStrategy"] = "Aggressive";
      obj["vaultRebalancing"] = true;
      obj["vaultHoldterm"] = "Short";
      obj["vaultProvider"] = "LiFi";
      obj["vaultCoins"] = coinObj;
      obj["vaultStatus"] = true;
      obj["chainID"] = "1";
      obj["tradeable"] = 1;
      obj["createdBy"] = null;
      obj["modifiedBy"] = null;
      obj["createdAt"] = "2023-12-14T11:26:56.000Z";
      obj["updatedAt"] = "2023-12-14T11:26:56.000Z";
      data.push(obj);
    } catch (error) {
      continue;
    }
  }
  console.log(data);
  return data;
}
async function det() {
  let data = await vaultdetails();
  console.log(data);

  // Convert the data to a JSON string
  const jsonData = JSON.stringify(data, null, 2);

  // Specify the file path
  const filePath = "output.json";

  // Write the JSON data to the file
  fs.writeFile(filePath, jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file has been written successfully.");
    }
  });
}
det();
