import { Page } from '@playwright/test';
// Usefull for keeping common methods which supposed to be used in majority of the pages

export class HalperBase {
  constructor(private readonly page: Page) {}
}
