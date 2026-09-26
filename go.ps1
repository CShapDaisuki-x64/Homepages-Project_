Get-ChildItem -Recurse -Filter *.js |
Where-Object { $_.Name -notlike '*.js' } |
ForEach-Object {
		$out = $_.FullName -replace '\.js$', '.js'
		npx esbuild $_.FullName --minify-syntax --minify-whitespace --outfile=$out
}
