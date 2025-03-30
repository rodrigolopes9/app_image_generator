import "./style.css"
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  startSpinner()
  const data = new FormData(form);

  try {
    const response = await fetch('http://localhost:8080/dream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: data.get('prompt') }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Get the image as a Blob (binary data)
    const imageBlob = await response.blob();
    
    // Create an object URL to display the image
    const imageUrl = URL.createObjectURL(imageBlob);
    
    // Display the image
    const result = document.querySelector('#result');
    endSpinner()
    result.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
  } catch (error) {
    console.error('Error:', error);
    document.querySelector('#result').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});

function startSpinner(){
  const button = document.getElementById("dream-button")
  button.disabled = true
  button.innerHTML= "Dreaming... <span class='spinner'>🤪</span>"
}

function endSpinner(){
  const button = document.getElementById("dream-button")
  button.disabled = false
  button.innerHTML= "Dream"
}