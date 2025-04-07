export type FloLegalRows = {
  type: string;
  referencedId: string;
};
export type FloLegalOptions = {
  id: number;
  value: string;
};
export type FloLegalAnswercombinations = {
  id?: number;
  answers: { [key: string]: number | boolean | undefined };
};
export type FloLegalExplanation = {
  content: string;
  position: string;
  showImmediately: boolean;
  extraContent: string;
};
export type FloLegalQuestions = {
  id?: string;
  type?: string;
  questionText?: string;
  displayType?: string;
  canBeReUsed?: boolean;
  options?: FloLegalOptions[];
  explanation?: FloLegalExplanation;
};
export type FloLegalOutcomes = {
  id: string;
  title: string;
  name: string;
  type?: string;
  content?: string;
  answercombinations?: FloLegalAnswercombinations[];
  makesEndToRegelhulp?: boolean;
  canBeUsedAsCondition?: boolean;
};
export type FloLegalContent = {
  identifier: string;
  type: string;
  rows: FloLegalRows[];
  questions?: FloLegalQuestions[];
  outcomes?: FloLegalOutcomes[];
  subTables: any[];
  trueLabel: string;
  falseLabel: string;
};
export interface FloLegalFormData {
  type: string;
  identifier: string;
  name: string;
  version: number;
  modifiedDate: string;
  content: FloLegalContent;
}
