
/**
 * application root
 */
let AppRoot: string | null = null

/**
 * load application root
 */
export async function loadAppRoot(): Promise<string | null> {

  const reqPaths = [
    'root.txt',
    'root.php'
  ]
  let result = null
  for (let path of reqPaths) {
    const fetchRes = await fetch(path)
    if (fetchRes.ok) {
      result = await fetchRes.text()
      result = result.trim()
      break
    }
  }
  return result
}

/**
 * get application root
 */
export async function getAppRoot(): Promise<string | null> {
  if (!AppRoot) {
    AppRoot = await loadAppRoot()
  }
  return AppRoot ?? '/'
}


// vi: se ts=2 sw=2 et:
