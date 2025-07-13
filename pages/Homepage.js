export class Homepage {
  constructor(page) {
    this.page = page;
    this.mens_dropdown = page.locator("#ui-id-5 [class='ui-menu-icon ui-icon ui-icon-carat-1-e']");
    this.mens_tops = page.locator("#ui-id-17");
    this.jackets = page.locator("#ui-id-19");
  }
}
