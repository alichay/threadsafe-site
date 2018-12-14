#!/usr/bin/env node
const fs           = require('fs');
const path         = require('path');
const watch        = require('node-watch');
const sass         = require('node-sass');
const autoprefixer = require('autoprefixer');
const cssnano      = require('cssnano');
const postcss      = require('postcss');
const webpack      = require('webpack');
const browserify   = require('browserify');
const babelify     = require('babelify');
const ncp          = require('ncp');

// This script is a mess.
// Thankfully, it's not used in production at all.
// This *just* compiles/prefixes the sass and compiles the typescript.


let js_file = 'site.js';
let sass_file = 'site.scss';

function compiler(type, process_step) {
	let writing = false;
	let count = 0;
	return () => {
		if(writing) return;
		writing = true;
		count++;
		console.log(`Compiling   ${type}: ${count}`);
		process_step(()=>{
			console.log(`Finished    ${type}: ${count}`);
			writing = false;
		})
	}
}

const compile_js = (js_file)=>{return compiler("Javascript", (cb)=>{

	const { exec } = require('child_process');
	try {
		// This physically hurts me.
		exec('cd js && tsc', (err, stdout, stderr) => {
			console.log(stdout);
			console.log(stderr);
			if(err) {
				console.error(err);
			}

			let stream = fs.createWriteStream('../www/assets/'+js_file, 'utf8');

			stream.on('finish', () => {
				cb();
			});
			stream.on('error', (err) => {
				console.log(err);
				cb();
			});

			let b = browserify('tmpjs/'+js_file, {debug: true})
				.transform(babelify, {
					sourceMapsAbsolute: true,
					presets: ['@babel/preset-env', 'babel-preset-minify']
				}).bundle().pipe(stream);
			b.on('error', (err) => {
				console.log(err);
				cb();
			});
/*
			browserify('tmpjs/'+js_file)
				.transform('babelify', {
					sourceMapsAbsolute: true,
					presets: ['@babel/babili', '@babel/preset-env']
				})
				.bundle()
				.pipe(fs.createWriteStream('../www/assets/'+js_file));
				*/
			/*
			babel.transformFile(path.resolve(__dirname, 'tmpjs/'+js_file),
				{filename: path.resolve(__dirname, 'tmpjs/'+js_file), presets: ['babili', 'react', 'env'], ast: false, sourceMaps: 'inline'}, (err, res)=>{
				if(err) {
					console.error(err);
					cb();
				} else {
					fs.writeFile(`../www/assets/${js_file}`, res.code, cb);
				}
			});
			*/
		});
	} catch(e){}
})};


const compile_sass = (sass_file)=>{return compiler("Stylesheet", (cb)=>{
	sass.render({file: 'sass/'+sass_file, indentType: 'tab', indentWidth: 1}, (err, css)=>{
		if(err) {
			console.log("Stylus error");
			console.warn(err);
			cb();
		} else {
			postcss([ autoprefixer, cssnano ]).process(css.css).then(function (res) {
				
				res.warnings().forEach(function (warn) {
					console.log("PostCSS error");
					console.warn(warn.toString());
				});
				
				fs.writeFile(`../www/assets/${sass_file.replace('scss', 'css')}`, res.css, cb);
			}).catch(err => {
				console.log("PostCSS error");
				console.log("Processed CSS written to sass_js/sass.css for debugging");
				fs.writeFileSync(`./sass.css`, css.css, 'utf8');
				console.warn(err);
				cb();
			});
		}
	});
})};

//watch('js', compile_js('site.js'));
//watch('styl', compile_styl('site.styl'));

if(process.argv[2] != undefined) {
	js_file = process.argv[2] + '.js';
	sass_file = process.argv[2] + '.scss';
}

function setup_watch(name, cb) {
	cb();
	watch(name, cb)
}

setup_watch('js', compile_js(js_file));
setup_watch('sass', compile_sass(sass_file));


// compile_js(js_file)();
// compile_styl(sass_file)();
