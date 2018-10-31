import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { app } from '../../../main';


export function CustomValidateFn(name: string, validateFn, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name,
      propertyName,
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate: (value, args) => validateFn(value, args, args.object, app.get),
        defaultMessage: (validationArguments?: ValidationArguments) => (validationArguments as any).object.customMessage || '',
      },
    });
  };
}
