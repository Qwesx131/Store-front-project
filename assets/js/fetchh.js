fetch('https://api.iconify.design/emojione:lion-face.svg')
  .then(response => response.blob())
  .then(blob => {
    let img = document.createElement('img');
    img.src = URL.createObjectURL(blob);
    img.style.width = '10vw';
    img.style.height = '5vh';
    img.style.margin = '10px';
    img.alt = 'Lion logo';
    img.style.cursor = 'pointer'; 
    
    let link = document.createElement('a');
    link.href = 'Homepage.html';
    link.appendChild(img);
    
    document.getElementById('logoContainer').appendChild(link);
  })
  .catch(err => console.error('Fetch failed:', err));