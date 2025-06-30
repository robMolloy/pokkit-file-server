# Pokkit Simple Nas

## Running

To start the NAS, simply run `npm run start` or alternatively run the pocketbase instance directly with `./backend/instance/pocketbase serve --http=\"0.0.0.0:8090\"`

Once running, pocketbase should be available at `http://localhost:8090/_`, `http://127.0.0.1:8090/_` or, if accessing from another computer `http://{IP_ADDRESS}:8090/_`

Pocketbase enables direct file uploads, so simply use the pocketbase UI and log in as superuser.

## Backups

If portablility is required, use the backup functionality provided in the pocketbase UI to move files and settings.

## Troubleshooting

Pocketbase is a very reliable piece of software, there are no potential known bugs but you may need to increase read and write timeout for large files. The easiest way to do this is within a Go hook, as follows;

```golang
app.OnServe().BindFunc(func(e *core.ServeEvent) error {
    e.Server.ReadTimeout = 5 * time.Minute
    e.Server.WriteTimeout = 5 * time.Minute

    return e.Next()
})
```

## Security

By default all files are publicly accessible if you know their full url. If this is a problem, simply open the "edit collection" settings and add enable the "protected" toggle.

For more info see https://pocketbase.io/docs/files-handling/#protected-files

## Extension

A worthwhile extension could be to add a simple hook on file upload that writes the title and fileType

If any additional suggestions they can be recorded here
