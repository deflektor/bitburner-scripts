/** @param {NS} ns **/
export async function main(ns) {
	let delayTime = ns.args[0] || 1000;
	let thresholdMultiplier = ns.args[1] || 1; //Bigger threshold, the less it spends

	ns.disableLog("disableLog");
	ns.disableLog("sleep");

	while (true) {
		let ownedNodes = ns.hacknet.numNodes();
		let minValue = ns.hacknet.getPurchaseNodeCost();
		let nodeIndex = ownedNodes;
		let upgradeType = -1; //-1 -> purchase, 0 -> level, 1 -> ram, 2 -> core

		for (let i = 0; i < ownedNodes; i++) {
			let upgrades = [
				ns.hacknet.getLevelUpgradeCost(i, 1),
				ns.hacknet.getRamUpgradeCost(i, 1),
				ns.hacknet.getCoreUpgradeCost(i, 1)
			];

			let value = Math.min.apply(Math, upgrades);
			if (value < minValue) {
				minValue = value;
				nodeIndex = i;
				upgradeType = upgrades.indexOf(value);
			}
		}

		await waitForMoney(ns, minValue, delayTime, thresholdMultiplier);
		switch (upgradeType) {
			case -1:
				ns.hacknet.purchaseNode();
				ns.print("Buying Node");
				break;
			case 0:
				ns.hacknet.upgradeLevel(nodeIndex, 1);
				ns.print("Node " + nodeIndex + " ADD Level");
				break;
			case 1:
				ns.hacknet.upgradeRam(nodeIndex, 1);
				ns.print("Node " + nodeIndex + " ADD Ram");
				break;
			case 2:
				ns.hacknet.upgradeCore(nodeIndex, 1);
				ns.print("Node " + nodeIndex + " ADD Core");
				break;
		}

		await ns.sleep(1);
	}
}

async function waitForMoney(ns, targetMoney, delayTime, thresholdMultiplier) {
	while (ns.getPlayer().money / thresholdMultiplier < targetMoney) {
		await ns.sleep(delayTime);
	}
}
