Get-ChildItem -Recurse -Filter *.js |
Where-Object { $_.Name -notlike '*.min.js' } |
ForEach-Object {
    $out = $_.FullName -replace '\.js$', '.min.js'
    npx esbuild $_.FullName --minify --outfile=$out
}
