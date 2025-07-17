import { localizationHelpers } from 'helpers';
import { localStorageConstants, localizationConstants } from 'constants/index';

const { LOCALIZATION } = localStorageConstants;
const { REGIONS } = localizationConstants;

describe('Test changeLanguage', () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');
  });

  it('Does nothing when change to same language', () => {
    const language = REGIONS.vi.key;
    localizationHelpers.changeLanguage(language);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('Changes to other language', () => {
    const language = REGIONS.en.key;
    localizationHelpers.changeLanguage(language);
    expect(localStorage.setItem).toHaveBeenCalledWith(LOCALIZATION, language);
  });
});
