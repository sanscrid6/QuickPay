export type Input = {
  label: string;
  name: string;
  type: 'text' | 'date' | 'number';
};

export type ServiceNode = {
  body: string;
  description: string;
  serviceId: string;
  id: string;
  title: string;
  userId: string;
};

export type FolderNode = {
  folders?: FolderNode[];
  id: string;
  title: string;
  services?: ServiceNode[];
};

export type Tree = FolderNode[];

export type Node = FolderNode | ServiceNode;
