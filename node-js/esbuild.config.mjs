import path from "node:path";
import chalk from "chalk";
import * as esbuild from "esbuild";
import { spawn } from "node:child_process";

const entryPoints = process.argv.slice(2);

if (entryPoints.length === 0) {
  console.error("Please provide a puzzle to run.");
  process.exit(1);
}

if (entryPoints.length > 1) {
  console.error("Please only provide one puzzle to run.");
  process.exit(2);
}

const [entry] = entryPoints;

const start = {
  name: "dev-loader",
  async setup(build) {
    let child;

    build.onEnd(async (result) => {
      const output = result.outputFiles[0]?.text;

      child?.kill();
      console.clear();

      console.log(chalk.blue.dim("Built at %s"), new Date().toISOString());
      console.log(chalk.dim("---"));
      console.log(chalk.bold.blue(path.dirname(entry)));
      console.log(chalk.dim("---"));
      console.log();

      child = spawn("node", ['-e', output], {
        cwd: path.join(import.meta.dirname, path.dirname(entry)),
				env: { ...process.env, FORCE_COLOR: true }
      });


      child.stdout.pipe(process.stdout);
      child.stdout.on("end", () => {
        console.log();
        console.log(chalk.dim("---"));
        console.log(chalk.dim("Waiting for rebuild..."));
      });
    });
  },
};

const ctx = await esbuild.context({
  entryPoints: [entry],
  write: false,
  bundle: true,
  platform: "node",
  plugins: [start],
});

await ctx.watch();
