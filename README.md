# error-handling-stack-traces

A simple helpful small library to parse and handle the error stack traces

## Information

Supported for different browsers and platforms:

* Firefox
* Chrome
* Edge
* Internet Explorer (IE)
* Node
* ...

## Usage

Install the `errors-handling-stack-traces` package via manager. 

Actual we use only `npm`.

```bash
npm install errors-handling-stack-traces
```

Example code:

```js
import { parsingErrorStackTraces } from 'errors-handling-stack-traces';

function foobar() {
  throw new Error('fail');
}

try {
  foobar();
} catch (error) {
  const parsing = parsingErrorStackTraces(error.stack);
  console.log(parsing);
} finally {
  console.log("End of these code.");
}

  // Logs:
  // [
  //   {
  //     line: 4,
  //     column: 8,
  //     type: '',
  //     name: 'foobar',
  //     raw: '    at foo (/my-project/foo.ts:4:8)'
  //   },
  // ]
```

### Note: 
_The `type` will be the string._
_If the string `"native"`, then native code execution was detected._

## License

MIT

See [the license file](./LICENSE)
