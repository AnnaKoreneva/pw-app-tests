import * as allure from 'allure-js-commons';

export class AllureHelper {
  static step(stepName: string, action: () => Promise<void>) {
    return allure.step(stepName, action);
  }

    static addParameter(name: string, value: string) {
        return allure.parameter(name, value);
    };
}
