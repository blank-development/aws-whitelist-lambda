# AWS Whitelist Lambda

This lambda function returns Merkle proofs using two whitelists.

## Deploy procedure

1. You need to have all addresses that you want to have in first whitelist and the second whitelist. We need to enter them into `prepare/whitelistAddresses.js` file. If you already deployed contract, we can reuse `prepare/whitelistAddresses.js` from contracts repo, it will be exactly same file here.

In my example it looks like this:
```
const whitelistedAddresses_1 = [
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9460A151252F2DCd2E97c3110e1Aa371E124Fa41",
  "0x65BdDece298B6108956bf8c2d0422619105B3b95",
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0x6d393B949579C9bD667CB6EE0FC06ab79088Bd95",
  "0x35F9e6afAEff89A38bd0cB5c7E6B18a54b956115",
  "0xd21277065b30f83185a5d65e50f9f0e532833cb5",
  "0xd4B399CF7B25dD140559470Cca18E6395645c0b3",
  "0x78e7C4C88d44aD2178a2Cf5cC8883a761996e2E9",
  "0x3b7d556B0377Bfd58Eb50480157f39De4caEFCb7",
  "0x54963F77B1f5b8CB518360B4D535d88f2504732F",
];

const whitelistedAddresses_2 = [
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
  "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
  "0xeF64941E8646148D131efAf55dbCE86D2c6E6Bc0",
  "0x85F8Cd0B173A8B7cC7bb196258A292a9Cc024d0F",
  "0xf55C49C309EC60dC2c183293E990a6f1b1634860",
  "0x608E1d3c2375150eF22806A8eCf5a7A36cb01F11",
  "0xd7Dc45eEBc152A608019e4c2bA5525a61F80f69c",
  "0x3d77a01ef9265f8af731367abf5b467641764191",
  "0x944500e54084206a2c1455F17649BB8266a03977",
  "0x1C892e4516Dc5c46402C1319721Df0Ec3BABECDB",
  "0x7DF1772F72eb74cAeb5479Da321Eec690Bea81b4",
  "0x5B7F0A18AB374ea3A4904a6214872A81d91C0d98",
];

module.exports = {
  whitelistedAddresses_1,
  whitelistedAddresses_2,
};
```

2. Now run this command to generate leaves:

`node prepare/generateLeaves.js`

This script will create two text files (`leaves_1.txt` and `leaves_2.txt`) in `prepare` directory with generated leaves.

3. Open `lambda/leaves.js` and now we need to paste leaves from previous step. Assign contents from `leaves_1.txt` to `exports.leaves_1`, and `leaves_2.txt` to `exports.leaves_2`. 

It should look similar to this:
```
exports.leaves_1 = [
  "8a3552d60a98e0ade765adddad0a2e420ca9b1eef5f326ba7ab860bb4ea72c94",
  "1ebaa930b8e9130423c183bf38b0564b0103180b7dad301013b18e59880541ae",
  "f4ca8532861558e29f9858a3804245bb30f0303cc71e4192e41546237b6ce58b",
  "c9637eed393f827f773cd7122a063f2d491a4112af00ae93888ab045506bfae3",
  "521f5f04c4527aacb13a94519f9b6a5117874e63c856f6add951d91030e62705",
  "04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54",
  "9daf685d879ccad029ac511ab331a9604f04c6667329bcc264ebe38afcc8bf9d",
  "af203869fc8f7625df01a45a791bb93a79a978891234107bd94897058364d401",
  "a46243ea64e27ef38e3916d95071798c95472346312c5609f8e565e0ec0a8d9a",
  "c5805f4786f036d2202b05c4528c65b8bb2d83d28c711b8657366e061d93b776",
  "27522ba655b464368071cc8ea269a3d10e87ea2a26cca3d013c58b55180dea23",
  "a1b1c17794489eaedd939f7b5490d284019ba1edab85d913667de11806b30dbf",
  "5f3e19e5227b611ba7733a291ae0ef9c1d13c0de58cbbb8b6090487ac86e8be7",
];

exports.leaves_2 = [
  "e5c951f74bc89efa166514ac99d872f6b7a3c11aff63f51246c3742dfa925c9b",
  "93230d0b2377404a36412e26d231de4c7e1a9fb62e227b420200ee950a5ca9c0",
  "b6711c87f5d70aa0ec9dcbff648cab4ede7aec7218e4e2fef065f83253fc9108",
  "8e1b359a98a26f4ace0c8f81d43ab3713358c4db263d06e319c447c3ae008fa1",
  "38aa32114eb1e5e0a6433487694c86609a7a6bd8b1c7ff847c9e8a08af6b4860",
  "78b6bb8b12c7431683e4311df023526ffd03ffcc6c70c47faa66294689ebe1c8",
  "5fb55195fbdf04715ab1b4e7eeaceaf6fa713b2dbea9d1d60ff99872b2c31c54",
  "845917970e63d3bc05a26215d138c590f55eac4bccd1314e48ac6f2f534a8416",
  "e80a05e79762927398736bfc1d1bad58dbf065c000b4bd42749487dfedd14c8e",
  "7ab792156233d6b072bc3756e3bba79f6c2d0d7a5a7e06ea25423a178c31beed",
  "1ab2f691bcc6063c36f5f2a4f83a60f2f128c820dfa4ad407478ed841fa18df3",
  "267d1368212ec35dc94ac25b35231b9e904f3605414c27a1dde02f15bc2955af",
  "1058b018e2e3cdf6df7e121005adac23f5de95890bc330e87be4a9fa24ef5aa7",
];
```

