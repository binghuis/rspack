/** @type {import('../..').TErrorCaseConfig} */
module.exports = {
	description: "Testing proxy methods on warnings: test shift&unshift",
	options() {
		return {
			entry: "./require.main.require",
			plugins: [
				compiler => {
					compiler.hooks.afterCompile.tap(
						"test shift and unshift",
						compilation => {
							compilation.warnings.shift();
							compilation.warnings.unshift(new Error("test unshift"));
						}
					);
				}
			]
		};
	},
	async check(diagnostics) {
		expect(diagnostics).toMatchInlineSnapshot(`
		Object {
		  "errors": Array [],
		  "warnings": Array [
		    Object {
		      "message": "  ⚠ Error: test unshift\\n  │     at xxx\\n  │     at xxx\\n  │     at xxx\\n  │     at xxx\\n  │     at xxx\\n  │     at xxx\\n",
		      "moduleTrace": Array [],
		      "stack": "Error: test unshift\\n    at Object.fn (<cwd>packages/rspack-test-tools/tests/errorCases/warning-test-shift.js:<line>:<col>)\\n    at next (<cwd>node_modules/.pnpm/@rspack+lite-tapable@1.0.1/node_modules/@rspack/lite-tapable/dist/index.js:<line>:<col>)\\n    at AsyncSeriesHook.callAsyncStageRange (<cwd>node_modules/.pnpm/@rspack+lite-tapable@1.0.1/node_modules/@rspack/lite-tapable/dist/index.js:<line>:<col>)\\n    at AsyncSeriesHook.callAsync (<cwd>node_modules/.pnpm/@rspack+lite-tapable@1.0.1/node_modules/@rspack/lite-tapable/dist/index.js:<line>:<col>)\\n    at <cwd>packages/rspack/dist/index.js:<line>:<col>\\n    at <cwd>packages/rspack/dist/index.js:<line>:<col>",
		    },
		  ],
		}
	`);
	}
};
