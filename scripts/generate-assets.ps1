Add-Type -AssemblyName System.Drawing

$public = Join-Path $PSScriptRoot '..\public'
$public = [System.IO.Path]::GetFullPath($public)

function New-Graphics($bitmap) {
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    return $graphics
}

$card = [System.Drawing.Bitmap]::new(1200, 630)
$graphics = New-Graphics $card
$graphics.Clear([System.Drawing.Color]::FromArgb(11, 11, 11))
$line = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(54, 52, 48), 2)
$graphics.DrawRectangle($line, 34, 34, 1132, 562)
$accent = [System.Drawing.Brushes]::Tan
$mono = [System.Drawing.Font]::new('Consolas', 18, [System.Drawing.FontStyle]::Regular)
$name = [System.Drawing.Font]::new('Georgia', 76, [System.Drawing.FontStyle]::Italic)
$role = [System.Drawing.Font]::new('Arial', 28, [System.Drawing.FontStyle]::Regular)
$small = [System.Drawing.Font]::new('Consolas', 15, [System.Drawing.FontStyle]::Regular)
$cream = [System.Drawing.Brushes]::WhiteSmoke
$muted = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(160, 157, 152))
$graphics.DrawString('MANISH  /  PORTFOLIO', $mono, $accent, 88, 92)
$graphics.DrawString('Manish', $name, $cream, 82, 210)
$graphics.DrawString('React.js Developer  &  Cybersecurity Trainee', $role, $muted, 90, 335)
$graphics.DrawLine($line, 90, 432, 1110, 432)
$graphics.DrawString('BUILDING FOR THE WEB  /  MAKING IT SAFER', $small, $muted, 90, 474)
$graphics.DrawString('manish-portfolio-six-hazel.vercel.app', $small, $accent, 90, 535)
$card.Save((Join-Path $public 'og-image.png'), [System.Drawing.Imaging.ImageFormat]::Png)

$iconBitmap = [System.Drawing.Bitmap]::new(180, 180)
$iconGraphics = New-Graphics $iconBitmap
$iconGraphics.Clear([System.Drawing.Color]::FromArgb(9, 9, 9))
$stroke = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(154, 171, 176), 4)
$iconGraphics.DrawEllipse($stroke, 5, 5, 170, 170)
$letter = [System.Drawing.Font]::new('Georgia', 102, [System.Drawing.FontStyle]::Italic)
$format = [System.Drawing.StringFormat]::new()
$format.Alignment = [System.Drawing.StringAlignment]::Center
$format.LineAlignment = [System.Drawing.StringAlignment]::Center
$iconGraphics.DrawString('M', $letter, $cream, [System.Drawing.RectangleF]::new(0, 10, 180, 160), $format)
$iconBitmap.Save((Join-Path $public 'apple-touch-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)

$smallIcon = [System.Drawing.Bitmap]::new(32, 32)
$smallGraphics = New-Graphics $smallIcon
$smallGraphics.DrawImage($iconBitmap, 0, 0, 32, 32)
$handle = $smallIcon.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($handle)
$stream = [System.IO.File]::Create((Join-Path $public 'favicon.ico'))
$icon.Save($stream)
$stream.Dispose()

foreach ($object in @($graphics, $line, $mono, $name, $role, $small, $muted, $card, $iconGraphics, $stroke, $letter, $format, $iconBitmap, $smallGraphics, $smallIcon, $icon)) {
    if ($null -ne $object) { $object.Dispose() }
}
