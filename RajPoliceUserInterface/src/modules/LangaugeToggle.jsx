// LanguageToggle.js

import React from 'react';

const LanguageToggle = () => {
  const toggleTranslation = () => {
    if (window.Microsoft && window.Microsoft.Translator) {
      const translator = window.Microsoft.Translator.Widget;
      translator.Init('6380c68dff384955ae2ca406e989867a', 'en');
      translator.ToggleWidget();
    } else {
      console.error('Microsoft Translator API not available.');
    }
  };

  return (
    <button onClick={toggleTranslation}>Toggle Translation</button>
  );
};

export default LanguageToggle;
