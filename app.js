const express = require("express");

const app = express();

const stores = [
	{ storeId: 1111, service: 1 },
	{ storeId: 2222, service: 2 },
	{ storeId: 3333, service: 3 },
	{ storeId: 4444, service: 4 }
];

let whichService = 1;

const serviceCounter = () => {
	whichService === 4 ? (whichService = 1) : ++whichService;
};

const storeIdRouter = (reqStoreId, res) => {
	const isStoreIdNew = stores.filter(store => {
		let currentCheck = store.storeId;
		if (reqStoreId === currentCheck) {
			return currentCheck;
		}
	});
	console.log(isStoreIdNew, "isStoreIdNew after filter");
	if (isStoreIdNew.length < 1) {
		stores.push({ storeId: reqStoreId, service: whichService });
		res.status(201).json({
			message: "new storeId",
			storeId: reqStoreId,
			service: whichService
		});
		serviceCounter();
	} else {
		res.status(200).json({
			message: "storeId is known",
			store: isStoreIdNew[0]
		});
	}
};

const myLogger = (req, res, next) => {
	let reqStoreId = 0;
	let isQueryOrHeader = false;
	if (req.query.storeId) {
		reqStoreId = Number(req.query.storeId);
		isQueryOrHeader = true;
	} else if (req.header("storeId")) {
		reqStoreId = Number(req.header("storeId"));
		isQueryOrHeader = true;
	}
	if (isQueryOrHeader) {
		storeIdRouter(reqStoreId, res);
		logStoresId();
		isQueryOrHeader = false;
	}
	next();
};

const logStoresId = (req, res) => {
	console.log(stores, "stores");
};

app.use(myLogger);

app.get("/storeId/:id", (req, res) => {
	const reqStoreId = Number(req.params.id);
	storeIdRouter(reqStoreId, res);
	logStoresId();
});

module.exports = app;
