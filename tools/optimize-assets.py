"""Optional asset optimization. Requires Pillow; originals and main logo are untouched."""
from pathlib import Path
from urllib.parse import unquote
from hashlib import sha256
import json
from PIL import Image, ImageOps
root=Path(__file__).resolve().parent.parent
content=root/'content.js'
data=json.loads(content.read_text(encoding='utf-8').removeprefix('window.NEXAGEN_CONTENT = ').strip().removesuffix(';'))
destination=root/'assets'/'optimized'
destination.mkdir(exist_ok=True)
before=after=optimized=0
for logo in data['logos']:
    original=logo.get('imageOriginal',logo['image'])
    source_image=logo.get('imageTransparent',original)
    source=root/unquote(source_image)
    before+=source.stat().st_size
    name=sha256(source_image.encode()).hexdigest()[:16]+'.webp'
    output=destination/name
    with Image.open(source) as image:
        image=ImageOps.exif_transpose(image).convert('RGBA')
        image.thumbnail((720,480),Image.Resampling.LANCZOS)
        image.save(output,'WEBP',lossless=True,method=6)
    if output.stat().st_size<source.stat().st_size*0.8:
        logo.setdefault('imageOriginal',original)
        logo['image']='assets/optimized/'+name
        after+=output.stat().st_size
        optimized+=1
    else:
        after+=source.stat().st_size
        output.unlink()
content.write_text('window.NEXAGEN_CONTENT = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
(root/'qa'/'asset-optimization.json').write_text(json.dumps({'optimizedClientLogos':optimized,'originalBytes':before,'servedBytes':after,'savedBytes':before-after,'mainLogoUnchanged':True,'originalFilesRetained':True},indent=2))
print(f'{optimized} client logos optimized: {before:,} -> {after:,} bytes. Originals retained.')
