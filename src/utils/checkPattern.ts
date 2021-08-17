import * as tp from '@saber2pr/ts-compiler';

const getMatchedFromContent = (pattern: string, content: string) => {
  const reg = new RegExp(pattern, 'g');
  let res = reg.exec(content);
  const match: {
    name: string;
    index: number;
    matches: RegExpExecArray;
  }[] = [];
  while (res) {
    match.push({
      name: res[0],
      index: reg.lastIndex,
      matches: res,
    });
    res = reg.exec(content);
  }
  return match;
};

export const checkPattern = async (path: string, pattern: string) => {
  const files = await tp.walkFile(path, (entry) =>
    /\.ts$|\.tsx$|\.js$|\.jsx$|\.jsbundle$/.test(entry.path),
  );
  return files.map((node) => ({
    ...node,
    matchs: getMatchedFromContent(pattern, node.content),
  }));
};
