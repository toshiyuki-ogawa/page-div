
let fontContents: string | undefined  
/**
 * get noto font true type font url
 */
export async function getNotoFontTTFBinaryString(): Promise<string> {

  const fontUrl = 'fonts/NotoSansJP-Regular.ttf'
  if (!fontContents) {
    const res = await fetch(fontUrl)
    const content = await res.bytes()
    fontContents = content.toBase64()
  }
  return fontContents
}  

// vi: se ts=2 sw=2 et:
