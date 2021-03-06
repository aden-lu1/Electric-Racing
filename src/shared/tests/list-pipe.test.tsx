/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { listPipe, wbsPipe } from '../pipes';
import {
  exampleWorkPackage1,
  exampleWorkPackage2,
  exampleWorkPackage3
} from '../../test-support/test-data/work-packages.stub';
import {
  exampleProject1,
  exampleProject2,
  exampleProject3
} from '../../test-support/test-data/projects.stub';

describe('Formatting lists tests', () => {
  test('Formatting Wbs Numbers', () => {
    expect(listPipe(exampleWorkPackage1.dependencies, wbsPipe)).toBe('');
    expect(listPipe(exampleWorkPackage2.dependencies, wbsPipe)).toBe('1.1.1');
    expect(listPipe(exampleWorkPackage3.dependencies, wbsPipe)).toBe('1.12.0, 2.5.0');
  });

  test('Formatting Rules', () => {
    expect(listPipe(exampleProject1.rules, (str: string) => str)).toBe('EV3.5.2');
    expect(listPipe(exampleProject2.rules, (str: string) => str)).toBe('T12.3.2, T8.2.6');
    expect(listPipe(exampleProject3.rules, (str: string) => str)).toBe(
      'EV3.5.2, EV1.4.7, EV6.3.10'
    );
  });

  test('for other case', () => {
    expect(listPipe([1, 2, 3, 4], (num: number) => `${num}`)).toBe('1, 2, 3, 4');
    expect(listPipe([], (num: number) => `${num}`)).toBe('');
    expect(listPipe([1], (num: number) => `${num}`)).toBe('1');
  });
});
