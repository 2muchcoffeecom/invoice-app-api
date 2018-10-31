export class CoreDto {
  protected currentUser: any;
  protected input: any;
  
  constructor(currentUser?) {
    if (currentUser) {
      this.currentUser = currentUser;
    }
  }
  
  protected populateFields(input) {
    for (const key in this) {
      if (input.hasOwnProperty(key)) {
        const value = input[key];
        if (value) {
          this[key] = value;
        } else if (!this[key]) {
          delete this[key];
        }
      }
    }
  }
  
  protected populateNestedField(NestedDto, key) {
    if (!this.input[key]) {
      return;
    }
    const data = this.input[key];
    if (data.length) {
      this[key] = data.map((res) => new NestedDto(res));
    } else {
      this[key] = new NestedDto(this.input[key]);
    }
    
  }
}