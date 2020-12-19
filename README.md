# UDT Plugin Discovery

This provides a simple api for discovering npm packages that are valid UDT plugins. It is used inside the Universal Data Tool to get plugins.

# Usage

## Get all UDT plugins

`GET https://plugin-api.universaldatatool.com/api?q=delete-samples`

```javascript
{
  "plugins": [
    {
      "name": "udt-transform-delete-samples",
      "description": "...",
      "version": "1.0.7",
      "keywords": ["udt-plugin", "udt-transform"]
    }
  ]
}
```

## Listing Your Plugin

Make sure your plugin has a package.json file that includes `keywords` with `"udt-plugin"`, for example:

```javascript
{
  "name": "udt-transform-delete-samples",
  "version": "1.0.7",
  "main": "plugin-config.js",
  "repository": "git@github.com:UniversalDataTool/udt-transform-delete-samples.git",
  "license": "MIT",
  "type": "module",
  "scripts:": {
    "start": "udt-plugin start"
  },
  "keywords": [
    "udt-plugin",
    "udt-transform"
  ],
  "dependencies": {
    "udt-plugin": "0.0.1"
  }
}
```


Then publish your plugin to npm using `npm publish`. The discovery service will always
return the latest version of your plugin.

# FAQ

## Why isn't my plugin appearing in the discovery tool?

You may need
