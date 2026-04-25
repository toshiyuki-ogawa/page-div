
/**
 * get document text
 */
export async function getDocumentText(
  docPath: string): Promise<string | null> {

  const searchParams = new URLSearchParams()
  searchParams.append('doc', docPath)
  const reqPaths = [
    docPath,
    `document.php?${searchParams.toString()}`
  ]

  let result = null
  for (let reqPath of reqPaths) {
    const fetchRes = await fetch(reqPath, {
      headers: {
        'Content-Type': 'plain/text'
      }
    })
    if (fetchRes.ok) {
      result = fetchRes.text()
      break 
    }
  }
  return result
}

// vi: se ts=2 sw=2 et:
