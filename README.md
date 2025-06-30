# Pokkit File Server

Pokkit File Server is easy to get up and running and allows files to be stored and shared across your network. By copying the same migrations to a hosted instance of pocketbase the same service can be achieved as cloud storage. Although not tested, by using ngrok, cloud storage could be enabled across the internet but hosted on your device.

Pocketbase enables direct file uploads, so simply use the pocketbase UI and log in as superuser.

## Running

To start the File Server, simply run `npm run start` or alternatively run the pocketbase instance directly with `./backend/instance/pocketbase serve --http=\"0.0.0.0:8090\"`

Once running, the pocketbase UI should be available at `http://localhost:8090/_`, `http://127.0.0.1:8090/_` or, if accessing from another computer `http://{IP_ADDRESS}:8090/_`

## Backups

If portablility is required, use the backup functionality provided in the pocketbase UI to move files and settings.

## Troubleshooting

Pocketbase is a very reliable piece of software, there are no potential known bugs but you may need to increase read and write timeout for large files. The easiest way to do this is by extending with a hook, as follows;

For ease, the js hook has been implemented in `backend/instance/pb_hooks/main.pb.js` so that it can changed easily.

https://github.com/pocketbase/pocketbase/discussions/6550#discussioncomment-12364515

In Go;

```golang
app.OnServe().BindFunc(func(e *core.ServeEvent) error {
    e.Server.ReadTimeout = 5 * time.Minute
    e.Server.WriteTimeout = 5 * time.Minute

    return e.Next()
})
```

In JS;

```js
$app.onServe().bindFunc((e) => {
  e.server.readTimeout = 300000000000; // nanoseconds
  e.server.writeTimeout = 300000000000; // nanoseconds

  return e.next();
});
```

## Security

All security rules are set to superuser only so cannot be accessed outside of the pocketbase UI or without the superuser credentials.

By default all files are "protected", so not publicly accessible even if you know their full url. If this is a problem, simply open the files collection settings and add disable the "protected" toggle.

For more info see https://pocketbase.io/docs/files-handling/#protected-files

## Customisation

Initial settings allow file sizes of up to 1 Terrabyte. This can be change in the files collection settings.

## Extension

A worthwhile extension could be to improve the on file upload hook to write the fileName and fileType.

Any additional suggestions can be recorded here;
