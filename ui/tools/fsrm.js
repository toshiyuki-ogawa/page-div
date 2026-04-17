import process from 'node:process'
import fs from 'node:fs/promises'
import path from 'node:path'


/**
 * show help message
 */
function showHelp() {
  const scriptName = path.basename(process.argv[1])
  const msg = `${scriptName} [OPTIONS] FILE or DIRECTORIES ....
-h,--help         show this message.
-r,--recursive    remove items recursive.
-f,--force        force to remove items.
`
  process.stdout.write(msg)
}

/**
 * parse command line options
 */
function parseOption() {
  
  const result = { 
    recursive: false,
    force: false
  }

  let idx
  for (idx = 2; idx < process.argv.length; idx++) {
    const arg = process.argv[idx]
    if ('-r' == arg || '--recursive' == arg) {
      result.recursive = true
    } else if ('-f' == arg || '--force' == arg) {
      result.force = true
    } else if ('-h' == arg || '--help' == arg) {
      result.showHelp = true
    } else if ('--' == arg) {
      idx++
      break
    } else {
      break
    }
  }
  if (idx < process.argv.length) {
    result.items = process.argv.slice(idx)
  }
  return result
}

/**
 * main procedure
 */
async function mainProc(options) {
  if (options.items) {
    const rmOptions = {
      recursive: options.recursive,
      force: options.force
    }
    let idx
    for (idx = 0; idx < options.items.length; idx++) {
      const item = options.items[idx]
      await fs.rm(item, rmOptions) 
    }
  }
}


(async ()=>{
  const options = parseOption()
  if (!options.showHelp) {
    await mainProc(options)
  } else {
    showHelp()
  }
})()

// vi: se ts=2 sw=2 et:
