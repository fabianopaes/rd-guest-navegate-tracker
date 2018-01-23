# guest-navegate-tracker

Lib javascript to save every single page that a guest visit on a given web site.

When someone visit your website the lib start saving into local storage a list of pages which the guest has been visited, when a guest fill the contact form out all the data is submit to [rd-leads-api]().

After that, the guest can keep navegating on your website while the lib is sending data to the api. Another submit is not necessary anymore.

### Integrate into your website

You have to put the `main.js` script into your application, for that you have two options

* The easier way is to put on your page the follow piece of code

```
    <script charset="utf-8" src="https://fgpaes.blob.core.windows.net/js-libs/main.js"></script>
```

* You can download the main.js and attach it into a folder in your application

After you have imported the lib on your application you need to make a few small changes on the page will show the contact form

So, the element will receive an email contact needs to have a `id="email"` i.e

```
    <input id="email" type="text" class="form-control" name="email" placeholder="Ex: name@gmail.com"/>        
``` 


##### Restrictions

* The lib is facing CORS troubles when is posting data to the rd-leads-api. It will be fixed asap

