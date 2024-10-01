document.querySelectorAll('img[src]').forEach(async (img) => {
  const response = await fetch(img.src);

  if (!response.ok) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener(
    'load',
    () => {
      // convert image file to base64 string
      img.src = reader.result;
    },
    false,
  );

  const blob = await response.blob();

  if (blob) {
    reader.readAsDataURL(blob);
  }
});
