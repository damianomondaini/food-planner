/*$.ajax({
    type: "POST",
    headers: { "Authorization": 'Bearer ' + 'ya29.GlsTBz8nZvYIdm4BbVFdZMVNuwXPoGA4NeAn4NuFKpAJ4oKgBhJuWGUrLB28d5Ryj0MwtmKjbnD43L0D4SmgV2D3sD1UCjGqpqBJYRUmoOluSmYQHazQjl06qE9R' },
    url: "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
    body: {
        "name": "test",
        "mimeType": "image/jpeg"
    },
  success: function(msg) {
    console.log('Got File Metadata: ' + msg) + console.log(msg);
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.log('Error: ' + errorThrown + ' / ' + textStatus) + console.log(jqXHR);
  }
});