import requireDir from 'require-dir';
import path from 'path';
requireDir(path.join(__dirname, 'gulp', 'tasks'), { recurse: true });
