# Downloading the whole repository

If you manually `nano git-pull.js` from the terminal and copy the [contents of that script](https://raw.githubusercontent.com/alainbryden/bitburner-scripts/main/git-pull.js), you should be able to run it once and download the rest of the files I use. Early-game, many will be useless because they are only enabled by late-game features, but they shouldn't give you too many problems just being there.

# Running scripts

Scripts can mostly be run on their own, but are primarily designed to be orchestrated by `daemon.js`. If you `run daemon.js` from the terminal, it will start several other scripts.

# Customizing Script Behaviour (Basic)
Most scripts are designed to be configured via command line arguments. (Such as using `run host-manager.js --min-ram-exponent 8` to ensure no servers are purchased with less than 2^8 GB of RAM)

Default behaviours are to try to "balance" priorities and give most things an equal share of budget / RAM, but this isn't always ideal, especially in bitnodes that cripple one aspect of the game or the other. You can `nano` to view the script and see what the command line options are, or type e.g. `daemon.js --` (dash dash) and hit `<tab>` to get a pop-up auto-completion list. (Make sure your mouse cursor is over the terminal for the auto-complete to appear.)

Near the top of the initializer for `daemon.js`, there are a list of external scripts that are spawned initially, and periodically. Some of these can be commented out if you would rather not have that script run automatically (for example `work-for-factions` if you would like to manually choose how to spend your "focus" times.) Once you've downloaded this file, you should customize it with the default options you like, and comment out the external scripts you don't want to run.

## Aliases

You may find it useful to set up one or more aliases with the default options you like rather than editing the file itself. (Pro-tip, aliases support tab-auto-completion). I personally use the following aliases:

- `alias git-pull="run git-pull.js"`
  - Makes auto-updating just a little easier.
- `alias start="run daemon.js -v --stock-manipulation --tail"`
  - This way I can just enter `start` in the terminal after each reset, and the rest is handled automatically.
- `alias stop="home; kill daemon.js -v --stock-manipulation; run kill-all-scripts.js"`
- `alias sscan="home; run scan.js"`
  - Makes it a little quicker to run this custom-scan routine, which shows the entire network, stats about servers, and provides handy links for jumping to servers or backdooring them.
- `alias do="run run-command.js"`
  - This lets you run ns commands from the terminal, such as `do ns.getPlayer()`, `do Object.keys(ns)` or `do ns.getServerMoneyAvailable('n00dles')`
- `alias reserve="run reserve.js"`
  - Doesn't save many keystrokes, but worth highlighting this script. You can run e.g. `reserve 100m` to globally reserve this much money. All scripts with an auto-spend component should respect this amount and leave it unspent. This is useful if e.g. you're saving up to buy something (SQLInject.exe, a big server, the next home RAM upgrade), saving money to spend at the casino, etc...
- `alias liquidate="home; run stockmaster.js --liquidate; run spend-hacknet-hashes.js --liquidate;"`
  - Quickly sell all your stocks and hacknet hashes for money so that you can spend it (useful before resetting)
- `alias facman="run faction-manager.js"`
  - Quickly see what augmentations you can afford to purchase. Then use `facman --purchase` to pull the trigger.
- alias buy-daemons="run host-manager.js --run-continuously --reserve-percent 0 --min-ram-exponent 19 --utilization-trigger 0 --tail"
  - This is an example of how to use host-manager to buy servers for you. In this example, we are willing to spend all our current money  (--reserve-percent 0) if it means buying a server with 2^19 GB ram or more (--min-ram-exponent), even if our scripts aren't using any RAM on the network (--utilization-trigger 0), 
- `alias spend-on-ram="run Tasks/ram-manager.js --reserve 0 --budget 1 --tail"`
- `alias spend-on-gangs="run gangs.js --reserve 0 --augmentations-budget 1 --equipment-budget 1 --tail"`
- `alias spend-on-sleeves="run sleeve.js --aug-budget 1 --min-aug-batch 1 --buy-cooldown 0 --reserve 0 --tail"`
  - Useful to run one or more of these (in your own priority order) after you've spent all you can on augmentations, before resetting.
-  alias spend-on-hacknet="run hacknet-upgrade-manager.js --interval 10 --max-payoff-time 8888h --continuous --tail"
  - Essentially spends a lot of money upgrading the hacknet. If it doesn't spend enough, increase the --max-payoff-time even more.
- alias hashes-to-bladeburner="run spend-hacknet-hashes.js --spend-on Exchange_for_Bladeburner_Rank --spend-on Exchange_for_Bladeburner_SP --liquidate --tail"
- alias hashes-to-corp-money="run spend-hacknet-hashes.js --spend-on Sell_for_Corporation_Funds --liquidate --tail"
- alias hashes-to-corp-research="run spend-hacknet-hashes.js --spend-on Exchange_for_Corporation_Research --liquidate --tail"
- alias hashes-to-corp="run spend-hacknet-hashes.js --spend-on Sell_for_Corporation_Funds --spend-on Exchange_for_Corporation_Research --liquidate --tail"
- alias hashes-to-hack-server="run spend-hacknet-hashes.js --liquidate --spend-on Increase_Maximum_Money --spend-on Reduce_Minimum_Security --spend-on-server"
 - Useful to set up hashes to automatically get spent on one or more things as you can afford them. Omit --liquidate if you want to save up hashes to spend yourself, and only want to spend them when you reach capacity to avoid wasting them.
- `alias stock="run stockmaster.js --fracH 0.001 --fracB 0.1 --show-pre-4s-forecast --noisy --tail --reserve 100000000"`
  - Useful in e.g. BN8 to invest all cash in the stock market, and closely track progress. _(Also reserves 100m to play blackjack at the casino so you can build up cash quickly. Pro-tip: Save if you win, and just reload (or soft-reset if you hate save-scumming) when you lose it all to get your money back.)_
- `alias crime="run crime.js --tail --fast-crimes-only"`
  - Start an auto-crime loop. (Requires SF4 a.k.a. Singularity access, like so many of my scripts.)
- `alias work="run work-for-factions.js --fast-crimes-only"`
  - Auto-work for factions. Will also do crime loops as deemed necessary. (Note, daemon will start this automatically as well)
- `alias start-tight="run daemon.js --looping-mode --recovery-thread-padding 30 --cycle-timing-delay 2000 --queue-delay 10 --stock-manipulation-focus --tail --silent-misfires --initial-max-targets 64"`
  - Let this be a hint as to how customizable some of these scripts are (without editing the source code). The above alias is powerful when you are end-of-bn and your hacking skill is very high (8000+), so hack/grow/weaken times are very fast (milliseconds). You can greatly increase productivity and reduce lag by switching to this `--looping-mode` which creates long-lived hack/grow/weaken scripts that run in a loop. This, in addition to the tighter cycle-timing makes them more vulnerable to misfiring (completing out-of-order), but adding recovery thread padding (a multiple on the number of grow/weaken threads to use) can quickly recover from misfires. Note that if you don't yet have enough home-ram to support such a high recovery-thread multiple, you can start lower (5 or 10) then buy more home ram and work your way up.

## Customizing Script Code (Advanced)

I encourage you to make a fork and customize scripts to your own needs / liking. Please don't make a PR back to me unless you truly think it's something all would benefit from. If you fork the repository, you can update the `git-pull.js` source to include your github account as the default, or set an alias that specifies this via command-line (e.g. `alias git-pull="run git-pull.js --github mygitusername --repository bitburner-scripts`). This way you can auto-update from your fork and only merge my latest changes when you're ready.


# Disclaimer

This is my own repository of scripts for playing Bitburner.
I often go to some lengths to make them generic and customizable, but am by no means providing these scripts as a "service" to the Bitburner community.
It's meant as an easy way for me to share code with friends, and track changes and bugs in my scripts.

- If you wish to use my scripts or copy from them, feel free!
- If you think you found a bug in them and want to let me know, awesome!
- Please don't be insulted if you make a feature request, bug report, or pull request that I decline to act on.
While I do like my work to be helpful to others and re-used, I am only willing to put so much effort into customizing it to others' specific needs or whims.
You should fork the code, and start tweaking it the way you want it to behave. That's more in the spirit of the game!

Hit up the Bitburner Discord with any questions: https://discord.gg/Wjrs92b3
Many helpful folks in there are familiar with my scripts or ones similar to them and can address your questions and concerns far quicker than I can.



# SuperStonks
Stock Charts For BitBurner!

BB-VUE IS REQUIRED. GET IT HERE: https://github.com/smolgumball/bb-vue/tree/dev#readme

Instructions: Run wallstreet.js and that's it!  Select a ticker from the drop-down and away you go!

Files Needed:  Just wallstreet.js and wallstreet-data.js.  
autotrader.js is NOT a part of this package.  It is a stand-alone auto-trader that uses
BN8 functions.  

There are 2 version:  Regular and Lite.  Lite version does NOT NEED 4S DATA.  JUST A WSE ACCOUNT.

![Untitled](https://user-images.githubusercontent.com/97868924/150722272-fb7501fa-9a6d-47f5-aea1-fb6a2a3c62e7.png)

Main Version Differences:
-  Lite Version has an Auto-Trader that ONLY WORKS ON THE CURRENTLY LOADED CHART/TICKER.
-  If you do not have BN8 shorting functionality, the auto-trader won't work properly.

BIG UPDATE!!  

Tons of data added to the chart!  More buttons!  Collapsable menus!  NO LONGER HAVE TO CLOSE THE CHART TO OPEN A NEW
ONE!  Load charts at the click of a button!  New features detailed below!

1.  The new ticker box!  Drop down the menu and click a ticker to load the chart!  Super easy!
2.  Position profit has been moved to inside the chart.  It now calculates the average 5min high price.
3.  A new AVG PRICE has been added.  This price is the AVERAGE price in the last 5mins.  Use this to help your entries.
4.  Short position profit and the average 5min low price.
5.  Advanced Positions has been moved to its own dropdown.  Auto-Trader has been moved into the Extra Tools menu.  Safe
Mode is now automatically activated and deactivated with Auto-Trader.

NEW FEATURE!  STOCK CRAWLER!  You can use the Stock Crawler to launch a single probe into the entire market to help find
stocks to go long/short on.  The output will be in the terminal.  Feel free to use it as many times as you'd like, as that
is the main purpose!



ADVANCED POSITION EXPLANATIONS:

Strangle:  Places a Long/Short (Based on forecast/volatility) order for max shares and then places a limit sell 
10% above current price and a limit stop 15% below current price (reversed for short positions).  What does this do?
It strangles the price at your current purchase.  If it moves above or below the strangle, the position closes.

Split:  A simple, yet effective, way to limit losses (and gains) at the expense of exposure.  This places a Long AND
Short order for 50% of available funds/max shares.  You are now split on the stock and covered regardless of direction.
Why would I do this?  Volatility is high and forecast is between 40% and 60%.  Split your order and allow the price to 
move.  If/when the forecast changes, close the long/short (whichever is at a loss) and double down on the other.

Go Long/Short Hedged:  A safer alternative to buying maximum amounts of shares.  What does this do?  Places an Long/Short
order for 75% of max amount and an opposite order for 25% of max amount.  Why would I do that?  It limits your losses in
uncertain markets.  This is a wonderful position to open if volatility is high, or if a stock continues to move against
you even if the forecast is favorable.  Example:  Forecast of 60% Bullish and volatlity of 0.80%.  Go long hedged.  The 
price drops, but forecast stays bullish.  Allow the drop to happen and sell your (small 25%) position for a gain and then 
let the price rebound.

-------------------------------------------------------------------------------------------------------------------------

Update 4:  AUTO-TRADER!  There is now a button at the top of the chart to enable/disable Auto-Trader.
What is Auto-Trader?  Auto-Trader will trade for you, basically.  If the function is enabled, it will
automatically place long or short positions depending on forecast and manage them for you.  You can toggle
it whenever you'd like.


HOW TO MAKE THE MONIES WITH THE CHART:

This is a very primitive wavetrend chart. If you're unfamiliar with those types of indicators in trading securities, then here's a quick rundown. A real wavetrend would collect OHCL (Open High Close Low) data over the history of a stock and find the averages to display its wave. We don't have that luxury since BB's stock market isn't real. There's no historical data to pull from. So, we use a shorter time-frame and focus on quick plays.

By default, the chart collects 5 Minutes of data before scrolling. Would suggest letting your chart run for at least 2-3mins before placing any large trades based on the data. How to read the chart? Wavetrends are quite simple. They do not care about the actual PRICE. The only thing it's measuring is the current price compared to the last 2min and 59sec of data. The chart is dynamic in spacing, in that if there's a large enough movement in the current timeframe, you'll notice it. If the line is above the midpoint in the BULL ZONE, then the current trend is upwards and buying is considered safe. The opposite if the line is below the midpoint. Simple. Do not fight the trend. If it's at the top of the chart in the Bull Zone, don't buy a short position thinking "Oh man, I'll be rich when it crashes!". This isn't a real market. I've watched JGN reach 300k per share in a game session. Speculative trading will ruin your BN8 run, which this is designed for. 

Customization: If you'd like to change any of the settings, edit wallstreet-data.js. The main variables to change are {resolution} and {delay}. Resolution is the overall timeframe of the chart. I have it set to 300 by default (5 minutes). Delay is the delay in tick information. Delay is multiplied by 100, so a setting of 10 is 1 second. 20 is 2 seconds. Setting this below 10 will cause many areas of 'flatness' on the chart. Setting it to 15 or 20 will pull data slower, but give a slightly more 'jagged' chart.

