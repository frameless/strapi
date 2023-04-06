# Utrecht PDC

## Run the development environment

Start the environment with:

```bash
# development

cd bin/ && bash ./deploy.sh dev up --build # or

# production
cd bin/ && bash ./deploy.sh prod up --build 

```

Go to http://localhost:1337 and setup an admin account.

Then make sure to configure the right permissions for unauthenticated users in Settings > Roles > Public. Check the following items:

- Faq: find, fineOne
- Price: find, fineOne
- Product: find, fineOne
- i18n: listLocales
- Slugify: findSlug
- Upload: find, findOne

And choose "Save".

You can now create products and FAQ items using the Content Manager and view them on the frontend: http://localhost:3000/.
