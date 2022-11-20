const watch = process.argv.includes("watch");
const minify = process.argv.includes("min");

require("esbuild")
    .build({
        entryPoints: ["src/main.ts"],
        bundle: true,
        platform: "node",
        target: ["node18"],
        watch: watch ? {
            onRebuild: (error, result) => {
                if (error) console.log("watch build errror");
                else console.log("refreshed");
            },
        } : null,
        minify: minify,
        outfile: "puuh.js",
    })
    .then(() => {
        watch ? console.log("watching...") : console.log("done");
    });
