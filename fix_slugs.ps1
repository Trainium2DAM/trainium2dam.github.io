# Convertir archivos en docs/
Get-ChildItem -Path "docs" -Recurse -Filter "*.md" | ForEach-Object {
    $newName = $_.FullName -replace '\.md$', '.mdx'
    Rename-Item -Path $_.FullName -NewName (Split-Path $newName -Leaf)
    Write-Host "✅ Convertido: $($_.FullName) -> $newName"
}

# Convertir archivos en i18n/
if (Test-Path "i18n") {
    Get-ChildItem -Path "i18n" -Recurse -Filter "*.md" | ForEach-Object {
        $newName = $_.FullName -replace '\.md$', '.mdx'
        Rename-Item -Path $_.FullName -NewName (Split-Path $newName -Leaf)
        Write-Host "✅ Convertido: $($_.FullName) -> $newName"
    }
}

Write-Host "`n🎉 Conversión completada!"