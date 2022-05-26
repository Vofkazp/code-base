export interface Code {
  title: string;
  description: string;
  codeBlock: CodeBlock[];
}

export interface CodeBlock {
  id: number;
  title: string;
  code: string;
  isDeleted: boolean;
}
