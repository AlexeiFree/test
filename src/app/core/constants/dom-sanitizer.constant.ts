class DomSanitizerOptions {
  readonly HTML = 'html';
  readonly STYLE = 'style';
  readonly SCRIPT = 'script';
  readonly URL = 'url';
  readonly RESOURCE_URL = 'resourceUrl';
}

export const domSanitizerOptions = new DomSanitizerOptions();

export type DomSanitizerOptionType = DomSanitizerOptions[keyof DomSanitizerOptions];
