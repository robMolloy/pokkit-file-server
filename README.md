# Pokkit File Server

Pokkit File Server as an alternative to other file sharing options either for over your local network or cloud storage. There are many alternatives on the market but gives complete control and ownership of data, without being complex to set up.

Although not tested, by using ngrok, cloud storage could be enabled across the internet but hosted on your device.

Pocketbase enables direct file uploads, so simply use the pocketbase UI and log in as superuser.

## Running

To start the File Server, simply run npm run command appropriate to your machine or alternatively run the pocketbase instance directly e.g. `./backend/instance/pocketbase_mac serve --http=\"0.0.0.0:8090\"`. The npm commands are as follows;

- `npm run start:mac`
- `npm run start:windows`
- `npm run start:raspberrypi`

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

By default all files are "protected", so not publicly accessible even if you know their full url. If this is a problem, simply open the files collection settings and disable the "protected" toggle.

For more info see https://pocketbase.io/docs/files-handling/#protected-files

## Customisation

Initial settings allow file sizes of up to 1 Terrabyte. This can be increased/decreased in the files collection settings.

## Extension

Any additional suggestions can be recorded here;

- on create or update write the fileName and fileType
