<?php 
function typer($txt) {
	$split = str_split($txt);
	return '<i>' . implode('</i><i>', $split) . '</i>';
}
?><!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		<link rel='stylesheet' href='/assets/site.css'>
	</head>
	<body>
		<canvas id='logo' height='300'>
			<img src='/assets/logo.png'/>
		</canvas>
		<h1 id='welcome' style='opacity: 0;'>
			<?php echo typer('Hello, world!'); ?><br>
			<?php echo typer('I am ') . '<strong>' . typer('threadsafe') . '</strong>' . typer('.'); ?>
		</h1>

		<div id='a-crummy-commercial'>
			<a id='soundcloud' href='//soundcloud.com/threadsafe'>
				<?php echo file_get_contents('assets/soundclout.svg'); ?>
				<span>Follow /threadsafe on soundcloud</span>
			</a><div id='news'>
				<h2>News</h2>
				<span>No news right now, but releases are planned soon!</span>
				<span>To stay up-to-date, follow me on twitter <a href='//twitter.com/alithreadsafe'>@alithreadsafe</a></span>
			</div>
		</div>

		<div id='open-source'>
			<p>
				This site uses two rather important open source projects.
			<p>
				<a href='https://threejs.org/'>Three.js</a>, released under the
				<a href='https://github.com/mrdoob/three.js/blob/dev/LICENSE'>MIT license</a>,
				drives the rendered CRT monitor logo.
				Honestly, this just couldn't have been made without the
				amazing work of the folks working on Three.js.
			</p>
			<p>
				The typeface on most of this site is <a href='http://typeof.net/Iosevka/'>Iosevka</a>,
				an absolutely <i>beautiful</i> monospaced programming font. In fact, it's the font I'm
				writing this website in right now! This font is graciously released under the
				<a href='https://github.com/be5invis/Iosevka/blob/master/LICENSE.md'>SIL Open Font License 1.1</a>.
				This site wouldn't have nearly the same kind of character without this tasteful addition!
				(It's not the best as a body font, like this text here, but it's great for the sparse text the site actually uses)
			</p>
			<p>
				A huge thank you to everyone who's contributed to these projects, as well as any other open source software!
				Honestly, open source is an incredibly beautiful thing that so many people take for granted. Thank you, developers!
			</p>
			<strong>Open Source</strong>
		</div>

		<script src='/assets/site.js'></script>
	</body>
</html>