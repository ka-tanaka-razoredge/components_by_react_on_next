export class Character {
  boilingPoint: string;
  dog: string;
  shs: string[];
  welcomes: string[];
  pleasants: string[];
  unpleasants: string[];
  summary: string[];

  constructor(lop) {
    console.log('---- Character begin ----');
    console.log(lop);
    this.boilingPoint = lop.boilingPoint;
    this.dog = (lop.dog) ?? '';
    this.shs = lop.shs;
    this.welcomes = lop.welcomes;
    this.pleasants = lop.pleasants;
    this.unpleasants = lop.unpleasants;
    this.summary = lop.summary;
    console.log('---- Character end ----');
  }
}