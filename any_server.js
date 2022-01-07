/** @param {NS} ns **/
export async function main(ns) {
  // Test Script

  var target = ns.args[0];
  var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
  var securityThres = ns.getServerMinSecurityLevel(target) + 5;

  while (true) {
    if (ns.getServerSecurityLevel(target) > securityThres) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}
