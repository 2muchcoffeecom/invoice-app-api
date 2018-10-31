import { ValidationError } from 'class-validator';


export class ClassError extends Error {
  constructor(errors) {
    if (errors instanceof TypeError) {
      super(errors.message);
    } else {
      const fields = ClassError.getErrors(errors);

      const message = (fields.currentUser || {}).forbidden;

      super(JSON.stringify({
        code: message ? 403 : 422,
        fields,
        message,
      }));
    }
  }

  static getErrors(errors) {
    return errors.reduce((acc, value) => {
      if (value instanceof ValidationError) {
        if (value.constraints) {
          acc[value.property] = value.constraints;
        }
        if (value.children.length) {
          Object.assign(acc, ClassError.getErrors(value.children));
        }
      }
      return acc;
    }, {});
  }
}