# AWS Lambda with single whitelist

This lambda function returns Merkle proof using single whitelist.

## Deploy procedure

1. You need to have all addresses that you want to have on a whitelist. Addresses must be in the form of an array. We need to enter them into `prepare/whitelistAddresses.js` file. If you already deployed contract, we can reuse `prepare/whitelistAddresses.js` from contracts repo, it will be exactly same file here.

In my example it looks like this:
```
const whitelistedAddresses = [
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9460A151252F2DCd2E97c3110e1Aa371E124Fa41",
  "0x65BdDece298B6108956bf8c2d0422619105B3b95",
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0x6d393B949579C9bD667CB6EE0FC06ab79088Bd95",
  "0x35F9e6afAEff89A38bd0cB5c7E6B18a54b956115",
  "0xd21277065b30f83185a5d65e50f9f0e532833cb5",
  "0x3d77a01ef9265f8af731367abf5b467641764191",
  "0xd4B399CF7B25dD140559470Cca18E6395645c0b3",
  "0x78e7C4C88d44aD2178a2Cf5cC8883a761996e2E9",
];

module.exports = {
  whitelistedAddresses,
};
```

2. Now run this command to generate leaves:

`node prepare/generateLeaves.js`

This script will create one text file (`leaves.txt`) in `prepare` directory with generated leaves.

3. Open `lambda/leaves.js` and paste leaves from previous step into this file. Asiign contents to `exports.leaves`. It should look something like this:
```
exports.leaves = [
  "8a3552d60a98e0ade765adddad0a2e420ca9b1eef5f326ba7ab860bb4ea72c94",
  "1ebaa930b8e9130423c183bf38b0564b0103180b7dad301013b18e59880541ae",
  "f4ca8532861558e29f9858a3804245bb30f0303cc71e4192e41546237b6ce58b",
  "c9637eed393f827f773cd7122a063f2d491a4112af00ae93888ab045506bfae3",
  "521f5f04c4527aacb13a94519f9b6a5117874e63c856f6add951d91030e62705",
  "04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54",
  "9daf685d879ccad029ac511ab331a9604f04c6667329bcc264ebe38afcc8bf9d",
  "af203869fc8f7625df01a45a791bb93a79a978891234107bd94897058364d401",
  "a46243ea64e27ef38e3916d95071798c95472346312c5609f8e565e0ec0a8d9a",
  "e80a05e79762927398736bfc1d1bad58dbf065c000b4bd42749487dfedd14c8e",
  "c5805f4786f036d2202b05c4528c65b8bb2d83d28c711b8657366e061d93b776",
  "27522ba655b464368071cc8ea269a3d10e87ea2a26cca3d013c58b55180dea23",
];
```

4. Install dependencies in `lambda` directory by running commands:
```
cd lambda
yarn
```

Now you should have `node_modules` directory in `lambda` directory.

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

10. Test Lambda function by adding ?address=someAddress to API endpoint URL.

You can test my Lambda function with this URL:

https://vyy9wvji23.execute-api.us-east-1.amazonaws.com/default/merkle-proof-function

For example if we want to get proof for address "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC":

https://vyy9wvji23.execute-api.us-east-1.amazonaws.com/default/merkle-proof-function?address=0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC

In this exmaple Lambda function will return this:
```
[
    "0x1ebaa930b8e9130423c183bf38b0564b0103180b7dad301013b18e59880541ae",
    "0x6336b25c865cb80c984138362af0af839c3dff755af39369182f2a9e85a91fb0",
    "0xf35061f4a828499380303b6f4e824c0019c2f62441b80768220be1fc313d6cf0",
    "0x5bbf061dfbd327dcf1d6e18cbec26eb55f8fcbf4e2b042afb6706751a884c610"
]
```

For whitelisted address you should receive array with some values in it.
For address that is not whitelisted you should receive empty array.