4. We need to install dependencies in `lambda` directory by running commands:
```
cd lambda
yarn
```

Now we should have `node_modules` in `lambda` directory.

5. Now ZIP the all contents of `lambda` directory into single ZIP file. Make sure you only zip the contents inside a directory, but not the directory itself.

6. Register account at AWS Amazon and open this [link](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/create/function) to create Lambda function. Fill the details about Lambda function like this:

![1](https://user-images.githubusercontent.com/24723870/168178920-043ae6d8-ea4e-46f1-b8e2-62e98865d302.png)

7. Open 'Code' section and click 'Upload from' and upload ZIP file from step 5.

![2](https://user-images.githubusercontent.com/24723870/161564237-2baf344e-2eff-4735-909a-e7ee8a637af0.png)

8. Open 'Configuration' section and click on 'Create function URL'. 

![2](https://user-images.githubusercontent.com/24723870/168179059-97b98685-9c53-4e29-bc7a-a354ede47eb4.png)

Fill the details like this:

![3](https://user-images.githubusercontent.com/24723870/168179079-cd4d0696-a957-45d6-b990-737cda29415f.png)

In this example I allowed any origin to access this URL (Allow origin: *), but in production you should probably enter URL of web app which will call this lambda function. We can also change this afterwards.

9. Now you can see function URL on main screen which we will use for requests.

![4](https://user-images.githubusercontent.com/24723870/168179139-65748462-7086-4a90-bcb6-7499b071d94e.png)

In my example, function URL is:
https://znsvtnv62wgs267ytblixc3pzq0ovwse.lambda-url.us-east-1.on.aws/

For parameters we need to provide address for which we need merkle proof and phase number. If contract is in first whitelist mint phase then provide "1", if contract is in second whitelist mint phase then provide "2". 

If contract is in public mint phase you can provide any number except "1" or "2", but it would be probably best to use hardcoded empty array from frontend instead of calling AWS Lambda function.

For example I want to get proof for address "0xd7Dc45eEBc152A608019e4c2bA5525a61F80f69c" and contract is currently in second whitelist mint phase, so I need to call this URL:

https://znsvtnv62wgs267ytblixc3pzq0ovwse.lambda-url.us-east-1.on.aws/?address=0xd7Dc45eEBc152A608019e4c2bA5525a61F80f69c&phase=2

For this example Lambda function will return this:
```
[
    "0x5fb55195fbdf04715ab1b4e7eeaceaf6fa713b2dbea9d1d60ff99872b2c31c54",
    "0x6b6405ecca7e3dac39157631bba2cb709690f50f612e9b7f0ef4af09f4f9d5fe",
    "0xa774aa8fd9e9b8ee069034e3dbd74974261ea5e4d21d19c898e1bbfc61b0e96d",
    "0x4a0ea49c632116610ea881ce8f863c747ef97d4800f0c31fa06ffeb4cc81b0d1"
]
```

If address is whitelisted it will return array with some values. If address is not whitelisted you will receive empty array.
