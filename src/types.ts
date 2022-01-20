export type RootStackParamList = {
  Home: undefined;
  List: undefined;
};

export type ListItem = {
  id: number;
  title: string;
};

export type UndoListItem = ListItem & {index: number};
