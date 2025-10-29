# Multi Region Website Translator 🌍

A lightweight, client-side internationalization (i18n) library for JavaScript that enables multi-language support for websites with zero server-side dependencies.

## ✨ Features

- **Zero Dependencies**: Pure JavaScript implementation
- **Client-Side Only**: No server-side code required
- **Easy Integration**: Simple HTML tags for translation
- **JSON Configuration**: Easy-to-manage language files
- **Automatic Translation**: Translates entire pages on load
- **Multiple Languages**: Support for unlimited languages
- **Lightweight**: Minimal footprint for fast loading

## 🚀 Quick Start

### Installation

1. **Clone or Download** this repository to your project folder
2. **Include** the translator script in your HTML:
   ```html
   <script type="text/javascript" src="./translator.js" zlangu="fr"></script>
   ```
3. **Add** your language configuration file (`langConfig.json`)
4. **Use** `<zlang>` tags in your HTML for translatable content

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Multi-Language Site</title>
    <!-- Set the language using zlangu attribute -->
    <script type="text/javascript" src="./translator.js" zlangu="fr"></script>
</head>
<body>
    <h1><zlang key="title"></zlang></h1>
    <p><zlang key="greeting"></zlang>, <zlang key="name"></zlang>!</p>
    <p><zlang key="farewell"></zlang></p>
</body>
</html>
```

## 📁 Project Structure

```
multi_region/
├── index.html          # Example HTML page with translations
├── translator.js       # Main translation library
├── langConfig.json     # Language configuration file
└── README.md          # This documentation
```

## ⚙️ Configuration

### Language Configuration (`langConfig.json`)

Define your translations in a JSON file with the following structure:

```json
{
    "en": {
        "title": "My Website",
        "greeting": "Hello",
        "name": "User",
        "farewell": "Goodbye"
    },
    "es": {
        "title": "Mi Sitio Web",
        "greeting": "Hola",
        "name": "Usuario",
        "farewell": "Adiós"
    },
    "fr": {
        "title": "Mon site web",
        "greeting": "Bonjour",
        "name": "Utilisateur",
        "farewell": "Au revoir"
    }
}
```

### Setting the Language

Specify the target language using the `zlangu` attribute in the script tag:

```html
<!-- English -->
<script src="./translator.js" zlangu="en"></script>

<!-- Spanish -->
<script src="./translator.js" zlangu="es"></script>

<!-- French -->
<script src="./translator.js" zlangu="fr"></script>
```

### HTML Translation Tags

Use `<zlang>` tags with a `key` attribute to mark translatable content:

```html
<zlang key="your_translation_key"></zlang>
```

## 🔧 How It Works (For Developers)

### Core Components

#### 1. **Language Detection**
The script scans all `<script>` tags to find the one with the `zlangu` attribute and extracts the target language.

```javascript
let lenOf = document.getElementsByTagName("script").length;
let useLang;
for (let i = 0; i < lenOf; i++) {
    ourSrc = document.getElementsByTagName("script")[i];
    if (ourSrc.hasAttribute("zlangu")) {
        useLang = ourSrc.getAttribute('zlangu');
    }
}
```

#### 2. **zlanguageTranslator Class**
The main class that handles all translation operations:

- **Constructor**: Initializes with target language and config file path
- **availableLanguage()**: Fetches and caches language data from JSON
- **translateText(key)**: Returns translated text for a specific key
- **translatePage()**: Automatically translates all `<zlang>` elements on the page

#### 3. **Automatic Page Translation**
On DOM ready, the script automatically:
1. Instantiates the translator with the detected language
2. Scans for all `<zlang>` elements
3. Replaces their content with translated text

```javascript
document.addEventListener('DOMContentLoaded', initializeTranslation);
```

### Architecture Flow

```
1. Page loads → Script detects zlangu attribute
2. DOM ready → Translator initializes
3. Fetch langConfig.json → Load language data
4. Find all <zlang> tags → Extract keys
5. Translate keys → Replace content
```

### Error Handling

The library includes robust error handling for:
- Missing language configuration files
- Non-existent languages
- Missing translation keys
- Network errors when fetching config

## 📖 API Reference

### `zlanguageTranslator` Class

#### Constructor
```javascript
new zlanguageTranslator(language)
```
- **language** (string): Target language code (e.g., 'en', 'es', 'fr')

#### Methods

##### `availableLanguage()`
Returns the language configuration data.
```javascript
const config = await translator.availableLanguage();
```

##### `translateText(key)`
Translates a specific key to the target language.
```javascript
const text = await translator.translateText('greeting');
```

##### `translatePage()`
Automatically translates all `<zlang>` elements on the page.
```javascript
await translator.translatePage();
```

## 🌐 Adding New Languages

1. **Add translations** to `langConfig.json`:
   ```json
   {
       "existing_languages": "...",
       "de": {
           "title": "Meine Website",
           "greeting": "Hallo",
           "name": "Benutzer",
           "farewell": "Auf Wiedersehen"
       }
   }
   ```

2. **Use the new language** by setting `zlangu="de"` in your script tag

## 🔄 Dynamic Language Switching

For dynamic language switching, you can programmatically change languages:

```javascript
async function switchLanguage(newLang) {
    const translator = new zlanguageTranslator(newLang);
    await translator.translatePage();
}

// Switch to Spanish
switchLanguage('es');
```

## 🎯 Use Cases

- **Multi-language websites** without server-side complexity
- **Static site generators** requiring i18n support
- **Client-side applications** needing quick translation
- **Prototyping** multilingual interfaces
- **Educational projects** demonstrating i18n concepts

## 🚀 Performance Considerations

- Language data is **cached** after first load
- **Async/await** ensures non-blocking operations
- **Minimal DOM manipulation** for fast rendering
- **Single JSON file** reduces HTTP requests

## 🤝 Contributing

1. Fork the repository
2. Add your language to `langConfig.json`
3. Test with your language using `zlangu` attribute
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**Translations not appearing?**
- Check if `langConfig.json` is accessible
- Verify the language code in `zlangu` attribute
- Ensure translation keys exist in the config file

**Console errors?**
- Check browser console for specific error messages
- Verify JSON syntax in `langConfig.json`
- Ensure proper file paths

**Need help?**
Open an issue in the repository with details about your setup and the problem you're experiencing.

---

**Made with ❤️ for the global web community**
