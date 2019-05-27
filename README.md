
# DTE Energy Bridge Connect
If you are a customer of DTE, or any other energy company that uses the Powerley Energy Bridge product, this script will allow you to connect to the Energy Bridge over MQTT to read real-time energy usage data and log that data to the console from which this script is run. See Compatible Products section below for known products that use the Powerley Energy Bridge.

## Installing
First clone this repository onto your local machine.
```sh
git clone git@github.com:timothyf/dte-eb-connect.git
```
Rename `.env.sample` to `.env` and replace `EP_IP`, `EB_PASSWORD`, and `EB_CLIENT_ID`
```sh
npm install
```

## Usage
This following commands will attempt to connect to your Energy Bridge using MQTT. Be sure that you are running this while on the same local network that your Energy Bridge is running on.

#### Read instantanous energy usage
```sh
npm run start:instant
```
This will subscribe to instantanous energy readings and print to the console real-time energy usage approximately every 2-3 seconds.

-------------------------------------------------------
#### Read periodic energy usage
```sh
npm start
```
Or
```sh
npm run start:summation
```
This will subscribe to summation energy readings and print to the console real-time energy usage approximately every minute.

## Compatible Products
#### DTE Insight
If you are a DTE customer, the product that includes the Energy Bridge is called DTE Insight. You can download the Insight mobile app, and request the Energy Bridge here:
https://www.newlook.dteenergy.com/wps/wcm/connect/dte-web/insight/insight-app

-------------------------------------------------------
#### AEP Ohio
If you are an AEP Ohio customer, the product that includes the Energy Bridge is called It's Your Power. You can download the It's Your Power mobile app, and request the Energy Bridge here:
https://itsyourpowerohio.com/

## License
Copyright 2019 Timothy Fisher

`dte-eb-connect` is licensed under the MIT License.
See the LICENSE file for details.
