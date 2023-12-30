# Get Started
Link the gscale lib to the root:
```bash
ln -s ../gscale/src/lib lib
```
Repeat this everytime you add new items.

Build `puuh.js`
```bash
pnpm build
```

Follow the installation instructions from (win-clipboard)[https://github.com/sindresorhus/win-clipboard].

## Example
```bash
node.exe dist/src/main.js c https://genshin.honeyhunterworld.com/eula_051/?lang=EN | clipboard.exe --copy
```

Items print additional information that needs to be filled in and pasted:
```bash
$ node.exe puuh.js i https://genshin.honeyhunterworld.com/i_n104338/?lang=EN https://genshin.honeyhunterworld.com/i_n104339/?lang=EN https://genshin.honeyhunterworld.com/i_n104340/?lang=EN equity | clipboard.exe --copy

Loading https://genshin.honeyhunterworld.com/i_n104338/?lang=EN
Loaded. Parsing html...
Done
Loading https://genshin.honeyhunterworld.com/i_n104339/?lang=EN
Loaded. Parsing html...
Done
Loading https://genshin.honeyhunterworld.com/i_n104340/?lang=EN
Loaded. Parsing html...
Done

Group Entry:
equity: {
    normalizedName: "equity",
    itemIds: [Items.teachings_of_equity, Items.guide_to_equity, Items.philosophies_of_equity],
},

Item Keys:

    | "teachings_of_equity"
    | "guide_to_equity"
    | "philosophies_of_equity"
```