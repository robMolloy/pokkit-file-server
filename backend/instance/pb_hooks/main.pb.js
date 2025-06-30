onRecordAfterCreateSuccess((e) => {
  const record = e.record;
  const fileUrlFromFileKey = record.get("file");
  record.set("fileUrl", fileUrlFromFileKey);

  $app.save(record);

  e.next();
}, "files");

onRecordAfterUpdateSuccess((e) => {
  const record = e.record;
  const fileUrlFromFileKey = record.get("file");
  const fileUrl = record.get("fileUrl");

  if (fileUrl === fileUrlFromFileKey) return e.next();

  record.set("fileUrl", fileUrlFromFileKey);
  $app.save(record);

  e.next();
}, "files");

$app.onServe().bindFunc((e) => {
  e.server.readTimeout = 300000000000; // nanoseconds
  e.server.writeTimeout = 300000000000; // nanoseconds

  return e.next();
});
