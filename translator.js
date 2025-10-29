let lenOf = document.getElementsByTagName("script").length;
let ourSrc;
let useLang;
//identify the language we gonna translate to.
for (let i = 0; i < lenOf; i++) {
    ourSrc = document.getElementsByTagName("script")[i];
    if (ourSrc.hasAttribute("zlangu")) {
        useLang = ourSrc.getAttribute('zlangu');
    }
}

class zlanguageTranslator {
    constructor(zlangu) {
        this.language = zlangu;
        this.configFile = './langConfig.json';
        this.availableLangsData = null;
    }

    async availableLanguage() {
        if (this.availableLangsData) {
            return this.availableLangsData;
        }

        try {
            const response = await fetch(this.configFile);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.availableLangsData = await response.json();
            return this.availableLangsData;
        } catch (error) {
            console.error("Error fetching language configuration:", error);
            return null;
        }
    }

    async translateText(key) {
        const availableLangs = await this.availableLanguage();
        if (!availableLangs) {
            return "Error: Language data not loaded.";
        }

        if (!availableLangs[this.language]) {
            return `Error: Language '${this.language}' not found in configuration.`;
        }

        if (availableLangs[this.language][key]) {
            return availableLangs[this.language][key];
        } else {
            return `Key '${key}' not found in language '${this.language}'.`;
        }
    }

    async translatePage() {
        const zlangElements = document.querySelectorAll('zlang');

        for (const element of zlangElements) {
            const key = element.getAttribute('key');
            if (key) {
                const translatedText = await this.translateText(key);
                element.textContent = translatedText; // Update text content
            } else {
                console.warn("<zlang> tag found without 'key' attribute.");
            }
        }
    }
}

// Example usage:
async function initializeTranslation() {
    const translator = new zlanguageTranslator(useLang); // Set the desired language
    await translator.translatePage(); // Translate the page
}


// Call initializeTranslation when the DOM is fully loaded:
document.addEventListener('DOMContentLoaded', initializeTranslation);

/* example
async function testTranslation() {
    const translator = new zlanguageTranslator('es'); // Example: Spanish
    const availableLanguages = await translator.availableLanguage();
    if (availableLanguages) {
        console.log("Available Languages:", availableLanguages);

        const translatedText = await translator.translateText("greeting");
        console.log("Translated greeting:", translatedText);

        const translatedText2 = await translator.translateText("farewell");
        console.log("Translated farewell:", translatedText2);

        const translatedText3 = await translator.translateText("nonexistentKey");
        console.log("Translated nonexistentKey:", translatedText3);

        const translator2 = new zlanguageTranslator('fr'); // Example: French
        const translatedText4 = await translator2.translateText("greeting");
        console.log("Translated greeting in French:", translatedText4);

    }
}

testTranslation();*/