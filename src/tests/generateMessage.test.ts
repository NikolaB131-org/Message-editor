import { Template } from '../hooks/useSectionsTree';
import { VariablesObject } from '../MessagePreview';
import { generateMessage } from '../utils/generateMessage';

describe('generateMessage', () => {
  describe('Base template', () => {
    let template: Template;
    let variables: VariablesObject;

    beforeEach(() => { // resets to default state before each test
      template = {
        availableId: 3,
        rootSection: {
          firstPart: 'Hello {firstname}!\n\nI just went through your profile and I would love to join your network!\n',
          lastPart: '\n\nJake\nSoftware Developer\njakelennard911@gmail.com',
        },
        sections: {
          id: 1,
          ifBlock: { firstPart:'{company}' },
          thenBlock: {
            firstPart: 'I know you work at {company}',
            middlePart: {
              id: 2,
              ifBlock: { firstPart: '{position}' },
              thenBlock: { firstPart: ' as {position}.' },
              elseBlock: { firstPart: ', but what is your role?' },
            },
            lastPart: ' :)',
          },
          elseBlock: { firstPart: 'Where do you work at the moment?' },
        },
      };

      variables = {
        firstname: 'Bill',
        lastname: 'Gates',
        company: 'Bill & Melinda Gates Foundation',
        position: 'Co-chair',
      };
    });


    test('With 4/4 variables', () => {
      const expectedMessage = `Hello Bill!

I just went through your profile and I would love to join your network!
I know you work at Bill & Melinda Gates Foundation as Co-chair. :)

Jake
Software Developer
jakelennard911@gmail.com`;

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('With 3/4 variables', () => {
      variables.position = '';

      const expectedMessage = `Hello Bill!

I just went through your profile and I would love to join your network!
I know you work at Bill & Melinda Gates Foundation, but what is your role? :)

Jake
Software Developer
jakelennard911@gmail.com`;

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('With 2/4 variables', () => {
      variables.company = '';
      variables.position = '';

      const expectedMessage = `Hello Bill!

I just went through your profile and I would love to join your network!
Where do you work at the moment?

Jake
Software Developer
jakelennard911@gmail.com`;

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });
  });


  describe('Complex template', () => {
    let template: Template;
    let variables: VariablesObject;

    beforeEach(() => { // resets to default state before each test
      template = {
        availableId: 4,
        rootSection: {
          firstPart: 'Hello {firstname}!\n\n',
          lastPart: '\n\nBest regards,\nJake',
        },
        sections: {
          id: 1,
          ifBlock: { firstPart: '{company}' },
          thenBlock: {
            firstPart: '{company} is good. ',
            middlePart: {
              id: 2,
              ifBlock: { firstPart: '{position}' },
              thenBlock: { firstPart: 'And you are {position}.' },
              elseBlock: { firstPart: 'I dont know your position.' },
            },
          },
          elseBlock: {
            middlePart: {
              id: 3,
              ifBlock: { firstPart: '{position}' },
              thenBlock: { firstPart: 'I dont know much about your company, but you work as {position}' },
              elseBlock: { firstPart: 'I dont know anything about you :)' },
            },
          },
        },
      };

      variables = {
        firstname: 'Nick',
        company: 'Skype',
        position: 'Developer',
      };
    });


    test('With all variables', () => {
      const expectedMessage = `Hello Nick!

Skype is good. And you are Developer.

Best regards,
Jake`;

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('Without {company} variable', () => {
      variables.company = '';

      const expectedMessage = `Hello Nick!

I dont know much about your company, but you work as Developer

Best regards,
Jake`;

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('Without {position} variable', () => {
      variables.position = '';

      const expectedMessage = `Hello Nick!

Skype is good. I dont know your position.

Best regards,
Jake`;

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('Without {company} and {position} variables', () => {
      variables.company = '';
      variables.position = '';

      const expectedMessage = `Hello Nick!

I dont know anything about you :)

Best regards,
Jake`;

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });
  });


  describe('Validation', () => {
    test('Empty value of variable', () => {
      const template: Template = {
        availableId: 1,
        rootSection: { firstPart: 'You are {firstname}', lastPart: '!' },
      };
      const variables: VariablesObject = {
        firstname: '',
      };

      const expectedMessage = 'You are !';

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('Name of variable differs from default variable names', () => {
      const template: Template = {
        availableId: 1,
        rootSection: { firstPart: 'Your salary is {salary}', lastPart: '.' },
      };
      const variables: VariablesObject = {
        salary: '5000',
      };

      const expectedMessage = 'Your salary is 5000.';

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('Excess variables dont affect anythig', () => {
      const template: Template = {
        availableId: 1,
        rootSection: { firstPart: 'Hello {firstname}', lastPart: '!' },
      };
      const variables: VariablesObject = {
        firstname: 'Nick',
        salary: '5000',
        friends: '2',
      };

      const expectedMessage = 'Hello Nick!';

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('Missing variables acts like text', () => {
      const template: Template = {
        availableId: 1,
        rootSection: { firstPart: 'Hello {firstname}', lastPart: '!' },
      };
      const variables: VariablesObject = {};

      const expectedMessage = 'Hello {firstname}!';

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('Symbols acts like text', () => {
      const template: Template = {
        availableId: 1,
        rootSection: { firstPart: 'Hello {firstname} ', lastPart: '7+1=8}{(312){321},.' },
      };
      const variables: VariablesObject = {
        firstname: 'Nick',
      };

      const expectedMessage = 'Hello Nick 7+1=8}{(312){321},.';

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('Outer curly braces acts like text', () => {
      const template: Template = {
        availableId: 1,
        rootSection: { firstPart: 'Hello {first{salary}name} ', lastPart: '!' },
      };
      const variables: VariablesObject = {
        firstname: 'Nick',
        salary: '5000',
      };

      const expectedMessage = 'Hello {first5000name} !';

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });


    test('Curly braces in variable acts like text', () => {
      const template: Template = {
        availableId: 1,
        rootSection: { firstPart: 'Hello {firstname}', lastPart: '!' },
      };
      const variables: VariablesObject = {
        firstname: '{Nick}',
        Nick: 'nick',
      };

      const expectedMessage = 'Hello {Nick}!';

      expect(generateMessage(template, variables)).toBe(expectedMessage);
    });
  });
});
