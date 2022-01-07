/** @param {NS} ns **/
export async function main(ns) {
   ns.disableLog("disableLog");
   ns.disableLog("getPurchasedServers");
   ns.disableLog("getServerRequiredHackingLevel");
   ns.disableLog("getHackingLevel");
   ns.disableLog("sleep");
   var servers = []; //servers is an array of each server connected to the home network
   var target = [];
   var scripts = ['brutessh', 'ftpcrack', 'relaysmtp', 'httpworm', 'sqlinject'];
   var childservers = [];
   var purchasedservers = [];
   //Initialize
   function arrayRemove(arr, value) {
      return arr.filter(function (ele) {
         return ele != value;
      }
      );
   }

   function scanTarget(servtarget) {
      var purchasedservers = ns.getPurchasedServers();
      var servers = (ns.scan(servtarget));
      purchasedservers.forEach(function (item, index, array) {
         servers = arrayRemove(servers, item);
         //ns.print(item, index);
      });
      return arrayRemove(servers, "darkweb")
   }

   //servers = scanTarget("home")

   servers.push("home");
   //while program is on
   while (true) {

      //await ns.sleep(3000)
      //list all servers in main server pool
      ns.print("☠☠☠☠☠☠☠☠☠INITIATE MAIN LOOP☠☠☠☠☠☠☠☠☠☠☠");
      //initial loop that sets which main server in server pool to check
      //continues until iterations of loops is greater than length of number of servers in main server pool
      for (var i = 0; i < (servers.length); i++) {
         //skip checking if main server to be checked is home again
         if (servers[i] == "null" || servers[i] == "undefined") {
            ns.print("Skip Server: ", servers[i])
            continue;
         }
         //next server in total server array marked for target and the child servers of target are put into childservers array
         ns.print("☣ " + servers[i] + " ☣");

         target[0] = (servers[i]);

         childservers = scanTarget(target[0]);

         ns.print(target[0] + "<---------------------(TARGET)");
         //first nested loop that selects the first server in the child server pool to be checked against every already aquired server in the server pool
         //continues until there are no more child servers to be checked then returns to initial loop to target the next main server
         cs = 0;
         for (var ms = 0, cs; cs < childservers.length; cs++) {
            ms = 0;
            ns.print("gathering child servers of target for ", (cs + 1), " times")
            //await ns.sleep(3000)
            ns.print("☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰");
            ns.print(" child collection: ", "(", target[0], ")>>", childservers);
            ns.print("☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱ ", (cs + 1), "/", (servers.length), " ||")
            // checks if the current child server array pos is greater than the array itself
            if (cs > childservers.length)
               ns.print("childserver posistion target greater than available childserver posistions");
            else {
               //second nested loop that checks the current targeted child server against every main server to add or reject-
               //-new child servers to the server pool and return to first nested loop to check the next child server to be checked
               for (var ms = ms, cs = cs; ms <= servers.length; ms++) {
                  ns.print("||", childservers[cs], "||============||", servers[ms], "||");
                  // if the child server being checked is; not home, not null, not a duplicate and the loop is at the end of checking the current-
                  //-childserver against every main server in the server pool then it is added to an array of new child servers and those are added to the main server array
                  if (ns.getServerRequiredHackingLevel(childservers[cs]) <= ns.getHackingLevel()
                     && (childservers[cs]) != "home"
                     && childservers[cs] != "null"
                     && childservers[cs] != servers[ms]
                     && ms == servers.length) {
                     ns.print(" !!!!PASS!!!!")
                     servers[ms] = (childservers[cs])
                     ns.print(" ADDED - ", childservers[cs])
                     await ns.sleep(1000)
                     ns.print("♫♫♫♫♫♫♫♫♫♫♫♫♫♫ PLUGGIN' IN ♫♫♫♫♫♫♫♫♫♫♫♫♫")
                     /*scripts.forEach(function (item, index, array) {
                          servers = arrayRemove(servers, item);
                          if (ns.fileExists(item+".exe", "home") == false) {
                            ns.print("Script unavailable: ", item);
                          } else {
                             ns.print("Starting script: ", item);
                             eval(item("childservers[cs]"));
                             ns.print("Starting end script: ", item);
                          }
                          //ns.print(item, index);
                     });
                     */

                     if (ns.fileExists("brutessh.exe", "home") == true) { ns.brutessh(childservers[cs]); }
                     if (ns.fileExists("ftpcrack.exe", "home") == true) { ns.ftpcrack(childservers[cs]); }
                     if (ns.fileExists("relaysmtp.exe", "home") == true) { ns.relaysmtp(childservers[cs]); }
                     if (ns.fileExists("httpworm.exe", "home") == true) { ns.httpworm(childservers[cs]); }
                     if (ns.fileExists("sqlinject.exe", "home") == true) { ns.sqlinject(childservers[cs]); }
                     if (ns.getServerNumPortsRequired(childservers[cs]) <= 5) {
                        ns.nuke(childservers[cs]);
                     }
                     //installBackdoor(childservers[cs]); //wait till later game to initialize
                     //ifs that check invalid childservers and rejects them back to checking the next child server to be checked
                     if (ns.hasRootAccess(childservers[cs]) == true) {
                        ns.print(childservers[cs], " HAS BEEN cracked");
                        if (ns.getServerMaxMoney(childservers[cs]) == 0) {
                           //installBackdoor(childservers[cs]);
                           ns.print("Broke ass no money havin ass server")
                           break;
                        }
                        //MIN SERVER SIZE TO INTERACT WITH |||||| SET THIS HIGHER MID GAME RUN TO PREVENT LESS PROFITABLE SERVERS FROM CLUTTERING ACTIVE SCRIPTS ||||||
                        if (ns.getServerMaxRam(childservers[cs]) <= 4) {
                           ns.print("server ram too small");
                           ns.kill("any_server.script", childservers[cs]);
                           break;
                        }

                        //copy/run hack and stabalize scripts on non invalid childservers
                        else {
                           if (ns.fileExists("any_server.script", childservers[cs]) == false) { await ns.scp("any_server.script", "home", childservers[cs]); }
                           if (ns.scriptRunning("any_server.script", childservers[cs]) == false) {
                              //ns.exec("any_server.script", childservers[cs], Math.floor((((ns.getServerMaxRam(childservers[cs])) - (ns.getServerUsedRam(childservers[cs])))) / ns.getScriptRam("any_server.script") ), childservers[cs]);
                              ns.exec("any_server.script", childservers[cs], Math.floor((((ns.getServerMaxRam(childservers[cs])) - (ns.getServerUsedRam(childservers[cs])))) / ns.getScriptRam("any_server.script")), "joesguns");
                           }
                        }
                     }
                     else {
                        ns.print(childservers[cs], " HAS NOT been cracked")
                     }
                  }
                  if (childservers[cs] == "home") {
                     ns.print("skip home")
                     break;
                  }
                  if (childservers[cs] == "darkweb") {
                     ns.print("skip darkweb")
                     break;
                  }
                  if (childservers[cs] == servers[ms]) {
                     ns.print("is duplicate")
                     break;
                  }
                  if (childservers[cs] == "null") {
                     ns.print("is null")
                     break;
                  }
                  if (ns.getServerRequiredHackingLevel(childservers[cs]) > ns.getHackingLevel()) {
                     ns.print("CHILD SERVER LEVEL TOO HIGH / GIT GUD")
                     break;
                  }
                  else
                     continue;
               }
            }
         }
         await ns.sleep(1000);
      }
   }
}
