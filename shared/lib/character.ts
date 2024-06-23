export class Character {
  id: number;
  name: string;
  level: number;
  class: string;

  constructor(id: number, name: string, level: number, classType: string) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.class = classType;
  }
}
