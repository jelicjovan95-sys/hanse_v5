$path = "c:\Users\Korisnik\Downloads\hanse_recruitment_V4-20260420T094857Z-3-001\hanse_recruitment_V5\lead card edit.docx"
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($path)
$entry = $zip.GetEntry('word/document.xml')
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()
$xml -replace '<[^>]+>', ' ' -replace '\s+', ' '
