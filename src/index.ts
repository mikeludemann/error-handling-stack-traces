const chrome_and_internet_explorer = /^\s*at ([a-zA-Z0-9_]*).*\(?\S+:(\d+):(\d+)\)?/;
const firefox = /(\S+|^)@.*:(\d+):(\d+)/;

export interface Stacks {
  line: number;
  column: number;
  name: string;
  type: FrameType;
  raw: string;
}

export type FrameType = "native" | "";

export function parsingErrorStackTraces(stack: string): Stacks[] {
  const isRegexFirefox = stack.match(firefox);

  return stack
    .split("\n")
    .filter((str, i) => (isRegexFirefox || i > 0) && Boolean(str))
    .map((str) => {
      let line = -1;
      let column = -1;
      let name = "";
      let type: FrameType = "";

      const match = str.match(
        isRegexFirefox ? firefox : chrome_and_internet_explorer
      );

      if (match) {
        if (match.length === 1) {
          type = "native";
        } else {
          type = match[0] || !isRegexFirefox ? "" : "native";
          name = match[1];
          line = +match[2];
          column = +match[3];
        }
      }

      return {
        line,
        column,
        type,
        name,
        raw: str,
      };
    });
}

