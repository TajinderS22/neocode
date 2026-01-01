export type FileTree = {
  name: string;
  isDir: boolean;
  content: string | undefined;
  children?: FileTree[] | undefined;
  path?: string | undefined;
};
