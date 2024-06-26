let printNewlineFlag = false;
const INDENT_SPACE = 3;

/** @param {NS} ns **/
export async function main(ns) {
    let home = new Object();
    let nodeMap = new Map();
    home.name = ns.args[0] ? ns.args[0] : "home";
    home.parent = null;
    home.neighbors = ns.scan(home.name);
    nodeMap.set(home.name, home);
    crawl(ns, home, nodeMap);
    printMap(ns, home, nodeMap, "");
}

/** @param {NS} ns **/
function crawl(ns, node, nodeMap) {
    node.neighbors.forEach(nodeName => {
        if (nodeMap.has(nodeName)) {
            return;
        }
        let newNode = new Object();
        newNode.name = nodeName;
        newNode.parent = node;
        newNode.neighbors = ns.scan(newNode.name);
        nodeMap.set(newNode.name, newNode);
        crawl(ns, newNode, nodeMap);
    });
}

/** @param {NS} ns **/
function printMap(ns, node, nodeMap, indent) {
    ns.tprintf(indent + "%s%s%s%s", node.name, ns.hasRootAccess(node.name) ? "(Y)" : "(N)", " Money: ", Math.round(ns.getServerMoneyAvailable(node.name)));
    nodeMap.delete(node.name);
    indent = adjustIndent(indent, node, nodeMap);
    if (printNewlineFlag) {
        printIndent(ns, indent, node);
    }

    node.neighbors.forEach(adjacentName => {
        if (nodeMap.has(adjacentName)) {
            printMap(ns, nodeMap.get(adjacentName), nodeMap, indent);
        }
    });
}

/** @param {NS} ns **/
function printIndent(ns, indent, node) {
    if (node.neighbors.length > 1) {
        ns.tprintf(indent + "|");
    }
}

function adjustIndent(indent, node, nodeMap) {
    for (let i = 0; i < INDENT_SPACE; i++) {
        if (i === 0 && hasMoreSiblings(node, nodeMap)) {
            indent += "|";
        } else {
            indent += " ";
        }
    }
    return indent;
}

function hasMoreSiblings(node, nodeMap) {
    let hasSiblings = false;
    if (node.parent === null) {
        return hasSiblings;
    }
    node
        .parent
        .neighbors
        .forEach(adjacent => {
            if (nodeMap.has(adjacent)) {
                hasSiblings = true;
            }
        });
    return hasSiblings;
}
